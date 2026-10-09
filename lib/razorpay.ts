import crypto from 'crypto'

export function verifyRazorpayPaymentSignature(args: {
  orderId: string
  paymentId: string
  signature: string
  secret: string
}) {
  const expected = crypto
    .createHmac('sha256', args.secret)
    .update(`${args.orderId}|${args.paymentId}`)
    .digest('hex')

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(args.signature))
}

export function verifyRazorpayWebhookSignature(rawBody: string, signature: string, secret: string) {
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')

  if (expected.length !== signature.length) {
    return false
  }

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

export function requireRazorpayTestMode() {
  const keyId = process.env.RAZORPAY_KEY_ID

  if (!keyId || !keyId.startsWith('rzp_test_')) {
    throw new Error('Razorpay is configured for test mode only in this scaffold.')
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Missing RAZORPAY_KEY_SECRET.')
  }
}
