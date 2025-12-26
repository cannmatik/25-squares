
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const email = 'cannmatik@gmail.com'

    // Find User
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        console.error(`User ${email} not found!`)
        return
    }

    console.log(`Unlocking all 75 levels for ${user.username} (${user.id})...`)

    // 3 Worlds, 25 Levels each
    const worlds = [1, 2, 3]
    const operations = []

    for (const w of worlds) {
        for (let l = 1; l <= 25; l++) {
            operations.push(
                prisma.progress.upsert({
                    where: {
                        userId_worldId_levelId: {
                            userId: user.id,
                            worldId: w,
                            levelId: l
                        }
                    },
                    update: {
                        stars: 3,
                        completed: true,
                        bestScore: 25 // Assuming perfect score
                    },
                    create: {
                        userId: user.id,
                        worldId: w,
                        levelId: l,
                        stars: 3,
                        completed: true,
                        bestScore: 25
                    }
                })
            )
        }
    }

    await prisma.$transaction(operations)
    console.log(`Successfully unlocked ${operations.length} levels!`)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
