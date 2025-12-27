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

export async function GET(request) {
    try {
        const decoded = verifyToken(request)
        if (!decoded) {
            console.log('Progress API: Unauthorized')
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.log('Progress API: Fetching for user', decoded.userId)
        const progress = await prisma.progress.findMany({
            where: { userId: decoded.userId },
            orderBy: [{ worldId: 'asc' }, { levelId: 'asc' }]
        })
        console.log(`Progress API: Found ${progress.length} records`)

        const totalStars = progress.reduce((sum, p) => sum + p.stars, 0)
        return NextResponse.json({ progress, totalStars })
    } catch (error) {
        console.error('Get progress error details:', error)
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const decoded = verifyToken(request)
        if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { worldId, levelId, stars, bestScore, hintsUsed, undosUsed } = await request.json()

        if (worldId === undefined || levelId === undefined) {
            return NextResponse.json({ error: 'worldId and levelId are required' }, { status: 400 })
        }

        // Get current progress
        const current = await prisma.progress.findUnique({
            where: { userId_worldId_levelId: { userId: decoded.userId, worldId, levelId } }
        })

        // Only update if new score is better
        const newStars = current ? Math.max(current.stars, stars || 0) : (stars || 0)
        const newBestScore = current ? Math.max(current.bestScore, bestScore || 0) : (bestScore || 0)

        const progress = await prisma.progress.upsert({
            where: { userId_worldId_levelId: { userId: decoded.userId, worldId, levelId } },
            update: { stars: newStars, bestScore: newBestScore, completed: newStars > 0 },
            create: { userId: decoded.userId, worldId, levelId, stars: newStars, bestScore: newBestScore, completed: newStars > 0 }
        })

        // Update user's hint/undo counts if provided
        let updatedUser = null
        if (hintsUsed > 0 || undosUsed > 0) {
            // Get current user
            const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
            if (user) {
                updatedUser = await prisma.user.update({
                    where: { id: decoded.userId },
                    data: {
                        hintCount: Math.max(0, user.hintCount - (hintsUsed || 0)),
                        undoCount: Math.max(0, user.undoCount - (undosUsed || 0))
                    }
                })
            }
        }

        return NextResponse.json({
            success: true,
            progress,
            hintCount: updatedUser?.hintCount,
            undoCount: updatedUser?.undoCount
        })
    } catch (error) {
        console.error('Save progress error details:', error)
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
    }
}
