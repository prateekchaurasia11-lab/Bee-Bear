'use client'
import { useState } from 'react'
import { Button } from './ui/button'
export function StorageControls() {
  const [status, setStatus] = useState('')
  function clear(key: 'bb-cart' | 'bb-wishlist') {
    try {
      window.localStorage.removeItem(key)
      window.dispatchEvent(new Event(key === 'bb-cart' ? 'bb-cart-updated' : 'bb-wishlist-updated'))
      setStatus(key === 'bb-cart' ? 'Your shopping bag has been cleared on this device.' : 'Your wishlist has been cleared on this device.')
    } catch { setStatus('Browser storage is unavailable. You can clear site data in your browser settings.') }
  }
  return <div><div className="hero-actions"><Button variant="ghost" onClick={() => clear('bb-cart')}>Clear shopping bag</Button><Button variant="ghost" onClick={() => clear('bb-wishlist')}>Clear wishlist</Button></div><p role="status">{status}</p></div>
}
