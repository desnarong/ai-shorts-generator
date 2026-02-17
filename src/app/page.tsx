'use client'

import { useState } from 'react'
import { Play, Check, Video, Wand2, Download, Menu, X, Zap, Sparkles, ArrowRight } from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  const features = [
    { icon: Wand2, title: 'AI Script', description: 'สร้างสคริปต์อัตโนมัติ' },
    { icon: Video, title: 'AI Video', description: 'สร้างวิดีโอคุณภาพสูง' },
    { icon: Download, title: 'Export', description: 'รองรับทุกแพลตฟอร์ม' },
  ]

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      description: 'สำหรับลองเล่น',
      features: ['3 shorts/เดือน', 'มี Watermark', '720p'],
      cta: 'เริ่มฟรี',
    },
    {
      name: 'Pro',
      price: '499',
      description: 'สำหรับครีเอเตอร์',
      features: ['30 shorts/เดือน', 'No Watermark', '1080p HD', 'เสียง VIP'],
      cta: 'อัพเกรด',
      popular: true,
    },
    {
      name: 'Business',
      price: '1,499',
      description: 'สำหรับธุรกิจ',
      features: ['ไม่จำกัด', '4K Quality', 'API Access', 'Support'],
      cta: 'ติดต่อเรา',
    },
  ]

  return (
    <div className="min-h-screen gradient-bg dot-pattern">
      {/* Navigation */}
      <nav className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-xl flex items-center justify-center animate-pulse-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">AI Shorts</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#a1a1aa] hover:text-white transition">ฟีเจอร์</a>
            <a href="#pricing" className="text-[#a1a1aa] hover:text-white transition">ราคา</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-[#a1a1aa] hover:text-white transition">เข้าสู่ระบบ</a>
            <a href="/dashboard" className="btn btn-primary">เริ่มใช้งาน</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#18181f] border-t border-[#27272a]">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-[#a1a1aa]">ฟีเจอร์</a>
              <a href="#pricing" className="block text-[#a1a1aa]">ราคา</a>
              <a href="/login" className="block text-[#a1a1aa]">เข้าสู่ระบบ</a>
              <a href="/dashboard" className="block btn btn-primary text-center">เริ่มใช้งาน</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-[#6366f1] rounded-full animate-pulse"></span>
            <span className="text-sm text-[#a1a1aa]">AI-Powered Video Generator</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in animate-delay-1">
            สร้างวิดีโอสั้น<br />
            <span className="gradient-text">ด้วย AI ในไม่กี่คลิก</span>
          </h1>
          
          <p className="text-xl text-[#a1a1aa] mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-2">
            แค่ใส่ URL หรือหัวข้อ AI จะสร้างสคริปต์ เสียง และวิดีโอให้อัตโนมัติ
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-3">
            <a href="/dashboard" className="btn btn-primary px-8 py-4 text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              เริ่มฟรี
            </a>
            <button className="btn btn-outline px-8 py-4 text-lg">
              <Play className="w-5 h-5 mr-2" />
              ดูตัวอย่าง
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 animate-fade-in">ฟีเจอร์</h2>
          <p className="text-[#a1a1aa] text-center mb-16 animate-fade-in animate-delay-1">เครื่องมือครบวงจรสำหรับครีเอเตอร์</p>

          <div className="grid md:grid gap-6-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`card p-8 text-center hover-lift animate-fade-in animate-delay-${index + 2}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-2xl flex items-center justify-center mx-auto mb-4 icon-hover">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-[#a1a1aa]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 animate-fade-in">เลือกแพลน</h2>
          <p className="text-[#a1a1aa] text-center mb-16 animate-fade-in animate-delay-1">เริ่มต้นฟรี ไม่ต้องใส่บัตรเครดิต</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`card p-8 ${plan.popular ? 'gradient-border' : ''} hover-lift`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    Popular
                  </div>
                )}
                <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold gradient-text">฿{plan.price}</span>
                  <span className="text-[#a1a1aa]">/เดือน</span>
                </div>
                <p className="text-[#a1a1aa] text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#10b981]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center card p-12 gradient-border glow animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">พร้อมแล้วหรือยัง?</h2>
          <p className="text-[#a1a1aa] mb-8">เริ่มใช้งานฟรีวันนี้</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <button className="btn btn-primary whitespace-nowrap">
              เริ่มเลย <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#27272a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">AI Shorts</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-[#a1a1aa]">
            <a href="#" className="hover:text-white transition">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-white transition">ข้อกำหนดการใช้งาน</a>
            <a href="mailto:desanrong.sm@gmail.com" className="hover:text-white transition">ติดต่อ</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
