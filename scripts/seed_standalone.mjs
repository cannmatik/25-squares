
import { PrismaClient } from '@prisma/client'
import { LEVELS } from './levels.mjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding levels...')
    let count = 0
    for (const [worldId, levels] of Object.entries(LEVELS)) {
        for (const level of levels) {
            const { id, ...config } = level

            await prisma.level.upsert({
                where: {
                    worldId_levelId: {
                        worldId: parseInt(worldId),
                        levelId: id
                    }
                },
                update: {
                    config: config
                },
                create: {
                    worldId: parseInt(worldId),
                    levelId: id,
                    config: config
                }
            })
            count++
        }
    }
    console.log(`Successfully seeded ${count} levels.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
