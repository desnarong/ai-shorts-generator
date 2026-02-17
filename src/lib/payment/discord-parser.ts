// Discord API for Payment Notifications
// Alternative method to receive payment notifications via Discord Bot

import { db } from '@/lib/prisma'

/**
 * Discord Bot Integration
 * For receiving payment notifications via Discord Webhook/Bot
 */

const DISCORD_API_URL = 'https://discord.com/api/v10'

interface DiscordEmbed {
  title?: string
  description?: string
  color?: number
  fields?: { name: string; value: string; inline?: boolean }[]
  thumbnail?: { url: string }
  footer?: { text: string }
  timestamp?: string
}

/**
 * Send a message via Discord Webhook
 */
export async function sendDiscordMessage(
  webhookUrl: string,
  content: string,
  embeds?: DiscordEmbed[]
): Promise<boolean> {
  if (!webhookUrl) {
    console.log('Discord Webhook URL not configured')
    return false
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
        embeds: embeds || []
      })
    })

    return response.ok
  } catch (error) {
    console.error('Failed to send Discord message:', error)
    return false
  }
}

/**
 * Send payment confirmation to Discord channel
 */
export async function sendPaymentNotificationToDiscord(
  amount: number,
  refNo: string,
  plan: string,
  userId?: string
): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  
  const embed: DiscordEmbed = {
    title: '💳 การชำระเงินใหม่!',
    description: `**แพ็กเกจ:** ${plan}\n**ยอดเงิน:** ${amount / 100} บาท\n**Ref:** \`${refNo}\``,
    color: 0x00ff00, // Green
    timestamp: new Date().toISOString(),
    footer: {
      text: userId ? `User ID: ${userId}` : 'Guest Payment'
    }
  }

  return sendDiscordMessage(
    webhookUrl!,
    '📢 **มีการชำระเงินเข้ามา!**',
    [embed]
  )
}

/**
 * Send QR Code payment request to Discord
 */
export async function sendPaymentQRToDiscord(
  webhookUrl: string,
  amount: number,
  refNo: string,
  qrCodeUrl: string,
  expiresAt: Date,
  userEmail?: string
): Promise<boolean> {
  const embed: DiscordEmbed = {
    title: '🔗 สร้าง Payment ใหม่',
    description: `**ยอดเงิน:** ${amount / 100} บาท\n**Ref:** \`${refNo}\`\n**หมดอายุ:** ${expiresAt.toLocaleString('th-TH')}`,
    color: 0x0099ff, // Blue
    fields: [
      {
        name: '📱 QR Code',
        value: '[ดู QR Code](' + qrCodeUrl + ')',
        inline: false
      }
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: userEmail || 'Unknown User'
    }
  }

  return sendDiscordMessage(webhookUrl, '💰 **Payment Created**', [embed])
}

/**
 * Process Discord slash command
 * For payment commands like /pay, /buy-pro, /buy-business
 */
export async function handleDiscordCommand(
  command: string,
  userId: string,
  userEmail?: string
): Promise<{ message: string; embed?: DiscordEmbed }> {
  const { createPayment, PLANS } = await import('./promptpay')

  const commandLower = command.toLowerCase().replace('/', '')

  if (commandLower === 'pro' || commandLower === 'buy-pro') {
    const payment = await createPayment('pro', undefined, userId)
    
    return {
      message: 'สร้าง payment แพ็กเกจ Pro แล้ว!',
      embed: {
        title: '💳 แพ็กเกจ Pro - 499 บาท',
        description: `สแกน QR Code เพื่อชำระเงิน\n**Ref:** \`${payment.refNo}\`\n**หมดอายุ:** ${payment.expiresAt.toLocaleString('th-TH')}`,
        color: 0x6366f1,
        image: { url: payment.qrCodeUrl }
      }
    }
  }

  if (commandLower === 'business' || commandLower === 'buy-business') {
    const payment = await createPayment('business', undefined, userId)
    
    return {
      message: 'สร้าง payment แพ็กเกจ Business แล้ว!',
      embed: {
        title: '💳 แพ็กเกจ Business - 1,499 บาท',
        description: `สแกน QR Code เพื่อชำระเงิน\n**Ref:** \`${payment.refNo}\`\n**หมดอายุ:** ${payment.expiresAt.toLocaleString('th-TH')}`,
        color: 0x8b5cf6,
        image: { url: payment.qrCodeUrl }
      }
    }
  }

  if (commandLower === 'help' || commandLower === 'plans') {
    return {
      message: '📋 ราคาแพ็กเกจ',
      embed: {
        title: '💰 ราคาแพ็กเกจ',
        description: 
          '**Pro** - 499 บาท/เดือน\n' +
          '→ 30 shorts, HD, ไม่มี watermark\n\n' +
          '**Business** - 1,499 บาท/เดือน\n' +
          '→ Unlimited, 4K, API Access\n\n' +
          'พิมพ์ `/pro` หรือ `/business` เพื่อสร้าง payment',
        color: 0x06b6d4
      }
    }
  }

  return {
    message: '❌ ไม่เข้าใจคำสั่ง',
    embed: {
      title: '❓ คำสั่งที่ใช้ได้',
      description: 
        '`/pro` - สร้าง payment แพ็กเกจ Pro\n' +
        '`/business` - สร้าง payment แพ็กเกจ Business\n' +
        '`/plans` - ดูราคาทั้งหมด\n' +
        '`/help` - ดูวิธีใช้',
      color: 0xff0000
    }
  }
}

/**
 * Discord interaction handler
 */
export async function handleDiscordInteraction(
  interaction: any
): Promise<{ content: string; embeds?: DiscordEmbed[] }> {
  const { type, data, member, user } = interaction

  // Handle slash commands
  if (type === 2) { // INTERACTION_TYPE_APPLICATION_COMMAND
    const commandName = data.name
    const userId = user?.id || member?.user?.id
    const userEmail = user?.email || member?.user?.email

    const result = await handleDiscordCommand(commandName, userId, userEmail)

    return {
      content: result.message,
      embeds: result.embed ? [result.embed] : undefined
    }
  }

  // Handle button clicks
  if (type === 3) { // INTERACTION_TYPE_MESSAGE_COMPONENT
    const customId = data.custom_id

    if (customId.startsWith('buy_')) {
      const plan = customId.replace('buy_', '')
      const userId = user?.id || member?.user?.id

      const result = await handleDiscordCommand(plan, userId)

      return {
        content: result.message,
        embeds: result.embed ? [result.embed] : undefined
      }
    }
  }

  return { content: 'Unknown interaction' }
}
