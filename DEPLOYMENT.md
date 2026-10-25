# Deployment Guide

## Latest deployment - 26 October 2026

Project: https://app.netlify.com/projects/bee-and-bear-prateek
Website: https://bee-and-bear-prateek.netlify.app
Latest deployment: https://app.netlify.com/projects/bee-and-bear-prateek/deploys/6ade5c70666292c28f328711
Deployment-specific URL: https://6ade5c70666292c28f328711--bee-and-bear-prateek.netlify.app

The existing site now includes the six-link navigation (Home, Shop, Blog, Our Quality, Contact Us, About Us), working Blog/Our Quality pages, scroll entrances and a reading-progress bar, plus a six-banner animated showroom and 23 separate demo product cards,
with a whole-collection banner, supplied logo/photos, four matching product-in-scene lifestyle photographs, an animated navy wave/sketch footer, dedicated policies,
privacy/consent changes, accessibility and a verified phone layout for the slideshow, catalogue, navigation and checkout. Netlify CLI
completed the production build and deploy successfully.

The hosted URL returned HTTP 401 on verification. Existing Netlify login
protection was preserved. This update did not change the site's audience,
domain/DNS settings, or payment mode. The intended domain remains www.beebear.in;
domain connection is a separate setup task.

Next.js was patched from 16.4.0 to 16.4.1 and sharp resolves to 0.35.5. npm reported
zero known vulnerabilities after installation. Eight automated tests, scoped
ESLint and the Netlify build passed. Hosted visual/asset checks remain limited
by existing login protection; local page and image checks passed.

## Build and deploy

`netlify.toml` sets `npm run build`, the `.next-netlify` publish directory, and Node 22.
`BEE_BEAR_NETLIFY_BUILD=1` isolates deployment output from the local dev server.
Netlify's Next.js adapter handles App Router pages, API routes, and image optimization.
Deploy from this folder with `netlify deploy --prod` after authenticating with Netlify CLI.
The existing site ID is 04dfd8ec-91ff-49fa-9974-1f4af6296c43, stored in ignored `.netlify/state.json`.

This is still a test storefront with a temporary INR 799 price and demo inventory.
The original logo and three supplied photos are integrated locally.
Payment-provider readiness, actual stock/prices, seller information, shipping
coverage and return/refund terms remain pending. Only Razorpay test keys are
accepted by the checkout API. The in-memory order store is not persistent
across serverless instances and must be replaced before real commerce.

## Application Setup

1. Provision PostgreSQL and set `DATABASE_URL`.
2. Configure `NEXT_PUBLIC_SITE_URL`, Razorpay test keys, webhook secret, session secret, admin emails, and email provider credentials.
3. Run `npm run prisma:generate` and `npm run prisma:migrate`.
4. Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`.
5. Configure HTTPS, domain-level HSTS, monitoring, error tracking, dependency scanning, and secret scanning.
6. Configure Razorpay webhooks for payment authorized, captured, failed, refunded, and order/payment events.
7. Test checkout in Razorpay test mode before any live-mode switch.
8. Switch to live keys only after a manual go-live checklist, refund tests, fulfillment reconciliation, and legal review.
