import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <main className="content-page">
      <section>
        <span className="eyebrow">Customer login</span>
        <h1>Welcome back.</h1>
        <p>Secure authentication is scaffolded here. Connect your session provider before production.</p>
        <form className="form-grid">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <Button type="submit">Sign in</Button>
        </form>
        <p>
          New here? <Link href="/register">Create an account</Link>
        </p>
      </section>
    </main>
  )
}
