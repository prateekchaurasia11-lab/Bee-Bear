import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Bee &amp; Bear</p>
        <h2>A little comfort, every day.</h2>
      </div>
      <div className="footer-grid">
        <div>
          <strong>Shop</strong>
          <Link href="/products">All products</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Shopping bag</Link>
        </div>
        <div>
          <strong>Care</strong>
          <Link href="/contact">Contact support</Link>
          <Link href="/orders">Track order</Link>
          <Link href="/policies">Shipping &amp; returns</Link>
        </div>
        <div>
          <strong>Legal</strong>
          <Link href="/policies#privacy">Privacy</Link>
          <Link href="/policies#terms">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
