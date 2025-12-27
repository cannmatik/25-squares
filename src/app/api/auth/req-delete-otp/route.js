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

        // Generate OTP
        const verificationOtp = generateOTP();
        const verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Update user with new OTP
        await prisma.user.update({
            where: { id: user.id },
            data: { verificationOtp, verificationOtpExpires }
        })

        // Send email
        try {
            await sendVerificationOTP(email, verificationOtp);
        } catch (error) {
            console.error('Failed to send delete OTP:', error);
            return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
        }

        return NextResponse.json({ message: 'OTP sent for deletion' })

    } catch (error) {
        console.error('Req Delete OTP error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
