import type { Metadata } from 'next'
import { Providers } from '@/components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Shorts Generator - สร้างวิดีโอสั้นด้วย AI',
  description: 'แปลงเนื้อหาเป็นวิดีโอสั้นน่าสนใจด้วย AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
