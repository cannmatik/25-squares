import { NextResponse } from 'next/server'
import { prismaLevels } from '@/lib/levels-db'
import { LEVELS } from '@/lib/levels'

export async function GET() {
    try {
        let count = 0
        for (const [worldId, levels] of Object.entries(LEVELS)) {
            for (const level of levels) {
                // Extract fields to match new schema
                const {
                    id,
                    gridSize,
                    fixedStart,
                    blockedSquares,
                    requiredMoves,
                    stars,
                    timeLimit,
                    ruleSet,
                    fullPath,
                    tutorial,
                    maxMistakes,
                    starCriteria,
                    starThresholds
                } = level

                const levelData = {
                    gridSize: gridSize || 5,
                    fixedStart: fixedStart || null,
                    blockedSquares: blockedSquares || [],
                    requiredMoves: requiredMoves || [],
                    stars: stars || [10, 15, 20],
                    timeLimit: timeLimit || null,
                    ruleSet: ruleSet || 7,
                    fullPath: fullPath || null,
                    tutorial: tutorial || null,
                    maxMistakes: maxMistakes || null,
                    starCriteria: starCriteria || null,
                    starThresholds: starThresholds || null
                }

                await prismaLevels.level.upsert({
                    where: {
                        worldId_levelId: {
                            worldId: parseInt(worldId),
                            levelId: id
                        }
                    },
                    update: levelData,
                    create: {
                        worldId: parseInt(worldId),
                        levelId: id,
                        ...levelData
                    }
                })
                count++
            }
        }

        return NextResponse.json({ success: true, seeded: count })
    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
