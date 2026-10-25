import assert from 'node:assert/strict'
import { test } from 'node:test'
import crypto from 'node:crypto'

const productsModule = await import('../lib/products.ts')
const checkoutModule = await import('../lib/checkout.ts')
const razorpayModule = await import('../lib/razorpay.ts')
const { default: nextConfig } = await import('../next.config.ts')

test('showroom has separate products for every size, type and pack', () => {
  const { products, categories } = productsModule
  assert.equal(products.length, 23)
  assert.equal(new Set(products.map(product => product.id)).size, products.length)
  assert.equal(new Set(products.map(product => product.slug)).size, products.length)
  assert.deepEqual(categories, ['Baby diapers', 'Baby wipes', 'Cotton buds'])
  assert.equal(products.filter(product => product.category === 'Baby diapers').length, 18)
  assert.equal(products.filter(product => product.category === 'Baby wipes').length, 3)
  assert.equal(products.filter(product => product.category === 'Cotton buds').length, 2)
  for (const product of products) {
    assert.equal(product.sizes.length, 1)
    assert(product.name.includes(product.sizes[0]))
    assert(product.price > 0)
    assert(product.images.length > 0)
  }
  const originalMedium = products.find(product => product.id === 'bb-diapers-75')
  assert.equal(originalMedium.price, 799)
  assert.deepEqual(originalMedium.sizes, ['Medium'])
  assert.equal(productsModule.findProduct('baby-pant-diapers-75-pack').id, originalMedium.id)
})

test('checkout prices each separate card correctly and rejects a different size', () => {
  for (const product of productsModule.products) {
    const item = { productId: product.id, quantity: 2, size: product.sizes[0], colour: product.colours[0] }
    assert.equal(checkoutModule.calculateTotals([item]).subtotal, product.price * 2)
    assert.throws(() => checkoutModule.calculateTotals([{ ...item, size: 'Wrong size' }]), /Invalid variant/)
  }
  const mixedCart = productsModule.products.map(product => ({ productId: product.id, quantity: 1, size: product.sizes[0], colour: product.colours[0] }))
  assert.equal(checkoutModule.calculateTotals(mixedCart).subtotal, productsModule.products.reduce((sum, product) => sum + product.price, 0))
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


test('checkout requires explicit current terms and refuses unnecessary personal data', () => {
  const product = productsModule.products[0]
  const payload = {
    items: [{ productId: product.id, quantity: 1, size: product.sizes[0], colour: product.colours[0] }],
    termsAccepted: true,
    policyVersion: '2026-10-18',
  }
  assert.equal(checkoutModule.checkoutSchema.safeParse(payload).success, true)
  for (const extra of [
    { termsAccepted: false }, { termsAccepted: undefined }, { policyVersion: 'old' },
    { address: { email: 'private@example.com' } }, { marketingConsent: true },
  ]) assert.equal(checkoutModule.checkoutSchema.safeParse({ ...payload, ...extra }).success, false)
})

test('checkout rejects personal fields nested in cart entries', () => {
  const product = productsModule.products[0]
  assert.equal(checkoutModule.checkoutSchema.safeParse({
    items: [{ productId: product.id, quantity: 1, size: product.sizes[0], colour: product.colours[0], email: 'private@example.com' }],
    termsAccepted: true, policyVersion: '2026-10-18',
  }).success, false)
})
