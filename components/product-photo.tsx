'use client'

import { useState } from 'react'
import { ImageOff } from 'lucide-react'

export function ProductPhoto({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <div className="photo-unavailable" role="img" aria-label={alt}>
      <ImageOff size={28} aria-hidden="true" />
      <span>Product photo coming soon</span>
    </div>
  ) : (
    <img src={src} alt={alt} width={1024} height={1024} loading={priority ? 'eager' : 'lazy'} onError={() => setFailed(true)} />
  )
}
