import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { z } from 'zod'
import { orderStore } from '@/lib/order-store'
import { requireRazorpayTestMode, verifyRazorpayPaymentSignature } from '@/lib/razorpay'

const verifySchema = z.object({
  orderId: z.string().min(1),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    requireRazorpayTestMode()

    const payload = verifySchema.parse(await request.json())
    const order = orderStore.get(payload.orderId)

    if (!order || order.razorpayOrderId !== payload.razorpayOrderId) {
      return NextResponse.json({ error: 'Order/payment mismatch' }, { status: 409 })
    }

    const valid = verifyRazorpayPaymentSignature({
      orderId: order.razorpayOrderId,
      paymentId: payload.razorpayPaymentId,
      signature: payload.razorpaySignature,
      secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    if (!valid) {
      order.status = 'failed'
      return NextResponse.json({ error: 'Invalid Razorpay payment signature' }, { status: 401 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })
    const payment = await razorpay.payments.fetch(payload.razorpayPaymentId)

    if (payment.order_id !== order.razorpayOrderId || Number(payment.amount) !== order.amount) {
      order.status = 'failed'
      return NextResponse.json({ error: 'Captured payment does not match order amount' }, { status: 409 })
    }

    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      return NextResponse.json({ error: `Payment is ${payment.status}` }, { status: 409 })
    }

    order.status = 'verified'
    return NextResponse.json({ ok: true, orderId: order.orderId, status: order.status })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment verification failed' },
      { status: 400 },
    )
  }
}
