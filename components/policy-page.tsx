import Link from 'next/link'
import type { ReactNode } from 'react'
import { policyLinks, supportEmail } from '@/lib/policies'

export function PolicyPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <main id="main-content" tabIndex={-1} className="content-page policy-page">
    <section>
      <span className="eyebrow">Bee &amp; Bear · Your information and choices</span>
      <h1>{title}</h1>
      <p>Last updated: 18 October 2026</p>
      <p>{intro}</p>
      <nav className="policy-tabs" aria-label="Policies">{policyLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
    </section>
    {children}
    <section><h2>Contact Bee &amp; Bear</h2><p>For support, privacy requests, cancellations or refund questions, email <a href={`mailto:${supportEmail}`}>{supportEmail}</a>. Include only the information needed to answer your request. Never send a password, card number, CVV, OTP or UPI PIN.</p></section>
  </main>
}
