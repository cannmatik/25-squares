import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

function verifyToken(request) {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null
    try {
        return jwt.verify(authHeader.split(' ')[1], JWT_SECRET)
    } catch {
        return null
    }
}

export async function POST(request) {
    try {
        const decoded = verifyToken(request)
        if (!decoded) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { type, amount = 1 } = await request.json()
        if (!['hint', 'undo'].includes(type)) {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        let updateData = {}
        if (type === 'hint') {
            if (user.hintCount < amount) return NextResponse.json({ error: 'Not enough hints' }, { status: 400 })
            updateData = { hintCount: user.hintCount - amount }
        } else {
            if (user.undoCount < amount) return NextResponse.json({ error: 'Not enough undos' }, { status: 400 })
            updateData = { undoCount: user.undoCount - amount }
        }

        const updatedUser = await prisma.user.update({
            where: { id: decoded.userId },
            data: updateData
        })

        return NextResponse.json({
            success: true,
            newCount: type === 'hint' ? updatedUser.hintCount : updatedUser.undoCount
        })

    } catch (error) {
        console.error('Consume resource error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
