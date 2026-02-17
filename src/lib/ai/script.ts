// AI Script Generation
// ใช้ OpenAI หรือ LLM อื่นๆ สำหรับสร้างสคริปต์

interface ScriptOptions {
  content: string
  type: 'url' | 'topic' | 'text'
}

interface ScriptResult {
  title: string
  script: string
  hashtags: string[]
}

// สร้างสคริปต์จาก URL หรือหัวข้อ
export async function generateScript(options: ScriptOptions): Promise<ScriptResult> {
  const { content, type } = options
  
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    // Return mock script if no API key
    return getMockScript(content, type)
  }

  try {
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
            content: 'คุณเป็นนักเขียนสคริปต์วิดีโอ TikTok/YouTube Shorts ที่เก่งมาก สร้างสคริปต์ที่น่าสนใจ กระชับ และมีส่วนชวนดู'
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
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const script = data.choices[0]?.message?.content || ''

    // Extract hashtags from script
    const hashtags = script.match(/#[a-zA-Zก-๙]+/g) || ['#ais shorts', '#viral']

    return {
      title: script.substring(0, 50) + '...',
      script: script,
      hashtags: hashtags.slice(0, 5)
    }
  } catch (error) {
    console.error('Script generation error:', error)
    return getMockScript(content, type)
  }
}

// Mock script for demo
function getMockScript(content: string, type: string): ScriptResult {
  return {
    title: 'วิดีโอสร้างจาก AI',
    script: `สวัสดีครับ! วันนี้ผมจะมาพูดเกี่ยวกับ ${content}

นี่คือเนื้อหาที่น่าสนใจมากๆ เลยนะครับ

ถ้าชอบวิดีโอนี้ อย่าลืมกดติดตาม และกดไลค์ด้วยนะครับ!

#ais shorts #viral #trending`,
    hashtags: ['#ais shorts', '#viral', '#trending', '#fyp', '#content']
  }
}
