'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Zap, 
  Video, 
  CreditCard, 
  LogOut,
  Play,
  Download,
  Crown,
  Sparkles,
  User,
  Menu,
  X
} from 'lucide-react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('generator')
  const [videos, setVideos] = useState<any[]>([])
  const [credits, setCredits] = useState({ used: 0, limit: 3 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setVideos([
      { id: '1', title: 'วิดีโอตัวอย่าง', status: 'completed', createdAt: '2026-02-17' },
    ])
    setCredits({ used: 1, limit: 3 })
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen gradient-bg dot-pattern flex items-center justify-center">
        <div className="text-[#a1a1aa]">กำลังโหลด...</div>
      </div>
    )
  }

  if (!session) {
    router.push('/login')
    return null
  }

  const tabs = [
    { id: 'generator', label: 'สร้างวิดีโอ', icon: Sparkles },
    { id: 'videos', label: 'วิดีโอของฉัน', icon: Video },
    { id: 'credits', label: 'เครดิต', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen gradient-bg dot-pattern">
      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00cc6a] rounded-xl flex items-center justify-center animate-pulse-glow">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold">AI Shorts</span>
          </a>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#1f1f2a] rounded-xl border border-[#27272a]">
              <Zap className="w-4 h-4 text-[#6366f1]" />
              <span className="font-bold">{credits.limit - credits.used}</span>
              <span className="text-[#a1a1aa] text-sm">/ {credits.limit}</span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-[#a1a1aa] hover:text-white transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#18181f] border-t border-[#27272a] px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1f1f2a] rounded-lg">
                <Zap className="w-4 h-4 text-[#6366f1]" />
                <span className="font-bold">{credits.limit - credits.used}</span>
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-[#a1a1aa] hover:text-white"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white' 
                  : 'card text-[#a1a1aa] hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'generator' && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">สร้างวิดีโอใหม่</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-[#a1a1aa] text-sm mb-2">ประเภทเนื้อหา</label>
                  <select className="input">
                    <option value="url">URL (บทความ/วิดีโอ)</option>
                    <option value="topic">หัวข้อ/คีย์เวิร์ด</option>
                    <option value="text">ข้อความ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a1a1aa] text-sm mb-2">เนื้อหา</label>
                  <textarea 
                    className="input h-40 resize-none"
                    placeholder="ใส่ URL หรือหัวข้อ..."
                  />
                </div>

                <div>
                  <label className="block text-[#a1a1aa] text-sm mb-2">แพลตฟอร์ม</label>
                  <div className="flex gap-3">
                    {['TikTok', 'YouTube', 'Instagram'].map((platform) => (
                      <button 
                        key={platform}
                        className="px-4 py-2 rounded-xl border border-[#27272a] text-[#a1a1aa] hover:border-[#6366f1] hover:text-[#6366f1] transition"
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#18181f] rounded-2xl aspect-[9/16] flex items-center justify-center border border-[#27272a]">
                <div className="text-center text-[#a1a1aa]">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Preview</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="btn btn-primary px-8 py-4">
                <Sparkles className="w-5 h-5 mr-2" />
                สร้างวิดีโอ
              </button>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="card p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">วิดีโอของฉัน</h2>

            {videos.length === 0 ? (
              <div className="text-center py-12 text-[#a1a1aa]">
                ยังไม่มีวิดีโอ สร้างวิดีโอแรกของคุณ!
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="bg-[#18181f] rounded-xl overflow-hidden border border-[#27272a] hover:border-[#6366f1] transition group">
                    <div className="aspect-video bg-[#0f0f14] flex items-center justify-center">
                      <Play className="w-12 h-12 text-[#a1a1aa] group-hover:text-[#6366f1] transition" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2 truncate">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm text-[#a1a1aa]">
                        <span>{video.createdAt}</span>
                        <button className="text-[#6366f1] hover:underline">ดาวน์โหลด</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'credits' && (
          <div className="space-y-6">
            <div className="card p-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">เครดิต</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#18181f] rounded-xl p-6 text-center border border-[#27272a]">
                  <div className="text-[#a1a1aa] text-sm mb-2">คงเหลือ</div>
                  <div className="text-5xl font-bold gradient-text">{credits.limit - credits.used}</div>
                </div>
                <div className="bg-[#18181f] rounded-xl p-6 text-center border border-[#27272a]">
                  <div className="text-[#a1a1aa] text-sm mb-2">ใช้ไป</div>
                  <div className="text-5xl font-bold">{credits.used}</div>
                </div>
                <div className="bg-[#18181f] rounded-xl p-6 text-center border border-[#27272a]">
                  <div className="text-[#a1a1aa] text-sm mb-2">รวม</div>
                  <div className="text-5xl font-bold">{credits.limit}</div>
                </div>
              </div>

              <button className="btn btn-primary px-8 py-4">
                ซื้อเครดิตเพิ่ม
              </button>
            </div>

            <div className="card p-8 animate-fade-in animate-delay-1">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                แพลน Premium
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#18181f] rounded-xl p-6 border border-[#27272a] hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Pro</h4>
                    <span className="text-2xl font-bold">฿499<span className="text-[#a1a1aa] text-sm">/เดือน</span></span>
                  </div>
                  <ul className="space-y-2 text-[#a1a1aa] text-sm mb-6">
                    <li>• 30 shorts/เดือน</li>
                    <li>• ไม่มี Watermark</li>
                    <li>• คุณภาพ 1080p</li>
                  </ul>
                  <button className="w-full btn btn-outline">อัพเกรด</button>
                </div>

                <div className="bg-[#18181f] rounded-xl p-6 border border-[#6366f1] gradient-border hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Business</h4>
                    <span className="text-2xl font-bold">฿1,499<span className="text-[#a1a1aa] text-sm">/เดือน</span></span>
                  </div>
                  <ul className="space-y-2 text-[#a1a1aa] text-sm mb-6">
                    <li>• ไม่จำกัด</li>
                    <li>• คุณภาพ 4K</li>
                    <li>• API Access</li>
                  </ul>
                  <button className="w-full btn btn-primary">อัพเกรด</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
