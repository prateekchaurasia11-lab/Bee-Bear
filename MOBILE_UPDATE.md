# Phone layout update - 25 October 2026

- Compact 76px phone header with a 60px logo, 44px controls and a cleaner six-link menu.
- Slideshow reduced from 730px to 620px at 390px width. Photos preserve the whole product/scene; primary actions are full width. Phone navigation uses large previous/next controls and a slide counter, with swipe retained. Desktop dots remain available.
- Two product cards per row at 320-430px, larger wishlist/add controls, clearer prices and 16px filter inputs to avoid focus zoom on phones. Product detail, cart, footer and page spacing adjusted.
- Checkout names/quantities and line prices are separated. The full subtotal/shipping/total breakdown appears above consent and the payment button on phones. Summary content is shared with the desktop panel, and payment/data collection behavior is unchanged.
- Fixed a server/browser hydration mismatch caused by reduced-motion preferences. The carousel now reads the preference with a matching server snapshot and still responds to preference changes.

## Validation

- Eight existing automated tests, changed-file ESLint and production build/TypeScript checks passed.
- Headless Chrome tested at widths 320, 360, 390, 430, 768 and 1440. All six banner scenes, navigation, Wipes filtering, product detail, add to bag, cart and checkout passed with no horizontal overflow or browser errors.
- Verified 44px or larger card controls, unchecked required terms consent, no extra personal-data fields, and the price breakdown before the phone payment action. No payment was submitted.
- Normal-motion verification confirmed automatic slides continue after Next; changing to reduced motion disables rotation.
- Screenshots and measured results are stored in ignored artifacts/mobile/. These checks use browser emulation; physical iOS/Android devices were not tested.

## Publication

Production deployment: 6ade400d889e157a93ae86a4
Website: https://bee-and-bear-prateek.netlify.app
Netlify confirmed the deploy is live. Existing login protection and site settings are retained.

Subsequent update - 26 October 2026: the search/type/size/sort toolbar was removed on phone and desktop at the user's request. Category buttons remain. The filter-input checks above describe the earlier layout before this removal.
