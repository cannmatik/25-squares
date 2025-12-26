
import { PrismaClient } from '@prisma/client-levels'

let prismaLevels

if (process.env.NODE_ENV === 'production') {
    prismaLevels = new PrismaClient()
} else {
    if (!global.prismaLevels) {
        global.prismaLevels = new PrismaClient()
    }
    prismaLevels = global.prismaLevels
}

export default prismaLevels
