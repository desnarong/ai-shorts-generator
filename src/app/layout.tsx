import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Shorts Generator - Create Viral Shorts in Minutes',
  description: 'Transform your content into engaging short videos with AI. Generate scripts, voiceovers, and videos automatically.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className="antialiased">{children}</body>
    </html>
  )
}
