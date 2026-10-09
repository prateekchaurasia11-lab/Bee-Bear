# Security Notes

This project uses OWASP ASVS and OWASP Top 10 as implementation guidance, not as a certification claim.

- Checkout totals are recalculated server-side.
- Razorpay checkout signatures are verified server-side.
- Razorpay webhook signatures use the raw request body.
- The CSP allows Razorpay checkout and image/font sources needed by the demo.
- Admin pages are UI scaffolds and must be protected with role authorization and MFA.
- In-memory order storage is for local testing only; use database transactions in production.
- Never store UPI PINs, card CVVs, or raw card data.
- Add automated authentication, authorization, webhook replay, checkout tampering, and inventory-race tests before launch.
