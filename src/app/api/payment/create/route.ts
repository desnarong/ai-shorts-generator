import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, userId, plan } = body

    if (!amount || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate payment ID
    const paymentId = crypto.randomUUID()
    
    // Generate PromptPay QR code URL
    // In production, you'd use a real PromptPay API
    const promptpayNumber = process.env.PROMPTPAY_NUMBER || '0812345678'
    
    // Create QR payment URL (mock)
    const qrCodeUrl = `https://promptpay.io/${promptpayNumber}/${amount}.png`
    
    // Create payment record (in production, save to database)
    const payment = {
      id: paymentId,
      amount,
      userId,
      plan: plan || 'credit',
      status: 'pending',
      promptpayNumber,
      qrCodeUrl,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        promptpayNumber: payment.promptpayNumber,
        qrCodeUrl: payment.qrCodeUrl,
        expiresAt: payment.expiresAt
      }
    })
  } catch (error) {
    console.error('Payment create error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}
