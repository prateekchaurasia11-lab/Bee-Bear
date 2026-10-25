'use client'

import { useState } from 'react'
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { type Product } from '@/lib/products'
import { addToCart } from './store-actions'
import { Button, LinkButton } from './ui/button'

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [status, setStatus] = useState('')
  const limit = Math.min(product.inventory, 10)
  return (
    <div className="product-purchase">
      <dl className="product-variant-summary"><div><dt>{product.category === 'Baby diapers' ? 'Size' : 'Pack'}</dt><dd>{product.sizes[0]}</dd></div><div><dt>Pack contents</dt><dd>{product.packLabel}</dd></div></dl>
      <p className="size-note">{product.weightRange || (product.category === 'Baby diapers' ? 'Fit and weight range will be confirmed on the final pack.' : 'Sample pack for the client preview.')}</p>
      <div className="purchase-controls">
        <div className="quantity-stepper" aria-label="Pack quantity">
          <Button variant="ghost" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => { setQuantity(quantity - 1); setAdded(false) }}><Minus size={16} /></Button>
          <output aria-live="polite">{quantity}</output>
          <Button variant="ghost" aria-label="Increase quantity" disabled={quantity >= limit} onClick={() => { setQuantity(quantity + 1); setAdded(false) }}><Plus size={16} /></Button>
        </div>
        <Button disabled={product.inventory === 0} onClick={() => {
          try {
            addToCart({ productId: product.id, quantity, size: product.sizes[0], colour: product.colours[0] })
            setAdded(true); setStatus('Added to your shopping bag.')
          } catch { setStatus('Could not save your bag. Browser storage may be unavailable.') }
        }}>{added ? <Check size={18} /> : <ShoppingBag size={18} />}{added ? 'Added to bag' : 'Add to bag'}</Button>
        {added && <LinkButton href="/cart" variant="ghost">View bag</LinkButton>}
      </div>
      <p className="status-note" role="status">{status}</p>
    </div>
  )
}
