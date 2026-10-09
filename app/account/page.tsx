import Link from 'next/link'

export default function AccountPage() {
  return (
    <main className="content-page">
      <section>
        <span className="eyebrow">My account</span>
        <h1>Orders, addresses, and preferences.</h1>
        <p>This protected area is ready for secure session wiring, saved addresses, and order history.</p>
      </section>
      <section className="orders-grid">
        <article className="order-card">
          <h2>Saved addresses</h2>
          <p>Store Indian delivery fields and default shipping choices.</p>
          <Link href="/account/addresses">Manage addresses</Link>
        </article>
        <article className="order-card">
          <h2>My orders</h2>
          <p>Track payment, packing, shipment, and delivery status.</p>
          <Link href="/orders">View orders</Link>
        </article>
        <article className="order-card">
          <h2>Account security</h2>
          <p>Session expiry, password reset, device review, and consent preferences.</p>
        </article>
      </section>
    </main>
  )
}
