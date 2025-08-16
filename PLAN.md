# Action plan and finding's for Black Car Service Website

## Progress Update — 2025-08-16

Completed (this session)

- Fixed Vue 3 type import issues: replaced runtime `Ref` imports with `import type { Ref }` across pages/composables.
- Seeded database with dummy data (Vehicles, Services, LineItems, SalesTax); added `prisma/seed.js` and scripts `db:push`, `seed`.
- Introduced app-level catalog preload via `callOnce` in `app.vue` (vehicles/services/lineItems/salesTax) and wired `useDataStore` as a single source for these lists.
- Refactored consumers to store: updated `components/QuoteFormTwo.vue` to read from `useDataStore()` instead of duplicating TRPC queries.
- Removed PlanetScale integration: deleted `server/psdb.ts`, removed usage from tRPC context, scrubbed docs, and dropped dependency from `package.json`.
- Normalized images:
  - Replaced all Nuxt Image usage (`<NuxtPicture>`/`<NuxtImg>`) with plain `<img>` tags to avoid provider/base path issues.
  - Fixed absolute paths (e.g., `data/services.ts` from `images/...` to `/images/...`).
  - Added fallback handler + placeholder asset to prevent blank UI when an image is missing.
  - Simplified background images: removed `$img()` and Nuxt Image composables; backgrounds now use direct URLs via `useBackgroundImage` or local computed styles.
- Removed `@nuxt/image` module and its config from `nuxt.config.ts`; removed dependency from `package.json`.

Notes

- The app now preloads catalog data once and reuses it via Pinia across navigations — fewer DB calls and simpler components.
- All images are served directly from `/public/images` with plain `<img>` tags; background images also use direct paths. No external image provider required.
- Stripe/Twilio work continues per AGENTS/PLAN; Stripe service refactor is still pending.

Completed

- Brand config baseline: Centralized brand in `app.config.ts`; added `plugins/brand-theme.client.ts` to emit CSS vars; mapped Tailwind and Naive UI to vars.
- Branding sweep: Replaced hard-coded branding across `layouts/default.vue`, `app.vue`, `components` (nav, header, footer, logo, signup/signin, cart, summary, contact form), and key pages (`index`, `about`, `contact`, `services`, `fleet`, `checkout`, `paymentlink`, `reservations`); short-link domain now reads from brand config.
- Runtime brandify: Added `composables/useBrandify.ts` and applied in `IconBlockAbout` and `IconBlockServices` so data-driven copy reflects configured brand without editing data files.
- Analytics dedupe: Removed Nuxt GTM module; using `plugins/gtmvue.ts` with IDs/flags from runtime config to avoid duplicate pageviews.

In Progress / Next

- Stripe service refactor (Step 4): Implement a `stripeService` with clear methods (getOrCreateCustomer, createSetupIntent), idempotency keys, and unified webhook handler with signature verification and event logging.
- Integration toggles (Step 5): Move any remaining inline integration targets (e.g., Twilio destination numbers, Aircall toggles, Zapier URL) fully into config with per‑env enable/disable flags.
- Quote flow hardening (Step 6): Merge validation stubs into a single route or tRPC procedure with clear outcomes (exists/expired/booked) and typed schemas.
- Maps proxy (Step 7): Add a server proxy for Google Directions; restrict client key usage.
- Data modularity (Step 8): Optionally move brand‑specific marketing content into `data/brand/<slug>/` with types; current runtime brandify covers UI.
- Security/logging (Step 9): Add runtime config validation (zod), structured logger, and scrub PII.
- Docs & cleanup (Step 10): Create a short Brand Pack guide; remove dead code and align scripts. AGENTS.md added (see repo root).

Notes

- Remaining mentions of the legacy brand exist in `data/*.ts` for historical copy; UI replaces them at render time via `useBrandifyText`. We can migrate these to brand-aware data later without blocking other work.
- Verify GTM in the environment after deploy to ensure a single event stream.

## **Key Findings**

- Hard-coded branding: name, logos, colors, copy appear across `pages`, `layouts
`, components, SMS/email templates, and short-links (e.g., `layouts/default.vue`
  , `pages/index.vue`, `components/App/AppNavigation.vue`, `components/ShoppingCar
t.vue`, `pages/[...slug].vue`, Twilio/SendGrid utils).
- Theme tokens split: Tailwind brand palette (`tailwind.config.js`) and Naive UI
  theme overrides (`nuxt.config.ts`) duplicate brand color definitions.
- Integrations duplicated/loose: Two GTM integrations (module + custom plugin),
  two Stripe webhook endpoints, Zapier URL in code, Twilio target number in code.
- Stripe customer creation always “create new”, webhook handling is split, and S
  etupIntent flow needs tightening.
- Google Maps Directions is called client‑side with a public key; multiple place
  s assume the current domain.

## **Branding & Theming**

- Central brand config: Single source of truth in `app.config.ts` for brand name
  , legal name, slug, phones, emails, address, social, default copy snippets, GTM
  IDs, Stripe publishable key, asset paths, and feature flags.
- Asset conventions: Standardize brand assets under `public/brand/<slug>/` with
  fixed names (`logo-light`, `logo-dark`, `favicon`, hero images) to allow drop-in
  branding.
- Color tokens: Move brand palette to CSS variables (light/dark) and map Tailwin
  d + Naive UI to them. This removes color duplication and enables theming via con
  fig.
- Global SEO defaults: Centralize defaults (title, description, OG/Twitter image
  s) in a `useSeo` composable or `app.head` with brand config values; override per
  -page where needed.
- Company info injection: Replace hard-coded company data in `layouts/default.vu
e`, `AppFooter`, and hero/CTA sections to read from brand config. Remove inline
  “High Park Livery” strings across pages/components.

## **Quote → Booking Flow**

- Config-driven copy: Abstract customer-facing strings in Quote form, Cart, Flig
  ht Info, Checkout to brand config (CTA labels, disclaimers, SMS/email tone). Avo
  id text inside utils.
- Local storage keys: Derive keys from brand slug (e.g., `user_id`) to avoid cro
  ss-brand collisions and make switching safe.
- Short link domain: Read domain from config; remove “highparklivery.com” from `
pages/[...slug].vue` and `useLinkShortener`.
- Validation and stubs: Consolidate `server/api/quotecheck.ts` and `quote-valida
tion.ts` into a single route or tRPC procedure; define clear outcomes (exists, e
  xpired, booked).

## **Payments & Integrations**

- Stripe service boundary: Wrap all customer/setup/payment logic in a `stripeSer
vice` with clear methods (getOrCreateCustomer, createSetupIntent, createPaymentI
  ntent later, idempotency keys). Fix “always create new customer” by checking exi
  sting `stripe_customer_id` or fetching by email.
- Webhook consolidation: Merge Stripe webhooks into one handler, verify signatur
  es, handle events idempotently, and log/store event receipts for observability.
- Configuration for notifications: Move Twilio destination numbers, Aircall togg
  les, Zapier webhook URL, and SendGrid sender/reply-to into config; support enabl
  e/disable per environment.
- Analytics dedupe: Choose one GTM integration (module or plugin), remove the ot
  her, and read IDs/labels/send_to from brand config. Ensure no double pageview/su
  bmit events.
- Test/sandbox safety: Add a “mode” switch (test vs live) to prevent production
  sends in non‑prod environments for Stripe/Twilio/SendGrid.

## **Architecture & Modularity**

- Domain layering: Keep UI (pages/components), application (stores, composables)
  , and integration services (utils/services) separated. Avoid UI code referencing
  service details directly.
- tRPC routers hygiene: Keep routers domain‑focused (quote, booking, stripe, cat
  alog), add input/output schemas everywhere, and remove direct side-effects (Zapi
  er, SMS) from core mutations via async tasks or queued handlers.
- Caching strategy: Centralize `useStorage()` usage for vehicles/lineItems/taxes
  with TTL and invalidation rules, so updates in the admin backend propagate pred
  ictably.
- Content/data modularity: Move brand‑specific marketing content (features, serv
  ices copy) to a `data/brand/<slug>/` folder with typed structures; default to br
  and config if absent.

## **Security & Reliability**

- Maps proxy: Proxy Google Directions API via a server route to avoid exposing k
  eys and standardize error handling/caching; apply key restrictions in GCP.
- Secrets hygiene: Keep all secrets in `runtimeConfig`; validate at startup (zod
  schema) and fail fast if required keys are missing.
- Logging and error policy: Replace ad-hoc `console.log` with a simple logger; s
  crub PII in logs; add structured errors in server routes and tRPC.

## **DX, Docs & Deployment**

- Upgrade path: Plan a Nuxt 3 minor upgrade sweep and module refresh to current
  versions after config refactor to reduce tech debt.
- Typed config: Add TypeScript types for brand config and runtime config to get
  intellisense across the app.
- Dev ergonomics: ESLint/Prettier rules aligned with project; pnpm scripts for l
  int/format/type-check.
- Brand handoff doc: Short “Brand Pack” README explaining how to add a new brand
  (assets, config keys, environment variables, integration toggles), including a
  checklist.

## **Execution Order (Step‑by‑Step)**

- Step 1 — Brand Config Baseline: Add `app.config.ts` with all brand fields; int
  roduce CSS variables and map Tailwind/Naive UI to them.
- Step 2 — Replace Hard‑Coded Branding: Sweep `pages`, `layouts`, `components`,
  short-link, SMS/email utils to read from brand config; standardize asset paths.
- Step 3 — Analytics Unification: Remove duplicate GTM integration; pull all IDs
  /labels from config; verify single event stream.
- Step 4 — Payment Service Refactor: Wrap Stripe logic, fix customer creation, c
  onsolidate webhooks, add idempotency/error handling.
- Step 5 — Integration Toggles: Move Zapier, Twilio, Aircall, SendGrid to config
  ; support enable/disable by env; remove inline phone/email/URLs.
- Step 6 — Quote Flow Hardening: Merge quote validation stubs, implement clear v
  alidations, and unify short-link domain handling.
- Step 7 — Maps Proxy & Keys: Add server proxy for Directions with caching; lock
  down key usage in the client.
- Step 8 — Caching & Data: Centralize server-side caching for form catalog data
  with TTL/invalidation; type the data layer.
- Step 9 — Security/Logging: Add config validation, scrub logs, consistent error
  surfaces; remove stray logs.
- Step 10 — Docs & Cleanup: Write the Brand Pack guide; remove dead code (`payme
ntlink.vue` if not needed), update scripts; plan Nuxt/module upgrades.

## Packages

```text
dependencies:
- @formkit/auto-animate 1.0.0-beta.6 - This is its own separate module now, with no need for the plugin
- @prisma/client 5.4.2 (6.13.0 is available)
- @trpc/client 10.45.2 (11.4.4 is available)
- @trpc/server 10.45.2 (11.4.4 is available)
- langchain 0.0.165 (0.3.30 is available) - This is likley unnecessary we can just use the api via the openai sdk
- superjson 1.13.3 (2.2.2 is available) - not sure if this si still needed
- trpc-panel 1.3.4
- zod 3.25.76 (4.0.17 is available) - zod 4 is much nicer than 3, theres a codegen module for simple upgrade that keeps it backwards compatible

devDependencies:
- @googlemaps/js-api-loader 1.16.10 - This has a new version and works very defferent now, package may be called something different
- @gtm-support/vue-gtm 2.2.0 (3.1.0 is available) - This may have a built in nuxt module, and connect it to a flag so that we dont sent telemetry to google in dev.
- @headlessui/tailwindcss 0.2.2 - Not sure we need this
- @headlessui/vue 1.7.23
- @huntersofbook/naive-ui-nuxt 1.2.0 deprecated - This has a few different choices for a replacement
- @nuxt/devtools 0.8.5 (2.6.2 is available)
- @nuxt/image 1.0.0-rc.3 (1.11.0 is available)
- @nuxt/test-utils 3.7.4 (3.19.2 is available)
- @nuxtjs/color-mode 3.5.2
- @nuxtjs/robots 3.0.0 (5.4.0 is available) - This may have been merged into nuxt seo
- @nuxtjs/tailwindcss 6.14.0
- @pinia/nuxt 0.4.11 (0.11.2 is available) - if the store is not complex use `useState` instead

- @sendgrid/mail 7.7.0 (8.1.5 is available) - We dont need to be married to sendgrid theres lot of options
- @stripe/stripe-js 2.4.0 (7.8.0 is available)
- @tailwindcss/aspect-ratio 0.4.2
- @tailwindcss/container-queries 0.1.1
- @tailwindcss/forms 0.5.10
- @tailwindcss/typography 0.5.16
- @tanstack/vue-query 4.40.0 (5.83.1 is available) - Not sure if this is needed anymore or not
- @types/google.maps 3.58.1
- @types/gtag.js 0.0.16 (0.0.20 is available)
- @types/node 20.19.10 (24.2.1 is available)
- @types/uuid 9.0.8 (10.0.0 is available)
- @types/vue-tel-input 2.1.7
- @vee-validate/zod 4.15.1 - Not a fan of vee validate use if necessary dont if you dont have to
- @vue-macros/nuxt 1.13.5 (3.0.0-beta.21 is available) - unnecessary as the macros are vue builtins now
- @vueuse/math 10.11.1 (13.6.0 is available)
- @vueuse/nuxt 10.11.1 (13.6.0 is available)
- @zadigetvoltaire/nuxt-gtm 0.0.13 - I think this is not maintained anymore
- chalk 5.3.0 (5.5.0 is available)
- date-fns 2.30.0 (4.1.0 is available) - Not likely needed jsut use regular js dates
- html2canvas 1.4.1
- html2pdf.js 0.10.3
- ics 3.8.1
- nuxt 3.18.1 (4.0.3 is available) Keep this as 3.18.1 for now is a bit of a change to update
- nuxt-icon 0.5.0 (1.0.0-beta.7 is available) - use @nuxtjs/icon it's the latest version of this
- nuxt-lodash 2.5.3
- nuxt-vitest 0.11.0 (0.11.5 is available) deprecated - Use nuxt testing module
- openai 4.104.0 (5.12.2 is available)
- prettier 3.6.2
- prettier-plugin-organize-attributes 1.0.0
- prettier-plugin-tailwindcss 0.5.14 (0.6.14 is available)
- prisma 5.22.0 (6.14.0 is available)
- rollbar 2.26.4
- stripe 13.11.0 (18.4.0 is available)
- trpc-nuxt 0.10.22 (1.2.0 is available) - The new one uses TRPC 11
- twilio 4.23.0 (5.8.0 is available)
- typescript 5.9.2
- uuid 9.0.1 (11.1.0 is available)
- vee-validate 4.15.1
- vite-node 0.34.7 (3.2.4 is available)
- vitest 0.33.0 (3.2.4 is available)
- vue 3.5.18
- vue-tel-input 8.3.1 (9.3.0 is available)
```
