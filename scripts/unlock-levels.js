const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const email = 'cannmatik@gmail.com'

    console.log(`Unlocking all levels for user: ${email}`)

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        console.error('User not found!')
        process.exit(1)
    }

    const fs = require('fs')
    const path = require('path')

    // World 2 is now the BIG one (Generated)
    const world2Path = path.join(__dirname, '../generated_levels.json')
    const world2Data = fs.existsSync(world2Path) ? JSON.parse(fs.readFileSync(world2Path, 'utf8')) : []
    const world2Count = world2Data.length || 0

    // World 1 is Curated (25)
    // We can read world1_levels.json or just assume 25
    const world1Path = path.join(__dirname, '../world1_levels.json')
    const world1Data = fs.existsSync(world1Path) ? JSON.parse(fs.readFileSync(world1Path, 'utf8')) : []
    const world1Count = Math.max(world1Data.length || 25, 30) // Ensure we cover the 5 extra levels

    const worldsConfig = {
        1: world1Count,
        2: world2Count
    }

    for (const [worldIdStr, count] of Object.entries(worldsConfig)) {
        const worldId = parseInt(worldIdStr)
        console.log(`Unlocking ${count} levels for World ${worldId}...`)

        // Batch operations would be better but simple loop works for <20k
        for (let levelId = 1; levelId <= count; levelId++) {
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
                    completed: true,
                    bestScore: 25 // Assuming a good score for unlocked levels
                },
                create: {
                    userId: user.id,
                    worldId: worldId,
                    levelId: levelId,
                    stars: 3,
                    completed: true,
                    bestScore: 25
                }
            })
        }
        console.log(`Unlocked World ${worldId}`)
    }

    console.log('All levels unlocked successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
