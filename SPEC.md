# AI Shorts Generator - Specification

## Project Overview
- **Project Name:** AI Shorts Generator
- **Type:** SaaS Web Application
- **Core Functionality:** สร้างวิดีโอ Shorts/Reels อัตโนมัติจาก Article, URL, หรือ Script
- **Target Users:** Content Creators, Social Media Managers, Marketers, SMEs

## Features

### Core Features
1. **Input Content** - รับข้อมูลจาก URL, Text, Article
2. **AI Script Generation** - สร้าง Script อัตโนมัติ
3. **AI Voiceover** - สร้างเสียงพากย์ (Text-to-Speech)
4. **AI Video Generation** - สร้างวิดีโอจาก Script
5. **Subtitle Generation** - ใส่ Subtitle อัตโนมัติ
6. **Export** - ดาวน์โหลดวิดีโอในรูปแบบต่างๆ

### Subscription Tiers
- **Free:** 3 shorts/month, watermark
- **Pro (499 บาท/เดือน):** 30 shorts/month, no watermark, HD
- **Business (1,499 บาท/เดือน):** Unlimited, 4K, priority

## Tech Stack
- Frontend: Next.js + TypeScript + Tailwind
- Backend: Next.js API Routes
- Database: Prisma (SQLite for dev)
- AI: OpenAI, ElevenLabs, Replicate
- Storage: Local/Cloud

## UI/UX
- Modern, dark theme with neon accents
- Step-by-step wizard for video creation
- Real-time preview
- Dashboard for managing videos
