
import { PrismaClient } from '@prisma/client-levels'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding worlds...')

    const worlds = []
    for (let i = 1; i <= 25; i++) {
        let requiredStars = 0

        // Dynamic Difficulty Curve provided by user request
        // "starts at ~40 and gets harder"
        // Formula: Cumulative sum of increasing gaps
        // Gap starts at 35 (W2) and increases by 1.5 for each subsequent world
        if (i > 1) {
            let gap = 35
            for (let j = 2; j <= i; j++) {
                requiredStars += Math.floor(gap)
                gap += 1.5
            }
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
