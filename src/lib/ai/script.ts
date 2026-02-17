import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateScript(content: string, type: 'url' | 'topic'): Promise<string> {
  const prompt = type === 'url' 
    ? `ฉันต้องการให้คุณอ่านเนื้อหาจาก URL นี้และสร้างเป็น script สำหรับวิดีโอสั้น (shorts) 60 วินาที โดยเขียนเป็นภาษาไทย กระชับ น่าสนใจ และดึงดูดความสนใจ\n\nเนื้อหา:\n${content}`
    : `สร้าง script สำหรับวิดีโอสั้น (shorts) 60 วินาที ในหัวข้อต่อไปนี้ เขียนเป็นภาษาไทย กระชับ น่าสนใจ และมี hook ที่ดดูดความสนใจ:\n\nหัวข้อ: ${content}`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'คุณเป็นนักเขียน script มืออาชีพสำหรับวิดีโอสั้น สร้าง script ที่น่าสนใจ กระชับ และเหมาะสำหรับ TikTok, YouTube Shorts, Instagram Reels'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  })

  return completion.choices[0]?.message?.content || ''
}
