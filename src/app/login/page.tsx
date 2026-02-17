'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Zap, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

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
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    const result = await signIn('credentials', {
      email: 'demo@ais horts.com',
      password: 'demo123',
      redirect: false
    })
    if (!result?.error) {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-xl">AI Shorts</span>
          </a>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          <h1 className="text-xl font-bold text-center mb-2">เข้าสู่ระบบ</h1>
          <p className="text-gray-500 text-center mb-6">เพื่อเข้าใช้งาน</p>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-600 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-2">อีเมล</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-11"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-2">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-11"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'กำลังโหลด...' : (
                <>
                  เข้าสู่ระบบ <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">หรือ</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full btn btn-outline py-3 disabled:opacity-50"
          >
            ลองใช้งาน Demo
          </button>
        </div>

        {/* Back */}
        <div className="text-center mt-6">
          <a href="/" className="text-gray-500 hover:text-[#2563eb] text-sm">
            ← กลับหน้าหลัก
          </a>
        </div>
      </div>
    </div>
  )
}
