
const { PrismaClient } = require('@prisma/client-levels')
const { PrismaClient: PrismaMain } = require('@prisma/client')

const levelsPrisma = new PrismaClient()
const mainPrisma = new PrismaMain()

async function main() {
    try {
        const levelCount = await levelsPrisma.level.count()
        console.log(`Total Level Records: ${levelCount}`)

        const world1Count = await levelsPrisma.level.count({ where: { worldId: 1 } })
        console.log(`World 1 Levels: ${world1Count}`)

        const world2Count = await levelsPrisma.level.count({ where: { worldId: 2 } })
        console.log(`World 2 Levels: ${world2Count}`)

        const progressCount = await mainPrisma.progress.count()
        console.log(`Total Progress Records: ${progressCount}`)

    } catch (e) {
        console.error("Error:", e)
    } finally {
        await levelsPrisma.$disconnect()
        await mainPrisma.$disconnect()
    }
}

main()
