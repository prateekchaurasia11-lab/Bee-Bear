import Link from 'next/link'

const orders = [
  { id: 'BB-TEST-1001', status: 'Payment pending', eta: 'Awaiting Razorpay webhook reconciliation' },
  { id: 'BB-TEST-1002', status: 'Packed', eta: 'Estimated delivery: 3-5 business days' },
]

export default function OrdersPage() {
  return (
    <main className="content-page">
      <section>
        <span className="eyebrow">My orders</span>
        <h1>Order tracking.</h1>
        <p>Demo orders show the expected tracking states. Production fulfillment should follow verified captured payment events.</p>
      </section>
      <section className="orders-grid">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <h2>{order.id}</h2>
            <p>{order.status}</p>
            <p>{order.eta}</p>
            <Link href={`/orders/${order.id}`}>View details</Link>
          </article>
        ))}
      </section>
    </main>
  )
}
