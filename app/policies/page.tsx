export default function PoliciesPage() {
  return (
    <main className="content-page">
      <section>
        <span className="eyebrow">Policies</span>
        <h1>Shipping, returns, privacy, and terms.</h1>
        <div className="policy-tabs">
          <a href="#shipping">Shipping</a>
          <a href="#returns">Returns</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </section>
      <section id="shipping">
        <h2>Shipping</h2>
        <p>Shipping zones, fees, delivery estimates, and providers are configurable. PIN-code validation is required server-side.</p>
      </section>
      <section id="returns">
        <h2>Returns</h2>
        <p>Returns require hygiene-aware review for baby products. Final policy text needs legal review before launch.</p>
      </section>
      <section id="privacy">
        <h2>Privacy</h2>
        <p>Collect only needed customer, address, consent, and order data. Do not store card CVVs, UPI PINs, or raw payment data.</p>
      </section>
      <section id="terms">
        <h2>Terms</h2>
        <p>Use this as a legal-review checklist, not a finished legal document.</p>
      </section>
    </main>
  )
}
