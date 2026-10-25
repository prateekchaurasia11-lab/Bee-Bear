import { Catalogue } from '@/components/catalogue'
import { products } from '@/lib/products'

export const metadata = { title: 'Baby care collection | Bee & Bear' }

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string; type?: string }> }) {
  const params = await searchParams
  const category = typeof params.category === 'string' ? params.category : 'All'
  const type = typeof params.type === 'string' ? params.type : 'All'
  return (
    <main id="main-content" tabIndex={-1} className="showroom-shop">
      <header className="page-hero showroom-shop-heading">
        <span className="eyebrow">Bee &amp; Bear · The little essentials</span>
        <h1>Find their everyday favourites.</h1>
        <p>Diapers by size and type, wipes and cotton buds. Explore our sample collection with dummy prices.</p>
      </header>
      <section className="section catalogue-section" aria-label="Shop products">
        <Catalogue key={category + type} items={products} initialCategory={category} initialType={type} />
      </section>
    </main>
  )
}
