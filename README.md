# AI Shorts Generator

สร้างวิดีโอ Shorts/Reels อัตโนมัติด้วย AI

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Setup database
npx prisma generate
npx prisma db push

# 4. Run development server
npm run dev
```

เปิด http://localhost:3000

## 📦 Features

- AI Script Generation - สร้าง Script อัตโนมัติ
- AI Voiceover - เสียงพากย์หลายภาษา
- AI Video Generation - สร้างวิดีโออัตโนมัติ
- Auto Subtitle - ใส่ subtitle อัตโนมัติ
- Export ทุก Platform - TikTok, YouTube Shorts, IG Reels
- **Custom Payment Gateway** - PromptPay QR + SMS Verification

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| Free | ฿0 | 3 shorts/month, watermark |
| Pro | ฿499 | 30 shorts/month, HD, no watermark |
| Business | ฿1,499 | Unlimited, 4K, API |

## 🔧 Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- OpenAI (Script)
- ElevenLabs (Voiceover)
- Replicate (Video)
- Custom PromptPay Payment

## 💳 Payment Gateway Setup (PromptPay)

### หลักการทำงาน

1. **สร้าง QR Code**: ระบบสร้าง QR Code สำหรับ PromptPay พร้อม ref ที่ไม่ซ้ำกัน
2. **รอการชำระ**: ลูกค้าสแกน QR โอนเงินภายใน 10 นาที
3. **ตรวจสอบผ่าน SMS**: เมื่อมีการโอนเงิน ธนาคารจะส่ง SMS มา ระบบจะ parse SMS และตรวจสอบยอดเงิน
4. **แจ้งเตือนผ่าน Discord**: เมื่อมี payment เข้ามา ระบบจะส่งแจ้งเตือนไปที่ Discord Channel
5. **อัพเดทสถานะ**: เมื่อตรวจสอบสำเร็จ ระบบจะอัพเดท subscription อัตโนมัติ

### ตั้งค่า

1. **PromptPay Phone Number** ใน `.env`:
```env
PROMPTPAY_PHONE=0812345678
```

2. **SMS Webhook Secret**:
```env
SMS_WEBHOOK_SECRET=your-secret-key
```

3. **Discord Webhook URL** (แจ้งเตือน payment):
```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx
```

4. **ตั้งค่า SMS Forwarding**:
   - ใช้ app ส่งต่อ SMS เช่น SMS Forwarder หรือ Tasker
   - ส่ง SMS จากธนาคารกสิกรไทยไปยัง webhook URL ของคุณ
   - URL: `https://your-domain.com/api/payment/webhook`

### API Endpoints

- `POST /api/payment/create` - สร้าง payment ใหม่
- `GET /api/payment/status?paymentId=xxx` - เช็คสถานะ
- `POST /api/payment/webhook` - รับ SMS notification

### ตัวอย่างการใช้งาน Payment API

```javascript
// สร้าง payment
const response = await fetch('/api/payment/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ plan: 'pro', userId: 'user123' })
})

const { payment } = await response.json()
// payment = { id, amount, refNo, qrCodeUrl, expiresAt }

// แสดง QR Code ให้ลูกค้า
<img src={payment.qrCodeUrl} />

// เช็คสถานะ
const status = await fetch(`/api/payment/status?paymentId=${payment.id}`)
```

## 📱 SMS Format ที่รองรับ

### ภาษาไทย (กสิกรไทย)
```
ธ.กสิกรไทย คุณได้รับเงิน 499.00 บาท จาก กสิกรไทย เข้าบัญชี xxx-0-xxxx-x วันที่ 17/02/66 เวลา 14:30 น. ref:A1234567
```

### ภาษาอังกฤษ
```
KBank You have received 499.00 Baht from KBank to account xxx-0-xxxx-x on 17/02/2026 at 14:30 ref A1234567
```

## 🛠 Development

```bash
# Run Prisma Studio (database GUI)
npx prisma studio

# Run with custom port
PORT=3001 npm run dev

# Build for production
npm run build
```

## 📝 License

MIT
