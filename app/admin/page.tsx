import { LockKeyhole } from 'lucide-react'
import { adminCards, adminChecklist } from '@/lib/admin'

export default function AdminPage() {
  return (
    <main className="content-page">
      <section>
        <span className="eyebrow">Protected admin dashboard</span>
        <h1>Store operations command centre.</h1>
        <p>
          This route must be protected by admin authorization and MFA before production. The UI maps the operational
          modules requested in the brief.
        </p>
      </section>
      <section className="dashboard-grid">
        {adminCards.map((card) => (
          <article className="admin-card" key={card.label}>
            <LockKeyhole size={22} />
            <h2>{card.label}</h2>
            <strong>{card.value}</strong>
            <p>{card.detail}</p>
          </article>
        ))}
      </section>
      <section>
        <h2>Production security checklist</h2>
        <ul>
          {adminChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
