import { PrismaClient } from '@prisma/client'
import { products } from '../lib/products'

const prisma = new PrismaClient()

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        category: product.category,
        collection: product.collection,
        description: product.description,
        care: product.care,
        price: product.price,
        mrp: product.mrp,
      },
      create: {
        slug: product.slug,
        name: product.name,
        category: product.category,
        collection: product.collection,
        description: product.description,
        care: product.care,
        price: product.price,
        mrp: product.mrp,
        images: {
          create: product.images.map((url, index) => ({
            url,
            alt: `${product.name} image ${index + 1}`,
            position: index,
          })),
        },
        variants: {
          create: product.sizes.flatMap((size) =>
            product.colours.map((colour) => ({
              size,
              colour,
              sku: `${product.id}-${size}-${colour}`.replace(/\s+/g, '-').toUpperCase(),
              inventory: Math.max(3, Math.floor(product.inventory / product.sizes.length)),
            })),
          ),
        },
      },
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
