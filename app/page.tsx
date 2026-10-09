import Image from 'next/image'
import Link from 'next/link'
import { Feather, Heart, HeartHandshake, Package, ShieldCheck } from 'lucide-react'
import { MotionSection } from '@/components/motion-section'
import { ProductCard } from '@/components/product-card'
import { LinkButton } from '@/components/ui/button'
import { categories, featuredProducts } from '@/lib/products'

const heroImages = [
  'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1300&q=82',
  'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=82',
]

const benefits = [
  { icon: Package, title: '75 in every pack', text: 'A practical value pack for everyday diaper changes.' },
  { icon: Feather, title: 'Soft, stretchy comfort', text: 'Pant-style diapers for your little one\'s everyday routine.' },
  { icon: HeartHandshake, title: 'Parent-first care', text: 'Clear size choices and help when you need it.' },
  { icon: ShieldCheck, title: 'Secure checkout', text: 'Pay in INR through Razorpay test checkout.' },
]

export default function HomePage() {
  return (
    <main className="page-shell original-home">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Bee &amp; Bear - for your little one</span>
          <h1>Luxury baby gifting, wrapped in warmth.</h1>
          <p>Soft little essentials for thoughtful Indian families. Discover our 75-piece baby pant diaper pack, available in Small and Medium.</p>
          <div className="hero-actions">
            <LinkButton href="/products">Shop essentials</LinkButton>
            <LinkButton href="/about" variant="ghost">Our story</LinkButton>
          </div>
          <div className="trust-row" aria-label="Pack details">
            <span>75-piece pack</span><span>Small &amp; Medium</span><span>INR pricing</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Baby lifestyle photography">
          <div className="floating-bee" aria-hidden="true">Bee</div>
          <div className="floating-heart" aria-hidden="true"><Heart size={22} /></div>
          <div className="hero-photo large">
            <Image src={heroImages[0]} alt="Baby lifestyle photograph" fill priority sizes="(max-width: 980px) 90vw, 48vw" />
          </div>
          <div className="hero-photo small">
            <Image src={heroImages[1]} alt="A little moment of baby care" fill sizes="(max-width: 980px) 45vw, 24vw" />
          </div>
          <div className="floating-note">
            <strong>Everyday comfort</strong>
            <span>A soft feel, a stretchy fit, and 75 little changes in every pack.</span>
          </div>
        </div>
      </section>

      <MotionSection className="section">
        <div className="section-heading">
          <div><span className="eyebrow">Our collection</span><h2>Thoughtful essentials for little beginnings.</h2></div>
          <div className="collection-strip">
            {categories.map((category) => <Link key={category} href="/products">{category}</Link>)}
          </div>
        </div>
        <div className="product-grid single-product-grid">
          {featuredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </MotionSection>

      <MotionSection className="section">
        <div className="editorial-panel">
          <div className="editorial-image">
            <Image
              src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1000&q=82"
              alt="A quiet moment together"
              width={900}
              height={900}
              sizes="(max-width: 980px) 90vw, 40vw"
            />
          </div>
          <div>
            <span className="eyebrow">Everyday care</span>
            <h2>Quiet luxury for the first chapter.</h2>
            <p>From the first change of the morning to the last cuddle of the day, it is the little things that matter. Bee &amp; Bear brings a soft touch to your baby-care routine.</p>
            <div className="hero-actions">
              <LinkButton href="/about" variant="secondary">Our story</LinkButton>
              <LinkButton href="/contact" variant="ghost">Ask for help</LinkButton>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section">
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="benefit-card"><Icon size={26} /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </MotionSection>
    </main>
  )
}
