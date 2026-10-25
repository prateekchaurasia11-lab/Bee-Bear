import { LinkButton } from '@/components/ui/button'
export default function AddressesPage() {
  return <main id="main-content" tabIndex={-1} className="content-page"><section><span className="eyebrow">Delivery addresses</span><h1>No saved address needed.</h1><p>This test storefront does not dispatch parcels or save delivery addresses. Please do not submit a real address.</p><LinkButton href="/products">Continue shopping</LinkButton></section></main>
}
