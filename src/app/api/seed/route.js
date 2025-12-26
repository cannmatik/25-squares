import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// POST /api/seed - Create test user with all levels unlocked
// This endpoint is for development only
export async function POST(request) {
    try {
        const { secret } = await request.json()

        // Simple protection
        if (secret !== 'create-horse-water-user') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const email = 'cannmatik@gmail.com'
        const username = 'HorseWater'
        const password = 'Girgirgir1.'

        // Check if user exists
        let user = await prisma.user.findUnique({ where: { email } })

        if (user) {
            console.log('User already exists, updating progress...')
            // Delete existing progress
            await prisma.progress.deleteMany({ where: { userId: user.id } })
        } else {
            // Create user
            const hashedPassword = await bcrypt.hash(password, 10)
            user = await prisma.user.create({
                data: { email, username, password: hashedPassword }
            })
            console.log('User created:', user.username)
        }

        // Create full progress
        const progressData = []

        // World 1: 25 levels
        for (let i = 1; i <= 25; i++) {
            progressData.push({
                userId: user.id,
                worldId: 1,
                levelId: i,
                stars: 3,
                completed: true,
                bestScore: 25
            })
        }

        // World 2: 25 levels
        for (let i = 1; i <= 25; i++) {
            progressData.push({
                userId: user.id,
                worldId: 2,
                levelId: i,
                stars: 3,
                completed: true,
                bestScore: 25
            })
        }

        await prisma.progress.createMany({ data: progressData })

        return NextResponse.json({
            message: 'User created with all levels unlocked',
            user: { id: user.id, email: user.email, username: user.username }
        })
    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
