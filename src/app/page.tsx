'use client'

import { useState } from 'react'
import { 
  Play, 
  Sparkles, 
  Zap, 
  CreditCard, 
  Check, 
  ChevronRight,
  Star,
  Users,
  Video,
  Wand2,
  Mic,
  Download,
  Menu,
  X,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  Send,
  Twitch,
  Gamepad2,
  Cpu,
  Layers,
  Rocket
} from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: Wand2,
      title: 'AI Script',
      description: 'สร้างสคริปต์อัตโนมัติจาก URL หรือหัวข้อ'
    },
    {
      icon: Mic,
      title: 'AI Voiceover',
      description: 'เสียงพากย์หลายภาษา รวมภาษาไทย'
    },
    {
      icon: Video,
      title: 'AI Video',
      description: 'สร้างวิดีโอคุณภาพสูงพร้อม Subtitle'
    },
    {
      icon: Download,
      title: 'Export',
      description: 'รองรับ TikTok, YouTube, Instagram'
    }
  ]

  const pricingPlans = [
    {
      name: 'FREE',
      price: '0',
      description: 'สำหรับลองเล่น',
      features: [
        '3 shorts/เดือน',
        'มี Watermark',
        '720p Quality',
        'เสียงพื้นฐาน'
      ],
      cta: 'START FREE',
      popular: false
    },
    {
      name: 'PRO',
      price: '499',
      description: 'สำหรับครีเอเตอร์',
      features: [
        '30 shorts/เดือน',
        'No Watermark',
        '1080p HD',
        'VIP Voices 10+',
        'Priority Support',
        'Commercial License'
      ],
      cta: 'GO PRO',
      popular: true
    },
    {
      name: 'STREAMER',
      price: '1,499',
      description: 'สำหรับ Pro Creator',
      features: [
        'UNLIMITED',
        '4K Quality',
        'Custom Voice',
        'API Access',
        'Team Features',
        'Dedicated Support'
      ],
      cta: 'GO STREAML',
      popular: false
    }
  ]

  const stats = [
    { label: 'TOTAL USERS', value: '10,000+' },
    { label: 'VIDEOS MADE', value: '50,000+' },
    { label: 'RATING', value: '4.9/5' }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] bg-grid bg-particles scanlines">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#2a2a3e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-gaming rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-black" />
              </div>
              <span className="font-bold text-xl text-[#00ff88] neon-text tracking-wider">AI SHORTS</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-400 hover:text-[#00ff88] transition uppercase tracking-wider text-sm font-semibold">Features</a>
              <a href="#pricing" className="text-gray-400 hover:text-[#00ff88] transition uppercase tracking-wider text-sm font-semibold">Pricing</a>
              <a href="#testimonials" className="text-gray-400 hover:text-[#00ff88] transition uppercase tracking-wider text-sm font-semibold">Reviews</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-gray-400 hover:text-[#00ff88] transition uppercase text-sm font-semibold tracking-wider">Login</button>
              <button className="gaming-btn px-5 py-2 rounded-lg font-bold tracking-wider text-sm">
                START NOW
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#12121a] border-t border-[#2a2a3e]">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-400 hover:text-[#00ff88] uppercase tracking-wider text-sm font-semibold">Features</a>
              <a href="#pricing" className="block text-gray-400 hover:text-[#00ff88] uppercase tracking-wider text-sm font-semibold">Pricing</a>
              <a href="#testimonials" className="block text-gray-400 hover:text-[#00ff88] uppercase tracking-wider text-sm font-semibold">Reviews</a>
              <button className="w-full gaming-btn px-5 py-2 rounded-lg font-bold tracking-wider text-sm">
                START NOW
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff00aa]/20 border border-[#ff00aa] mb-6">
              <span className="w-2 h-2 bg-[#ff00aa] rounded-full live-indicator"></span>
              <span className="text-[#ff00aa] text-sm font-bold tracking-wider uppercase">Live Generator</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              <span className="text-[#00ff88] neon-text">AI SHORTS</span>
              <br />
              <span className="text-white">GENERATOR</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              สร้างวิดีโอ viral ในไม่กี่คลิก 
              แค่ใส่ URL หรือหัวข้อ AI จะสร้างทุกอย่างให้
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="gaming-btn px-8 py-4 rounded-lg font-bold text-lg tracking-wider flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                START FREE
              </button>
              <button className="gaming-btn gaming-btn-pink px-8 py-4 rounded-lg font-bold text-lg tracking-wider flex items-center gap-2">
                <Play className="w-5 h-5" />
                WATCH DEMO
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex items-center justify-center gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-[#00ffff] neon-cyan">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />
            <div className="gaming-card rounded-2xl p-1 max-w-3xl mx-auto">
              <div className="bg-black rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00ff88]"></div>
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#00ff88]"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#00ff88]"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00ff88]"></div>
                
                <div className="text-center">
                  <Play className="w-20 h-20 text-[#00ff88]/50 mx-auto mb-4" />
                  <p className="text-gray-500 uppercase tracking-wider">Preview Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-[#00ff88] neon-text">FEATURES</span>
            </h2>
            <p className="text-gray-400 text-lg">เครื่องมือครบวงจรสำหรับ Content Creator</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="gaming-card rounded-2xl p-6 group"
              >
                <div className="w-14 h-14 gradient-gaming rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <feature.icon className="w-7 h-7 text-black" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white uppercase tracking-wider">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-[#12121a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-[#00ffff] neon-cyan">HOW IT WORKS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'INPUT', desc: 'ใส่ URL หรือหัวข้อ' },
              { step: '02', title: 'GENERATE', desc: 'AI สร้างวิดีโอให้' },
              { step: '03', title: 'EXPORT', desc: 'ดาวน์โหลดไปใช้ได้เลย' }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="gaming-card rounded-2xl p-8 text-center">
                  <div className="text-4xl font-bold text-[#00ff88] neon-text mb-4 font-pixel text-xs">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-white uppercase tracking-wider">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-[#00ff88] w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-[#ff00aa] neon-pink">CHOOSE YOUR PLAN</span>
            </h2>
            <p className="text-gray-400 text-lg">เริ่มต้นฟรี ไม่ต้องใส่บัตรเครดิต</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`gaming-card rounded-2xl p-8 relative ${plan.popular ? 'border-[#00ff88]' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-gaming px-4 py-1 rounded-full text-xs font-bold text-black uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <h3 className="font-bold text-xl mb-2 text-white uppercase tracking-wider">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#00ffff] neon-cyan">{plan.price}</span>
                  <span className="text-gray-400"> ฿/เดือน</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#00ff88]" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 rounded-lg font-bold uppercase tracking-wider transition ${plan.popular ? 'gaming-btn' : 'gaming-btn gaming-btn-pink'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto gaming-card rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 via-transparent to-[#ff00aa]/10" />
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">READY TO</span>
              <br />
              <span className="text-[#00ff88] neon-text">LEVEL UP?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              เริ่มใช้งานฟรีวันนี้
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-lg bg-[#0a0a0f] border border-[#2a2a3e] focus:border-[#00ff88] focus:outline-none transition text-center uppercase tracking-wider"
              />
              <button className="gaming-btn px-8 py-3 rounded-lg font-bold uppercase tracking-wider whitespace-nowrap">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 border-t border-[#2a2a3e]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            <span className="text-[#00ffff] neon-cyan">CONNECT</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:desanrong.sm@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-xl gaming-card hover:border-[#00ff88] transition"
            >
              <Mail className="w-5 h-5 text-[#00ff88]" />
              <span>Email</span>
            </a>
            <a 
              href="https://discord.gg/dekcomzat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl gaming-card hover:border-[#5865F2] transition"
            >
              <Send className="w-5 h-5 text-[#5865F2]" />
              <span>Discord</span>
            </a>
            <a 
              href="https://line.me/R/ti/p/@dekcomzat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl gaming-card hover:border-[#06B518] transition"
            >
              <span className="text-[#06B518] font-bold">LINE</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#2a2a3e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-gaming rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-[#00ff88] neon-text tracking-wider">AI SHORTS</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 uppercase tracking-wider">
              <a href="#" className="hover:text-[#00ff88] transition">Privacy</a>
              <a href="#" className="hover:text-[#00ff88] transition">Terms</a>
              <a href="#contact" className="hover:text-[#00ff88] transition">Contact</a>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-600 text-sm uppercase tracking-wider">
            © 2026 AI SHORTS GENERATOR. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  )
}
