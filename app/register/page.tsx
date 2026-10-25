import { LinkButton } from '@/components/ui/button'
export default function RegisterPage() {
  return <main id="main-content" tabIndex={-1} className="content-page"><section><span className="eyebrow">Guest shopping</span><h1>No account required.</h1><p>Account registration is not available yet. You can use the shopping bag and test checkout without sharing account details or creating a password.</p><LinkButton href="/products">Continue shopping</LinkButton></section></main>
}
