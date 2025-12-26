// Seed script to create user with all levels unlocked
// Run: npx dotenv -e .env -- node prisma/seed.js

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const email = 'cannmatik@gmail.com'
    const username = 'HorseWater'
    const password = 'Girgirgir1.'

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
        console.log('User already exists, updating progress...')
        // Delete existing progress
        await prisma.progress.deleteMany({ where: { userId: existingUser.id } })
        await createFullProgress(existingUser.id)
        console.log('Progress updated!')
    } else {
        // Create user
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { email, username, password: hashedPassword }
        })
        console.log('User created:', user.username)
        await createFullProgress(user.id)
    }

    console.log('Done!')
}

async function createFullProgress(userId) {
    const progressData = []

    // World 1: 25 levels
    for (let i = 1; i <= 25; i++) {
        progressData.push({
            userId,
            worldId: 1,
            levelId: i,
            stars: 3,
            completed: true,
            bestScore: 25
        })
    }

    // World 2: 25 levels
    for (let i = 1; i <= 25; i++) {
        progressData.push({
            userId,
            worldId: 2,
            levelId: i,
            stars: 3,
            completed: true,
            bestScore: 25
        })
    }

    await prisma.progress.createMany({ data: progressData })
    console.log('Created progress for all 50 levels with 3 stars each')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
