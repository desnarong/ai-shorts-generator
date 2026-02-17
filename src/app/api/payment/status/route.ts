import { NextRequest, NextResponse } from 'next/server'
import { checkPayment } from '@/lib/payment/promptpay'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const paymentId = searchParams.get('paymentId')

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Missing paymentId' },
        { status: 400 }
      )
    }

    const result = await checkPayment(paymentId)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Check payment error:', error)
    return NextResponse.json(
      { error: 'Failed to check payment' },
      { status: 500 }
    )
  }
}
