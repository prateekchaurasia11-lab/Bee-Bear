import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductPhoto } from '@/components/product-photo'
import { ProductPurchase } from '@/components/product-purchase'
import { ProductCard } from '@/components/product-card'
import { findProduct, formatInr, getRelatedProducts, products } from '@/lib/products'
import { allPhotos } from '@/lib/site-assets'

export function generateStaticParams() { return products.map(product => ({ slug: product.slug })) }

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = findProduct(slug)
  if (!product) notFound()
  const related = getRelatedProducts(product)
  return (
    <main id="main-content" tabIndex={-1} className="showroom-detail">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/products">Shop</Link><span>/</span><Link href={'/products?category=' + encodeURIComponent(product.category)}>{product.category}</Link><span>/</span><span>{product.name}</span></nav>
      <section className="product-detail">
        <div className="gallery">
          <div className={'gallery-primary' + (product.collection === 'Everyday Pants' ? '' : ' gallery-concept')}><ProductPhoto src={product.images[0]} alt={product.name} priority /></div>
          <p className="gallery-note">{product.imageNote}</p>
          {product.images.length > 1 && <div className="gallery-grid">{product.images.slice(1).map(image => {
            const photo = allPhotos.find(candidate => candidate.src === image)
            return <figure key={image}><ProductPhoto src={image} alt={photo?.alt || product.name} /><figcaption>{photo?.caption || 'Product view'}</figcaption></figure>
          })}</div>}
        </div>
        <aside className="product-info">
          <span className="eyebrow">{product.collection} · Client preview</span><h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="price-row"><span>{formatInr(product.price)}</span><small>{product.packLabel}</small><small>Demo price · final price to be confirmed</small></div>
          <ProductPurchase product={product} />
          <p><Link href={'/products?type=' + encodeURIComponent(product.collection)}>View other packs in this range</Link></p>
          <div className="product-care"><h2>Product information</h2><p>{product.care}</p><p>No live order is placed through this preview.</p></div>
        </aside>
      </section>
      {related.length > 0 && <section className="section related-products"><div className="showroom-heading"><span className="eyebrow">Keep exploring</span><h2>A few more little essentials.</h2></div><div className="product-grid showroom-grid">{related.map((item, index) => <ProductCard key={item.id} product={item} index={index} />)}</div></section>}
    </main>
  )
}
