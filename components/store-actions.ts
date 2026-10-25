'use client'

import { migrateCartProductId, products } from '@/lib/products'

type CartItem = {
  productId: string
  quantity: number
  size: string
  colour: string
}

function emitCartUpdate() {
  window.dispatchEvent(new Event('bb-cart-updated'))
}

export function addToCart(item: CartItem) {
  const current = readCart()
  const existing = current.find(
    (candidate) =>
      candidate.productId === item.productId && candidate.size === item.size && candidate.colour === item.colour,
  )

  const next = existing
    ? current.map((candidate) =>
        candidate === existing ? { ...candidate, quantity: Math.min(candidate.quantity + item.quantity, 10) } : candidate,
      )
    : [...current, item]

  window.localStorage.setItem('bb-cart', JSON.stringify(next))
  emitCartUpdate()
}

export function toggleWishlist(productId: string) {
  const current = readWishlist()
  const next = current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
  window.localStorage.setItem('bb-wishlist', JSON.stringify(next))
  window.dispatchEvent(new Event('bb-wishlist-updated'))
}

export function readWishlist(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem('bb-wishlist') || '[]')
    return Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string' && products.some((product) => product.id === id)) : []
  } catch {
    return []
  }
}

export function readCart() {
  if (typeof window === 'undefined') {
    return [] as CartItem[]
  }

  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem('bb-cart') || '[]')
    if (!Array.isArray(stored)) return [] as CartItem[]
    return stored.map(item => item && typeof item === 'object' ? {
      productId: migrateCartProductId(item.productId, item.size),
      quantity: item.quantity, size: item.size, colour: item.colour,
    } : null).filter((item): item is CartItem => {
      if (!item || typeof item !== 'object') return false
      const product = products.find((product) => product.id === item.productId)
      return Boolean(product && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= Math.min(10, product.inventory) && product.sizes.includes(item.size) && product.colours.includes(item.colour))
    })
  } catch {
    return [] as CartItem[]
  }
}

export function clearCart() {
  window.localStorage.setItem('bb-cart', '[]')
  emitCartUpdate()
}
