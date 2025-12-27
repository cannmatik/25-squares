import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
    try {
        const { email, otp } = await request.json()

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 })
        }

        const user = await prisma.user.findFirst({
            where: {
                email,
                verificationOtp: otp,
                verificationOtpExpires: {
                    gt: new Date()
                }
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verificationOtp: null,
                verificationOtpExpires: null
            }
        })

        return NextResponse.json({ message: 'Email verified successfully' })

    } catch (error) {
        console.error('OTP verification error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
