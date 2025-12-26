
const { PrismaClient } = require('@prisma/client-levels')
const prisma = new PrismaClient()

async function main() {
    const level1 = await prisma.level.findFirst({
        where: { worldId: 1, levelNumber: 1 }
    })

    if (level1) {
        console.log('Level 1 Found:')
        console.log('Tutorial Field Type:', typeof level1.tutorial)
        console.log('Tutorial Content:', JSON.stringify(level1.tutorial, null, 2))
    } else {
        console.log('Level 1 NOT FOUND in DB')
    }
}

main().finally(() => prisma.$disconnect())
