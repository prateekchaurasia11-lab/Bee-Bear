'use client'

import { useState } from 'react'
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { type Product } from '@/lib/products'
import { addToCart } from './store-actions'
import { Button, LinkButton } from './ui/button'

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(product.sizes.includes('Medium') ? 'Medium' : product.sizes[0])
  const [added, setAdded] = useState(false)
  const limit = Math.min(product.inventory, 10)
  return (
    <div className="product-purchase">
      <fieldset className="size-picker">
        <legend>Size</legend>
        <div className="size-options">{product.sizes.map((option) => <label key={option}><input type="radio" name={`size-${product.id}`} value={option} checked={size === option} onChange={() => { setSize(option); setAdded(false) }} /><span>{option}</span></label>)}</div>
      </fieldset>
      <p className="size-note">{size === 'Medium' ? 'Medium: 7-12 kg' : 'Small: check the weight range on your pack.'}</p>
      <div className="purchase-controls">
        <div className="quantity-stepper" aria-label="Pack quantity">
          <Button variant="ghost" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => { setQuantity(quantity - 1); setAdded(false) }}><Minus size={16} /></Button>
          <output aria-live="polite">{quantity}</output>
          <Button variant="ghost" aria-label="Increase quantity" disabled={quantity >= limit} onClick={() => { setQuantity(quantity + 1); setAdded(false) }}><Plus size={16} /></Button>
        </div>
        <Button disabled={product.inventory === 0} onClick={() => { addToCart({ productId: product.id, quantity, size, colour: product.colours[0] }); setAdded(true) }}>
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}{added ? 'Added to bag' : 'Add to bag'}
        </Button>
        {added && <LinkButton href="/cart" variant="ghost">View bag</LinkButton>}
      </div>
    </div>
  )
}
