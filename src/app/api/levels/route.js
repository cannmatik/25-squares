
import { NextResponse } from 'next/server'
import prismaLevels from '@/lib/prisma-levels'

export const dynamic = 'force-dynamic'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const worldId = searchParams.get('worldId')

        const where = {}
        if (worldId) where.worldId = parseInt(worldId)

        console.log('Levels API: Querying with', where)
        const levels = await prismaLevels.level.findMany({
            where,
            orderBy: [{ worldId: 'asc' }, { levelId: 'asc' }]
        })
        console.log(`Levels API: Found ${levels.length} levels`)

        // Transform back to the format expected by the frontend
        // Currently the frontend expects an array of level objects
        // stored in an object keyed by worldId in lib/levels.js, 
        // but let's return a flat list or grouped by worldId depending on usage.

        // Actually, let's just return the raw data and handle transformation on client
        // OR transform it here to match what the client currently expects from LEVELS object.
        // The LEVELS export in lib/levels.js is { 1: [...], 2: [...] }

        const levelsByWorld = levels.reduce((acc, level) => {
            if (!acc[level.worldId]) acc[level.worldId] = []
            const levelData = {
                ...level, // Spread first
                id: level.levelId, // Then override id with numeric levelId
                worldId: level.worldId
            }
            // Remove internal Prisma fields we don't need to send
            delete levelData.createdAt
            delete levelData.updatedAt
            delete levelData.levelId // We use 'id' alias for frontend consistency
            acc[level.worldId].push(levelData)
            return acc
        }, {})

        return NextResponse.json(levelsByWorld, {
            headers: {
                'Cache-Control': 'public, max-age=0, must-revalidate',
                'CDN-Cache-Control': 'public, max-age=0, must-revalidate',
                'Vercel-CDN-Cache-Control': 'public, max-age=0, must-revalidate',
            }
        })
    } catch (error) {
        console.error('Fetch levels error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
