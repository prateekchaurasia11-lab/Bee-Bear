import Image from 'next/image'
import { ClipboardList, Layers, Package } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { LinkButton } from '@/components/ui/button'
import { productPhotos } from '@/lib/site-assets'

export const metadata = { title: 'Our Quality | Bee & Bear' }

const principles = [
  { icon: Package, title: 'Know what is in the pack.', text: 'Pack contents and prices appear together, so every product is easy to understand at a glance.' },
  { icon: Layers, title: 'A clear choice of size.', text: 'Each diaper size has its own place in the collection. Final fit guidance belongs alongside the final pack information.' },
  { icon: ClipboardList, title: 'Useful, honest information.', text: 'We keep sample products and concept packaging clearly identified while the final range is being prepared.' },
]

export default function QualityPage() {
  return <main id="main-content" tabIndex={-1} className="editorial-page quality-page">
    <section className="quality-intro">
      <ScrollReveal className="quality-intro-copy"><span className="eyebrow">Our Quality</span><h1>Thoughtful choices start with clear information.</h1><p>For your little one, every detail matters. We want the Bee &amp; Bear collection to be straightforward to explore, compare and understand.</p><LinkButton href="/products">Explore the collection</LinkButton></ScrollReveal>
      <ScrollReveal className="quality-photo" variant="zoom" delay={.12}><Image src={productPhotos[0].src} alt={productPhotos[0].alt} fill loading="eager" sizes="(max-width: 700px) 90vw, 500px" /></ScrollReveal>
    </section>
    <section className="quality-principles" aria-label="Our approach">
      {principles.map(({ icon: Icon, title, text }, index) => <ScrollReveal key={title} delay={index * .12}><Icon size={28} aria-hidden="true" /><h2>{title}</h2><p>{text}</p></ScrollReveal>)}
    </section>
    <ScrollReveal className="quality-details"><span className="eyebrow">A closer look</span><h2>Good to know.</h2>
      <details><summary>What can I see on the original pack?</summary><p>The supplied Medium diaper pack is labelled 75 pieces and 7-12 kg. Small and Medium are the original confirmed size choices.</p></details>
      <details><summary>Are these the final products and prices?</summary><p>This is a client preview. Additional ranges, pack designs and prices are samples and will be confirmed before launch.</p></details>
      <details><summary>Where will final product information appear?</summary><p>Final size guidance, pack contents, use instructions and any verified product claims will be published with the confirmed range. We do not present unverified certifications or test results.</p></details>
    </ScrollReveal>
  </main>
}
