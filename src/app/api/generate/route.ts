import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/lib/ai/script'
import { generateVoiceover } from '@/lib/ai/voiceover'
import { generateVideo } from '@/lib/ai/video'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const debugLogs: string[] = []
  
  // Debug: Log environment variables
  debugLogs.push(`ENV: OPENAI_API_KEY=${process.env.OPENAI_API_KEY ? 'SET('+process.env.OPENAI_API_KEY.length+')' : 'NOT SET'}`)
  debugLogs.push(`ENV: ELEVENLABS_API_KEY=${process.env.ELEVENLABS_API_KEY ? 'SET('+process.env.ELEVENLABS_API_KEY.length+')' : 'NOT SET'}`)
  debugLogs.push(`ENV: REPLICATE_API_TOKEN=${process.env.REPLICATE_API_TOKEN ? 'SET('+process.env.REPLICATE_API_TOKEN.length+')' : 'NOT SET'}`)

  // Plan features
  const PLAN_FEATURES = {
    free: { maxCredits: 3, watermark: true, maxQuality: '720p', voices: ['thai_female', 'thai_male'] },
    starter: { maxCredits: 10, watermark: false, maxQuality: '720p', voices: ['thai_female', 'thai_male', 'rachel', 'josh', 'emma'] },
    pro: { maxCredits: 30, watermark: false, maxQuality: '1080p', voices: ['thai_female', 'thai_male', 'rachel', 'josh', 'emma', 'david', 'crystal', 'aria', 'fin', 'domi'] },
    business: { maxCredits: 999999, watermark: false, maxQuality: '4k', voices: ['thai_female', 'thai_male', 'rachel', 'josh', 'emma', 'david', 'crystal', 'aria', 'fin', 'domi'] }
  }

  const getMockUser = (userId: string) => ({ id: userId, email: 'demo@ai-shorts.com', name: 'Demo User', plan: 'free', credits: 3, creditsUsed: 0 })

  try {
    const body = await req.json()
    const { type, content, voiceId, platform, userId = 'demo' } = body

    if (!content) {
      return NextResponse.json({ error: 'Missing content' }, { status: 400 })
    }

    const user = getMockUser(userId)
    const planFeatures = PLAN_FEATURES[user.plan as keyof typeof PLAN_FEATURES] || PLAN_FEATURES.free

    const availableCredits = user.credits - user.creditsUsed
    if (availableCredits <= 0) {
      return NextResponse.json({ error: 'ไม่มีเครดิต', code: 'NO_CREDITS' }, { status: 403 })
    }

    if (voiceId && !planFeatures.voices.includes(voiceId)) {
      return NextResponse.json({ error: 'เสียงนี้ไม่พร้อมใช้', code: 'VOICE_NOT_ALLOWED' }, { status: 403 })
    }

    const videoQuality = platform === 'youtube' ? '1080p' : planFeatures.maxQuality

    // Step 1: Generate Script
    debugLogs.push('Step 1: Generating script...')
    const scriptResult = type === 'url' || type === 'topic' ? await generateScript({ content, type }) : { title: 'AI Video', script: content, hashtags: [] as string[] }
    debugLogs.push(`Script result: ${scriptResult.script.substring(0, 50)}...`)

    // Step 2: Generate Voiceover  
    debugLogs.push('Step 2: Generating voiceover...')
    const voiceUrl = await generateVoiceover(scriptResult.script, voiceId || planFeatures.voices[0])
    debugLogs.push(`Voice result: ${voiceUrl}`)

    // Step 3: Generate Video
    debugLogs.push('Step 3: Generating video...')
    const video = await generateVideo({ script: scriptResult.script, voiceUrl, platform: platform || 'tiktok' })
    debugLogs.push(`Video result: ${video.url}`)

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
      },
      _debug: debugLogs
    })
  } catch (error: any) {
    debugLogs.push(`ERROR: ${error.message}`)
    return NextResponse.json({ error: error.message, _debug: debugLogs }, { status: 500 })
  }
}
