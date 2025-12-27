
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

// Initialize Prisma
const prisma = new PrismaClient()

async function unlockAll() {
    const email = 'cannmatik@gmail.com'
    console.log(`Unlocking all levels for ${email}...`)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        console.error('User not found!')
        process.exit(1)
    }

    const worlds = [1, 2, 3]
    const levelsPerWorld = 25

    for (const worldId of worlds) {
        for (let levelId = 1; levelId <= levelsPerWorld; levelId++) {
            // Create or update progress
            await prisma.progress.upsert({
                where: {
                    userId_worldId_levelId: {
                        userId: user.id,
                        worldId: worldId,
                        levelId: levelId
                    }
                },
                update: {
                    stars: 3,
                    bestScore: 1000, // Correct field name
                    completed: true,
                    updatedAt: new Date()
                },
                create: {
                    userId: user.id,
                    worldId: worldId,
                    levelId: levelId,
                    stars: 3,
                    bestScore: 1000,
                    completed: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
        }
    }

    console.log('Successfully unlocked World 1, 2, 3 (All 3 stars).')
}

unlockAll()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
