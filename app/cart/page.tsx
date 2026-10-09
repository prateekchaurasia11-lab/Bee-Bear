import { CartClient } from '@/components/cart-client'

export default function CartPage() {
  return (
    <main>
      <header className="page-hero">
        <span className="eyebrow">Shopping bag</span>
        <h1>Your Bee &amp; Bear order.</h1>
      </header>
      <CartClient />
    </main>
  )
}
