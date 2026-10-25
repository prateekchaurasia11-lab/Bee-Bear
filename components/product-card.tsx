'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Heart, Plus } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { formatInr, type Product } from '@/lib/products'
import { addToCart, readWishlist, toggleWishlist } from './store-actions'
import { ProductPhoto } from './product-photo'

type ProductCardProps = { product: Product; index?: number }

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const reduceMotion = useReducedMotion()
  const [saved, setSaved] = useState(false)
  const [added, setAdded] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const sync = () => setSaved(readWishlist().includes(product.id))
    sync()
    window.addEventListener('bb-wishlist-updated', sync)
    window.addEventListener('storage', sync)
    return () => { window.removeEventListener('bb-wishlist-updated', sync); window.removeEventListener('storage', sync) }
  }, [product.id])

  return (
    <motion.article data-scroll-reveal className={'product-card showroom-card range-' + product.collection.toLowerCase().replace(/\s+/g, '-')}
      initial={reduceMotion ? false : { opacity: 0, y: 34, scale: .98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: .12, margin: '0px 0px -16px 0px' }}
      transition={{ duration: .7, delay: Math.min(index % 4 * .1, .3), ease: [.22, 1, .36, 1] }}
    >
      <div className="card-photo-area">
        <Link href={'/products/' + product.slug} className="product-image-wrap" aria-label={'View ' + product.name}>
          <ProductPhoto src={product.images[0]} alt={product.name + ' sample product image'} />
        </Link>
        <span className="card-size-badge">{product.category === 'Baby diapers' ? product.sizes[0] : product.packLabel}</span>
        <button type="button" className="card-wishlist"
          aria-label={(saved ? 'Remove ' : 'Add ') + product.name + (saved ? ' from' : ' to') + ' wishlist'} aria-pressed={saved}
          onClick={() => {
            try { toggleWishlist(product.id); setStatus(saved ? 'Removed from wishlist.' : 'Saved to wishlist.') }
            catch { setStatus('Browser storage is unavailable.') }
          }}><Heart size={19} fill={saved ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="product-card-body">
        <p className="card-range">{product.category === 'Baby diapers' ? product.collection : product.category}</p>
        <h3><Link href={'/products/' + product.slug}>{product.name}</Link></h3>
        <p className="card-pack">{product.packLabel}</p>
        <div className="card-price-row"><strong>{formatInr(product.price)}</strong><span>Demo price</span></div>
      </div>
      <div className="product-card-actions">
        <button type="button" className="card-add" disabled={product.inventory === 0}
          aria-label={'Add ' + product.name + ', ' + product.packLabel + ', to bag'}
          onClick={() => {
            try {
              addToCart({ productId: product.id, quantity: 1, size: product.sizes[0], colour: product.colours[0] })
              setAdded(true); setStatus(product.name + ' added to your bag.')
            } catch { setStatus('Could not save your bag. Browser storage may be unavailable.') }
          }}>{added ? <Check size={16} /> : <Plus size={16} />}{added ? 'Added' : 'Add to bag'}</button>
        <Link href={'/products/' + product.slug} className="card-details-link" aria-label={'View details for ' + product.name}><ArrowUpRight size={20} /></Link>
      </div>
      <p className="wishlist-status sr-only" role="status">{status}</p>
    </motion.article>
  )
}
