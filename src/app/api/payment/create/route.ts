import { NextRequest, NextResponse } from 'next/server'
import { createPayment, PLANS } from '@/lib/payment/promptpay'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { plan, userId } = body

    // Validate plan
    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json(
        { error: 'Invalid plan. Choose pro or business' },
        { status: 400 }
      )
    }

    // Get IP address for tracking
    const ipAddress = req.headers.get('x-forwarded-for') || 
                      req.headers.get('x-real-ip') || 
                      'unknown'

    // Create payment
    const payment = await createPayment(
      plan as 'pro' | 'business',
      userId,
      ipAddress
    )

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        refNo: payment.refNo,
        qrCodeUrl: payment.qrCodeUrl,
        expiresAt: payment.expiresAt,
        plan: payment.plan
      }
    })
  } catch (error) {
    console.error('Create payment error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}
