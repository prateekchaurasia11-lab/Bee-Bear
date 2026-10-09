import assert from 'node:assert/strict'
import { test } from 'node:test'
import crypto from 'node:crypto'

const productsModule = await import('../lib/products.ts')
const checkoutModule = await import('../lib/checkout.ts')
const razorpayModule = await import('../lib/razorpay.ts')
const { default: nextConfig } = await import('../next.config.ts')

test('catalogue has only the diaper pack with Small and Medium variants', () => {
  assert.equal(productsModule.products.length, 1)
  const product = productsModule.products[0]
  assert.deepEqual(product.sizes, ['Small', 'Medium'])
  const totals = checkoutModule.calculateTotals(product.sizes.map((size) => ({
    productId: product.id, quantity: 1, size, colour: product.colours[0],
  })))
  assert.equal(totals.subtotal, 1598)
  assert.throws(() => checkoutModule.calculateTotals([{ productId: 'bb-001', quantity: 1, size: '0-3M', colour: 'Ivory' }]), /Unknown product/)
})

test('CSP allows React debugging only in development', async () => {
  const original = process.env.NODE_ENV
  try {
    for (const environment of ['development', 'production']) {
      process.env.NODE_ENV = environment
      const routes = await nextConfig.headers()
      const csp = routes[0].headers.find((header) => header.key === 'Content-Security-Policy').value
      assert.equal(csp.includes("'unsafe-eval'"), environment === 'development')
      assert.equal(csp.includes('upgrade-insecure-requests'), environment === 'production')
    }
  } finally {
    if (original === undefined) delete process.env.NODE_ENV
    else process.env.NODE_ENV = original
  }
})

test('calculates INR checkout totals from server-side product prices', () => {
  const product = productsModule.products[0]
  const totals = checkoutModule.calculateTotals([
    {
      productId: product.id,
      quantity: 2,
      size: product.sizes[0],
      colour: product.colours[0],
    },
  ])

  assert.equal(totals.currency, 'INR')
  assert.equal(totals.subtotal, product.price * 2)
  assert.equal(totals.amountInPaise, totals.total * 100)
})

test('rejects invalid Indian PIN code', () => {
  assert.throws(() =>
    checkoutModule.addressSchema.parse({
      fullName: 'Test Customer',
      mobile: '9876543210',
      email: 'test@example.com',
      house: '12',
      building: 'Bee House',
      street: 'Market Road',
      city: 'Kanpur',
      state: 'Uttar Pradesh',
      pincode: '012345',
    }),
  )
})

test('verifies Razorpay payment signature with HMAC SHA256', () => {
  const secret = 'test_secret'
  const orderId = 'order_test'
  const paymentId = 'pay_test'
  const signature = crypto.createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex')

  assert.equal(
    razorpayModule.verifyRazorpayPaymentSignature({ orderId, paymentId, signature, secret }),
    true,
  )
})
