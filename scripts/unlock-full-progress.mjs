
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function unlockAll() {
    const email = 'cannmatik@gmail.com'
    console.log(`Unlocking all levels for ${email}...`)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        console.error('User not found!')
        process.exit(1)
    }

    // Generate array [1, 2, ..., 25]
    const TOTAL_WORLDS = 25
    const worlds = Array.from({ length: TOTAL_WORLDS }, (_, i) => i + 1)
    const levelsPerWorld = 25

    console.log(`Target: ${worlds.length} worlds, ${levelsPerWorld} levels each. Total: ${worlds.length * levelsPerWorld} progress records.`)
    console.log('This may take a moment...')

    let count = 0
    for (const worldId of worlds) {
        for (let levelId = 1; levelId <= levelsPerWorld; levelId++) {
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
                    bestScore: 25,
                    completed: true,
                    updatedAt: new Date()
                },
                create: {
                    userId: user.id,
                    worldId: worldId,
                    levelId: levelId,
                    stars: 3,
                    bestScore: 25,
                    completed: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
            count++
        }
        process.stdout.write(`\rUnlocked World ${worldId}...`)
    }

    console.log(`\nSuccessfully unlocked ALL ${TOTAL_WORLDS} Worlds! (${count} levels)`)
}

unlockAll()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
