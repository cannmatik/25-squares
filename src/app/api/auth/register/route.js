import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
            return NextResponse.json({ error: 'User with this email or username already exists' }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: { email, username, password: hashedPassword }
        })

        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' })

        return NextResponse.json({
            message: 'User created successfully',
            token,
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
