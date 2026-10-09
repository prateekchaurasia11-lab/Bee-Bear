import { z } from 'zod'
import { products } from './products'

export const addressSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),
  email: z.string().trim().email(),
  house: z.string().trim().min(1).max(80),
  building: z.string().trim().min(1).max(100),
  street: z.string().trim().min(2).max(140),
  landmark: z.string().trim().max(120).optional().default(''),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  pincode: z.string().trim().regex(/^[1-9][0-9]{5}$/, 'Enter a six-digit Indian PIN code'),
  instructions: z.string().trim().max(240).optional().default(''),
  saveAddress: z.boolean().optional().default(false),
})

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
  size: z.string().min(1),
  colour: z.string().min(1),
})

export const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1),
  address: addressSchema,
  couponCode: z.string().trim().max(32).optional(),
})

export type CheckoutPayload = z.infer<typeof checkoutSchema>

export function calculateTotals(items: CheckoutPayload['items']) {
  const enrichedItems = items.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId)

    if (!product) {
      throw new Error(`Unknown product: ${item.productId}`)
    }

    if (item.quantity > product.inventory) {
      throw new Error(`${product.name} has only ${product.inventory} items in stock`)
    }

    if (!product.sizes.includes(item.size) || !product.colours.includes(item.colour)) {
      throw new Error(`Invalid variant for ${product.name}`)
    }

    return {
      ...item,
      name: product.name,
      unitPrice: product.price,
      lineTotal: product.price * item.quantity,
    }
  })

  const subtotal = enrichedItems.reduce((sum, item) => sum + item.lineTotal, 0)
  const shipping = subtotal >= 4999 ? 0 : 149
  const taxIncluded = Math.round(subtotal * 0.05)
  const total = subtotal + shipping

  return {
    items: enrichedItems,
    subtotal,
    shipping,
    taxIncluded,
    total,
    amountInPaise: total * 100,
    currency: 'INR' as const,
  }
}
