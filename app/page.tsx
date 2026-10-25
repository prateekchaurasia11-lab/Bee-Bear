import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Layers, Package, Sparkles } from 'lucide-react'
import { Catalogue } from '@/components/catalogue'
import { HeroCarousel } from '@/components/hero-carousel'
import { MotionSection } from '@/components/motion-section'
import { ScrollReveal } from '@/components/scroll-reveal'
import { LinkButton } from '@/components/ui/button'
import { featuredProducts, products } from '@/lib/products'
import { demoPhotos, productPhotos } from '@/lib/site-assets'

const categoryCards = [
  { title: 'Diapers', label: 'From tiny beginnings to busy little steps', category: 'Baby diapers', photo: productPhotos[0], theme: 'mint' },
  { title: 'Baby wipes', label: 'Little packs for everyday moments', category: 'Baby wipes', photo: demoPhotos.wipes, theme: 'peach' },
  { title: 'Cotton buds', label: 'Complete the care collection', category: 'Cotton buds', photo: demoPhotos.buds, theme: 'lavender' },
]
const benefits = [
  { icon: Heart, title: 'For your little one', text: 'Thoughtfully presented essentials' },
  { icon: Layers, title: 'A size for every stage', text: 'Explore each size separately' },
  { icon: Package, title: 'All the little essentials', text: 'Diapers, wipes and cotton buds' },
  { icon: Sparkles, title: 'A preview of what is next', text: 'Sample collection and prices' },
]

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell showroom-home">
      <HeroCarousel />
      <div className="showroom-benefits">
        {benefits.map(({ icon: Icon, title, text }, index) => <ScrollReveal key={title} delay={index * .08}><Icon size={24} /><span><strong>{title}</strong><small>{text}</small></span></ScrollReveal>)}
      </div>

      <section className="section category-section">
        <ScrollReveal className="showroom-heading"><span className="eyebrow">Their little world, all in one place</span><h2>Find your everyday essentials.</h2><p>Meet the collection, one little category at a time.</p></ScrollReveal>
        <div className="category-card-grid">
          {categoryCards.map((card, index) => <ScrollReveal key={card.category} delay={index * .13} variant="zoom">
            <Link href={'/products?category=' + encodeURIComponent(card.category)} className={'category-tile theme-' + card.theme}>
              <div><span>{products.filter(item => item.category === card.category).length} sample products</span><h3>{card.title}</h3><p>{card.label}</p><span className="category-explore">Explore collection<ArrowRight size={17} /></span></div>
              <div className="category-photo"><Image src={card.photo.src} alt={card.photo.alt} fill sizes="(max-width: 700px) 45vw, 200px" /></div>
            </Link>
          </ScrollReveal>)}
        </div>
      </section>

      <section className="section featured-section" id="collection">
        <ScrollReveal className="showroom-heading"><span className="eyebrow">Little favourites, big possibilities</span><h2>Meet the Bee &amp; Bear collection.</h2><p>Different sizes. Different styles. Every one with its own product card.</p></ScrollReveal>
        <Catalogue items={featuredProducts} compact />
        <ScrollReveal className="collection-more"><LinkButton href="/products">Explore all {products.length} products<ArrowRight size={17} /></LinkButton></ScrollReveal>
      </section>

      <section className="section">
        <div className="showroom-story">
          <ScrollReveal className="story-image" variant="zoom"><Image src={productPhotos[2].src} alt={productPhotos[2].alt} width={1024} height={1024} sizes="(max-width: 700px) 90vw, 50vw" /></ScrollReveal>
          <ScrollReveal className="story-copy" delay={.16}><span className="eyebrow">Bee &amp; Bear · For your little one</span><h2>Made for the little moments.</h2><p>A morning cuddle. A new little step. A changing bag packed and ready. Discover how the Bee &amp; Bear collection could become part of their everyday world.</p><p className="story-note">This client preview includes sample products and concept packaging. The final range, specifications and prices will be confirmed before launch.</p><LinkButton href="/about" variant="ghost">Our story<ArrowRight size={17} /></LinkButton></ScrollReveal>
        </div>
      </section>

      <MotionSection className="section">
        <div className="showroom-help"><span className="eyebrow">A little help, whenever you need it</span><h2>Let us find their next little essential.</h2><p>Questions about the collection? We are an email away.</p><LinkButton href="/contact">Contact Bee &amp; Bear<ArrowRight size={17} /></LinkButton></div>
      </MotionSection>
    </main>
  )
}
