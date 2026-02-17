'use client'

import { useState } from 'react'
import { Play, Check, ChevronRight, Video, Wand2, Download, Mail, Menu, X, Star, Zap } from 'lucide-react'

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
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="navbar fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">AI Shorts</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-[#2563eb]">ฟีเจอร์</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#2563eb]">ราคา</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-gray-600 hover:text-[#2563eb]">เข้าสู่ระบบ</a>
            <a href="/dashboard" className="btn btn-primary">เริ่มใช้งาน</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-600">ฟีเจอร์</a>
              <a href="#pricing" className="block text-gray-600">ราคา</a>
              <a href="/login" className="block text-gray-600">เข้าสู่ระบบ</a>
              <a href="/dashboard" className="block btn btn-primary text-center">เริ่มใช้งาน</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            สร้างวิดีโอสั้น<br />
            <span className="text-[#2563eb]">ด้วย AI ในไม่กี่คลิก</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            แค่ใส่ URL หรือหัวข้อ AI จะสร้างสคริปต์ เสียง และวิดีโอให้อัตโนมัติ
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/dashboard" className="btn btn-primary px-8 py-3">
              เริ่มฟรี
            </a>
            <button className="btn btn-outline px-8 py-3">
              <Play className="w-4 h-4 mr-2" />
              ดูตัวอย่าง
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">ฟีเจอร์</h2>
          <p className="text-gray-600 text-center mb-12">เครื่องมือครบวงจรสำหรับครีเอเตอร์</p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-[#2563eb]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">เลือกแพลน</h2>
          <p className="text-gray-600 text-center mb-12">เริ่มต้นฟรี ไม่ต้องใส่บัตรเครดิต</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`card p-8 ${plan.popular ? 'border-[#2563eb] ring-2 ring-[#2563eb] ring-opacity-20' : ''}`}>
                {plan.popular && (
                  <div className="bg-[#2563eb] text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                    Popular
                  </div>
                )}
                <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">฿{plan.price}</span>
                  <span className="text-gray-500">/เดือน</span>
                </div>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center card p-12">
          <h2 className="text-2xl font-bold mb-4">พร้อมแล้วหรือยัง?</h2>
          <p className="text-gray-600 mb-8">เริ่มใช้งานฟรีวันนี้</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <button className="btn btn-primary whitespace-nowrap">
              เริ่มเลย
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#2563eb] rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">AI Shorts</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-gray-900">ข้อกำหนดการใช้งาน</a>
            <a href="mailto:desanrong.sm@gmail.com" className="hover:text-gray-900">ติดต่อ</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
