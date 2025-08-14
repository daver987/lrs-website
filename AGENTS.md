# AGENTS

This repo is Nuxt 3 + Tailwind + Naive UI. It supports brand‑theming, booking flow, Stripe, and third‑party integrations (Twilio, SendGrid, GTM). This playbook explains how to work on it safely and quickly.

## Overview

- App config: `app.config.ts` is the single source of truth for brand (name, legalName, slug, domain, contact, assets, SEO, UI colors, orderPrefix).
- Theme variables: `plugins/brand-theme.client.ts` emits CSS variables from brand config; Tailwind `brand` and Naive UI primary refer to these vars.
- Analytics: Use `plugins/gtmvue.ts` only; IDs/flags come from `runtimeConfig.public`.
- Short links: `pages/[...slug].vue` derives domain from `appConfig.brand.domain`.
- Brandify helper: `composables/useBrandify.ts` replaces the legacy brand name in copy at render time.

## Repo Map

- `app.config.ts` — brand single source of truth
- `nuxt.config.ts` — modules, Naive UI overrides, runtimeConfig
- `plugins/brand-theme.client.ts` — sets `--brand-*` CSS vars
- `tailwind.config.js` — brand palette wired to CSS vars
- `components/` — UI (App*, IconBlock*, Logo, forms)
- `pages/` — views (booking, cart, checkout, marketing)
- `utils/services/` — integrations (SendGrid/Twilio)
- `data/` — marketing content blocks used by components
- `server/` — API routes and tRPC routers (to be consolidated for Stripe, quote)

## Dev Setup

Prereqs

- Node 18+ (Node 20+ recommended)
- pnpm 8+

Install & Run

- `pnpm install`
- `pnpm dev`

Env Vars (`.env.local`)

- Private: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SENDGRID_API_KEY`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_MESSAGING_SID`, `PLANETSCALE_USERNAME`, `PLANETSCALE_PASSWORD`, `ZAPIER_WEBHOOK_SECRET`, `ZAPIER_WEBHOOK_EMAIL`, `AIRCALL_API_ID`, `AIRCALL_API_TOKEN`
- Public: `GTM_ID`, `TAG_MANAGER_ENABLED`, `STRIPE_PUBLISHABLE_KEY`, `GOOGLE_MAPS_API_KEY`, `WEBSITE_URL`, `GA4_SEND_TO`, `G_ADS_*`

## Brand & Theming

- Update brand in `app.config.ts` only (name, contact, domain, assets, SEO, orderPrefix).
- Place assets under `public/images` (current) or `public/brand/<slug>` (target convention). Reference via `appConfig.brand.assets`.
- Colors: Extend `ui.colors.brand` in `app.config.ts` and the plugin maps them to CSS vars. Tailwind uses `brand` color scale.

Checklist (Switching Brand)

- [ ] Update `app.config.ts` brand block (name, contact, domain, assets, SEO, orderPrefix)
- [ ] Add/replace images under `public/images` or `public/brand/<slug>`
- [ ] Verify favicon and OG/Twitter images
- [ ] Confirm GTM config (`runtimeConfig.public`)

## Analytics

- Keep only `plugins/gtmvue.ts`; remove/avoid Nuxt GTM modules to prevent duplicate events.
- Toggle with `TAG_MANAGER_ENABLED`, set `GTM_ID` and GA4/Ads IDs.

## Payments (Stripe)

Target service boundary (Step 4 of PLAN):

- `server/utils/stripeService.ts` (proposed)
  - `getOrCreateCustomer({ userId, email })` — reuse existing by `stripe_customer_id` or lookup by email
  - `createSetupIntent({ customerId })` — idempotency keys; return client secret
  - `createPaymentIntent` (later) — idempotency keys
- Webhook handler: single route verifies signature, logs events, idempotent processing; persist event receipts.
- Safety: test mode vs live mode switch to avoid real charges in non‑prod.

## Integrations

- Twilio: Use `TWILIO_*` secrets from runtime; message copy should be brand‑neutral or use `appConfig.brand` as done in `sendTwilioSms.ts`.
- SendGrid: Use `SENDGRID_API_KEY`; from/reply‑to and subjects derive from `appConfig.brand` (already implemented).
- Zapier/Aircall: Move URLs/toggles to runtime config; gate sends by env flag.

## Quote → Booking Flow

- Local storage keys must derive from `brand.slug` (done in `app.vue`).
- Short links resolve via `brand.domain` (done).
- Merge quote validation endpoints into one path or tRPC router with zod schemas.

## Security & Reliability

- Never commit secrets; rely on `runtimeConfig` and use server routes to proxy third‑party APIs (e.g., Google Directions).
- Add a minimal logger and scrub PII; replace stray `console.log` in server code.

## Coding Conventions

- TypeScript throughout; prefer zod schemas for I/O
- Keep changes minimal/surgical; don’t introduce unrelated refactors
- Use Tailwind for layout; prefer utility classes; avoid inline styles except on generated background images
- Avoid adding new dependencies unless justified by PLAN.md

## Common Tasks – Playbooks

Brandifying marketing copy

- Prefer data‑driven content in `data/` and let UI apply `useBrandifyText`.
- For page‑specific text, interpolate `appConfig.brand.name` directly.

Adding a new brand

- Duplicate and edit `app.config.ts` brand block (or load from an external source if multi‑brand becomes a requirement).
- Place assets and adjust `assets.logo.*` and `assets.images.*` paths.

Stripe refactor

- Add `server/utils/stripeService.ts`, consolidate codepaths from existing server endpoints, and introduce idempotency keys.
- Replace direct mutations with service calls in tRPC routes.

## CI/Testing

- Vitest configured (`vitest.config.mjs`); add targeted unit tests around new service functions where practical.
- Lint/format: Prettier; run `pnpm format` if configured.

## Open TODOs

- Implement Stripe service + unified webhooks (Step 4)
- Move integration toggles to config and gate by env (Step 5)
- Merge quote validation and outcomes (Step 6)
- Add Google Directions proxy route (Step 7)
- Add runtime config validation + logger (Step 9)
- Author “Brand Pack” mini‑guide under `docs/` or expand this file
