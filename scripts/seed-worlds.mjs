
import { PrismaClient } from '@prisma/client-levels'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding worlds...')

    const worlds = []
    for (let i = 1; i <= 25; i++) {
        // Each world has 25 levels × 3 stars = 75 max per world
        // Max possible stars from previous worlds = (i-1) * 75
        // Percentage required scales from 45% (early) to 80% (late)

        let requiredStars = 0
        if (i > 1) {
            const maxPossible = (i - 1) * 75
            // Scale from 45% at World 2 to 80% at World 25
            // Linear interpolation: 0.45 + (worldNum - 2) * (0.80 - 0.45) / (25 - 2)
            const percentage = 0.45 + (i - 2) * (0.35 / 23)
            requiredStars = Math.floor(maxPossible * percentage)
        }

        worlds.push({
            id: i,
            name: `World ${i}`,
            requiredStars: requiredStars,
            levels: 25
        })
    }

    for (const w of worlds) {
        await prisma.world.upsert({
            where: { id: w.id },
            update: {
                requiredStars: w.requiredStars,
                name: w.name
            },
            create: w
        })
    }

    console.log('Seeding complete: 25 Worlds upserted.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
