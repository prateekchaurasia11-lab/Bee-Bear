# Deployment Guide

## Netlify

Project: https://app.netlify.com/projects/bee-and-bear-prateek

Website: https://bee-and-bear-prateek.netlify.app

Production deployment completed successfully. Netlify enabled team-login protection
on this new project by default, so unauthenticated visitors currently receive HTTP 401.
Changing this site's visitor access to public requires the owner's explicit approval.

Deployment log: https://app.netlify.com/projects/bee-and-bear-prateek/deploys/6ac76958c7939eb53f22411d

`netlify.toml` sets `npm run build`, the `.next-netlify` publish directory, and Node 22.
`BEE_BEAR_NETLIFY_BUILD=1` isolates deployment output from the running local dev server.
Netlify's Next.js adapter handles App Router pages, API routes, and image optimization.
Deploy from this folder with `netlify deploy --prod` after installing and logging into Netlify CLI.
The local project link is stored in `.netlify/state.json`, which is excluded from Git.

This deployment uses the INR 799 sample price and demo inventory. Product photos
have not been supplied as local files. Configure Razorpay test credentials in the
Netlify environment before testing payment; no payment credentials were uploaded.
The in-memory order store is not persistent across serverless function instances.
Replace it with a database-backed store before relying on order processing.

## Application Setup

1. Provision PostgreSQL and set `DATABASE_URL`.
2. Configure `NEXT_PUBLIC_SITE_URL`, Razorpay test keys, webhook secret, session secret, admin emails, and email provider credentials.
3. Run `npm run prisma:generate` and `npm run prisma:migrate`.
4. Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`.
5. Configure HTTPS, domain-level HSTS, monitoring, error tracking, dependency scanning, and secret scanning.
6. Configure Razorpay webhooks for payment authorized, captured, failed, refunded, and order/payment events.
7. Test checkout in Razorpay test mode before any live-mode switch.
8. Switch to live keys only after a manual go-live checklist, refund tests, fulfillment reconciliation, and legal review.
