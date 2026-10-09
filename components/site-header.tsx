'use client'

import Link from 'next/link'
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { readCart } from './store-actions'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Support' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const syncCount = () => {
      const parsed = readCart()
      setCartCount(parsed.reduce((sum, item) => sum + Number(item.quantity || 0), 0))
    }

    syncCount()
    window.addEventListener('storage', syncCount)
    window.addEventListener('bb-cart-updated', syncCount)
    return () => {
      window.removeEventListener('storage', syncCount)
      window.removeEventListener('bb-cart-updated', syncCount)
    }
  }, [])

  return (
    <header className="site-header">
      <Link href="/" className="brand-lockup" aria-label="Bee and Bear home">
        <span className="brand-mark">B&amp;B</span>
        <span>
          <strong>Bee &amp; Bear</strong>
          <small>for your little one</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link href="/products" aria-label="Browse products" title="Browse products" className="icon-button hide-mobile">
          <Search size={18} />
        </Link>
        <Link href="/wishlist" aria-label="Wishlist" className="icon-button">
          <Heart size={18} />
        </Link>
        <Link href="/account" aria-label="Account" className="icon-button hide-mobile">
          <UserRound size={18} />
        </Link>
        <Link href="/cart" aria-label="Shopping bag" className="icon-button bag-button">
          <ShoppingBag size={18} />
          <AnimatePresence mode="popLayout">
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={reduceMotion ? false : { scale: 0.65, y: 6 }}
                animate={reduceMotion ? undefined : { scale: 1, y: 0 }}
                exit={reduceMotion ? undefined : { scale: 0.65, y: -6, opacity: 0 }}
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button className="icon-button mobile-menu-button" aria-label="Open navigation" onClick={() => setOpen(true)}>
          <Menu size={20} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          >
            <motion.div
              className="mobile-menu-panel"
              initial={reduceMotion ? false : { x: '100%' }}
              animate={reduceMotion ? undefined : { x: 0 }}
              exit={reduceMotion ? undefined : { x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="icon-button close-button" aria-label="Close navigation" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
