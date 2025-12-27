import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateOTP, sendVerificationOTP } from '@/lib/email'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export async function POST(request) {
    try {
        const { email, username, password } = await request.json()

        if (!email || !username || !password) {
            return NextResponse.json({ error: 'Email, username and password are required' }, { status: 400 })
        }

        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
        }

        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { username }] }
        })

        if (existingUser) {
            // Check what conflicted
            const emailConflict = existingUser.email === email
            const usernameConflict = existingUser.username === username

            if (emailConflict && !existingUser.emailVerified) {
                // User exists but is not verified. This is a RETRY.
                // Update password (in case they forgot), generate new OTP, and resend.
                console.log('User exists but unverified. Resending OTP.')

                const hashedPassword = await bcrypt.hash(password, 10)
                const verificationOtp = generateOTP();
                const verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

                const updatedUser = await prisma.user.update({
                    where: { email },
                    data: {
                        password: hashedPassword,
                        username, // Allow updating username if they changed it? Maybe safe.
                        verificationOtp,
                        verificationOtpExpires
                    }
                })

                try {
                    await sendVerificationOTP(email, verificationOtp);
                } catch (error) {
                    console.error('Failed to resend verification email:', error);
                }

                // Return success as if new registration
                const token = jwt.sign({ userId: updatedUser.id, username: updatedUser.username }, JWT_SECRET, { expiresIn: '7d' })
                return NextResponse.json({
                    message: 'Verification code resent',
                    token,
                    user: { id: updatedUser.id, email: updatedUser.email, username: updatedUser.username, hintCount: updatedUser.hintCount, undoCount: updatedUser.undoCount }
                })
            }

            // Real Conflict
            if (usernameConflict && emailConflict) {
                return NextResponse.json({ error: 'Account with this email and username already exists.' }, { status: 409 })
            } else if (usernameConflict) {
                return NextResponse.json({ error: 'Username is already taken. Please choose another.' }, { status: 409 })
            } else {
                return NextResponse.json({ error: 'Email is already registered. Please login.' }, { status: 409 })
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const verificationOtp = generateOTP();
        const verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                hintCount: 20,
                undoCount: 20,
                verificationOtp,
                verificationOtpExpires,
                emailVerified: false
            }
        })

        // Send OTP email
        try {
            await sendVerificationOTP(email, verificationOtp);
        } catch (error) {
            console.error('Failed to send verification email:', error);
            // Ideally rollback user creation or handle gracefully, 
            // but for now we proceed and let user click "resend" later if implemented.
        }

        // const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' })

        return NextResponse.json({
            message: 'User created successfully',
            // token, // Do NOT return token. Force verification.
            user: { id: user.id, email: user.email, username: user.username, hintCount: user.hintCount, undoCount: user.undoCount }
        })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json({
            error: 'Internal server error',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 })
    }
}
