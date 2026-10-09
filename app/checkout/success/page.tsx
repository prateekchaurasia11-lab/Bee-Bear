import { CheckCircle2, Gift } from 'lucide-react'
import { LinkButton } from '@/components/ui/button'

export default function PaymentSuccessPage() {
  return (
    <main className="empty-panel">
      <CheckCircle2 size={38} />
      <h1>Your gift is being wrapped.</h1>
      <p>Payment success has been verified in the browser flow. Final fulfillment should wait for reconciled Razorpay webhook status.</p>
      <div className="gift-animation" aria-hidden="true">
        <Gift />
      </div>
      <LinkButton href="/orders">Track order</LinkButton>
    </main>
  )
}
