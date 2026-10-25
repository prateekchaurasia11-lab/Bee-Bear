'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type MotionSectionProps = { children: ReactNode; className?: string; delay?: number; id?: string }

export function MotionSection({ children, className, delay = 0, id }: MotionSectionProps) {
  const reduced = useReducedMotion()
  return (
    <motion.section data-scroll-reveal id={id} className={className}
      initial={reduced ? false : { opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .1, margin: '0px 0px -24px 0px' }}
      transition={{ duration: .8, ease: [.22, 1, .36, 1], delay: reduced ? 0 : delay }}
    >{children}</motion.section>
  )
}
