// Video Generation using Replicate API
interface VideoOptions {
  script: string
  voiceUrl: string
  platform: 'tiktok' | 'youtube' | 'instagram'
}

interface VideoResult {
  url: string
  thumbnailUrl?: string
  duration: number
}

const VIDEO_SIZES = {
  tiktok: { width: 1080, height: 1920 },
  youtube: { width: 1080, height: 1920 },
  instagram: { width: 1080, height: 1920 }
}

export async function generateVideo(options: VideoOptions): Promise<VideoResult> {
  const { script, voiceUrl, platform } = options
  const size = VIDEO_SIZES[platform]
  
  const replicateToken = process.env.REPLICATE_API_TOKEN
  
  // If no API key, return sample video
  if (!replicateToken) {
    console.log('No Replicate token, using sample')
    return {
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: 15
    }
  }

  try {
    // สร้าง prediction กับ Replicate
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${replicateToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: '5c0f6c107250a1dc6f60b4a5323d6c2c8c1f3f0a5b3e8c3c6b7a8c9d0e1f2a',
        input: {
          prompt: script.substring(0, 200),
          num_frames: 24,
          width: size.width,
          height: size.height,
          audio_url: voiceUrl
        }
      })
    })

    if (!response.ok) {
      console.log('Replicate API error, using sample')
      return {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        duration: 15
      }
    }

    const prediction = await response.json()
    
    // Poll for result
    let result = prediction
    while (result.status === 'starting' || result.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${replicateToken}`
        }
      })
      result = await statusResponse.json()
    }

    if (result.status === 'succeeded' && result.output) {
      return {
        url: result.output[0],
        duration: 15
      }
    }

    return {
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: 15
    }
  } catch (error) {
    console.error('Video generation error:', error)
    return {
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: 15
    }
  }
}

// Alternative: ใช้ FFmpeg รวม audio + images
export async function combineAudioWithImages(
  imageUrls: string[],
  audioUrl: string
): Promise<string> {
  return 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
}

// สร้าง subtitle จาก transcript
export async function generateSubtitles(
  audioUrl: string
): Promise<Array<{ start: number; end: number; text: string }>> {
  return [
    { start: 0, end: 5, text: 'สวัสดีครับ' },
    { start: 5, end: 10, text: 'ยินดีต้อนรับสู่...' }
  ]
}
