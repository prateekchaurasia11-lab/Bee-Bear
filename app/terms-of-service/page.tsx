import Link from 'next/link'
import { PolicyPage } from '@/components/policy-page'
export const metadata = { title: 'Terms of service | Bee & Bear' }
export default function TermsPage() {
  return <PolicyPage title="Terms of service" intro="These terms cover use of the Bee & Bear storefront and its test checkout. Please read them before starting a test payment.">
    <section><h2>Test storefront</h2><p>This version supports Razorpay test payments only. A test payment does not purchase goods, charge real money, reserve stock or create an obligation to deliver. Use test payment details; do not enter real financial information. Accounts, saved addresses and live fulfilment are not available.</p></section>
    <section><h2>Products and prices</h2><p>Product pages show pack size, available variants and INR prices. Photographs are illustrative. Check the information on the actual pack for fit and use guidance. The bag and checkout show shipping and the full total before you choose to pay; displayed taxes are included. No subscription, donation or paid extra is added automatically.</p><p>Shipping in the test calculation is ₹149 below ₹4,999 and free from ₹4,999. These are demonstration calculations, not a live delivery offer.</p></section>
    <section><h2>Your choices</h2><p>You may browse and use the bag without creating an account. You can change quantities, remove products or leave at any time. Agreement to these order terms is separate from optional marketing; we do not enrol you in marketing.</p></section>
    <section><h2>Payments and cancellations</h2><p>Razorpay supplies the separate payment interface. Payment status is checked on our server before the bag is cleared. If payment is interrupted, your bag remains available. See the <Link href="/refund-policy">Refund policy</Link> for test transactions and the information required before live sales.</p></section>
    <section><h2>Responsible use</h2><p>Use the site lawfully. Do not attempt to access another person's data, bypass security, interfere with service or submit information you are not entitled to share. Content and branding belong to their respective owners.</p></section>
    <section><h2>Availability and consumer rights</h2><p>The test service may be interrupted or changed. These terms do not exclude rights or remedies that cannot lawfully be excluded. Before accepting live orders, Bee &amp; Bear must publish its seller identity, business address, grievance contact, delivery commitments and confirmed return/refund timeframes.</p></section>
  </PolicyPage>
}
