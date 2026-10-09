import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  return (
    <main className="content-page">
      <section>
        <span className="eyebrow">Registration</span>
        <h1>Create your Bee &amp; Bear account.</h1>
        <p>Accounts will store addresses, orders, wishlist items, consent history, and support requests.</p>
        <form className="form-grid">
          <input placeholder="Full name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm password" required />
          <Button type="submit">Create account</Button>
        </form>
      </section>
    </main>
  )
}
