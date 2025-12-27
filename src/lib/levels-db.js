
import { PrismaClient } from '@prisma/client-levels'

const globalForPrisma = globalThis

export const prismaLevels = globalForPrisma.prismaLevels || new PrismaClient({
    datasources: {
        db: {
            url: process.env.LEVELS_DATABASE_URL,
        },
    },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaLevels = prismaLevels
