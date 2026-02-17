// PromptPay Payment Gateway
// Custom payment system using PromptPay QR Code

import { db } from '@/lib/prisma'

// Pricing plans (in Baht)
export const PLANS = {
  pro: {
    name: 'Pro',
    price: 499,
    credits: 30,
    features: ['30 shorts/month', 'HD quality', 'No watermark']
  },
  business: {
    name: 'Business',
    price: 1499,
    credits: -1, // unlimited
    features: ['Unlimited', '4K quality', 'API access']
  }
}

const PAYMENT_TIMEOUT_MINUTES = 10
const MAX_REF_SUFFIX = 20

/**
 * Generate unique reference number for payment
 * Format: AIMM + random 6 digits + check digit
 */
function generateRefNo(plan: string): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 900000) + 100000
  const base = `AI${timestamp}${random}`
  
  // Calculate check digit using Luhn algorithm
  const checkDigit = calculateLuhnCheckDigit(base)
  return `${base}${checkDigit}`
}

/**
 * Luhn algorithm for check digit
 */
function calculateLuhnCheckDigit(num: string): number {
  let sum = 0
  let isEven = false
  
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10)
    
    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return (10 - (sum % 10)) % 10
}

/**
 * Generate PromptPay QR Code URL
 * Uses third-party QR code generation service
 */
function generateQRCodeUrl(phoneNumber: string, amount: number, refNo: string): string {
  // PromptPay QR format (EMV QR)
  const payload = generatePromptPayPayload(phoneNumber, amount, refNo)
  
  // Use QR Server API to generate QR code image
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(payload)}`
}

/**
 * Generate EMV QR Payload for PromptPay
 */
function generatePromptPayPayload(phoneNumber: string, amount: number, refNo: string): string {
  // Remove any non-digits from phone
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  
  // Build QR payload
  const fields: string[] = [
    '000201', // Payment network
    `01${cleanPhone.length.toString().padStart(2, '0')}${cleanPhone}`, // Merchant ID (phone)
    `5303694`, // Currency (THB - 764)
    `54${amount.toFixed(2).length.toString().padStart(2, '0')}${amount.toFixed(2)}`, // Amount
    `5802TH`, // Country
    `6304${calculateCRC4(payloadWithoutCRC())}` // CRC
  ]
  
  function payloadWithoutCRC() {
    return fields.slice(0, -1).join('')
  }
  
  return fields.join('')
}

/**
 * Simple CRC4 calculation for QR
 */
function calculateCRC4(data: string): string {
  let crc = 0xFFFF
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i)
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0x8408 : 0)
    }
  }
  return (crc ^ 0xFFFF).toString(16).toUpperCase().padStart(4, '0')
}

/**
 * Create a new payment request
 */
export async function createPayment(
  plan: 'pro' | 'business',
  userId?: string,
  ipAddress?: string
) {
  const planInfo = PLANS[plan]
  
  // Generate unique ref number
  let refNo = ''
  let attempts = 0
  
  do {
    refNo = generateRefNo(plan)
    attempts++
    
    // Check if this refNo already exists and is still pending
    const existing = await db.payment.findFirst({
      where: {
        refNo,
        status: 'pending',
        expiresAt: { gt: new Date() }
      }
    })
    
    if (!existing) break
    
    if (attempts >= MAX_REF_SUFFIX) {
      // If we've tried too many times, modify the last digit
      const lastDigit = parseInt(refNo.slice(-1))
      const newLastDigit = (lastDigit + 1) % 10
      refNo = refNo.slice(0, -1) + newLastDigit
      break
    }
  } while (true)
  
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + PAYMENT_TIMEOUT_MINUTES)
  
  const payment = await db.payment.create({
    data: {
      userId,
      amount: planInfo.price * 100, // Convert to satang
      refNo,
      plan,
      status: 'pending',
      expiresAt,
      promptpayPhone: process.env.PROMPTPAY_PHONE,
      qrCodeUrl: generateQRCodeUrl(
        process.env.PROMPTPAY_PHONE!,
        planInfo.price,
        refNo
      ),
      ipAddress,
    }
  })
  
  return {
    id: payment.id,
    amount: payment.amount / 100,
    refNo: payment.refNo,
    qrCodeUrl: payment.qrCodeUrl,
    expiresAt: payment.expiresAt,
    plan: planInfo
  }
}

/**
 * Check payment status
 */
export async function checkPayment(paymentId: string) {
  const payment = await db.payment.findUnique({
    where: { id: paymentId },
    include: { user: true }
  })
  
  if (!payment) {
    return { status: 'not_found' }
  }
  
  // Check if expired
  if (payment.status === 'pending' && new Date() > payment.expiresAt) {
    await db.payment.update({
      where: { id: paymentId },
      data: { status: 'expired' }
    })
    return { status: 'expired' }
  }
  
  return {
    status: payment.status,
    paidAt: payment.paidAt,
    amount: payment.amount / 100
  }
}

/**
 * Process completed payment
 */
export async function completePayment(paymentId: string) {
  const payment = await db.payment.findUnique({
    where: { id: paymentId }
  })
  
  if (!payment || payment.status !== 'pending') {
    return null
  }
  
  // Update payment status
  await db.payment.update({
    where: { id: paymentId },
    data: {
      status: 'completed',
      paidAt: new Date()
    }
  })
  
  // Update user subscription if user exists
  if (payment.userId) {
    const planInfo = PLANS[payment.plan as keyof typeof PLANS]
    
    const existingSub = await db.subscription.findFirst({
      where: {
        userId: payment.userId,
        status: 'active'
      }
    })
    
    if (existingSub) {
      // Update existing subscription
      await db.subscription.update({
        where: { id: existingSub.id },
        data: {
          creditsLimit: planInfo.credits === -1 
            ? 999999 
            : existingSub.creditsLimit + planInfo.credits,
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 days
        }
      })
    } else {
      // Create new subscription
      await db.subscription.create({
        data: {
          userId: payment.userId,
          plan: payment.plan,
          status: 'active',
          creditsLimit: planInfo.credits === -1 ? 999999 : planInfo.credits,
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      })
    }
  }
  
  return payment
}

/**
 * Clean up expired payments (run periodically)
 */
export async function cleanupExpiredPayments() {
  const result = await db.payment.updateMany({
    where: {
      status: 'pending',
      expiresAt: { lt: new Date() }
    },
    data: {
      status: 'expired'
    }
  })
  
  return result.count
}
