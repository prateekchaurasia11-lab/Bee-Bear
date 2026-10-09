export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main className="content-page">
      <section>
        <span className="eyebrow">Order detail</span>
        <h1>{id}</h1>
        <p>Timeline: created, payment pending, paid/captured, packed, shipped, delivered, refunded if applicable.</p>
      </section>
      <section>
        <h2>Safety notes</h2>
        <p>
          Do not fulfill from checkout success alone. Match internal order id, Razorpay order id, payment id,
          captured status, webhook event id, and inventory transaction before dispatch.
        </p>
      </section>
    </main>
  )
}
