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

    const worlds = [1, 2]
    const levelsPerWorld = 25

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
