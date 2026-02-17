// AI Script Generation using OpenAI - Real Implementation
interface ScriptOptions {
  content: string
  type: 'url' | 'topic' | 'text'
}

interface ScriptResult {
  title: string
  script: string
  hashtags: string[]
}

export async function generateScript(options: ScriptOptions): Promise<ScriptResult> {
  const { content, type } = options
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  let prompt = ''
  
  if (type === 'url') {
    prompt = `สร้างสคริปต์วิดีโอสั้น 60 วินาทีจากเนื้อหานี้: ${content}`
  } else if (type === 'topic') {
    prompt = `สร้างสคริปต์วิดีโอสั้น 60 วินาทีเกี่ยวกับ: ${content}`
  } else {
    prompt = `สร้างสคริปต์วิดีโอสั้น 60 วินาที: ${content}`
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'คุณเป็นนักเขียนสคริปต์วิดีโอ TikTok/Shorts ที่เก่งมาก สร้างสคริปต์ที่น่าสนใจ กระชับ และมี Call-to-Action ท้ายวิดีโอ'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  const script = data.choices[0]?.message?.content || ''
  
  const hashtags = script.match(/#[a-zA-Zก-๙]+/g) || ['#ais shorts', '#viral']

  return {
    title: script.substring(0, 50) + '...',
    script: script,
    hashtags: hashtags.slice(0, 5)
  }
}
