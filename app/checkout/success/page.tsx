import { LinkButton } from '@/components/ui/button'
export default function PaymentSuccessPage() {
  return <main id="main-content" tabIndex={-1} className="empty-panel"><h1>Test checkout complete.</h1><p>This is a test payment flow. No real purchase has been made and no parcel will be dispatched.</p><LinkButton href="/products">Back to products</LinkButton></main>
}
