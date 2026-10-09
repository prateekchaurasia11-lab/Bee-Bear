# Bee & Bear

An Indian baby-care storefront built with Next.js, React, and TypeScript. The original boutique homepage includes a lifestyle photo collage, editorial section, and animated product presentation.

[Netlify deployment](https://bee-and-bear-prateek.netlify.app) | [Repository](https://github.com/prateekchaurasia11-lab/Bee-Bear)

## Current Catalogue

One product: **Baby Pant Diapers, 75-piece pack**.

- Sizes: Small and Medium.
- Sample price: INR 799 for either size.
- Medium packaging indicates 7-12 kg; the Small weight range needs confirmation.
- Inventory is demo data.
- Original product photos and the supplied logo are not yet available as local project files. Product image slots show placeholders; the homepage uses lifestyle photographs.

## Features

- Responsive homepage, catalogue, and product detail pages.
- Size and quantity selection, shopping bag, and locally saved wishlist.
- INR totals and Indian checkout-address validation with Zod.
- Razorpay test-mode order, verification, and webhook API routes.
- Motion for React animations with reduced-motion support.
- Prisma PostgreSQL schema and seed script.
- Account, orders, admin, contact, and policy page scaffolds.
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

The tests cover the single-product catalogue, both size variants, INR totals, Indian PIN validation, Razorpay signature verification, and development versus production CSP.

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
