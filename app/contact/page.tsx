import Link from 'next/link'
import { supportEmail } from '@/lib/policies'
export default function ContactPage() {
  return <main id="main-content" tabIndex={-1} className="content-page">
    <section><span className="eyebrow">Bee &amp; Bear support</span><h1>How can we help?</h1><p>For product, payment, refund or privacy questions, email <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.</p><p>Include a short description and an order reference if relevant. You do not need to provide a phone number, child's details or identity documents. Never send payment credentials, passwords, OTPs or UPI PINs.</p><a className="support-email" href={`mailto:${supportEmail}`}>Email Bee &amp; Bear</a><p>This opens your email app. Nothing is sent until you send the email yourself. We use your message to respond to your request; it does not sign you up for marketing.</p><p>See our <Link href="/privacy-policy">Privacy policy</Link> and <Link href="/refund-policy">Refund policy</Link>.</p></section>
  </main>
}
