import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/lib/ai/script'
import { generateVoiceover } from '@/lib/ai/voiceover'
import { generateVideo } from '@/lib/ai/video'
import { db } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { 
      type, // 'url' | 'text' | 'topic'
      content, 
      voiceId,
      platform,
      userId 
    } = body

    // Validate input
    if (!content || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check user credits
    const subscription = await db.subscription.findFirst({
      where: { userId, status: 'active' }
    })

    if (!subscription || subscription.creditsUsed >= subscription.creditsLimit) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 }
      )
    }

    // Step 1: Generate Script
    let script = content
    if (type === 'url' || type === 'topic') {
      script = await generateScript(content, type)
    }

    // Step 2: Generate Voiceover
    const voiceUrl = await generateVoiceover(script, voiceId || 'default')

    // Step 3: Generate Video (this would call Replicate API)
    const video = await generateVideo({
      script,
      voiceUrl,
      platform: platform || 'tiktok'
    })

    // Save to database
    const newVideo = await db.video.create({
      data: {
        userId,
        title: `Video ${Date.now()}`,
        script,
        status: 'processing',
        platform,
        creditsCost: 1
      }
    })

    // Update credits
    await db.subscription.update({
      where: { id: subscription.id },
      data: {
        creditsUsed: { increment: 1 }
      }
    })

    return NextResponse.json({
      success: true,
      video: {
        id: newVideo.id,
        script,
        voiceUrl,
        videoUrl: video.url,
        status: 'processing'
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
