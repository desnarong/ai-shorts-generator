# 🚀 Deploy to Vercel (Free)

## ขั้นตอนการ Deploy:

### 1. เตรียม Code สำหรับ Deploy

```bash
# ต้องเปลี่ยน database เป็น cloud database เพราะ SQLite ไม่ work บน Vercel
# แนะนำใช้ Prisma + Neon (Free PostgreSQL)
```

### 2. สมัคร Vercel

ไปที่ https://vercel.com และสมัครด้วย GitHub

### 3. Deploy ผ่าน Vercel CLI (ง่ายที่สุด)

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (ในโฟลเดอร์ ai-shorts-generator)
cd ai-shorts-generator
vercel

# ตอบคำถาม:
# - Set up and deploy? Yes
# - Which scope? [your-username]
# - Link to existing project? No
# - Project name: ai-shorts-generator
# - Directory? ./
# - Want to modify settings? Yes
# - Build Command: npm run build
# - Output Directory: .next
# - Install dependencies? Yes
```

### 4. ตั้งค่า Environment Variables

หลัง deploy เสร็จ:
```bash
# หรือไปที่ Vercel Dashboard > Project > Settings > Environment Variables

vercel env add OPENAI_API_KEY
vercel env add ELEVENLABS_API_KEY
vercel env add REPLICATE_API_TOKEN
vercel env add PROMPTPAY_PHONE
vercel env add SMS_WEBHOOK_SECRET
vercel env add DISCORD_WEBHOOK_URL
```

### 5. Database

สำหรับ Vercel ต้องใช้ **Neon** (Free PostgreSQL):

```bash
# 1. ไปที่ https://neon.tech
# 2. สร้าง project ใหม่
# 3. Copy connection string

# แก้ไข .env
DATABASE_URL="postgresql://user:password@host.neon.tech/db?sslmode=require"

# Run migration
npx prisma migrate deploy
```

---

## ⚠️ หมายเหตุสำคัญ:

1. **SMS Webhook** - ต้องใช้ domain จริง (Vercel ให้ subdomain ฟรี)
   - จะได้ประมาณ: `ai-shorts-generator.vercel.app`

2. **PromptPay** - ใช้งานได้ปกติบน Vercel

3. **Discord Webhook** - ใช้งานได้ปกติ

---

## 🎯 สรุป:

| ขั้นตอน | คำสั่ง |
|---------|--------|
| ติดตั้ง CLI | `npm i -g vercel` |
| Login | `vercel login` |
| Deploy | `cd ai-shorts-generator && vercel` |
| Add ENV | `vercel env add [NAME]` |

---

มีอะไรให้ช่วยอีกไหมครับ?
