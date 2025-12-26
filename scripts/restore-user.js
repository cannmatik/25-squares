
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const email = 'cannmatik@gmail.com'
    const password = 'Girgirgir1.'
    const username = 'HorseWater'

    console.log(`Restoring user: ${email}...`)

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            username: username
        },
        create: {
            email,
            username,
            password: hashedPassword
        }
    })

    console.log(`User restored with ID: ${user.id}`)

    // Now re-run logic from unlock-levels.js here to be sure
    const worlds = [1, 2]
    // Use the generated levels count for World 1 if we can knowing it's huge, 
    // but at least standard 25 for now to get them back in game quickly.
    // Actually, I'll just call the unlock script from shell right after this.

    console.log('User restored. Run unlock-levels.js to restore progress.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
