import { productPhotos, demoPhotos } from './site-assets'

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  collection: string
  price: number
  mrp?: number
  rating: number
  reviews: number
  inventory: number
  sizes: string[]
  colours: string[]
  images: string[]
  description: string
  care: string
  badges: string[]
  packLabel: string
  weightRange?: string
  imageNote: string
  concept: boolean
}

export const catalogueIsPreview = true
export const categories = ['Baby diapers', 'Baby wipes', 'Cotton buds']
export const diaperRanges = ['Everyday Pants', 'Premium Pants', 'Overnight Pants', 'Tape Diapers']

type PackSpec = { size: string; count: number; price: number }
type RangeSpec = {
  key: string
  name: string
  category: string
  unit: string
  image: string
  packs: PackSpec[]
}

const ranges: RangeSpec[] = [
  {
    key: 'everyday', name: 'Everyday Pants', category: 'Baby diapers', unit: 'diapers',
    image: productPhotos[0].src,
    packs: [
      { size: 'Small', count: 75, price: 799 },
      { size: 'Medium', count: 75, price: 799 },
      { size: 'Large', count: 64, price: 649 },
      { size: 'XL', count: 56, price: 599 },
      { size: 'XXL', count: 48, price: 549 },
    ],
  },
  {
    key: 'premium', name: 'Premium Pants', category: 'Baby diapers', unit: 'diapers',
    image: demoPhotos.premium.src,
    packs: [
      { size: 'Small', count: 44, price: 499 },
      { size: 'Medium', count: 42, price: 549 },
      { size: 'Large', count: 40, price: 599 },
      { size: 'XL', count: 36, price: 649 },
      { size: 'XXL', count: 32, price: 699 },
    ],
  },
  {
    key: 'overnight', name: 'Overnight Pants', category: 'Baby diapers', unit: 'diapers',
    image: demoPhotos.night.src,
    packs: [
      { size: 'Medium', count: 30, price: 549 },
      { size: 'Large', count: 28, price: 599 },
      { size: 'XL', count: 26, price: 649 },
      { size: 'XXL', count: 24, price: 699 },
    ],
  },
  {
    key: 'tape', name: 'Tape Diapers', category: 'Baby diapers', unit: 'diapers',
    image: demoPhotos.taped.src,
    packs: [
      { size: 'Newborn', count: 36, price: 299 },
      { size: 'Small', count: 42, price: 349 },
      { size: 'Medium', count: 40, price: 399 },
      { size: 'Large', count: 36, price: 449 },
    ],
  },
  {
    key: 'wipes', name: 'Baby Wipes', category: 'Baby wipes', unit: 'wipes',
    image: demoPhotos.wipes.src,
    packs: [
      { size: 'Travel pack', count: 20, price: 49 },
      { size: 'Single pack', count: 80, price: 149 },
      { size: 'Twin pack', count: 160, price: 269 },
    ],
  },
  {
    key: 'buds', name: 'Cotton Buds', category: 'Cotton buds', unit: 'buds',
    image: demoPhotos.buds.src,
    packs: [
      { size: '56 pieces', count: 56, price: 79 },
      { size: '100 pieces', count: 100, price: 119 },
    ],
  },
]

export const products: Product[] = ranges.flatMap(range => range.packs.map(pack => {
  const sizeKey = pack.size.toLowerCase().replace(/\s+/g, '-')
  const isOriginalMedium = range.key === 'everyday' && pack.size === 'Medium'
  const isOriginalSmall = range.key === 'everyday' && pack.size === 'Small'
  return {
    id: isOriginalMedium ? 'bb-diapers-75' : isOriginalSmall ? 'bb-diapers-75-small' : 'bb-' + range.key + '-' + sizeKey,
    slug: isOriginalMedium ? 'baby-pant-diapers-75-pack' : range.key + '-' + sizeKey + '-' + pack.count + '-pack',
    name: range.name + ' - ' + pack.size,
    category: range.category,
    collection: range.name,
    price: pack.price,
    rating: 0,
    reviews: 0,
    inventory: 100,
    sizes: [pack.size],
    colours: ['White'],
    images: range.key === 'everyday' ? productPhotos.map(photo => photo.src) : [range.image],
    description: range.name + ', ' + pack.size + ', in a pack of ' + pack.count + ' ' + range.unit + '. A sample listing to show the Bee & Bear collection. Final specifications and prices will be confirmed before launch.',
    care: 'Demonstration listing. Follow the final product packaging for fit, use and storage instructions.',
    badges: [range.category === 'Baby diapers' ? pack.size : pack.count + ' pieces'],
    packLabel: pack.count + ' ' + range.unit,
    weightRange: isOriginalMedium ? '7-12 kg (as labelled on the supplied Medium pack)' : undefined,
    imageNote: range.key === 'everyday' ? 'Original Medium pack pictured for this size preview. Final pack artwork may differ.' : 'Concept packaging for this client preview. Final product artwork is pending.',
    concept: !(isOriginalSmall || isOriginalMedium),
  }
}))

const featuredIds = [
  'bb-diapers-75-small', 'bb-diapers-75', 'bb-everyday-large',
  'bb-premium-medium', 'bb-premium-large', 'bb-premium-xl',
  'bb-overnight-medium', 'bb-overnight-large',
  'bb-tape-newborn', 'bb-wipes-single-pack', 'bb-wipes-twin-pack', 'bb-buds-100-pieces',
]
export const featuredProducts = products.filter(product => featuredIds.includes(product.id))

export function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export function findProduct(slug: string) {
  return products.find(product => product.slug === slug)
}

export function getRelatedProducts(product: Product) {
  return products.filter(item => item.id !== product.id && item.category === product.category).slice(0, 4)
}

// Preserve Small items saved before the original two-size listing was split.
export function migrateCartProductId(productId: string, size: string) {
  return productId === 'bb-diapers-75' && size === 'Small' ? 'bb-diapers-75-small' : productId
}
