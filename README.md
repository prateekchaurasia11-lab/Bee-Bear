# Bee & Bear

An Indian baby-care storefront built with Next.js, React, and TypeScript. The original boutique homepage includes a lifestyle photo collage, editorial section, and animated product presentation.

[Netlify deployment](https://bee-and-bear-prateek.netlify.app) | [Repository](https://github.com/prateekchaurasia11-lab/Bee-Bear)

## Current Catalogue

The client showroom contains **23 demo product cards**: 18 diaper sizes/types across Everyday, Premium, Overnight and Tape ranges, three wipes packs and two cotton-bud packs. Each card is a separate product/size with a dummy price. Original Everyday Small and Medium 75-piece packs retain INR 799 temporary pricing.

The five-banner hero automatically slides every five seconds with a one-second transition. Controls include previous/next, banner selectors, pause/play and reduced-motion support. The shop supports search, category/type/size filtering, sorting, wishlist and add-to-bag.

Original client photos and the logo are retained. Additional product packaging is AI-generated concept artwork. This is a test storefront, not a confirmed live range. See [Showroom update](SHOWROOM_UPDATE.md) and [asset prompts](public/products/DEMO_ASSETS.md).

## Features

- Responsive homepage, catalogue, and product detail pages.
- Size and quantity selection, shopping bag, and locally saved wishlist.
- INR totals and strict test-checkout validation with explicit terms agreement.
- Razorpay test-mode order, verification, and webhook API routes.
- Motion for React animations with reduced-motion support.
- Prisma PostgreSQL schema and seed script.
- Dedicated privacy, terms, refund and cookie pages, with device-data controls.
- Accessible modal navigation, skip links, stronger contrast and responsive layouts.
- Guest shopping and direct email support; unconnected personal-data forms removed.
- Example orders and admin page scaffolds.
- Security headers and development-specific Content Security Policy.

## Run Locally

Requires Node.js 22 and npm.

```bash
git clone https://github.com/prateekchaurasia11-lab/Bee-Bear.git
cd Bee-Bear
npm ci
npm run dev
```

Open http://localhost:3000.

For database or payment development, copy the placeholder settings in `.env.example` into an untracked `.env.local` file and configure the services you need. Database setup is optional for browsing the current demo storefront.

## Checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Eight tests cover the separate demo catalogue records, per-card variant pricing, mixed-cart totals, INR/PIN validation, Razorpay signatures, CSP and consent/data minimisation.

## Netlify

`netlify.toml` configures Node 22, `npm run build`, and the `.next-netlify` publish directory. The deployment-specific environment flag isolates build output from the local dev server.

After installing Netlify CLI and authenticating:

```bash
netlify link
netlify deploy --prod
```

The existing project is **bee-and-bear-prateek**. Netlify enabled team-login protection on that deployment; public visitor access has not been approved or enabled.

The GitHub repository is separate from Netlify's current manual deployment. To enable automatic deployments, connect this repository to the existing Netlify project and use the checked-in build configuration.

## Payment and Database Setup

Only Razorpay test keys are accepted by the current API routes. Add the test key ID, secret, and webhook secret through server environment settings. The browser key ID uses `NEXT_PUBLIC_RAZORPAY_KEY_ID`; never expose the secret or webhook secret through public environment variables.

For PostgreSQL development:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

See [Deployment Guide](DEPLOYMENT.md) and [Security Notes](SECURITY.md).

## Privacy and Accessibility

Business name: Bee & Bear. Support/privacy contact: prateekchaurasia11@gmail.com.

Checkout is test-only and does not request real contact or delivery details. Razorpay loads only after the visitor chooses to open checkout and agrees to the current order terms. Optional marketing/tracking is not active. Read [the audit](THIRD_PARTY_AUDIT.md) for third-party findings, verification limits and the seller/refund details still required before live sales.

## Implementation Status

This is a working storefront demo, not a completed production commerce backend.

- Orders and webhook events currently use process memory, which is not shared or persistent across serverless instances.
- Authentication, protected administration, account persistence, contact delivery, and email integrations remain to be implemented.
- Payments require credentials and a persistent order store before end-to-end reconciliation can be relied on.
- Product pricing, stock, original photography, and legal policy copy must be confirmed before real commerce.

## Project Layout

```text
app/          Pages and API route handlers
components/   Storefront UI and interactive controls
lib/          Catalogue, validation, payment helpers, and demo stores
prisma/       PostgreSQL schema
public/       Static assets and expected product-photo paths
scripts/      Database seed script
tests/        Checkout and configuration tests
```

## Development approach

Project coding guidance in [AGENTS.md](AGENTS.md) follows [Ponytail](https://github.com/DietrichGebert/ponytail): small complete changes, reuse of existing code, and preservation of privacy, payment validation and accessibility. The Codex skill is installed separately from the storefront.
