
import { PrismaClient } from '@prisma/client-levels'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env' })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load levels manually since we can't easily import from src/lib with aliases in pure node without setup
// Actually, I'll just copy the LEVELS object content here or try to read the file. 
// Reading the file and evaling or JSON parsing is risky/hard.
// Better: I'll locate src/lib/levels.js and read it.
// OR, I can just copy the levels data if it's static?
// It's static. Let's just try to import it using relative path if it's ESM.
// src/lib/levels.js uses "export const LEVELS = ...". It is ESM.

// Let's try importing relative to the script
// Script is in scripts/seed-levels.mjs
// Levels is in src/lib/levels.js -> ../src/lib/levels.js

import { LEVELS } from '../src/lib/levels.js'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding levels...')
    let count = 0
    for (const [worldId, levels] of Object.entries(LEVELS)) {
        for (const level of levels) {
            const {
                id,
                gridSize,
                fixedStart,
                blockedSquares,
                requiredMoves,
                stars,
                timeLimit,
                ruleSet,
                fullPath,
                tutorial,
                maxMistakes,
                starCriteria,
                starThresholds,
                minMoves,
                minCheckpoints
            } = level

            const levelData = {
                gridSize: gridSize || 5,
                fixedStart: fixedStart || null,
                blockedSquares: blockedSquares || [],
                requiredMoves: requiredMoves || [],
                stars: stars || [10, 15, 20],
                timeLimit: timeLimit || null,
                ruleSet: ruleSet || 7,
                fullPath: fullPath || null,
                tutorial: tutorial || null,
                maxMistakes: maxMistakes || null,
                starCriteria: starCriteria || null,
                starThresholds: starThresholds || null,
                minMoves: minMoves || null,
                minCheckpoints: minCheckpoints || null
            }

            await prisma.level.upsert({
                where: {
                    worldId_levelId: {
                        worldId: parseInt(worldId),
                        levelId: id
                    }
                },
                update: levelData,
                create: {
                    worldId: parseInt(worldId),
                    levelId: id,
                    ...levelData
                }
            })
            count++
        }
    }
    console.log(`Seeded ${count} levels successfully.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
