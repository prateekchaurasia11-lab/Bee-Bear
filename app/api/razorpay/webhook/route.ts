import { NextResponse } from 'next/server'
import { webhookEventStore } from '@/lib/order-store'
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay'

export async function POST(request: Request) {
  const signature = request.headers.get('x-razorpay-signature')
  const rawBody = await request.text()
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET

  if (!signature || !secret) {
    return NextResponse.json({ error: 'Missing webhook signature configuration' }, { status: 400 })
  }

  if (!verifyRazorpayWebhookSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody) as {
    event?: string
    id?: string
    payload?: {
      payment?: {
        entity?: {
          id?: string
          order_id?: string
          status?: string
          amount?: number
          captured?: boolean
        }
      }
    }
  }

  const eventId = event.id || `${event.event}:${event.payload?.payment?.entity?.id}`

  if (webhookEventStore.has(eventId)) {
    return NextResponse.json({ ok: true, duplicate: true })
  }

  webhookEventStore.add(eventId)

  return NextResponse.json({
    ok: true,
    event: event.event,
    paymentStatus: event.payload?.payment?.entity?.status,
    reconciliationRequired: true,
  })
}
