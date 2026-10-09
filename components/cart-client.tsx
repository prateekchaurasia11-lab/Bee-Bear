'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { calculateTotals } from '@/lib/checkout'
import { formatInr, products } from '@/lib/products'
import { Button, LinkButton } from './ui/button'
import { readCart } from './store-actions'

type CartItem = ReturnType<typeof readCart>[number]

export function CartClient() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const sync = () => setItems(readCart())
    sync()
    window.addEventListener('bb-cart-updated', sync)
    return () => window.removeEventListener('bb-cart-updated', sync)
  }, [])

  const totals = useMemo(() => {
    try {
      return items.length ? calculateTotals(items) : null
    } catch {
      return null
    }
  }, [items])

  function updateQuantity(index: number, quantity: number) {
    const next = items
      .map((item, itemIndex) => (itemIndex === index ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0)
    window.localStorage.setItem('bb-cart', JSON.stringify(next))
    window.dispatchEvent(new Event('bb-cart-updated'))
  }

  if (!items.length) {
    return (
      <div className="empty-panel">
        <h1>Your shopping bag is waiting.</h1>
        <p>Discover our 75-piece pack of baby pant diapers.</p>
        <LinkButton href="/products">Explore products</LinkButton>
      </div>
    )
  }

  return (
    <div className="cart-layout">
      <section className="cart-list">
        {items.map((item, index) => {
          const product = products.find((candidate) => candidate.id === item.productId)

          if (!product) return null

          return (
            <article key={`${item.productId}-${item.size}-${item.colour}`} className="cart-item">
              <img src={product.images[0]} alt="" />
              <div>
                <p>{product.category}</p>
                <h2>
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h2>
                <span>
                  {item.size} / {item.colour}
                </span>
              </div>
              <div className="quantity-stepper" aria-label={`Quantity for ${product.name}`}>
                <Button variant="ghost" onClick={() => updateQuantity(index, item.quantity - 1)}>
                  -
                </Button>
                <strong>{item.quantity}</strong>
                <Button variant="ghost" disabled={item.quantity >= Math.min(10, product.inventory)} onClick={() => updateQuantity(index, item.quantity + 1)}>
                  +
                </Button>
              </div>
              <strong>{formatInr(product.price * item.quantity)}</strong>
            </article>
          )
        })}
      </section>

      <aside className="summary-panel">
        <p className="eyebrow">Order summary</p>
        <div>
          <span>Subtotal</span>
          <strong>{formatInr(totals?.subtotal || 0)}</strong>
        </div>
        <div>
          <span>Shipping</span>
          <strong>{totals?.shipping ? formatInr(totals.shipping) : 'Free'}</strong>
        </div>
        <div>
          <span>Taxes</span>
          <strong>Included</strong>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <strong>{formatInr(totals?.total || 0)}</strong>
        </div>
        <LinkButton href="/checkout">Checkout securely</LinkButton>
      </aside>
    </div>
  )
}
