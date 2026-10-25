'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { calculateTotals, type CheckoutPayload } from '@/lib/checkout'
import { policyVersion } from '@/lib/policies'
import { catalogueIsPreview, formatInr } from '@/lib/products'
import { Button, LinkButton } from './ui/button'
import { clearCart, readCart } from './store-actions'
import { loadRazorpay } from './razorpay-script'

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }
declare global {
  interface Window { Razorpay?: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, handler: () => void) => void } }
}

function PaymentSummary({ totals }: { totals: ReturnType<typeof calculateTotals> }) {
  return <><h2>Order summary</h2>{catalogueIsPreview && <p>Prices and stock are placeholders for development.</p>}<div><span>Subtotal</span><strong>{formatInr(totals.subtotal)}</strong></div><div><span>Shipping</span><strong>{totals.shipping ? formatInr(totals.shipping) : 'Free'}</strong></div><div><span>Taxes</span><strong>Included</strong></div><div className="summary-total"><span>Total</span><strong>{formatInr(totals.total)}</strong></div><p>Test payment only. No subscriptions or extra charges.</p></>
}

export function CheckoutClient() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const busy = useRef(false)
  const payButton = useRef<HTMLButtonElement>(null)
  const [items, setItems] = useState<ReturnType<typeof readCart>>([])
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const sync = () => { setItems(readCart()); setReady(true) }
    sync()
    window.addEventListener('bb-cart-updated', sync)
    window.addEventListener('storage', sync)
    return () => { window.removeEventListener('bb-cart-updated', sync); window.removeEventListener('storage', sync) }
  }, [])
  const totals = useMemo(() => { try { return items.length ? calculateTotals(items) : null } catch { return null } }, [items])
  function finish(message: string) {
    busy.current = false
    setLoading(false)
    setStatus(message)
    window.requestAnimationFrame(() => payButton.current?.focus())
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current || !totals) return
    const formData = new FormData(event.currentTarget)
    if (formData.get('termsAccepted') !== 'on') return
    busy.current = true
    setLoading(true)
    setStatus('Opening Razorpay test checkout…')
    const payload: CheckoutPayload = { items, termsAccepted: true, policyVersion }
    try {
      await loadRazorpay()
      const orderRes = await fetch('/api/checkout/order', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
      const order = await orderRes.json()
      if (!orderRes.ok) throw new Error(order.error || 'Unable to create test payment')
      if (!window.Razorpay) throw new Error('Payment checkout is unavailable. Please try again.')
      const checkout = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount, currency: 'INR', name: 'Bee & Bear',
        description: 'Test payment only — no goods will be dispatched',
        order_id: order.razorpayOrderId,
        theme: { color: '#8b5137' },
        handler: async (response: RazorpayResponse) => {
          try {
            setStatus('Checking test payment…')
            const verifyRes = await fetch('/api/checkout/verify', {
              method: 'POST', headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ orderId: order.orderId, razorpayOrderId: response.razorpay_order_id, razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature }),
            })
            const verified = await verifyRes.json()
            if (!verifyRes.ok) throw new Error(verified.error || 'Payment could not be verified. Your bag has been kept.')
            clearCart()
            window.location.href = `/checkout/success?order=${encodeURIComponent(order.orderId)}`
          } catch (error) { finish(error instanceof Error ? error.message : 'Payment could not be verified. Your bag has been kept.') }
        },
        modal: { ondismiss: () => finish('Test checkout closed. Your shopping bag is unchanged.'), confirm_close: false },
      })
      checkout.on('payment.failed', () => setStatus('Test payment failed. Retry in the payment window or close it to return to your bag.'))
      checkout.open()
    } catch (error) { finish(error instanceof Error ? error.message : 'Test checkout could not open. Please try again.') }
  }
  if (!ready) return <div className="empty-panel" role="status">Loading your shopping bag…</div>
  if (!totals) return <div className="empty-panel"><h1>Your bag is empty or needs updating.</h1><p>Add a product before starting test checkout.</p><LinkButton href="/cart">Review shopping bag</LinkButton></div>
  return <div className="checkout-layout">
    <form onSubmit={submit} method="post" className="checkout-form" aria-busy={loading}>
      <div><p className="eyebrow">Test checkout · No real purchase</p><h1>Review your test payment.</h1><p>No real money is charged and no parcel is sent. Use only test details in Razorpay. We do not need your name or delivery address for this demonstration.</p></div>
      <div><h2>Your items</h2><ul className="checkout-items">{totals.items.map(item => <li key={item.productId + item.size + item.colour}><div><strong>{item.name}</strong><span>{item.size} · Quantity {item.quantity}</span></div><strong>{formatInr(item.lineTotal)}</strong></li>)}</ul><Link href="/cart">Edit items or remove products</Link></div>
      <section className="checkout-mobile-summary" aria-label="Test payment summary"><PaymentSummary totals={totals} /></section>
      <div className="consent-panel"><label className="checkbox-row"><input name="termsAccepted" type="checkbox" required /><span>I agree to the Bee &amp; Bear test-order terms and refund policy.</span></label><p><Link href="/terms-of-service">Read Terms of service</Link> · <Link href="/refund-policy">Read Refund policy</Link></p><p>Opening checkout connects to Razorpay and may use its payment/security storage. Read our <Link href="/privacy-policy">Privacy policy</Link> and <Link href="/cookie-policy">Cookie policy</Link>. This does not sign you up for marketing.</p></div>
      <Button ref={payButton} className="checkout-pay-button" disabled={loading} type="submit"><span>{loading ? 'Test checkout in progress…' : 'Open Razorpay test checkout'}</span>{!loading && <strong>{formatInr(totals.total)}</strong>}</Button>
      <p className="status-note" role="status" aria-live="polite">{status}</p>
      <Link href="/cart">Back to shopping bag</Link>
    </form>
    <aside className="summary-panel checkout-summary"><PaymentSummary totals={totals} /></aside>
  </div>
}
