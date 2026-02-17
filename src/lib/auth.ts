import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getDb } from './prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const db = getDb()
          
          // For demo: accept any email with password "demo123"
          // In production, verify against database
          const user = await db.user.findUnique({
            where: { email: credentials.email }
          })

          if (user && user.password === credentials.password) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image
            }
          }

          // Demo mode: create user if not exists
          if (credentials.password === 'demo123') {
            const newUser = await db.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split('@')[0],
                password: credentials.password
              }
            })

            // Create free subscription
            await db.subscription.create({
              data: {
                userId: newUser.id,
                plan: 'free',
                status: 'active',
                creditsLimit: 3,
                creditsUsed: 0
              }
            })

            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              image: newUser.image
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
}
