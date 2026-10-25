'use client'
import Link from 'next/link'
import Image from 'next/image'
import { brandLogo } from '@/lib/site-assets'
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { readCart } from './store-actions'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/quality', label: 'Our Quality' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/about', label: 'About Us' },
]
export function SiteHeader() {
  const [cartCount, setCartCount] = useState(0)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href + '/'))
  function closeMenu() { dialog.current?.close() }
  useEffect(() => {
    const syncCount = () => setCartCount(readCart().reduce((sum, item) => sum + item.quantity, 0))
    syncCount()
    window.addEventListener('storage', syncCount)
    window.addEventListener('bb-cart-updated', syncCount)
    return () => { window.removeEventListener('storage', syncCount); window.removeEventListener('bb-cart-updated', syncCount) }
  }, [])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const media = window.matchMedia('(min-width: 981px)')
    const onResize = () => { if (media.matches) dialog.current?.close() }
    media.addEventListener('change', onResize)
    return () => { document.body.style.overflow = previousOverflow; media.removeEventListener('change', onResize) }
  }, [open])
  return <header className="site-header">
    <Link href="/" className="brand-lockup brand-with-logo" aria-label="Bee and Bear home"><Image src={brandLogo.src} alt={brandLogo.alt} width={brandLogo.width} height={brandLogo.height} sizes="(max-width: 700px) 60px, 92px" loading="eager" className="brand-logo" /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(item => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</Link>)}</nav>
    <div className="header-actions">
      <Link href="/products" aria-label="Browse products" className="icon-button hide-mobile"><Search size={18} /></Link>
      <Link href="/wishlist" aria-label="Wishlist" className="icon-button"><Heart size={18} /></Link>
      <Link href="/account" aria-label="Account" className="icon-button hide-mobile"><UserRound size={18} /></Link>
      <Link href="/cart" aria-label={`Shopping bag, ${cartCount} items`} className="icon-button bag-button"><ShoppingBag size={18} />{cartCount > 0 && <span aria-hidden="true">{cartCount}</span>}</Link>
      <button ref={opener} type="button" className="icon-button mobile-menu-button" aria-label="Open navigation" aria-haspopup="dialog" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => { dialog.current?.showModal(); setOpen(true) }}><Menu size={20} /></button>
    </div>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-menu-dialog" aria-label="Navigation" onClose={() => { setOpen(false); opener.current?.focus() }} onClick={event => { if (event.target === dialog.current) closeMenu() }}>
      <div className="mobile-menu-panel"><div className="mobile-menu-top"><span>Bee &amp; Bear</span><button type="button" autoFocus className="icon-button close-button" aria-label="Close navigation" onClick={closeMenu}><X size={20} /></button></div><nav aria-label="Mobile navigation">{navItems.map(item => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined} onClick={closeMenu}>{item.label}</Link>)}</nav></div>
    </dialog>
  </header>
}
