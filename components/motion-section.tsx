'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type MotionSectionProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function MotionSection({ children, className, delay = 0 }: MotionSectionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.section>
  )
}
