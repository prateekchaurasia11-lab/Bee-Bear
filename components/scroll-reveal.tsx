'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import type { ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; delay?: number; variant?: 'up' | 'zoom' }

export function ScrollReveal({ children, className, delay = 0, variant = 'up' }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.div data-scroll-reveal className={className}
      initial={reduced ? false : { opacity: 0, y: variant === 'zoom' ? 26 : 40, scale: variant === 'zoom' ? .95 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: .12, margin: '0px 0px -24px 0px' }}
      transition={{ duration: .8, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}
    >{children}</motion.div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: .001 })
  const reduced = useReducedMotion()
  return <motion.div className="reading-progress" aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : smoothProgress }} />
}
