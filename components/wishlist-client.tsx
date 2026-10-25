'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from './product-card'
import { readWishlist } from './store-actions'
import { LinkButton } from './ui/button'

export function WishlistClient() {
  const [ids, setIds] = useState<string[]>([])
  useEffect(() => {
    const sync = () => setIds(readWishlist())
    sync()
    window.addEventListener('bb-wishlist-updated', sync)
    return () => window.removeEventListener('bb-wishlist-updated', sync)
  }, [])
  const saved = products.filter((product) => ids.includes(product.id))
  if (!saved.length) return <main id="main-content" tabIndex={-1} className="empty-panel"><Heart size={32} /><h1>Your wishlist</h1><p>Your saved favourites will appear here.</p><LinkButton href="/products">Browse diapers</LinkButton></main>
  return <main id="main-content" tabIndex={-1}><header className="page-hero"><h1>Your wishlist</h1></header><section className="section catalogue-section"><div className="product-grid single-product-grid">{saved.map((product) => <ProductCard key={product.id} product={product} />)}</div></section></main>
}
