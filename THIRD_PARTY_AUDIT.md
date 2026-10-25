# Privacy, consent and accessibility review
Reviewed 18 October 2026. Scope: this source tree and its installed production dependencies; no production hosting or Razorpay merchant dashboard access.

## Third parties
- Razorpay browser checkout: payment UI, provider-controlled executable JavaScript. Previously loaded on all pages; now requested only by the explicit test-checkout action after an unchecked order-terms agreement. No customer prefill or address is supplied. SDK load errors permit retry. Closing payment preserves the bag and returns focus. Provider cookies, payment accessibility and downstream requests still need review in a configured test account.
- razorpay (server SDK): creates test Orders API requests with amount, currency, generated receipt and constant brand/channel notes. No personal data in notes. Secret keys stay on server. Existing signature checks retained.
- Next/React and motion: application/UI dependencies. No analytics SDK configured. next/font downloads at build and serves bundled font files; visitors do not request Google Fonts. Next image optimization now serves client-supplied local lifestyle/product images; the Unsplash assets and allowed origin were removed on 23 October 2026.
- Prisma: installed database client and dormant schema; checkout currently uses an in-memory order map. No durable customer/account persistence is wired up.
- Netlify: deployment configuration exists. Hosting request logs, retention and any platform-injected code cannot be certified from source alone.
- No advertising, social-login, geolocation, analytics or session-replay SDK found.
- npm audit --omit=dev --json: 0 reported vulnerabilities on review date. This is an advisory check, not a guarantee that dependencies or remote checkout.js are safe. Dynamic remote SDK is not pinned by package-lock.

## Data and forms
- Test checkout accepts only product variants/quantities and explicit terms/version. Strict schema rejects unexpected address or tracking fields.
- No need to collect a real name, phone, email or address for an unfulfilled test order. Address-saving checkbox was removed because no persistence existed.
- Unconnected registration, login, address and contact forms removed. They had no handlers and could imply features existed; login forms could submit credentials through browser defaults. Support uses an explicit mailto link.
- No marketing opt-in or optional tracking exists. No misleading all-purpose cookie banner introduced. Bag/wishlist local storage is documented and independently clearable.
- No card/CVV/PIN handling by application; do not log raw request payloads or provider payment credentials.
- Consent version and timestamp accompany temporary order metadata. This is not a durable legal consent log.

## Honest interfaces
- Test mode is explicit on checkout, success and policies. Success no longer promises packing or dispatch; demo tracking is not presented as an actual order history.
- Prices, shipping and tax inclusion appear before payment. No subscription, forced account, fake scarcity, countdown or auto-added extra found.
- Closing Razorpay no longer enables a confirmation-close nag.

## Accessibility and layout
- Added skip link and focusable main landmarks to all public views.
- Native modal navigation supplies browser focus containment, Escape dismissal, background inertness and focus return. Menu scrolls in short viewports.
- Strengthened muted text, footer text and focus ring; labelled form checkbox; preserved arrow-key native size radios.
- Bounded narrow layouts using shrinkable grid tracks, wrapping and responsive type, rather than clipping the page.
- Verification outcomes and limits are recorded below.

## Owner details still required before live sales
Business display name: Bee & Bear. Support/privacy email: prateekchaurasia11@gmail.com (owner supplied).
Confirm full seller legal identity, address, grievance contact, delivery commitments, return eligibility/window, refund processing periods and production data retention. Policies describe the actual test site and explicitly identify pending live-sale details. Do not enable live payments until those details and durable fulfilment are in place.

## Review references
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- https://consumeraffairs.gov.in/pages/consumer-protection-acts
- https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/

## Verification results
- Production build: passed, including TypeScript checking and all four new policy routes.
- ESLint: passed for app, components, lib, tests and next.config.ts.
- Automated tests: 7 passed, including missing/false/outdated terms and unexpected personal fields at root and cart-item level.
- Generated HTML checks: 14 routes passed for a single main landmark, skip target, four footer policy links, no eager Razorpay script tag and no unconnected password inputs.
- Measured source color pairs: muted/ivory 6.80:1; muted/white 7.27:1; primary button 6.31:1; secondary button 8.12:1; footer links 11.06:1; footer eyebrow 6.15:1; selected size 6.60:1; image placeholder 5.44:1. Control border/white 4.09:1; focus ring/paper 15.37:1. These measurements cover the listed solid color pairs, not every composited/hover/rendered state.
- Browser automation was unavailable (neither in-app browser nor Chrome was available). Actual viewport overflow, zoom/reflow, keyboard focus cycling and Razorpay modal behaviour have not been verified in a browser. Native dialog, responsive CSS and generated markup were reviewed; this is not a full WCAG certification.
- No configured Razorpay test transaction was executed. Hosting logs, platform injection, vendor storage and production retention need owner-side review.

## Asset integration and security follow-up (23 October 2026)
- Original logo and three supplied photos copied unchanged from images/ into public/brand/ and public/products/. Each copy was byte-compared with the source.
- Header/footer now display the supplied logo; homepage uses the lifestyle, pack and collage images. Catalogue/bag/gallery use the supplied product photos. Pack and collage use contain sizing; the gallery identifies the Medium pack photograph.
- Seven automated tests and scoped ESLint passed. Production build including TypeScript passed on retry after Next.js's security reminder.
- HTTP checks passed for home, catalogue and product-detail pages, all four original assets and all four Next image-optimization responses. Optimized pack retains its portrait proportions; other images retain square proportions.
- Browser automation remains unavailable; rendered viewport/keyboard QA was not performed.
- Fresh npm audit --omit=dev on 23 October reports one affected production dependency (next 16.4.0), aggregating two critical and one high-severity advisories. The earlier clean audit reflects 18 October, not the current dependency-advisory state.
- Advisories: https://github.com/advisories/GHSA-2464-fhr4-w9xw ; https://github.com/advisories/GHSA-p3m5-59mp-jv5r ; https://github.com/advisories/GHSA-673q-mjm6-r5xr . Patch 16.4.1 is identified in the advisories. Recommend a security upgrade before launch; dependencies were not changed during this image-integration task.

## Production deployment and security remediation (23 October 2026)
- Upgraded Next.js from 16.4.0 to pinned 16.4.1; installed sharp resolves to 0.35.5. npm reported zero known vulnerabilities after installation. This resolves the dependency findings recorded in the preceding image-integration review; that earlier section is historical.
- Seven automated tests and scoped ESLint passed. Netlify production build and deployment completed successfully for site 04dfd8ec-91ff-49fa-9974-1f4af6296c43, deploy 6adb7611e79f6d31b812d1ed.
- Main URL: https://bee-and-bear-prateek.netlify.app . The unauthenticated hosted check returned HTTP 401; existing access protection was preserved and no audience/DNS/payment settings were changed.
- Local preview restored on localhost:3000 and verified to serve the new logo/photos with Next.js 16.4.1. No public hosted visual claim is made while login protection prevents direct page inspection.

## Client showroom update - 25 October 2026
- Recreated the public reference's slider pattern using the existing Motion dependency; no slider SDK or tracking was added. Fonts are self-hosted through next/font.
- Added independent dummy product variants and five AI-generated concept pack visuals. Original client artwork remains intact. No copied competitor assets, fake ratings, fake discounts or scarcity timers were added.
- Eight automated tests, ESLint, HTTP route/image checks and production builds passed. Chrome checks confirmed category filtering, automatic sliding, pause and manual wrap-around. Full 320px and screen-reader testing remains pending.
- Deployment 6ade03179063d1d214d865e7 is confirmed published/ready on the existing Netlify site. Team login remains enabled and unauthenticated access returns HTTP 401. Test payments and the existing consent model are preserved.
