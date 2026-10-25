import { LinkButton } from '@/components/ui/button'

export default function AboutPage() {
  return <main id="main-content" tabIndex={-1} className="content-page">
    <section><span className="eyebrow">About Bee &amp; Bear</span><h1>For your little one.</h1><p>Everyday care starts with the little things. Our client preview brings diapers, wipes and cotton buds together in one collection.</p><p>The original Bee &amp; Bear diaper pack has 75 pieces and confirmed Small and Medium choices. Medium packaging is labelled 7-12 kg.</p></section>
    <section><h2>A preview of what is next</h2><p>The wider catalogue includes sample Everyday, Premium, Overnight and Tape Diaper ranges, plus wipes and cotton buds. Each size has its own product card. These additional products, pack designs and prices are demonstrations for the client and need confirmation before launch.</p><LinkButton href="/products">Explore the collection</LinkButton></section>
  </main>
}
