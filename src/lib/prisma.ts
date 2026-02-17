import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prevent multiple instances in development
export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

function createPrismaClient() {
  // Create a new PrismaClient instance
  // The DATABASE_URL will be read from environment at runtime
  return new PrismaClient({
    datasources: process.env.DATABASE_URL 
      ? {
          db: {
            url: process.env.DATABASE_URL
          }
        }
      : undefined,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })
}

// Export a function to get the database client
// This can be called at runtime to ensure fresh connection
export function getDb() {
  return db
}
