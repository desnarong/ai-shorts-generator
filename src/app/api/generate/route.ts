import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/lib/ai/script'
import { generateVoiceover } from '@/lib/ai/voiceover'
import { generateVideo } from '@/lib/ai/video'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { 
      type,
      content, 
      voiceId,
      platform,
      userId 
    } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Missing content' },
        { status: 400 }
      )
    }

    // Step 1: Generate Script
    const scriptResult = type === 'url' || type === 'topic' 
      ? await generateScript({ content, type })
      : { title: 'AI Video', script: content, hashtags: [] as string[] }

    // Step 2: Generate Voiceover  
    const voiceUrl = await generateVoiceover(scriptResult.script, voiceId || 'default')

    // Step 3: Generate Video
    const video = await generateVideo({
      script: scriptResult.script,
      voiceUrl,
      platform: platform || 'tiktok'
    })

    return NextResponse.json({
      success: true,
      video: {
        title: scriptResult.title,
        script: scriptResult.script,
        hashtags: scriptResult.hashtags,
        voiceUrl,
        videoUrl: video.url,
        status: 'completed'
      }
    })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    )
  }
}
