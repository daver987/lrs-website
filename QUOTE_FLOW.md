Here’s a tight end-to-end plan for quotes → invoice → booking, with email/SMS mo
cked and stable resume links.

**Flow Overview**

- Submit Quote: User completes quote form (server computes pricing).
- Resume Link: Server generates short link and (mock) emails/SMS it; user can re
  turn later from the link.
- Invoice View: User lands on cart summary with full line items (like an invoice
  ) and “Book Now”.
- Flight Details: Collect any flight + luggage details after user clicks “Book N
  ow”.
- Payment: Show Stripe Elements to save card (SetupIntent). No charge now.
- Confirmation: Show Success summary and (mock) send confirmation email.
- Optional Account: Offer optional account creation for future viewing of quotes
  /trips.

**Resume Link**

- Short link: Uses `useLinkShortener()` to create `WEBSITE_URL/{code}`.
- Router: `pages/[...slug].vue` decodes short code and routes to `/cart?quote_nu
mber=####`.
- Cart page: `components/ShoppingCart.vue` fetches `quote.get` and renders invoi
  ce-like summary.

**Server Calculation**

- `quote.postQuote` (tRPC):
  - Uses `usePricingEngine` on server for pricing (distance/hourly base, fuel 8%
    , gratuity 20%, HST 13%, GTAA 13.27 on airport pickup).
  - Creates quote + trips + locations + computed totals.
  - Generates short link; saves to DB; triggers mocked email/SMS.

**Mocked Notifications (safe by default)**

- Email (SendGrid): If no API key, logs recipient and short link and returns — n
  o send.
- SMS (Twilio): If no Twilio Messaging SID/client, logs and returns — no send.
- Aircall: If no secret, logs and returns — no send.
- These mocks are in:
  - `utils/services/sendGridEmail.ts` (send + confirmation)
  - `utils/services/sendTwilioSms.ts`
  - `utils/services/createAircallContact.ts`

**Invoice Display**

- Cart summary (`components/ShoppingCart.vue`):
  - Shows trips, locations, line items (base, fuel, gratuity, HST, GTAA if appli
    cable).
  - “Book Now” calls `stripe.createSetup` and routes to flight info with `client
_secret`.

**Stripe Handling**

- Create/Reuse Customer: `stripe.createSetup` (tRPC) gets/creates Stripe custome
  r, creates SetupIntent, and persists it in `payment` rows for each trip.
- Collect Card: Checkout page renders Stripe Elements; user saves card (SetupInt
  ent).
- Pre-auth Policy (next):
  - If pickup < 24h, create a PaymentIntent to pre-authorize immediately.
  - If pickup ≥ 24h, only collect card now; schedule a pre-auth 24h before picku
    p.
  - Implementation plan: add a server cron/worker or scheduled job (e.g., CRON i
    n Nitro or external scheduler) to create payment intents 24h before.

**Round Trip (deferred)**

- At invoice page, provide “Add Return Trip”:
  - Creates a new, separate Quote with reversed route and selected return date/t
    ime.
  - UI can let user prepay both in one session but persist as two quotes (two or
    ders).
  - Pricing and line items identical rules; totals displayed separately.

**Data + APIs**

- tRPC routers used:
  - `quote.postQuote`, `quote.get`, `lineItem.get`, `service.get`, `vehicle.get`
    , `salesTax.get`
  - `stripe.createSetup`, `book.update` (flight info), `book.confirmOrder`
- Short link routing: `pages/[...slug].vue` → `/cart?quote_number=####`

**What’s Already Working**

- Quote submission persists quote, builds invoice totals, and routes to cart.
- Mocked sends ensure dev is safe but logs destinations and short link.
- Cart “Book Now” → flight info → checkout with Stripe Elements.
- Success page summary + (mocked) confirmation email.

**Next Improvements**

- Add “Add Return Trip” button on invoice page that creates an independent retur
  n quote (modal to capture date/time).
- Stripe pre-auth job:
  - If pickup >= 24h: store SetupIntent, enqueue pre-auth job 24h before.
  - If pickup < 24h: create PaymentIntent now for pre-auth.
- Guard rails:
  - Validate quote age before booking (e.g., 7 days expiry).
  - Inline error messages on checkout if Stripe returns errors.
- Admin later:
  - Your separate admin service can upsert services, vehicles, line items, taxes
    .
  - Current seed provides sane defaults; DB starts populated via `pnpm db:reset`
    .

If you want, I can:

- Add the “Add Return Trip” button and server mutation to create the separate re
  turn quote next.
- Draft the pre-auth scheduler (a Nitro task/cron runner + job table) and wire t
  he 24h logic.
