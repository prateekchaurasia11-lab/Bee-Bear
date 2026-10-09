'use client'

import { Gift, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { calculateTotals, type CheckoutPayload } from '@/lib/checkout'
import { formatInr } from '@/lib/products'
import { Button } from './ui/button'
import { clearCart, readCart } from './store-actions'

type RazorpayResponse = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void }
  }
}

export function CheckoutClient() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<ReturnType<typeof readCart>>([])
  useEffect(() => {
    const sync = () => setItems(readCart())
    sync()
    window.addEventListener('bb-cart-updated', sync)
    return () => window.removeEventListener('bb-cart-updated', sync)
  }, [])
  const totals = useMemo(() => {
    try {
      return items.length ? calculateTotals(items) : null
    } catch {
      return null
    }
  }, [items])

  async function submit(formData: FormData) {
    setLoading(true)
    setStatus('Creating secure Razorpay test order...')

    const payload: CheckoutPayload = {
      items,
      address: {
        fullName: String(formData.get('fullName') || ''),
        mobile: String(formData.get('mobile') || ''),
        email: String(formData.get('email') || ''),
        house: String(formData.get('house') || ''),
        building: String(formData.get('building') || ''),
        street: String(formData.get('street') || ''),
        landmark: String(formData.get('landmark') || ''),
        city: String(formData.get('city') || ''),
        state: String(formData.get('state') || ''),
        pincode: String(formData.get('pincode') || ''),
        instructions: String(formData.get('instructions') || ''),
        saveAddress: formData.get('saveAddress') === 'on',
      },
    }

    try {
      const orderRes = await fetch('/api/checkout/order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const order = await orderRes.json()

      if (!orderRes.ok) {
        throw new Error(order.error || 'Unable to create payment order')
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay checkout script is unavailable. Check CSP/network settings.')
      }

      const checkout = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Bee & Bear',
        description: 'Premium baby boutique order',
        order_id: order.razorpayOrderId,
        prefill: {
          name: payload.address.fullName,
          email: payload.address.email,
          contact: `+91${payload.address.mobile}`,
        },
        theme: { color: '#8B5137' },
        handler: async (response: RazorpayResponse) => {
          setStatus('Verifying payment signature on server...')
          const verifyRes = await fetch('/api/checkout/verify', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              orderId: order.orderId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          })
          const verified = await verifyRes.json()

          if (!verifyRes.ok) {
            throw new Error(verified.error || 'Payment verification failed')
          }

          clearCart()
          window.location.href = `/checkout/success?order=${encodeURIComponent(order.orderId)}`
        },
        modal: {
          ondismiss: () => setStatus('Payment was cancelled before completion.'),
          confirm_close: true,
        },
      })

      checkout.open()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkout-layout">
      <form action={submit} className="checkout-form">
        <div>
          <p className="eyebrow">Indian delivery</p>
          <h1>Where should we send the parcel?</h1>
        </div>
        <div className="form-grid">
          <input name="fullName" placeholder="Full customer name" required />
          <input name="mobile" placeholder="Mobile number" inputMode="numeric" required />
          <input name="email" placeholder="Email" type="email" required />
          <input name="house" placeholder="House / flat number" required />
          <input name="building" placeholder="Building / apartment" required />
          <input name="street" placeholder="Street / area" required />
          <input name="landmark" placeholder="Landmark (optional)" />
          <input name="city" placeholder="City" required />
          <input name="state" placeholder="State" required />
          <input name="pincode" placeholder="Six-digit PIN code" inputMode="numeric" required />
          <textarea name="instructions" placeholder="Delivery instructions" />
          <label className="checkbox-row">
            <input name="saveAddress" type="checkbox" /> Save this address
          </label>
        </div>
        <Button disabled={loading || !totals} type="submit">
          Pay in Razorpay test mode
        </Button>
        {status && <p className="status-note">{status}</p>}
      </form>

      <aside className="summary-panel checkout-summary">
        <ShieldCheck />
        <h2>Secure payment flow</h2>
        <p>
          Totals are recalculated server-side. Razorpay signatures and webhook payloads are verified before fulfillment.
        </p>
        <div className="summary-total">
          <span>Total</span>
          <strong>{formatInr(totals?.total || 0)}</strong>
        </div>
        <div className="gift-animation" aria-hidden="true">
          <Gift />
        </div>
      </aside>
    </div>
  )
}
