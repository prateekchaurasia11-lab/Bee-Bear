import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/products'

export default function ProductsPage() {
  return (
    <main>
      <header className="page-hero"><span className="eyebrow">Shop Bee &amp; Bear</span><h1>Baby diapers</h1><p>Everyday comfort for your little one. Small and Medium pant diapers in a 75-piece pack.</p></header>
      <section className="section catalogue-section" aria-label="Products"><p className="catalogue-count">1 product</p><div className="product-grid single-product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    </main>
  )
}
