import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
    try {
        const { email, otp } = await request.json()

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Verify OTP
        if (user.verificationOtp !== otp) {
            return NextResponse.json({ error: 'Invalid Code' }, { status: 400 })
        }

        // Check expiration
        if (user.verificationOtpExpires && new Date() > new Date(user.verificationOtpExpires)) {
            return NextResponse.json({ error: 'Code Expired' }, { status: 400 })
        }

        // Delete User
        await prisma.user.delete({ where: { id: user.id } })

        return NextResponse.json({ message: 'Account deleted successfully' })

    } catch (error) {
        console.error('Delete Account error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
