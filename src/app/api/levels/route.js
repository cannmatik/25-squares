
import { NextResponse } from 'next/server'
import prismaLevels from '@/lib/prisma-levels'

export const dynamic = 'force-dynamic'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const worldId = parseInt(searchParams.get('worldId') || '1')

    try {
        const levels = await prismaLevels.level.findMany({
            where: { worldId: worldId },
            orderBy: { levelNumber: 'asc' }
        })

        // Transform for frontend compatibility
        // Frontend expects "id" field, but DB uses "levelNumber"
        const transformedLevels = levels.map(level => ({
            id: level.levelNumber,
            gridSize: level.gridSize,
            fixedStart: level.fixedStart,
            blockedSquares: level.blockedSquares,
            requiredMoves: level.requiredMoves,
            stars: level.stars,
            ruleSet: level.ruleSet,
            timeLimit: level.timeLimit,
            fullPath: level.fullPath,
            tutorial: level.tutorial,
            maxMistakes: level.maxMistakes,
            starCriteria: level.starCriteria,
            starThresholds: level.starThresholds
        }))

        return NextResponse.json({ levels: transformedLevels })
    } catch (error) {
        console.error('Failed to fetch levels:', error)
        return NextResponse.json({ error: 'Failed to fetch levels' }, { status: 500 })
    }
}
