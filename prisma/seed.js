
const { PrismaClient } = require('@prisma/client-levels')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    const files = ['world1_levels.json', 'world2_levels.json', 'world3_levels.json']

    for (const file of files) {
        const filePath = path.join(__dirname, `../scripts/${file}`)
        if (!fs.existsSync(filePath)) {
            console.log(`Skipping ${file} (not found)`)
            continue
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        // Determine world ID from filename (hacky but effective)
        // world1 -> 1, world2 -> 2
        const worldId = parseInt(file.replace('world', '').replace('_levels.json', ''))

        console.log(`Seeding World ${worldId} (${data.length} levels)...`)

        for (const level of data) {
            await prisma.level.upsert({
                where: {
                    worldId_levelNumber: { worldId: worldId, levelNumber: level.id }
                },
                update: {
                    gridSize: level.gridSize,
                    fixedStart: level.fixedStart,
                    blockedSquares: level.blockedSquares,
                    requiredMoves: level.requiredMoves,
                    stars: level.stars,
                    ruleSet: level.ruleSet,
                    timeLimit: level.timeLimit,
                    fullPath: level.fullPath,
                    tutorial: level.tutorial,
                    maxMistakes: level.maxMistakes,
                    starCriteria: level.starCriteria,
                    starThresholds: level.starThresholds
                },
                create: {
                    worldId: worldId,
                    levelNumber: level.id,
                    gridSize: level.gridSize,
                    fixedStart: level.fixedStart,
                    blockedSquares: level.blockedSquares,
                    requiredMoves: level.requiredMoves,
                    stars: level.stars,
                    ruleSet: level.ruleSet,
                    timeLimit: level.timeLimit,
                    fullPath: level.fullPath,
                    tutorial: level.tutorial,
                    maxMistakes: level.maxMistakes,
                    starCriteria: level.starCriteria,
                    starThresholds: level.starThresholds
                }
            })
        }
    }
    console.log('Level seeding completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
