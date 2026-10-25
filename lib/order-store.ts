type StoredOrder = {
  orderId: string
  razorpayOrderId: string
  amount: number
  currency: 'INR'
  status: 'created' | 'verified' | 'failed'
  termsVersion: string
  termsAcceptedAt: string
  createdAt: string
}

const globalStore = globalThis as typeof globalThis & {
  beeBearOrders?: Map<string, StoredOrder>
  beeBearWebhookEvents?: Set<string>
}

export const orderStore = globalStore.beeBearOrders ?? new Map<string, StoredOrder>()
export const webhookEventStore = globalStore.beeBearWebhookEvents ?? new Set<string>()

globalStore.beeBearOrders = orderStore
globalStore.beeBearWebhookEvents = webhookEventStore

export function createInternalOrder(args: Omit<StoredOrder, 'createdAt' | 'status'>) {
  const order: StoredOrder = {
    ...args,
    status: 'created',
    createdAt: new Date().toISOString(),
  }
  orderStore.set(order.orderId, order)
  return order
}
