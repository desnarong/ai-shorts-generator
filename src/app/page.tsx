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
  Send
} from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: Wand2,
      title: 'AI Script Generation',
      description: 'ใส่ URL หรือ Topic แล้ว AI จะสร้าง Script ให้อัตโนมัติ'
    },
    {
      icon: Mic,
      title: 'AI Voiceover',
      description: 'เลือกเสียงพากย์ได้หลายภาษา รวมถึงภาษาไทย'
    },
    {
      icon: Video,
      title: 'AI Video Generation',
      description: 'สร้างวิดีโอสวยๆ พร้อม Subtitle อัตโนมัติ'
    },
    {
      icon: Download,
      title: 'Export ทุก Platform',
      description: 'รองรับ TikTok, YouTube Shorts, Instagram Reels'
    }
  ]

  const pricingPlans = [
    {
      name: 'ฟรี',
      price: '0',
      description: 'ลองใช้งาน',
      features: [
        '3 shorts/เดือน',
        'มี Watermark',
        'ความละเอียด 720p',
        'เสียงพื้นฐาน'
      ],
      cta: 'เริ่มฟรี',
      popular: false
    },
    {
      name: 'Pro',
      price: '499',
      description: 'สำหรับครีเอเตอร์',
      features: [
        '30 shorts/เดือน',
        'ไม่มี Watermark',
        'ความละเอียด 1080p HD',
        'เสียง VIP 10+',
        'ลิขสิทธิ์ใช้งาน',
        'Support priority'
      ],
      cta: 'สมัคร Pro',
      popular: true
    },
    {
      name: 'Business',
      price: '1,499',
      description: 'สำหรับทีม',
      features: [
        'Unlimited shorts',
        'ความละเอียด 4K',
        'เสียง Custom',
        'API Access',
        'Team management',
        'Dedicated support'
      ],
      cta: 'สมัคร Business',
      popular: false
    }
  ]

  const testimonials = [
    {
      name: 'สมชาย วงศ์สกุล',
      role: 'Content Creator',
      avatar: 'ส',
      content: 'ใช้ AI Shorts Generator แล้วทำวิดีโอเร็วขึ้น 10 เท่า! ตอนนี้มีเวลาทำคอนเทนต์มากขึ้น',
      rating: 5
    },
    {
      name: 'พิมพ์ชนก สุขสันติ',
      role: 'Digital Marketer',
      avatar: 'พ',
      content: 'ลูกค้าติดใจมาก วิดีโอสวย คุณภาพดี ขายได้ง่าย',
      rating: 5
    },
    {
      name: 'ธนกฤต มหาวงศ์',
      role: 'Small Business Owner',
      avatar: 'ธ',
      content: 'ธุรกิจเล็กๆ อย่างเราไม่มีทีมวิดีโอ ตอนนี้ทำเองได้เลย ประหยัดเงินไปเยอะ',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-[#050507] bg-pattern noise-overlay">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">AI Shorts</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">ฟีเจอร์</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">ราคา</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition">รีวิว</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-gray-300 hover:text-white transition">เข้าสู่ระบบ</button>
              <button className="gradient-bg px-5 py-2 rounded-lg font-medium hover:opacity-90 transition">
                เริ่มใช้ฟรี
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-300 hover:text-white">ฟีเจอร์</a>
              <a href="#pricing" className="block text-gray-300 hover:text-white">ราคา</a>
              <a href="#testimonials" className="block text-gray-300 hover:text-white">รีวิว</a>
              <button className="w-full gradient-bg px-5 py-2 rounded-lg font-medium">
                เริ่มใช้ฟรี
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">สร้างวิดีโอสั้นใน 3 นาที</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">AI Shorts</span> Generator
              <br />
              <span className="text-white">สร้างวิดีโอ viral ในไม่กี่คลิก</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              แปลงบทความ, URL หรือไอเดียของคุณให้เป็นวิดีโอสั้นสวยๆ 
              พร้อมเสียงพากย์อัตโนมัติ เหมาะสำหรับ TikTok, YouTube Shorts และ Instagram Reels
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="gradient-bg px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center gap-2 glow">
                <Play className="w-5 h-5" />
                ลองใช้ฟรี
              </button>
              <button className="px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/10 transition flex items-center gap-2">
                <Video className="w-5 h-5" />
                ดูตัวอย่าง
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10,000+ ผู้ใช้งาน</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />
            <div className="glass rounded-2xl p-2 glow max-w-3xl mx-auto">
              <div className="bg-black rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-20 h-20 text-white/50 mx-auto mb-4" />
                  <p className="text-gray-500">Preview วิดีโอที่สร้าง</p>
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
            <h2 className="font-display text-4xl font-bold mb-4">
              ฟีเจอร์ <span className="gradient-text">ครบวงจร</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              ทุกอย่างที่คุณต้องการเพื่อสร้างวิดีโอสั้นคุณภาพสูง
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass rounded-2xl p-6 hover:border-primary/50 transition group"
              >
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              ขั้นตอน <span className="gradient-text">ง่ายๆ</span>
            </h2>
            <p className="text-gray-400 text-lg">ใช้งานได้ใน 3 ขั้นตอน</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'ใส่เนื้อหา', desc: 'วาง URL, บทความ หรือเขียน Script' },
              { step: '2', title: 'AI สร้างวิดีโอ', desc: 'AI จะสร้าง Script, เสียง และวิดีโอ' },
              { step: '3', title: 'ดาวน์โหลด', desc: 'Export ไปใช้งานได้เลย' }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="glass rounded-2xl p-8 text-center">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-600 w-8 h-8" />
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
            <h2 className="font-display text-4xl font-bold mb-4">
              เลือก <span className="gradient-text">แพ็กเกจ</span>
            </h2>
            <p className="text-gray-400 text-lg">เริ่มต้นฟรี ไม่ต้องใส่บัตรเครดิต</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`glass rounded-2xl p-8 relative ${
                  plan.popular ? 'border-primary glow' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg px-4 py-1 rounded-full text-sm font-medium">
                    แนะนำ
                  </div>
                )}
                
                <h3 className="font-semibold text-xl mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400"> บาท/เดือน</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    plan.popular 
                      ? 'gradient-bg hover:opacity-90' 
                      : 'border border-white/20 hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              ความ <span className="gradient-text">พอใจ</span> ของผู้ใช้
            </h2>
            <p className="text-gray-400 text-lg">เสียงตอบรับจากผู้ใช้งานจริง</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold mb-4">
              พร้อมสร้างวิดีโอแล้วหรือยัง?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              เริ่มใช้งานฟรีวันนี้ ไม่ต้องใส่บัตรเครดิต
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="อีเมลของคุณ"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition"
              />
              <button className="gradient-bg px-8 py-3 rounded-lg font-medium hover:opacity-90 transition whitespace-nowrap">
                เริ่มฟรี
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-8">
            <span className="gradient-text">ติดต่อเรา</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:desanrong.sm@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass hover:border-primary/50 transition"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span>desanrong.sm@gmail.com</span>
            </a>
            <a 
              href="https://discord.gg/dekcomzat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass hover:border-primary/50 transition"
            >
              <Send className="w-5 h-5 text-[#5865F2]" />
              <span>dekcomzat</span>
            </a>
            <a 
              href="https://line.me/R/ti/p/@dekcomzat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass hover:border-primary/50 transition"
            >
              <span className="text-[#06B518] font-bold">LINE</span>
              <span>dekcomzat</span>
            </a>
            <a 
              href="https://t.me/desnarong"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass hover:border-primary/50 transition"
            >
              <span className="text-[#26A5E4] font-bold">Telegram</span>
              <span>@desnarong</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold gradient-text">AI Shorts</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="hover:text-white transition">ข้อกำหนดการใช้งาน</a>
              <a href="#contact" className="hover:text-white transition">ติดต่อเรา</a>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-500 text-sm">
            © 2026 AI Shorts Generator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
