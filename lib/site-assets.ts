// Original client-supplied artwork, copied without altering the source files.
export const brandLogo = {
  src: '/brand/bee-and-bear-logo.png',
  width: 1254,
  height: 1254,
  alt: 'Bee & Bear - for your little one',
}

export const productPhotos = [
  {
    src: '/products/diapers-pack.jpg',
    width: 1220,
    height: 1447,
    alt: 'Bee & Bear 75-piece Medium diaper pack, labelled for 7-12 kg',
    caption: 'Pack front - Medium shown',
  },
  {
    src: '/products/diapers-features.png',
    width: 1024,
    height: 1024,
    alt: 'Bee & Bear promotional collage showing the pack, sleep, play, fitting and diaper features',
    caption: 'Features and everyday care',
  },
  {
    src: '/products/diapers-lifestyle.png',
    width: 1024,
    height: 1024,
    alt: 'Baby wearing a diaper and playing beside a Bee & Bear pack',
    caption: 'Everyday moments',
  },
]

// AI-generated concept packaging for the client showroom.
export const demoPhotos = {
  "premium": {
    "src": "/products/demo-premium.png",
    "width": 1254,
    "height": 1254,
    "alt": "Bee & Bear Premium Pants concept packaging for a client preview",
    "caption": "Concept packaging - client preview"
  },
  "taped": {
    "src": "/products/demo-taped.png",
    "width": 1254,
    "height": 1254,
    "alt": "Bee & Bear Tape Diapers concept packaging for a client preview",
    "caption": "Concept packaging - client preview"
  },
  "night": {
    "src": "/products/demo-night.png",
    "width": 1254,
    "height": 1254,
    "alt": "Bee & Bear Overnight Pants concept packaging for a client preview",
    "caption": "Concept packaging - client preview"
  },
  "wipes": {
    "src": "/products/demo-wipes.png",
    "width": 1254,
    "height": 1254,
    "alt": "Bee & Bear Baby Wipes concept packaging for a client preview",
    "caption": "Concept packaging - client preview"
  },
  "buds": {
    "src": "/products/demo-buds.png",
    "width": 1254,
    "height": 1254,
    "alt": "Bee & Bear Cotton Buds concept packaging for a client preview",
    "caption": "Concept packaging - client preview"
  }
}

export const allPhotos = [...productPhotos, ...Object.values(demoPhotos)]

// Original AI-generated lifestyle concepts for the showroom banners.
export const slideshowPhotos = {
 night: { src: '/slideshow/night-product-scene.webp', alt: 'Lifestyle concept: sleeping baby in a nighttime crib with a Bee & Bear Overnight Pants pack on the bedside table' },
 premium: { src: '/slideshow/premium-product-scene.webp', alt: 'Lifestyle concept: mother cuddling her baby beside a Bee & Bear Premium Pants pack standing on the nursery rug' },
 wipes: { src: '/slideshow/wipes-product-scene.webp', alt: 'Lifestyle concept: parent cleaning a baby’s hand beside a Bee & Bear wipes packet resting on the high-chair tray' },
 buds: { src: '/slideshow/buds-product-scene.webp', alt: 'Lifestyle concept: Bee & Bear Cotton Buds jar standing beside folded towels and a sage dish on a sunny bathroom shelf' },
}
