import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductPhoto } from '@/components/product-photo'
import { ProductPurchase } from '@/components/product-purchase'
import { findProduct, formatInr, products } from '@/lib/products'

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })) }

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = findProduct(slug)
  if (!product) notFound()
  const views = ['Pack front', 'Features', 'Pack value', 'Usage guide', 'Everyday moments']
  return (
    <main>
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/products">Shop</Link><span>/</span><span>Baby Pant Diapers</span></nav>
      <section className="product-detail">
        <div className="gallery"><div className="gallery-primary"><ProductPhoto src={product.images[0]} alt={`${product.name} - 75-piece pack`} priority /></div><div className="gallery-grid">{product.images.slice(1).map((image, index) => <figure key={image}><ProductPhoto src={image} alt={`${product.name}: ${views[index + 1]}`} /><figcaption>{views[index + 1]}</figcaption></figure>)}</div></div>
        <aside className="product-info"><span className="eyebrow">{product.collection}</span><h1>{product.name}</h1><p>{product.description}</p><div className="price-row"><span>{formatInr(product.price)}</span><small>75-piece pack</small></div><ProductPurchase product={product} /><div className="product-care"><h2>Use &amp; care</h2><p>{product.care}</p></div></aside>
      </section>
    </main>
  )
}
