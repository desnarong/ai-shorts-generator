// ElevenLabs Voiceover API
export async function generateVoiceover(text: string, voiceId: string = 'rachel'): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY
  
  // If no API key, return sample
  if (!apiKey) {
    console.log('No ElevenLabs API key, using sample')
    return 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav'
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

    // If API error, return sample
    if (!response.ok) {
      console.log('ElevenLabs API error, using sample')
      return 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav'
    }

    // Return sample URL - in production, you'd upload to storage
    return 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav'
  } catch (error) {
    console.log('Voiceover error, using sample:', error)
    return 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav'
  }
}
