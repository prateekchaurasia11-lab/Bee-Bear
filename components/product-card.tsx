'use client'

import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { formatInr, type Product } from '@/lib/products'
import { toggleWishlist } from './store-actions'
import { ProductPhoto } from './product-photo'

type ProductCardProps = {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="product-card"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
    >
      <Link href={`/products/${product.slug}`} className="product-image-wrap">
        <ProductPhoto src={product.images[0]} alt={product.name} />
        <span>{product.badges[0]}</span>
      </Link>
      <div className="product-card-body">
        <div>
          <p>{product.category}</p>
          <h3>
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <strong>{formatInr(product.price)}</strong>
      </div>
      <div className="product-card-actions">
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart size={16} />
        </button>
        <Link href={`/products/${product.slug}`} className="card-details-link">
          Choose size <ArrowRight size={16} />
        </Link>
      </div>
    </motion.article>
  )
}
