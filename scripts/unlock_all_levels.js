
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

    console.log(`Resetting and unlocking all levels for ${user.username} (${user.id})...`)

    // 1. Delete existing progress
    const deleted = await prisma.progress.deleteMany({
        where: { userId: user.id }
    })
    console.log(`Deleted ${deleted.count} existing progress records.`)

    // 2. Unlock all 75 levels
    const worlds = [1, 2, 3]
    const operations = []

    for (const w of worlds) {
        for (let l = 1; l <= 25; l++) {
            operations.push(
                prisma.progress.create({
                    data: {
                        userId: user.id,
                        worldId: w,
                        levelId: l,
                        stars: 3,
                        completed: true,
                        bestScore: 25 // Assuming perfect score
                    }
                })
            )
        }
    }

    await prisma.$transaction(operations)
    console.log(`Successfully unlocked ${operations.length} new levels!`)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
