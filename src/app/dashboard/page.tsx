'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Zap, 
  Video, 
  CreditCard, 
  Settings, 
  LogOut,
  Plus,
  Play,
  Download,
  Trash2,
  Crown,
  Sparkles,
  User
} from 'lucide-react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('generator')
  const [videos, setVideos] = useState<any[]>([])
  const [credits, setCredits] = useState({ used: 0, limit: 3 })

  useEffect(() => {
    setVideos([
      { id: '1', title: 'วิดีโอตัวอย่าง', status: 'completed', createdAt: '2026-02-17' },
    ])
    setCredits({ used: 1, limit: 3 })
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-gray-500">กำลังโหลด...</div>
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
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">AI Shorts</span>
          </a>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
              <Zap className="w-4 h-4 text-[#2563eb]" />
              <span className="font-medium">{credits.limit - credits.used}</span>
              <span className="text-gray-500 text-sm">/ {credits.limit}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-gray-500 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition ${
                activeTab === tab.id 
                  ? 'bg-[#2563eb] text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'generator' && (
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-6">สร้างวิดีโอใหม่</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-2">ประเภทเนื้อหา</label>
                  <select className="input">
                    <option value="url">URL (บทความ/วิดีโอ)</option>
                    <option value="topic">หัวข้อ/คีย์เวิร์ด</option>
                    <option value="text">ข้อความ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-2">เนื้อหา</label>
                  <textarea 
                    className="input h-40 resize-none"
                    placeholder="ใส่ URL หรือหัวข้อ..."
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-2">แพลตฟอร์ม</label>
                  <div className="flex gap-3">
                    {['TikTok', 'YouTube', 'Instagram'].map((platform) => (
                      <button 
                        key={platform}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:border-[#2563eb] hover:text-[#2563eb] transition"
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl aspect-[9/16] flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Sparkles className="w-12 h-12 mx-auto mb-2" />
                  <p>Preview</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="btn btn-primary px-8 py-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                สร้างวิดีโอ
              </button>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-6">วิดีโอของฉัน</h2>

            {videos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                ยังไม่มีวิดีโอ สร้างวิดีโอแรกของคุณ!
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="bg-gray-50 rounded-xl overflow-hidden border">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <Play className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2 truncate">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{video.createdAt}</span>
                        <button className="text-[#2563eb] hover:underline">ดาวน์โหลด</button>
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
            <div className="card p-8">
              <h2 className="text-xl font-bold mb-6">เครดิต</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="text-gray-500 text-sm mb-2">คงเหลือ</div>
                  <div className="text-4xl font-bold text-[#2563eb]">{credits.limit - credits.used}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="text-gray-500 text-sm mb-2">ใช้ไป</div>
                  <div className="text-4xl font-bold text-gray-900">{credits.used}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="text-gray-500 text-sm mb-2">รวม</div>
                  <div className="text-4xl font-bold text-gray-900">{credits.limit}</div>
                </div>
              </div>

              <button className="btn btn-primary px-8 py-3">
                ซื้อเครดิตเพิ่ม
              </button>
            </div>

            <div className="card p-8">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                แพลน Premium
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Pro</h4>
                    <span className="text-2xl font-bold">฿499<span className="text-gray-500 text-sm">/เดือน</span></span>
                  </div>
                  <ul className="space-y-2 text-gray-600 text-sm mb-6">
                    <li>• 30 shorts/เดือน</li>
                    <li>• ไม่มี Watermark</li>
                    <li>• คุณภาพ 1080p</li>
                  </ul>
                  <button className="w-full btn btn-outline">อัพเกรด</button>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Business</h4>
                    <span className="text-2xl font-bold">฿1,499<span className="text-gray-500 text-sm">/เดือน</span></span>
                  </div>
                  <ul className="space-y-2 text-gray-600 text-sm mb-6">
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
