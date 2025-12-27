
import { NextResponse } from 'next/server'
import { prismaLevels } from '@/lib/levels-db'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const worlds = await prismaLevels.world.findMany({
            orderBy: { id: 'asc' }
        })

        // If DB is empty for some reason, return fallback or empty array
        // But usually we seed. 

        return NextResponse.json(worlds, {
            headers: {
                'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' // cache worlds a bit longer as they rarely change
            }
        })
    } catch (error) {
        console.error('Fetch worlds error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
