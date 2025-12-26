
const { PrismaClient } = require('@prisma/client-levels')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
    console.log('Cleaning up Level database...')

    try {
        // Delete all levels
        const deleted = await prisma.level.deleteMany({})
        console.log(`Deleted ${deleted.count} levels.`)

        // Re-seed
        const files = ['world1_levels.json', 'world2_levels.json', 'world3_levels.json']

        for (const file of files) {
            const filePath = path.join(__dirname, `../${file}`)
            if (!fs.existsSync(filePath)) {
                console.log(`Skipping ${file} (not found)`)
                continue
            }

            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
            // Determine world ID
            const worldId = parseInt(file.replace('world', '').replace('_levels.json', ''))

            console.log(`Seeding World ${worldId} with ${data.length} levels...`)

            for (const level of data) {
                await prisma.level.create({
                    data: {
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

        console.log('Successfully reset database to 75 levels.')

    } catch (e) {
        console.error('Error resetting levels:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
