'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Zap, Video, CreditCard, LogOut,
  Play, Download, Crown,
  Sparkles, User, Menu, X, RefreshCw,
  Copy, Check, Hash, Volume2
} from 'lucide-react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('generator')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [lastResult, setLastResult] = useState<any>(null)
  
  const [contentType, setContentType] = useState('url')
  const [content, setContent] = useState('')
  const [platform, setPlatform] = useState('tiktok')
  const [voice, setVoice] = useState('thai_female')

  const [videos, setVideos] = useState<any[]>([])
  const [credits, setCredits] = useState({ used: 1, limit: 3 })
  const [copied, setCopied] = useState(false)

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-main grid-pattern flex items-center justify-center">
        <div className="text-zinc-400">กำลังโหลด...</div>
      </div>
    )
  }

  if (!session) {
    router.push('/login')
    return null
  }

  const handleGenerate = async () => {
    if (!content.trim()) return
    setGenerating(true)
    setLastResult(null)
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: contentType,
          content,
          platform,
          voiceId: voice,
          userId: 'demo'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setLastResult(data.video)
        setVideos(prev => [{
          id: String(Date.now()),
          title: data.video.title || 'วิดีโอใหม่',
          status: 'completed',
          createdAt: new Date().toISOString().split('T')[0],
          thumbnail: null,
          duration: '0:30'
        }, ...prev])
        setContent('')
      }
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = [
    { id: 'generator', label: 'สร้างวิดีโอ', icon: Sparkles },
    { id: 'videos', label: 'วิดีโอ', icon: Video },
    { id: 'credits', label: 'เครดิต', icon: CreditCard },
  ]

  const voices = [
    { id: 'thai_female', name: 'น้องแนน (ไทย)' },
    { id: 'thai_male', name: 'พี่โจ้ (ไทย)' },
    { id: 'rachel', name: 'Rachel (English)' },
    { id: 'josh', name: 'Josh (English)' },
  ]

  return (
    <div className="min-h-screen bg-main grid-pattern">
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">AI Shorts</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-xl border border-zinc-700">
              <Zap className="w-4 h-4 text-[#22c55e]" />
              <span className="font-bold">{credits.limit - credits.used}</span>
              <span className="text-zinc-500 text-sm">/ {credits.limit}</span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-zinc-400 hover:text-white transition">
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-lg">
                <Zap className="w-4 h-4 text-[#22c55e]" />
                <span className="font-bold">{credits.limit - credits.used}</span>
              </div>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-zinc-400">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white' 
                  : 'card text-zinc-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'generator' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#22c55e]" />
                สร้างวิดีโอใหม่
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">ประเภทเนื้อหา</label>
                  <select 
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="input-field"
                  >
                    <option value="url">URL (บทความ/วิดีโอ)</option>
                    <option value="topic">หัวข้อ/คีย์เวิร์ด</option>
                    <option value="text">ข้อความ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    {contentType === 'url' ? 'URL' : contentType === 'topic' ? 'หัวข้อ' : 'ข้อความ'}
                  </label>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input-field h-32 resize-none"
                    placeholder={
                      contentType === 'url' ? 'https://...' : 
                      contentType === 'topic' ? 'เช่น: วิธีทำอาหารไทย' : 
                      'ใส่เนื้อหาที่ต้องการ...'
                    }
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2">แพลตฟอร์ม</label>
                  <div className="flex gap-3">
                    {['tiktok', 'youtube', 'instagram'].map((p) => (
                      <button 
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`px-4 py-2 rounded-xl border transition ${
                          platform === p 
                            ? 'border-[#22c55e] text-[#22c55e] bg-[#22c55e]/10' 
                            : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                        }`}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2">เสียง</label>
                  <select 
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                    className="input-field"
                  >
                    {voices.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={generating || !content.trim()}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      กำลังสร้าง...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      สร้างวิดีโอ
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-lg font-semibold mb-4">ผลลัพธ์</h3>
              
              {lastResult ? (
                <div className="space-y-4">
                  {/* Video Preview */}
                  <div className="bg-black rounded-2xl aspect-[9/16] flex items-center justify-center border border-zinc-800">
                    <video 
                      src={lastResult.videoUrl} 
                      className="w-full h-full object-cover rounded-2xl"
                      controls
                      poster=""
                    />
                  </div>

                  {/* Script */}
                  <div className="bg-zinc-900 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-zinc-400 flex items-center gap-2">
                        <Volume2 className="w-4 h-4" /> Script
                      </span>
                      <button 
                        onClick={() => copyToClipboard(lastResult.script)}
                        className="text-zinc-500 hover:text-white transition"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{lastResult.script}</p>
                  </div>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-2">
                    {lastResult.hashtags?.map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Audio */}
                  {lastResult.voiceUrl && (
                    <div className="bg-zinc-900 rounded-xl p-4">
                      <span className="text-sm text-zinc-400 flex items-center gap-2 mb-2">
                        <Volume2 className="w-4 h-4" /> เสียง
                      </span>
                      <audio src={lastResult.voiceUrl} controls className="w-full" />
                    </div>
                  )}
                </div>
              ) : generating ? (
                <div className="bg-black rounded-2xl aspect-[9/16] flex items-center justify-center border border-zinc-800">
                  <div className="text-center">
                    <RefreshCw className="w-12 h-12 text-[#22c55e] animate-spin mx-auto mb-4" />
                    <p className="text-zinc-500">กำลังสร้างวิดีโอ...</p>
                    <p className="text-zinc-600 text-sm mt-2">ใช้เวลาประมาณ 2-3 นาที</p>
                  </div>
                </div>
              ) : (
                <div className="bg-black rounded-2xl aspect-[9/16] flex items-center justify-center border border-zinc-800">
                  <div className="text-center text-zinc-500">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>ใส่เนื้อหาแล้วกดสร้างวิดีโอ</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">วิดีโอของฉัน</h2>

            {videos.length === 0 ? (
              <div className="text-center py-16 text-zinc-500">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>ยังไม่มีวิดีโอ</p>
                <p className="text-sm mt-2">ไปสร้างวิดีโอแรกของคุณ!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#22c55e] transition group">
                    <div className="aspect-video bg-black flex items-center justify-center relative">
                      <Play className="w-12 h-12 text-zinc-600 group-hover:text-[#22c55e] transition" />
                      <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs">
                        {video.duration}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2 truncate">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">{video.createdAt}</span>
                        <button className="text-[#22c55e] hover:underline flex items-center gap-1">
                          <Download className="w-4 h-4" /> ดาวน์โหลด
                        </button>
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
              <h2 className="text-2xl font-bold mb-6">เครดิตของฉัน</h2>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-900 rounded-xl p-6 text-center border border-zinc-800">
                  <div className="text-zinc-500 text-sm mb-2">คงเหลือ</div>
                  <div className="text-5xl font-bold text-[#22c55e]">{credits.limit - credits.used}</div>
                </div>
                <div className="bg-zinc-900 rounded-xl p-6 text-center border border-zinc-800">
                  <div className="text-zinc-500 text-sm mb-2">ใช้ไป</div>
                  <div className="text-5xl font-bold">{credits.used}</div>
                </div>
                <div className="bg-zinc-900 rounded-xl p-6 text-center border border-zinc-800">
                  <div className="text-zinc-500 text-sm mb-2">รวม</div>
                  <div className="text-5xl font-bold">{credits.limit}</div>
                </div>
              </div>

              <button className="btn-primary px-8 py-4">
                ซื้อเครดิตเพิ่ม
              </button>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                แพลน Premium
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Starter</h4>
                    <span className="text-2xl font-bold">฿199<span className="text-zinc-500 text-sm">/เดือน</span></span>
                  </div>
                  <ul className="space-y-2 text-zinc-400 text-sm mb-6">
                    <li>• 10 shorts/เดือน</li>
                    <li>• ไม่มี Watermark</li>
                    <li>• คุณภาพ 720p</li>
                    <li>• เสียง 5 แบบ</li>
                  </ul>
                  <button className="w-full btn-outline py-3">อัพเกรด</button>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6 border border-[#22c55e]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Pro</h4>
                    <span className="text-2xl font-bold">฿499<span className="text-zinc-500 text-sm">/เดือน</span></span>
                  </div>
                  <ul className="space-y-2 text-zinc-400 text-sm mb-6">
                    <li>• 30 shorts/เดือน</li>
                    <li>• ไม่มี Watermark</li>
                    <li>• คุณภาพ 1080p</li>
                    <li>• เสียง VIP 10+</li>
                  </ul>
                  <button className="w-full btn-primary py-3">อัพเกรด</button>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Business</h4>
                    <span className="text-2xl font-bold">฿1,499<span className="text-zinc-500 text-sm">/เดือน</span></span>
                  </div>
                  <ul className="space-y-2 text-zinc-400 text-sm mb-6">
                    <li>• ไม่จำกัด</li>
                    <li>• คุณภาพ 4K</li>
                    <li>• API Access</li>
                    <li>• Support 24/7</li>
                  </ul>
                  <button className="w-full btn-outline py-3">อัพเกรด</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
