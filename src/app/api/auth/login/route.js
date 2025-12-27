import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateOTP, sendVerificationOTP } from '@/lib/email'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export async function POST(request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
        }

        if (!user.emailVerified) {
            console.log('User unverified, regenerating OTP')
            const verificationOtp = generateOTP();
            const verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

            await prisma.user.update({
                where: { id: user.id },
                data: { verificationOtp, verificationOtpExpires }
            })

            try {
                await sendVerificationOTP(email, verificationOtp);
            } catch (error) {
                console.error('Failed to resend verification email on login:', error);
            }

            return NextResponse.json({ error: 'Email not verified. A new code has been sent.', code: 'EMAIL_NOT_VERIFIED' }, { status: 403 })
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' })

        return NextResponse.json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, username: user.username, hintCount: user.hintCount, undoCount: user.undoCount }
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({
            error: 'Internal server error',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 })
    }
}
