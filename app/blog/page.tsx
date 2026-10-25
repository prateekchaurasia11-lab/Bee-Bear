import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { journalPosts } from '@/lib/journal'

export const metadata = { title: 'Blog | Bee & Bear' }

export default function BlogPage() {
  return <main id="main-content" tabIndex={-1} className="editorial-page">
    <header className="editorial-heading"><span className="eyebrow">The Bee &amp; Bear journal</span><h1>Little stories. Everyday moments.</h1><p>A few thoughtful reads from our preview journal.</p></header>
    <section className="journal-grid" aria-label="Journal articles">
      {journalPosts.map((post, index) => <ScrollReveal key={post.slug} delay={index * .12} variant="zoom">
        <Link href={'/blog/' + post.slug} className="journal-card">
          <div className={'journal-image' + (index === 0 ? ' journal-lifestyle' : '')}><Image src={post.photo.src} alt={post.photo.alt} fill sizes="(max-width: 700px) 90vw, 420px" /></div>
          <div className="journal-card-copy"><span className="eyebrow">{post.category}</span><h2>{post.title}</h2><p>{post.excerpt}</p><span className="journal-read">Read story<ArrowUpRight size={18} /></span></div>
        </Link>
      </ScrollReveal>)}
    </section>
  </main>
}
