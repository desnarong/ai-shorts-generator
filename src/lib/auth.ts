import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Demo Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Demo mode: accept any email with password "demo123"
        if (credentials?.password === 'demo123') {
          return {
            id: '1',
            email: credentials.email || 'demo@example.com',
            name: 'Demo User',
          }
        }
        
        // Also accept the hardcoded demo account
        if (credentials?.email === 'demo@ais horts.com' && credentials?.password === 'demo123') {
          return {
            id: '1',
            email: 'demo@ais horts.com',
            name: 'Demo User',
          }
        }

        return null
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
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-change-in-production',
}
