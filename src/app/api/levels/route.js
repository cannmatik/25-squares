
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

        // Transform for frontend if needed, or send as is
        // Frontend expects "stars" as array, etc. DB stores as Json which Prisma auto-parses.

        return NextResponse.json({ levels })
    } catch (error) {
        console.error('Failed to fetch levels:', error)
        return NextResponse.json({ error: 'Failed to fetch levels' }, { status: 500 })
    }
}
