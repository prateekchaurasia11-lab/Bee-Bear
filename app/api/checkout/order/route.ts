import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { ZodError } from 'zod'
import { checkoutSchema, calculateTotals } from '@/lib/checkout'
import { createInternalOrder } from '@/lib/order-store'
import { requireRazorpayTestMode } from '@/lib/razorpay'

export async function POST(request: Request) {
  try {
    const payload = checkoutSchema.parse(await request.json())
    requireRazorpayTestMode()
    const totals = calculateTotals(payload.items)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const receipt = `bb_${crypto.randomUUID().slice(0, 18)}`
    const razorpayOrder = await razorpay.orders.create({
      amount: totals.amountInPaise,
      currency: totals.currency,
      receipt,
      notes: {
        brand: 'Bee & Bear',
        channel: 'web-test-mode',
      },
    })

    const order = createInternalOrder({
      orderId: receipt,
      razorpayOrderId: razorpayOrder.id,
      amount: totals.amountInPaise,
      currency: totals.currency,
      termsVersion: payload.policyVersion,
      termsAcceptedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      orderId: order.orderId,
      razorpayOrderId: order.razorpayOrderId,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof ZodError ? 'Review your bag and agree to the current order terms before continuing.' : error instanceof Error ? error.message : 'Unable to create checkout order' },
      { status: 400 },
    )
  }
}
