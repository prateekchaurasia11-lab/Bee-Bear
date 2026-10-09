export const adminCards = [
  { label: 'Products', value: '48 SKUs', detail: 'Photos, pricing, collections, and variants' },
  { label: 'Inventory', value: '92%', detail: 'Stock health across active variants' },
  { label: 'Orders', value: '12 open', detail: 'Packed, shipped, delivered, refunded' },
  { label: 'Payments', value: 'Test mode', detail: 'Razorpay reconciliation required before fulfillment' },
  { label: 'Reviews', value: 'Moderated', detail: 'No fabricated public testimonials in demo data' },
  { label: 'Support', value: '3 tickets', detail: 'Returns, delivery updates, gifting requests' },
]

export const adminChecklist = [
  'Admin MFA and role checks before production',
  'Signed media uploads with content scanning',
  'Webhook deduplication using event id and order id',
  'Transactional order and stock updates',
  'Audit logs for product, refund, and admin changes',
  'Legal review for privacy, returns, and Indian e-commerce notices',
]
