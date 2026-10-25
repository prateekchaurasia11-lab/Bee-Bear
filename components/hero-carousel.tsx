'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import { ArrowLeft, ArrowRight, Pause, Play, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from 'react'
import { demoPhotos, productPhotos, slideshowPhotos } from '@/lib/site-assets'
import { LinkButton } from './ui/button'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
function getReducedMotion() { return window.matchMedia(reducedMotionQuery).matches }
function getServerReducedMotion() { return false }

const rangePacks = [
  { photo: demoPhotos.wipes, kind: 'wipes' },
  { photo: demoPhotos.taped, kind: 'taped' },
  { photo: demoPhotos.premium, kind: 'premium' },
  { photo: demoPhotos.night, kind: 'night' },
  { photo: demoPhotos.buds, kind: 'buds' },
]

const slides = [
  {
    id: 'collection', eyebrow: 'A little world of Bee & Bear',
    title: 'Little essentials. Lots of love.',
    text: 'Diapers, wipes & cotton buds. Discover the whole sample collection.',
    link: '/products', action: 'Explore the collection',
    photo: demoPhotos.premium, scene: false, theme: 'collection', lifestyle: false,
  },
  {
    id: 'everyday', eyebrow: 'Little moments. Everyday essentials.',
    title: 'A little comfort. A lot of love.',
    text: 'Discover a world of baby-care essentials, starting with our everyday diaper collection.',
    link: '/products?category=Baby%20diapers', action: 'Explore diapers',
    photo: productPhotos[2], scene: false, theme: 'mint', lifestyle: true,
  },
  {
    id: 'premium', eyebrow: 'Happy moments, held close',
    title: 'Soft moments. Happy little smiles.',
    text: 'A cuddle, a giggle, a moment together. Meet our sample Premium Pants collection, size by size.',
    link: '/products?type=Premium%20Pants', action: 'Discover Premium Pants',
    photo: slideshowPhotos.premium, scene: true, theme: 'lavender', lifestyle: true,
  },
  {
    id: 'night', eyebrow: 'When their little world winds down',
    title: 'For their sweetest little dreams.',
    text: 'Quiet moments, sleepy smiles. Explore the sample Overnight Pants collection in Medium, Large, XL and XXL.',
    link: '/products?type=Overnight%20Pants', action: 'Explore Overnight Pants',
    photo: slideshowPhotos.night, scene: true, theme: 'midnight', lifestyle: true,
  },
  {
    id: 'wipes', eyebrow: 'From snack time to the next adventure',
    title: 'For life’s little messes.',
    text: 'Little hands, happy moments. Explore our sample wipes collection for the everyday care corner.',
    link: '/products?category=Baby%20wipes', action: 'Browse baby wipes',
    photo: slideshowPhotos.wipes, scene: true, theme: 'peach', lifestyle: true,
  },
  {
    id: 'buds', eyebrow: 'A thoughtful little care corner',
    title: 'Little details. Everyday care.',
    text: 'Cotton buds and a tidy after-bath setup. Complete the sample care collection in one happy place.',
    link: '/products?category=Cotton%20buds', action: 'Discover cotton buds',
    photo: slideshowPhotos.buds, scene: true, theme: 'sage', lifestyle: true,
  },
]

type Slide = typeof slides[number]

function CarouselSlide({ slide, direction, reduced }: { slide: Slide; direction: number; reduced: boolean }) {
  const present = useIsPresent()
  return (
    <motion.div
      className={'showcase-slide theme-' + slide.theme + (slide.id === 'collection' ? ' range-slide' : slide.scene ? ' scene-banner' : '')}
      role="group" aria-roledescription="slide" aria-label={slide.title}
      aria-hidden={!present} inert={!present}
      custom={direction}
      variants={{
        enter: (step: number) => ({ x: step > 0 ? '100%' : '-100%' }),
        center: { x: 0, opacity: 1 },
        leave: (step: number) => reduced ? { opacity: 0 } : { x: step > 0 ? '-100%' : '100%' },
      }}
      initial={reduced ? false : 'enter'}
      animate="center"
      exit="leave"
      transition={{ duration: reduced ? 0 : .7, ease: [0.22, 0.68, 0.15, 1] }}
    >
      {slide.id === 'collection' ? <>
        <div className="range-room" aria-hidden="true"><span /><span /><span /></div>
        <div className="range-heading">
          <span className="slide-eyebrow">{slide.eyebrow}</span>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
        </div>
        <div className="range-packs">
          {rangePacks.map(({ photo, kind }) => <div className={'range-pack range-pack-' + kind} key={kind}>
            <Image src={photo.src} alt={photo.alt} fill loading="eager" draggable={false}
              sizes="(max-width: 700px) 31vw, 24vw" />
          </div>)}
        </div>
        <Link href="/products" className="range-collection-link">{slide.action}<ArrowRight size={17} aria-hidden="true" /></Link>
        <span className="range-preview-note">Concept packaging · sample collection</span>
      </> : <>
      <div className={'slide-visual' + (slide.lifestyle ? ' slide-lifestyle' : ' slide-concept') + (slide.scene ? ' scene-visual scene-' + slide.id : '')}>
        {!slide.lifestyle && <span className="slide-orbit" aria-hidden="true" />}
        <Image src={slide.photo.src} alt={slide.photo.alt} fill loading="eager" draggable={false}
          sizes="(max-width: 700px) 100vw, 55vw" className="slide-photo" />
        {!slide.lifestyle && <span className="slide-art-label">Concept packaging</span>}
      </div>
      <div className="slide-copy">
        <span className="slide-eyebrow"><Sparkles size={16} aria-hidden="true" />{slide.eyebrow}</span>
        <h1>{slide.title}</h1>
        <p>{slide.text}</p>
        <div className="hero-actions">
          <LinkButton href={slide.link}>{slide.action}<ArrowRight size={17} aria-hidden="true" /></LinkButton>
          <Link href="/products" className="slide-secondary">View all products</Link>
        </div>
        <span className="slide-preview-note">Client preview · sample products and prices</span>
      </div>
      </>}
    </motion.div>
  )
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [autoPlay, setAutoPlay] = useState(true)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const [hidden, setHidden] = useState(false)
  // The server snapshot must match the first browser render before reading device preferences.
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion)
  const gesture = useRef<{ x: number; y: number } | null>(null)
  const rotating = autoPlay && !reduceMotion && !keyboardFocused && !hidden

  useEffect(() => {
    const syncVisibility = () => setHidden(document.hidden)
    syncVisibility()
    document.addEventListener('visibilitychange', syncVisibility)
    return () => document.removeEventListener('visibilitychange', syncVisibility)
  }, [])

  useEffect(() => {
    if (!rotating) return
    const timer = window.setInterval(() => {
      setDirection(1)
      setIndex(current => (current + 1) % slides.length)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [rotating, index])

  function change(next: number, step = 1) {
    setDirection(step)
    setIndex((next + slides.length) % slides.length)
  }

  function pointerStart(event: PointerEvent<HTMLElement>) {
    setKeyboardFocused(false)
    if ((event.target as HTMLElement).closest('a, button')) return
    gesture.current = { x: event.clientX, y: event.clientY }
  }

  function pointerEnd(event: PointerEvent<HTMLElement>) {
    if (!gesture.current) return
    const dx = event.clientX - gesture.current.x
    const dy = event.clientY - gesture.current.y
    gesture.current = null
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) change(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1)
  }

  return (
    <section className="hero-carousel" aria-label="Explore Bee and Bear" aria-roledescription="carousel"
      onFocusCapture={event => {
        if ((event.target as HTMLElement).matches(':focus-visible')) setKeyboardFocused(true)
      }}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false)
      }}
      onPointerDown={pointerStart} onPointerUp={pointerEnd} onPointerCancel={() => { gesture.current = null }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); setKeyboardFocused(true); change(index - 1, -1) }
        if (event.key === 'ArrowRight') { event.preventDefault(); setKeyboardFocused(true); change(index + 1, 1) }
      }}
    >
      <button type="button" className="carousel-rotation carousel-keyboard-control"
        aria-label={autoPlay && !reduceMotion ? 'Pause automatic slides' : 'Play automatic slides'}
        onClick={() => {
          setAutoPlay(current => !current)
          setKeyboardFocused(false)
        }}
        disabled={Boolean(reduceMotion)}
      >
        {autoPlay && !reduceMotion ? <Pause size={16} /> : <Play size={16} />}
        <span>{reduceMotion ? 'Motion reduced' : autoPlay ? 'Pause' : 'Play'}</span>
      </button>

      <div className="carousel-stage" aria-live={rotating ? 'off' : 'polite'} aria-atomic="false">
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          <CarouselSlide key={slides[index].id} slide={slides[index]} direction={direction} reduced={Boolean(reduceMotion)} />
        </AnimatePresence>
      </div>

      <button type="button" className="carousel-arrow carousel-previous" aria-label="Previous banner" onClick={() => change(index - 1, -1)}><ArrowLeft size={24} /></button>
      <button type="button" className="carousel-arrow carousel-next" aria-label="Next banner" onClick={() => change(index + 1, 1)}><ArrowRight size={24} /></button>
      <div className="carousel-dots" role="group" aria-label="Choose banner">
        {slides.map((slide, target) => <button key={slide.id} type="button" aria-label={'Show banner ' + (target + 1) + ': ' + slide.title}
          aria-current={target === index ? 'true' : undefined} onClick={() => change(target, target >= index ? 1 : -1)}>
          <span />
        </button>)}
      </div>
      <span className="carousel-count" aria-hidden="true">{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
    </section>
  )
}
