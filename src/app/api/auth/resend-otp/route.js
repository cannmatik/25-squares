import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOTP, sendVerificationOTP } from '@/lib/email'

export async function POST(request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        if (user.emailVerified) {
            return NextResponse.json({ error: 'Email already verified' }, { status: 400 })
        }

        const verificationOtp = generateOTP();
        const verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await prisma.user.update({
            where: { id: user.id },
            data: { verificationOtp, verificationOtpExpires }
        })

        try {
            await sendVerificationOTP(email, verificationOtp);
        } catch (error) {
            console.error('Failed to resend verification email:', error);
            // Don't fail the request, just log it. Use might retry.
        }

        return NextResponse.json({ message: 'Code resent successfully' })

    } catch (error) {
        console.error('Resend OTP error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
