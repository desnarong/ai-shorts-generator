'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Gamepad2, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    const result = await signIn('credentials', {
      email: 'demo@ais shorts.com',
      password: 'demo123',
      redirect: false
    })
    if (!result?.error) {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] bg-grid bg-particles flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 gradient-gaming rounded-xl flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-black" />
            </div>
            <span className="font-bold text-2xl text-[#00ff88] neon-text tracking-wider">AI SHORTS</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="gaming-card rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2 uppercase tracking-wider">LOGIN</h1>
          <p className="text-gray-400 text-center mb-8">Sign in to continue</p>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 bg-[#ff00aa]/10 border border-[#ff00aa] rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 text-[#ff00aa]" />
              <span className="text-[#ff00aa] text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg focus:border-[#00ff88] focus:outline-none transition text-white"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg focus:border-[#00ff88] focus:outline-none transition text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gaming-btn py-3 rounded-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Loading...' : (
                <>
                  LOGIN <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a2a3e]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#12121a] text-gray-500 uppercase tracking-wider">Or</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full gaming-btn gaming-btn-pink py-3 rounded-lg font-bold uppercase tracking-wider disabled:opacity-50"
          >
            TRY DEMO
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-[#00ff88] hover:underline uppercase tracking-wider font-semibold">
            Sign Up
          </a>
        </p>

        {/* Back */}
        <div className="text-center mt-6">
          <a href="/" className="text-gray-500 hover:text-[#00ff88] transition text-sm uppercase tracking-wider">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
