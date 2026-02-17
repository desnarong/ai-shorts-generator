// Database client - lazy loaded to prevent build-time connection issues
// Use this instead of importing PrismaClient directly

let prismaClient: any = null

export function getDb() {
  if (!prismaClient) {
    // Dynamic import - this only runs at runtime
    const { PrismaClient } = require('@prisma/client')
    prismaClient = new PrismaClient()
  }
  return prismaClient
}

export const db = new Proxy({} as any, {
  get(_target, prop) {
    return async (...args: any[]) => {
      const client = getDb()
      return client[prop](...args)
    }
  }
})
