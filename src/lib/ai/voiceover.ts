// ElevenLabs Voiceover API
// สำหรับสร้างเสียงพากย์จาก script

interface VoiceoverOptions {
  text: string
  voiceId?: string
  model?: string
}

export async function generateVoiceover(
  text: string, 
  voiceId: string = 'rachel'
): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY
  
  if (!apiKey) {
    // Return placeholder if no API key
    console.log('No ElevenLabs API key, using placeholder')
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
      console.error('ElevenLabs API error:', response.status)
      return 'https://example.com/voice-placeholder.mp3'
    }

    return 'https://example.com/voice-placeholder.mp3'
  } catch (error) {
    console.error('Voiceover generation error:', error)
    return 'https://example.com/voice-placeholder.mp3'
  }
}
