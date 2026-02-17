'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Play, Check, Video, Wand2, Download, Zap, 
  Sparkles, ArrowRight, Menu, X, Star, Users,
  Twitter, Instagram, Youtube, Mail, ChevronRight,
  TrendingUp, Shield, Clock, HeadphonesIcon
} from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  const features = [
    { icon: Wand2, title: 'AI Script', desc: 'สร้างสคริปต์อัตโนมัติจาก URL หรือหัวข้อ' },
    { icon: Video, title: 'AI Video', desc: 'สร้างวิดีโอคุณภาพสูงพร้อม Subtitle' },
    { icon: Download, title: 'Export', desc: 'รองรับ TikTok, YouTube, Instagram' },
    { icon: Zap, title: 'Fast', desc: 'สร้างวิดีโอในไม่กี่นาที' },
  ]

  const steps = [
    { num: '01', title: 'ใส่ URL หรือหัวข้อ', desc: 'แค่วางลิงก์บทความหรือวิดีโอ' },
    { num: '02', title: 'AI สร้างวิดีโอ', desc: 'ระบบจะสร้างทุกอย่างอัตโนมัติ' },
    { num: '03', title: 'ดาวน์โหลด', desc: 'นำไปใช้ได้เลยบนทุกแพลตฟอร์ม' },
  ]

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      desc: 'ลองใช้ฟรี',
      features: ['3 shorts/เดือน', 'Watermark', '720p', 'เสียงพื้นฐาน'],
      popular: false,
    },
    {
      name: 'Starter',
      price: '199',
      desc: 'สำหรับเริ่มต้น',
      features: ['10 shorts/เดือน', 'ไม่มี Watermark', '720p HD', 'เสียง 5 แบบ'],
      popular: false,
    },
    {
      name: 'Pro',
      price: '499',
      desc: 'สำหรับครีเอเตอร์',
      features: ['30 shorts/เดือน', 'ไม่มี Watermark', '1080p HD', 'เสียง VIP 10+', 'Support'],
      popular: true,
    },
    {
      name: 'Business',
      price: '1,499',
      desc: 'สำหรับธุรกิจ',
      features: ['ไม่จำกัด', '4K Quality', 'API Access', 'Team', 'Dedicated Support'],
      popular: false,
    },
  ]

  const testimonials = [
    { name: 'สมชาย วงศ์', role: 'Content Creator', text: 'ใช้แล้ววิดีโอ viral ขึ้นเยอะมาก!', avatar: 'ส' },
    { name: 'พิมพ์ชนก', role: 'TikToker', text: 'ประหยัดเวลามาก สร้างวิดีโอได้เร็ว', avatar: 'พ' },
    { name: 'ธนกฤต', role: 'Marketing', text: 'เหมาะสำหรับทำ content หลายช่องทาง', avatar: 'ธ' },
  ]

  const stats = [
    { value: '50,000+', label: 'วิดีโอที่สร้าง' },
    { value: '10,000+', label: 'ผู้ใช้งาน' },
    { value: '4.9/5', label: 'คะแนนเฉลี่ย' },
  ]

  return (
    <div className="min-h-screen bg-main grid-pattern">
      {/* Navigation */}
      <nav className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">AI Shorts</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-zinc-400 hover:text-white transition">ฟีเจอร์</a>
              <a href="#how-it-works" className="text-zinc-400 hover:text-white transition">วิธีใช้</a>
              <a href="#pricing" className="text-zinc-400 hover:text-white transition">ราคา</a>
              <a href="#reviews" className="text-zinc-400 hover:text-white transition">รีวิว</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-zinc-400 hover:text-white transition font-medium">
                เข้าสู่ระบบ
              </Link>
              <Link href="/dashboard" className="btn-primary">
                เริ่มใช้งาน
              </Link>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-zinc-400">ฟีเจอร์</a>
              <a href="#how-it-works" className="block text-zinc-400">วิธีใช้</a>
              <a href="#pricing" className="block text-zinc-400">ราคา</a>
              <Link href="/login" className="block text-zinc-400">เข้าสู่ระบบ</Link>
              <Link href="/dashboard" className="block btn-primary text-center">เริ่มใช้งาน</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></span>
            <span className="text-sm text-zinc-400">สร้างวิดีโอ viral ในไม่กี่คลิก</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in delay-100">
            สร้างวิดีโอสั้น<br />
            <span className="text-[#22c55e] text-glow">ด้วย AI</span> ในไม่กี่วินาที
          </h1>
          
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto animate-fade-in delay-200">
            แค่ใส่ URL หรือหัวข้อ AI จะสร้างสคริปต์ เสียง และวิดีโอให้อัตโนมัติ
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
            <Link href="/dashboard" className="btn-primary px-8 py-4 text-lg">
              <Sparkles className="w-5 h-5" />
              เริ่มใช้ฟรี
            </Link>
            <button className="btn-outline px-8 py-4 text-lg">
              <Play className="w-5 h-5" />
              ดูตัวอย่าง
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-12 animate-fade-in delay-400">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-[#22c55e]">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-16 relative max-w-lg mx-auto animate-fade-in delay-400">
          <div className="card p-1 glow-green">
            <div className="bg-black rounded-2xl aspect-[9/16] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#22c55e]/10 to-transparent" />
              <div className="text-center z-10">
                <div className="w-20 h-20 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-[#22c55e] ml-1" />
                </div>
                <p className="text-zinc-500">AI Generating...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">ฟีเจอร์<span className="text-[#22c55e]"> ครบ</span></h2>
            <p className="text-zinc-400 text-lg">เครื่องมือที่ครีเอเตอร์ต้องการ</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-[#22c55e]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">ใช้งาน<span className="text-[#22c55e]"> ง่าย</span></h2>
            <p className="text-zinc-400 text-lg">3 ขั้นตอนง่ายๆ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="card p-8 text-center">
                  <div className="text-5xl font-bold text-[#22c55e]/20 mb-4">{step.num}</div>
                  <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-zinc-500">{step.desc}</p>
                </div>
                {i < 2 && (
                  <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-[#22c55e] w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">เลือก<span className="text-[#22c55e]"> แพลน</span></h2>
            <p className="text-zinc-400 text-lg">เริ่มต้นฟรี ไม่ต้องใส่บัตร</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`card p-8 ${plan.popular ? 'border-[#22c55e] relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22c55e] text-black text-xs font-bold px-4 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                <h3 className="font-bold text-2xl mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">฿{plan.price}</span>
                  <span className="text-zinc-500">/เดือน</span>
                </div>
                <p className="text-zinc-500 text-sm mb-6">{plan.desc}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#22c55e]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold transition ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                  {plan.price === '0' ? 'เริ่มฟรี' : 'อัพเกรด'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">รีวิว<span className="text-[#22c55e]"> จากผู้ใช้</span></h2>
            <p className="text-zinc-400">ความพึงพอใจของลูกค้าคือสิ่งที่เราภูมิใจ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-full flex items-center justify-center font-bold">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-zinc-500">{item.role}</div>
                  </div>
                </div>
                <p className="text-zinc-400">"{item.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center card p-12 glow-green">
          <h2 className="text-3xl font-bold mb-4">พร้อม<span className="text-[#22c55e]"> หรือยัง?</span></h2>
          <p className="text-zinc-400 mb-8">เริ่มใช้งานฟรีวันนี้ ไม่ต้องใส่บัตรเครดิต</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <button className="btn-primary whitespace-nowrap">
              เริ่มเลย <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">AI Shorts</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href="#" className="hover:text-white transition">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="hover:text-white transition">ข้อกำหนด</a>
              <a href="mailto:desanrong.sm@gmail.com" className="hover:text-white transition">ติดต่อ</a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-[#22c55e] hover:text-black transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-[#22c55e] hover:text-black transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-[#22c55e] hover:text-black transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-zinc-600 text-sm">
            © 2026 AI Shorts Generator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
