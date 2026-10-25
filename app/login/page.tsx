import { LinkButton } from '@/components/ui/button'
export default function LoginPage() {
  return <main id="main-content" tabIndex={-1} className="content-page"><section><span className="eyebrow">Your account</span><h1>Shop without an account.</h1><p>Sign-in is not available in this preview. You can browse, save favourites on this device and try checkout as a guest. We do not collect a password.</p><LinkButton href="/products">Browse products</LinkButton></section></main>
}
