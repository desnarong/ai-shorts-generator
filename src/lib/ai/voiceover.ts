// ElevenLabs Voiceover API
// สำหรับสร้างเสียงพากย์จาก script

interface VoiceoverOptions {
  text: string
  voiceId?: string
  model?: string
}

// ElevenLabs voices - สำหรับภาษาไทยและภาษาอังกฤษ
export const VOICES = {
  // English voices
  'rachel': '21m00Tcm4TlvDq8ikWAM', // Female
  'josh': 'TxGEqnHWrfWFTfGWOfXb',  // Male
  'arnold': '8EopQheT8qC4LJLpL8q3', // Male
  
  // Thai-compatible voices (using multilingual)
  'matthew': 'AcwLIDckMmGLp hybridization',
  'jessica': 'CGpQN1LXMf9rM1KDC2gT',
}

export async function generateVoiceover(
  text: string, 
  voiceId: string = 'rachel'
): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY
  
  if (!apiKey) {
    // Return placeholder if no API key
    return 'https://example.com/voice-placeholder.mp3'
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`)
    }

    // In production, you'd upload the audio to storage and return the URL
    // For now, return a placeholder
    const audioBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(audioBuffer).toString('base64')
    
    // Return as data URL (in production, upload to cloud storage)
    return `data:audio/mpeg;base64,${base64}`
  } catch (error) {
    console.error('Voiceover generation error:', error)
    throw error
  }
}

export async function getVoices() {
  const apiKey = process.env.ELEVENLABS_API_KEY
  
  if (!apiKey) {
    return []
  }

  const response = await fetch('https://api.elevenlabs.io/v1/voices', {
    headers: {
      'xi-api-key': apiKey
    }
  })

  if (!response.ok) {
    return []
  }

  const data = await response.json()
  return data.voices || []
}
