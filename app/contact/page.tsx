import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <main className="content-page">
      <section>
        <span className="eyebrow">Support</span>
        <h1>We can help with sizing, gifts, and delivery.</h1>
        <form className="form-grid">
          <input placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input placeholder="Order number (optional)" />
          <select defaultValue="support">
            <option value="support">Customer support</option>
            <option value="gift">Gift concierge</option>
            <option value="return">Returns</option>
          </select>
          <textarea placeholder="How can we help?" required />
          <Button type="submit">Send request</Button>
        </form>
      </section>
    </main>
  )
}
