'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Gamepad2, 
  Video, 
  CreditCard, 
  Settings, 
  LogOut,
  Plus,
  Zap,
  Users,
  Clock,
  CheckCircle,
  Play,
  Download,
  Trash2,
  Crown,
  Sparkles
} from 'lucide-react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('generator')
  const [videos, setVideos] = useState<any[]>([])
  const [credits, setCredits] = useState({ used: 0, limit: 3 })
  const [loading, setLoading] = useState(false)

  // Mock data
  useEffect(() => {
    setVideos([
      { id: '1', title: 'My First Shorts', status: 'completed', createdAt: '2026-02-17', thumbnail: null },
      { id: '2', title: 'Viral Content #2', status: 'processing', createdAt: '2026-02-17', thumbnail: null },
    ])
    setCredits({ used: 1, limit: 3 })
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-[#00ff88] neon-text">Loading...</div>
      </div>
    )
  }

  if (!session) {
    router.push('/login')
    return null
  }

  const tabs = [
    { id: 'generator', label: 'GENERATOR', icon: Sparkles },
    { id: 'videos', label: 'MY VIDEOS', icon: Video },
    { id: 'credits', label: 'CREDITS', icon: CreditCard },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] bg-grid">
      {/* Header */}
      <header className="border-b border-[#2a2a3e] bg-[#0a0a0f]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-gaming rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <span className="font-bold text-xl text-[#00ff88] neon-text tracking-wider">AI SHORTS</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Credits Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#12121a] rounded-lg border border-[#2a2a3e]">
              <Zap className="w-4 h-4 text-[#00ffff]" />
              <span className="text-[#00ffff] font-bold">{credits.limit - credits.used}</span>
              <span className="text-gray-500 text-sm">/ {credits.limit}</span>
            </div>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-gaming rounded-full flex items-center justify-center">
                <span className="text-black font-bold">
                  {session.user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-gray-400 hover:text-[#ff00aa] transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold uppercase tracking-wider text-sm whitespace-nowrap transition ${
                activeTab === tab.id 
                  ? 'gaming-btn' 
                  : 'gaming-card text-gray-400 hover:text-[#00ff88]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'generator' && (
          <div className="gaming-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#00ff88]" />
              Create New Video
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Input */}
              <div className="space-y-5">
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Content Type</label>
                  <select className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg focus:border-[#00ff88] focus:outline-none transition text-white">
                    <option value="url">URL (Article/Video)</option>
                    <option value="topic">Topic/Keyword</option>
                    <option value="text">Direct Text</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Content</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg focus:border-[#00ff88] focus:outline-none transition text-white h-40 resize-none"
                    placeholder="Paste URL or enter topic..."
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Platform</label>
                  <div className="flex gap-3">
                    {['TikTok', 'YouTube', 'Instagram'].map((platform) => (
                      <button 
                        key={platform}
                        className="px-4 py-2 rounded-lg border border-[#2a2a3e] text-gray-400 hover:border-[#00ff88] hover:text-[#00ff88] transition"
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-black rounded-xl aspect-[9/16] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#ff00aa] rounded-full text-xs font-bold">
                  TIKTOK
                </div>
                <div className="text-center p-8">
                  <Sparkles className="w-16 h-16 text-[#00ff88]/50 mx-auto mb-4" />
                  <p className="text-gray-500 uppercase tracking-wider">Preview</p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-8 flex justify-end">
              <button className="gaming-btn px-8 py-4 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Generate Video
              </button>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="gaming-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider flex items-center gap-2">
              <Video className="w-6 h-6 text-[#00ff88]" />
              My Videos
            </h2>

            {videos.length === 0 ? (
              <div className="text-center py-12">
                <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">No videos yet. Create your first one!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="bg-[#0a0a0f] rounded-xl overflow-hidden border border-[#2a2a3e] hover:border-[#00ff88] transition group">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-black flex items-center justify-center relative">
                      {video.status === 'processing' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-[#00ff88] text-sm uppercase tracking-wider">Processing</span>
                        </div>
                      ) : (
                        <>
                          <Play className="w-12 h-12 text-gray-600 group-hover:text-[#00ff88] transition" />
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs">
                            0:30
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2 truncate">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{video.createdAt}</span>
                        <div className="flex gap-2">
                          {video.status === 'completed' && (
                            <>
                              <button className="text-[#00ff88] hover:underline">Download</button>
                              <button className="text-[#ff00aa] hover:underline">Delete</button>
                            </>
                          )}
                        </div>
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
            {/* Credits Overview */}
            <div className="gaming-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-[#00ff88]" />
                Credits
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0a0a0f] rounded-xl p-6 border border-[#2a2a3e]">
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Available</div>
                  <div className="text-4xl font-bold text-[#00ff88] neon-text">{credits.limit - credits.used}</div>
                </div>
                <div className="bg-[#0a0a0f] rounded-xl p-6 border border-[#2a2a3e]">
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Used</div>
                  <div className="text-4xl font-bold text-[#ff00aa]">{credits.used}</div>
                </div>
                <div className="bg-[#0a0a0f] rounded-xl p-6 border border-[#2a2a3e]">
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total</div>
                  <div className="text-4xl font-bold text-[#00ffff]">{credits.limit}</div>
                </div>
              </div>

              <button className="gaming-btn px-8 py-4 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Buy More Credits
              </button>
            </div>

            {/* Plans */}
            <div className="gaming-card rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wider flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#ff00aa]" />
                Upgrade Plan
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0a0a0f] rounded-xl p-6 border border-[#2a2a3e] hover:border-[#00ff88] transition">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-xl text-white">PRO</h4>
                    <span className="text-2xl font-bold text-[#00ffff]">฿499<span className="text-gray-500 text-sm">/mo</span></span>
                  </div>
                  <ul className="space-y-2 text-gray-400 text-sm mb-6">
                    <li>• 30 shorts/month</li>
                    <li>• No Watermark</li>
                    <li>• 1080p Quality</li>
                    <li>• VIP Voices</li>
                  </ul>
                  <button className="w-full gaming-btn py-2 rounded-lg font-bold uppercase tracking-wider">
                    Upgrade
                  </button>
                </div>

                <div className="bg-[#0a0a0f] rounded-xl p-6 border border-[#ff00aa] relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-gaming px-4 py-1 rounded-full text-xs font-bold text-black">
                    BEST VALUE
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-xl text-white">STREAMER</h4>
                    <span className="text-2xl font-bold text-[#00ffff]">฿1,499<span className="text-gray-500 text-sm">/mo</span></span>
                  </div>
                  <ul className="space-y-2 text-gray-400 text-sm mb-6">
                    <li>• UNLIMITED shorts</li>
                    <li>• 4K Quality</li>
                    <li>• Custom Voice</li>
                    <li>• API Access</li>
                  </ul>
                  <button className="w-full gaming-btn py-2 rounded-lg font-bold uppercase tracking-wider">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="gaming-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#00ff88]" />
              Settings
            </h2>

            <div className="space-y-6 max-w-xl">
              <div>
                <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Email</label>
                <input 
                  type="email" 
                  value={session.user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg text-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm uppercase tracking-wider mb-2">Display Name</label>
                <input 
                  type="text" 
                  defaultValue={session.user?.name || ''}
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg focus:border-[#00ff88] focus:outline-none transition text-white"
                />
              </div>

              <button className="gaming-btn px-6 py-3 rounded-lg font-bold uppercase tracking-wider">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
