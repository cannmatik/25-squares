
import { PrismaClient } from '@prisma/client-levels'

const globalForPrisma = globalThis

export const prismaLevels = globalForPrisma.prismaLevels || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaLevels = prismaLevels
