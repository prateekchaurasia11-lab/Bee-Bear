import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ScrollReveal } from '@/components/scroll-reveal'
import { LinkButton } from '@/components/ui/button'
import { findJournalPost, journalPosts } from '@/lib/journal'

export function generateStaticParams() { return journalPosts.map(post => ({ slug: post.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = findJournalPost(slug)
  return { title: post ? post.title + ' | Bee & Bear Journal' : 'Journal | Bee & Bear' }
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = findJournalPost(slug)
  if (!post) notFound()
  return <main id="main-content" tabIndex={-1} className="editorial-page journal-post">
    <nav className="journal-breadcrumb" aria-label="Breadcrumb"><Link href="/blog">Blog</Link><span>/</span><span>{post.category}</span></nav>
    <header className="editorial-heading"><span className="eyebrow">{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p></header>
    <ScrollReveal className={'journal-cover' + (post.slug === 'a-place-for-the-little-things' ? ' journal-lifestyle' : '')} variant="zoom"><Image src={post.photo.src} alt={post.photo.alt} fill loading="eager" sizes="(max-width: 700px) 95vw, 1040px" /></ScrollReveal>
    <article className="journal-body">
      {post.sections.map((section, index) => <ScrollReveal key={section.title} delay={index * .06}><h2>{section.title}</h2><p>{section.text}</p></ScrollReveal>)}
      <ScrollReveal><p className="journal-note">From the Bee &amp; Bear client-preview journal. Product ranges and prices shown in the store are samples.</p><LinkButton href={post.link}>{post.action}</LinkButton></ScrollReveal>
    </article>
  </main>
}
