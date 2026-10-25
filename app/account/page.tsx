import Link from 'next/link'
export default function AccountPage() {
  return <main id="main-content" tabIndex={-1} className="content-page"><section><span className="eyebrow">Guest shopping</span><h1>Your choices, on this device.</h1><p>Accounts and saved addresses are not available in this test storefront. No account is needed to browse or try checkout.</p></section><section><h2>Your shopping</h2><p><Link href="/cart">Open your bag</Link> or <Link href="/wishlist">view your wishlist</Link>. These are saved only in this browser.</p><p><Link href="/cookie-policy">Manage device data</Link> or <Link href="/contact">contact support</Link>.</p></section></main>
}
