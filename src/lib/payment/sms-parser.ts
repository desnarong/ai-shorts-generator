// SMS Parser for Bank Payment Notifications
// Supports Kasikorn Bank (กสิกรไทย) in Thai and English

import { db } from '@/lib/prisma'

interface ParsedSms {
  amount: number // in satang
  refNo: string
  sender: string
  timestamp: Date
  rawMessage: string
}

/**
 * Parse SMS message from Kasikorn Bank (Thai)
 * Example: "ธ.กสิกรไทย คุณได้รับเงิน 499.00 บาท จาก กสิกรไทย เข้าบัญชี xxx-0-xxxx-x วันที่ 17/02/66 เวลา 14:30 น. ref:A1234567"
 */
function parseThaiSms(message: string): ParsedSms | null {
  try {
    // Remove extra whitespace
    const cleanMsg = message.replace(/\s+/g, ' ').trim()
    
    // Extract amount (supports เศษ 1 สตางค์)
    const amountMatch = cleanMsg.match(/(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*บาท/)
    if (!amountMatch) return null
    
    const amountStr = amountMatch[1].replace(/,/g, '')
    const amount = Math.round(parseFloat(amountStr) * 100) // Convert to satang
    
    // Extract ref number
    const refMatch = cleanMsg.match(/ref[:\s]*([A-Z0-9]+)/i)
    const refNo = refMatch ? refMatch[1] : ''
    
    // Extract timestamp
    const dateMatch = cleanMsg.match(/วันที่\s*(\d{1,2})[\/](\d{2})\s*เวลา\s*(\d{1,2}):(\d{2})/)
    let timestamp = new Date()
    
    if (dateMatch) {
      const day = parseInt(dateMatch[1])
      const month = parseInt(dateMatch[2])
      const year = parseInt(dateMatch[3]) + 2500 // Convert BE to CE
      const hour = parseInt(dateMatch[4])
      const minute = parseInt(dateMatch[5])
      
      timestamp = new Date(year, month - 1, day, hour, minute)
    }
    
    return {
      amount,
      refNo,
      sender: 'KBank_TH',
      timestamp,
      rawMessage: message
    }
  } catch (error) {
    console.error('Failed to parse Thai SMS:', error)
    return null
  }
}

/**
 * Parse SMS message from Kasikorn Bank (English)
 * Example: "KBank You have received 499.00 Baht from KBank to account xxx-0-xxxx-x on 17/02/2026 at 14:30 ref A1234567"
 */
function parseEnglishSms(message: string): ParsedSms | null {
  try {
    const cleanMsg = message.replace(/\s+/g, ' ').trim()
    
    // Extract amount
    const amountMatch = cleanMsg.match(/(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:Baht|USD)/i)
    if (!amountMatch) return null
    
    const amountStr = amountMatch[1].replace(/,/g, '')
    const amount = Math.round(parseFloat(amountStr) * 100)
    
    // Extract ref number
    const refMatch = cleanMsg.match(/ref[:\s]*([A-Z0-9]+)/i)
    const refNo = refMatch ? refMatch[1] : ''
    
    // Extract timestamp
    const dateMatch = cleanMsg.match(/on\s*(\d{1,2})[\/](\d{2})[\/](\d{4})\s*at\s*(\d{1,2}):(\d{2})/i)
    let timestamp = new Date()
    
    if (dateMatch) {
      const day = parseInt(dateMatch[1])
      const month = parseInt(dateMatch[2])
      const year = parseInt(dateMatch[3])
      const hour = parseInt(dateMatch[4])
      const minute = parseInt(dateMatch[5])
      
      timestamp = new Date(year, month - 1, day, hour, minute)
    }
    
    return {
      amount,
      refNo,
      sender: 'KBank_EN',
      timestamp,
      rawMessage: message
    }
  } catch (error) {
    console.error('Failed to parse English SMS:', error)
    return null
  }
}

/**
 * Main SMS parser - detects language and parses accordingly
 */
export function parseBankSms(message: string): ParsedSms | null {
  // Try Thai format first
  if (message.includes('บาท') || message.includes('ธ.กสิกร')) {
    return parseThaiSms(message)
  }
  
  // Try English format
  if (message.includes('Baht') || message.includes('KBank') || message.includes('KASIKORN')) {
    return parseEnglishSms(message)
  }
  
  // Try Thai format (backup)
  const thaiResult = parseThaiSms(message)
  if (thaiResult) return thaiResult
  
  // Try English format (backup)
  return parseEnglishSms(message)
}

/**
 * Process incoming SMS and match with pending payment
 */
export async function processSmsNotification(message: string) {
  // Log the SMS for debugging
  const smsLog = await db.smsLog.create({
    data: {
      message: message.substring(0, 100), // Store first 100 chars
      rawMessage: message,
      from: 'SMSGateway',
      processed: false
    }
  })
  
  // Parse the SMS
  const parsed = parseBankSms(message)
  
  if (!parsed) {
    console.log('Failed to parse SMS:', message.substring(0, 100))
    return { success: false, reason: 'parse_failed' }
  }
  
  console.log('Parsed SMS:', parsed)
  
  // Find matching pending payment
  // 1. Try to match by exact ref number
  let payment = null
  
  if (parsed.refNo) {
    payment = await db.payment.findFirst({
      where: {
        refNo: parsed.refNo,
        status: 'pending',
        expiresAt: { gt: new Date() }
      }
    })
  }
  
  // 2. If no ref match, try to match by amount and recent time
  if (!payment) {
    // Look for payments within 10 minutes and same amount
    const recentTime = new Date()
    recentTime.setMinutes(recentTime.getMinutes() - 10)
    
    payment = await db.payment.findFirst({
      where: {
        status: 'pending',
        amount: parsed.amount,
        expiresAt: { gt: recentTime }
      },
      orderBy: { createdAt: 'desc' }
    })
  }
  
  if (!payment) {
    // Log but don't mark as processed - might be unrelated SMS
    await db.smsLog.update({
      where: { id: smsLog.id },
      data: { processed: false }
    })
    return { success: false, reason: 'no_matching_payment' }
  }
  
  // Update payment status
  const completedPayment = await db.payment.update({
    where: { id: payment.id },
    data: {
      status: 'completed',
      paidAt: parsed.timestamp,
      smsMessage: message
    }
  })
  
  // Update SMS log
  await db.smsLog.update({
    where: { id: smsLog.id },
    data: {
      processed: true,
      paymentId: payment.id
    }
  })
  
  // Update user subscription if exists
  if (completedPayment.userId) {
    const { completePayment: activateSubscription } = await import('./promptpay')
    await activateSubscription(completedPayment.id)
  }
  
  // Send Discord notification
  try {
    const { sendPaymentNotificationToDiscord } = await import('./discord-parser')
    await sendPaymentNotificationToDiscord(
      completedPayment.amount,
      completedPayment.refNo,
      completedPayment.plan,
      completedPayment.userId || undefined
    )
  } catch (error) {
    console.error('Failed to send Discord notification:', error)
  }
  
  return { 
    success: true, 
    paymentId: payment.id,
    amount: payment.amount / 100,
    refNo: payment.refNo
  }
}

/**
 * Verify payment by amount only (fallback method)
 */
export async function verifyPaymentByAmount(
  amount: number,
  userId?: string
): Promise<{ success: boolean; payment?: any }> {
  // Find recent pending payment with same amount
  const recentTime = new Date()
  recentTime.setMinutes(recentTime.getMinutes() - 10)
  
  const payment = await db.payment.findFirst({
    where: {
      status: 'pending',
      amount: amount,
      expiresAt: { gt: recentTime },
      ...(userId ? { userId } : {})
    },
    orderBy: { createdAt: 'desc' }
  })
  
  if (!payment) {
    return { success: false }
  }
  
  // Complete the payment
  const completed = await db.payment.update({
    where: { id: payment.id },
    data: {
      status: 'completed',
      paidAt: new Date()
    }
  })
  
  // Update subscription
  if (completed.userId) {
    const { completePayment: activateSubscription } = await import('./promptpay')
    await activateSubscription(completed.id)
  }
  
  return { success: true, payment: completed }
}
