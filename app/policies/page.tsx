import Link from 'next/link'
import { policyLinks } from '@/lib/policies'
export const metadata = { title: 'Policies and shipping | Bee & Bear' }
export default function PoliciesPage() {
  return <main id="main-content" tabIndex={-1} className="content-page policy-page">
    <section><span className="eyebrow">Bee &amp; Bear</span><h1>Policies and shipping</h1><p>Read how the store works and manage your choices.</p><nav className="policy-tabs" aria-label="Policies">{policyLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav></section>
    <section id="shipping"><h2>Shipping information</h2><p>This storefront currently supports test payments only; no parcels are dispatched. The test bag calculates ₹149 shipping for a subtotal below ₹4,999 and free shipping from ₹4,999. Taxes are included and the full total is shown before payment.</p><p>Live delivery areas, dispatch times, delivery estimates and carrier details will be published before live orders open.</p></section>
    <section id="returns"><h2>Returns and refunds</h2><p><Link href="/refund-policy">Read the Refund policy</Link> for test payments, product concerns and the live-sale details still to be confirmed.</p></section>
    <section id="privacy"><h2>Privacy and device data</h2><p><Link href="/privacy-policy">Read the Privacy policy</Link> or <Link href="/cookie-policy">manage your browser storage</Link>.</p></section>
    <section id="terms"><h2>Terms</h2><p><Link href="/terms-of-service">Read the Terms of service</Link> before starting a test payment.</p></section>
  </main>
}
