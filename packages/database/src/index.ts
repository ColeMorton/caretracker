export * from '@prisma/client'
export { PrismaClient, Prisma } from '@prisma/client'

// Re-export common types
export type { User, Profile, Visit, CarePlan, Budget } from '@prisma/client'

// Export transaction client type
import type { PrismaClient } from '@prisma/client'
export type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>