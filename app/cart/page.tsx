import { CartClient } from '@/components/cart-client'

export default function CartPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="page-hero">
        <span className="eyebrow">Shopping bag</span>
        <h1>Your Bee &amp; Bear order.</h1>
      </header>
      <CartClient />
    </main>
  )
}
