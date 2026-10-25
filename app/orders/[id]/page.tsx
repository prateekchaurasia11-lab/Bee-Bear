export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main id="main-content" tabIndex={-1} className="content-page">
      <section>
        <span className="eyebrow">Example order · Preview only</span>
        <h1>{id}</h1>
        <p>This is an example tracking page. No actual parcel or purchase is associated with this preview.</p>
      </section>
      <section>
        <h2>Questions about a payment?</h2>
        <p>
          Email prateekchaurasia11@gmail.com with your payment reference and a short description of the issue. Never send a password, card number, OTP or UPI PIN.
        </p>
      </section>
    </main>
  )
}
