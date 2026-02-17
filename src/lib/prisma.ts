import { PrismaClient } from '@prisma/client'

// Simple approach: create new instance each time
// In serverless, each invocation gets a fresh instance anyway
// At build time, DATABASE_URL should be available from Vercel env vars

export const db = new PrismaClient()
