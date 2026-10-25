# Bee & Bear launch brief

Confirmed with the owner on 23 October 2026. This is a requirements record; planned features are not claims of implemented services.

## Confirmed decisions
- Real ecommerce store planned for launch in approximately 2-3 weeks.
- Intended domain: https://www.beebear.in. Metadata base is configured locally; DNS and hosting connection have not been changed.
- Current products: diapers only, Small and Medium variants, 75-piece packs. Medium packaging shows 7-12 kg; Small weight range still requires confirmation.
- Temporary selling price: INR 799 per pack for either size, explicitly labelled in the preview. MRP is unknown and no fictitious discount should be shown.
- Owner says stock is sufficient. Existing inventory ceiling of 100 remains demo data; it is not a verified stock count.
- India delivery. Serviceable PIN codes, courier, shipping fees and delivery estimates remain unconfirmed; existing shipping calculations are demonstrations.
- UPI-only payment requirement for the future live store. Merchant/payment provider account readiness is unknown. Existing Razorpay integration stays in test mode; UPI-only provider configuration is still to be implemented after account confirmation.
- Admin order notification destination: prateekchaurasia11@gmail.com. Notification delivery is not yet connected.
- Customer order updates by email.
- Optional email newsletter only. No recurring product deliveries or recurring billing.
- No analytics or advertising tracking requested.
- Original logo and three product/lifestyle images are integrated from the owner's images/ folder. Exact copies are under public/brand/ and public/products/; the sources are preserved.

## Requested functionality for implementation
- Accounts and guest checkout, saved addresses, order tracking, wishlist, reviews and coupons.
- Admin dashboard for catalogue, stock, orders, cancellations and refunds.
- Email order notifications/updates.
- Newsletter with independent unchecked opt-in, confirmation, unsubscribe and consent history. Payment/order agreement must never automatically subscribe a shopper.
- Secure, durable storage and email delivery need configuration. Current account views are guest-preview explanations; order/payment records use process memory.

## Awaiting client information
- Full legal/seller details, address, GST details if applicable and grievance contact.
- Final selling prices, MRP, verified stock per size and Small weight range.
- Payment provider and merchant account readiness.
- Serviceable PIN codes, courier, shipping costs and delivery timings.
- Cancellation, return eligibility/window and refund processing timeframes.
- Customer-facing sender email/domain and transactional/newsletter email provider.
- Domain registrar/DNS access and final hosting configuration.

Do not turn on live checkout using placeholder commercial details or the current in-memory fulfilment backend.

## Client showroom expansion - 25 October 2026
The owner requested a reference-inspired animated client preview with additional dummy products. The showcase now includes 23 separate product/size records: 18 diapers, three wipes packs and two cotton-bud packs. These extra ranges, pack counts, artwork and prices are demonstrations, not confirmed live merchandise. The five-slide banner uses a five-second autoplay interval and one-second slide motion with pause/reduced-motion controls. See SHOWROOM_UPDATE.md for verification and deployment details.
