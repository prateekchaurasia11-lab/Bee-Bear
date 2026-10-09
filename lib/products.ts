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
}

export const categories = ['Baby diapers']

export const products: Product[] = [{
  id: 'bb-diapers-75',
  slug: 'baby-pant-diapers-75-pack',
  name: 'Baby Pant Diapers',
  category: 'Baby diapers',
  collection: 'Everyday baby care',
  price: 799,
  rating: 0,
  reviews: 0,
  inventory: 100,
  sizes: ['Small', 'Medium'],
  colours: ['White'],
  images: [
    '/products/diapers-pack.png',
    '/products/diapers-features.png',
    '/products/diapers-value.png',
    '/products/diapers-guide.png',
    '/products/diapers-everyday.png',
  ],
  description: 'A 75-piece pack of pant-style baby diapers for everyday changes. A soft feel and stretchy fit for your little one.',
  care: 'Choose the size by your baby\'s weight. Store in a cool, dry place. Change regularly, especially when soiled. Dispose of used diapers in a bin; do not flush.',
  badges: ['75-piece pack', 'Pant style'],
}]

export const featuredProducts = products

export function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount)
}

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(product: Product) {
  return products.filter((item) => item.id !== product.id).slice(0, 3)
}
