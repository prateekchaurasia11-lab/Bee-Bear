'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { allPhotos } from '@/lib/site-assets'

export function ProductPhoto({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false)
  const photo = allPhotos.find(candidate => candidate.src === src)
  return failed ? (
    <div className="photo-unavailable" role="img" aria-label={alt}>
      <ImageOff size={28} aria-hidden="true" /><span>Photo could not load. Please refresh the page.</span>
    </div>
  ) : (
    <Image src={src} alt={alt} width={photo?.width || 1024} height={photo?.height || 1024}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 700px) 45vw, (max-width: 1050px) 30vw, 320px"
      onError={() => setFailed(true)} />
  )
}
