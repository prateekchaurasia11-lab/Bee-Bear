'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { categories, type Product } from '@/lib/products'
import { ProductCard } from './product-card'

type Props = { items: Product[]; compact?: boolean; initialCategory?: string; initialType?: string }

export function Catalogue({ items, compact = false, initialCategory = 'All', initialType = 'All' }: Props) {
  const types = [...new Set(items.map(item => item.collection))]
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : 'All')
  const [type, setType] = useState(types.includes(initialType) ? initialType : 'All')
  const filtered = useMemo(() => items.filter(item =>
    (category === 'All' || item.category === category) &&
    (type === 'All' || item.collection === type),
  ), [items, category, type])

  function reset() { setCategory('All'); setType('All') }

  return (
    <div className="catalogue">
      <div className="category-filters" role="group" aria-label="Filter products by category">
        {['All', ...categories].map(option => <button key={option} type="button" aria-pressed={category === option}
          onClick={() => { setCategory(option); setType('All') }}>
          {option === 'All' ? 'All essentials' : option === 'Baby diapers' ? 'Diapers' : option === 'Baby wipes' ? 'Wipes' : 'Cotton buds'}
        </button>)}
      </div>
      <div className="catalogue-results">
        <p role="status">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}<span> · Sample collection</span></p>
        {(category !== 'All' || type !== 'All') && <button type="button" onClick={reset}><X size={14} />Clear filters</button>}
        {!compact && <span className="catalogue-helper"><SlidersHorizontal size={15} />Each size is a separate product</span>}
      </div>
      {filtered.length ? <div className="product-grid showroom-grid">{filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> :
        <div className="catalogue-empty"><h3>No little essentials found.</h3><p>Try another category or view the full collection.</p><button type="button" onClick={reset}>Reset filters</button></div>}
    </div>
  )
}
