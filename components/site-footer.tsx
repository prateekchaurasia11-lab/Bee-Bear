import Link from 'next/link'
import Image from 'next/image'
import { brandLogo } from '@/lib/site-assets'
import { policyLinks } from '@/lib/policies'
import { FooterSketches } from './footer-sketches'

export function SiteFooter() {
  return <footer className="site-footer storybook-footer">
    <div className="footer-wave" aria-hidden="true">
      <svg viewBox="0 0 2880 100" preserveAspectRatio="none" focusable="false">
        <path d="M0 0H2880V44C2760 5 2660 100 2520 56S2280-18 2160 25 1950 91 1800 50 1570 10 1440 44C1320 5 1220 100 1080 56S840-18 720 25 510 91 360 50 130 10 0 44Z" />
      </svg>
    </div>
    <FooterSketches />
    <div className="footer-content">
      <div className="footer-intro">
        <Link href="/" aria-label="Bee and Bear home" className="footer-brand"><Image src={brandLogo.src} alt={brandLogo.alt} width={brandLogo.width} height={brandLogo.height} sizes="132px" className="footer-logo" /></Link>
        <p className="eyebrow">For your little one</p>
        <h2>A little comfort,<br />every day.</h2>
        <a className="footer-email" href="mailto:prateekchaurasia11@gmail.com">prateekchaurasia11@gmail.com</a>
      </div>
      <nav className="footer-grid" aria-label="Footer">
        <div><strong>Explore</strong><Link href="/products">All products</Link><Link href="/quality">Our Quality</Link><Link href="/blog">Our Blog</Link><Link href="/about">About Us</Link></div>
        <div><strong>Here to help</strong><Link href="/contact">Contact Us</Link><Link href="/policies#shipping">Shipping information</Link><Link href="/wishlist">Wishlist</Link><Link href="/cart">Shopping bag</Link></div>
        <div><strong>Good to know</strong>{policyLinks.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}<Link href="/cookie-policy#device-data">Manage device data</Link></div>
      </nav>
    </div>
    <div className="footer-bottom"><span>© 2026 Bee &amp; Bear. For all their little moments.</span><span className="footer-note">Client preview · No real orders</span></div>
  </footer>
}
