
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export async function POST(request) {
    try {
        const authHeader = request.headers.get('Authorization')
        if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)

        const { maxLevel } = await request.json()
        if (!maxLevel || typeof maxLevel !== 'number') {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        if (maxLevel > user.infiniteLevel) {
            await prisma.user.update({
                where: { id: user.id },
                data: { infiniteLevel: maxLevel }
            })
            return NextResponse.json({ success: true, newBest: true, infiniteLevel: maxLevel })
        }

        return NextResponse.json({ success: true, newBest: false, infiniteLevel: user.infiniteLevel })

    } catch (error) {
        console.error('Infinite score save error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
