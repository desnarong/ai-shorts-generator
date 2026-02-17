import { NextRequest, NextResponse } from 'next/server'
import { processSmsNotification } from '@/lib/payment/sms-parser'

// This webhook receives SMS notifications from your SMS forwarding service
// You need to set up SMS forwarding from your phone to this endpoint

export async function POST(req: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = req.headers.get('authorization')
    const secret = req.headers.get('x-webhook-secret')
    
    if (secret !== process.env.SMS_WEBHOOK_SECRET) {
      console.log('Invalid webhook secret')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    
    // Extract SMS message from various SMS gateway formats
    let message = ''
    
    if (typeof body === 'string') {
      message = body
    } else if (body.message) {
      message = body.message
    } else if (body.text) {
      message = body.text
    } else if (body.sms) {
      message = body.sms
    } else {
      // Try to stringify the whole body
      message = JSON.stringify(body)
    }

    console.log('Received SMS webhook:', message.substring(0, 100))

    // Process the SMS
    const result = await processSmsNotification(message)

    return NextResponse.json({
      success: result.success,
      ...result
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also handle GET for testing
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'SMS webhook is active',
    timestamp: new Date().toISOString()
  })
}
