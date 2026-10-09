import { Button } from '@/components/ui/button'

export default function AddressesPage() {
  return (
    <main className="content-page">
      <section>
        <span className="eyebrow">Saved addresses</span>
        <h1>Delivery addresses.</h1>
        <form className="form-grid">
          <input placeholder="Full name" />
          <input placeholder="Mobile number" />
          <input placeholder="House / flat number" />
          <input placeholder="Building / apartment" />
          <input placeholder="Street / area" />
          <input placeholder="Landmark" />
          <input placeholder="City" />
          <input placeholder="State" />
          <input placeholder="PIN code" />
          <Button type="submit">Save address</Button>
        </form>
      </section>
    </main>
  )
}
