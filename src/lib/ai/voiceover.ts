// ElevenLabs Voiceover API - Real Implementation
export async function generateVoiceover(text: string, voiceId: string = 'rachel'): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY
  
  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not configured')
  }

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
    const error = await response.text()
    throw new Error(`ElevenLabs error: ${response.status} - ${error}`)
  }

  // Convert to base64 and return as data URL
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64 = buffer.toString('base64')
  
  return `data:audio/mpeg;base64,${base64}`
}
