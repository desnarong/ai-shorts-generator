import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/lib/ai/script'
import { generateVoiceover } from '@/lib/ai/voiceover'
import { generateVideo } from '@/lib/ai/video'

export const dynamic = 'force-dynamic'

// Debug: Log environment variables
console.log('=== ENV DEBUG ===')
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'SET (length: ' + process.env.OPENAI_API_KEY.length + ')' : 'NOT SET')
console.log('ELEVENLABS_API_KEY:', process.env.ELEVENLABS_API_KEY ? 'SET (length: ' + process.env.ELEVENLABS_API_KEY.length + ')' : 'NOT SET')
console.log('REPLICATE_API_TOKEN:', process.env.REPLICATE_API_TOKEN ? 'SET (length: ' + process.env.REPLICATE_API_TOKEN.length + ')' : 'NOT SET')
console.log('==================')

// Plan features
const PLAN_FEATURES = {
  free: {
    maxCredits: 3,
    watermark: true,
    maxQuality: '720p',
    voices: ['thai_female', 'thai_male'],
    maxVideosPerMonth: 3
  },
  starter: {
    maxCredits: 10,
    watermark: false,
    maxQuality: '720p',
    voices: ['thai_female', 'thai_male', 'rachel', 'josh', 'emma'],
    maxVideosPerMonth: 10
  },
  pro: {
    maxCredits: 30,
    watermark: false,
    maxQuality: '1080p',
    voices: ['thai_female', 'thai_male', 'rachel', 'josh', 'emma', 'david', 'crystal', 'aria', 'fin', 'domi'],
    maxVideosPerMonth: 30
  },
  business: {
    maxCredits: 999999,
    watermark: false,
    maxQuality: '4k',
    voices: ['thai_female', 'thai_male', 'rachel', 'josh', 'emma', 'david', 'crystal', 'aria', 'fin', 'domi'],
    maxVideosPerMonth: 999999
  }
}

// Mock user for demo (in production, get from database)
const getMockUser = (userId: string) => ({
  id: userId,
  email: 'demo@ais horts.com',
  name: 'Demo User',
  plan: 'free',
  credits: 3,
  creditsUsed: 0
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { 
      type,
      content, 
      voiceId,
      platform,
      userId = 'demo'
    } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Missing content' },
        { status: 400 }
      )
    }

    // Get user (mock for demo)
    const user = getMockUser(userId)
    const planFeatures = PLAN_FEATURES[user.plan as keyof typeof PLAN_FEATURES] || PLAN_FEATURES.free

    // Check credits
    const availableCredits = user.credits - user.creditsUsed
    if (availableCredits <= 0) {
      return NextResponse.json({
        error: 'ไม่มีเครดิตเพียงพอ',
        code: 'NO_CREDITS',
        required: 1,
        available: 0
      }, { status: 403 })
    }

    // Check voice limit
    if (voiceId && !planFeatures.voices.includes(voiceId)) {
      return NextResponse.json({
        error: 'เสียงนี้ไม่พร้อมใช้งานในแพลนของคุณ',
        code: 'VOICE_NOT_ALLOWED',
        availableVoices: planFeatures.voices
      }, { status: 403 })
    }

    // Determine video quality based on plan
    const videoQuality = platform === 'youtube' ? '1080p' : planFeatures.maxQuality

    // Step 1: Generate Script
    console.log('Generating script...')
    const scriptResult = type === 'url' || type === 'topic' 
      ? await generateScript({ content, type })
      : { title: 'AI Video', script: content, hashtags: [] as string[] }
    console.log('Script generated:', scriptResult.title)

    // Step 2: Generate Voiceover  
    console.log('Generating voiceover...')
    const voiceUrl = await generateVoiceover(scriptResult.script, voiceId || planFeatures.voices[0])
    console.log('Voice generated:', voiceUrl)

    // Step 3: Generate Video
    console.log('Generating video...')
    const video = await generateVideo({
      script: scriptResult.script,
      voiceUrl,
      platform: platform || 'tiktok'
    })
    console.log('Video generated:', video.url)

    return NextResponse.json({
      success: true,
      video: {
        title: scriptResult.title,
        script: scriptResult.script,
        hashtags: scriptResult.hashtags,
        voiceUrl,
        videoUrl: video.url,
        status: 'completed',
        quality: videoQuality,
        watermark: planFeatures.watermark,
        creditsUsed: 1,
        remainingCredits: availableCredits - 1
      }
    })
  } catch (error: any) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate video' },
      { status: 500 }
    )
  }
}
