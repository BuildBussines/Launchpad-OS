# Launchpad OS — Landing Page & Order Backend

A production-ready marketing site and lightweight commerce backend for a digital product
("Launchpad OS" — a 7-day startup launch toolkit). Built with Next.js 14 (App Router),
Tailwind CSS, Framer Motion, and Prisma.

**Live demo of the standout interaction:** the "Launch Sequence" section is a draggable,
keyboard-accessible scrubber (`components/LaunchScrubber.tsx`) that lets a visitor drag through
all 7 days of the product and see exactly what unlocks each day — it doubles as the hero demo
and the main navigation hook. See `DESIGN_SYSTEM.md` for the reasoning behind it.

---

## 1. What's in this repo

```
launchpad-os/
├── app/
│   ├── page.tsx                 # Landing page (composes all sections)
│   ├── layout.tsx                # Root layout, fonts, metadata
│   ├── globals.css               # Tailwind base + design tokens
│   ├── checkout-demo/page.tsx    # Placeholder checkout confirmation (no Stripe key needed)
│   └── api/
│       ├── leads/route.ts        # POST — capture an email lead
│       └── checkout/route.ts     # POST — create an order + checkout session
├── components/                   # One component per section (Nav, Hero, Pricing, etc.)
├── lib/prisma.ts                 # Shared Prisma client
├── prisma/
│   ├── schema.prisma              # Lead + Order models
│   └── seed.ts                    # Sample data for local dev
├── Dockerfile                     # Multi-stage production build
├── docker-compose.yml             # App + Postgres for local/prod
├── DESIGN_SYSTEM.md               # Full design token + rationale doc
└── DATABASE.md                    # Schema documentation + migration notes
```

---

## 2. Quick start (local development)

Requires Node.js 18.18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# The defaults work out of the box with SQLite — no changes needed to start.

# 3. Create the database and generate the Prisma client
npm run db:push
npm run db:generate

# 4. (Optional) seed some sample data
npm run db:seed

# 5. Run the dev server
npm run dev
```

Visit `http://localhost:3000`. The pricing buttons and hero email form are fully wired to the
local database — try submitting the hero form, then run `npm run db:studio` to see the row land
in the `Lead` table.

---

## 3. Connecting real payments

The checkout route (`app/api/checkout/route.ts`) already creates a `PENDING` order in the
database and is structured for Stripe Checkout:

1. `npm install stripe`
2. Add your `STRIPE_SECRET_KEY` to `.env`
3. Uncomment the Stripe block in `app/api/checkout/route.ts` and fill in your success/cancel URLs
4. Add a webhook handler (e.g. `app/api/webhooks/stripe/route.ts`) that listens for
   `checkout.session.completed` and updates the matching `Order.status` to `PAID` using the
   `stripeSessionId` you stored at creation time.

Until `STRIPE_SECRET_KEY` is set, the checkout flow redirects to `/checkout-demo`, a placeholder
confirmation page — this keeps the full purchase flow demoable and testable without live keys.

Wiring the hero form to a real email provider (Resend, Postmark, ConvertKit, etc.) is a similar
one-file change inside `app/api/leads/route.ts` — there's a `TODO` marking exactly where.

---

## 4. Deployment

### Option A — Docker (recommended for self-hosting)

```bash
docker compose up --build
```

This starts the app on `:3000` plus a Postgres database. Before your first run, switch the
Prisma datasource provider from `sqlite` to `postgresql` in `prisma/schema.prisma` (see
`DATABASE.md`), then run migrations inside the container:

```bash
docker compose exec web npx prisma migrate deploy
```

### Option B — Vercel (or any Next.js host)

1. Push this repo to GitHub
2. Import it into Vercel
3. Add environment variables from `.env.example` in the Vercel dashboard
4. Point `DATABASE_URL` at a hosted Postgres instance (Neon, Supabase, Railway, RDS, etc.) —
   Vercel's serverless functions can't use a local SQLite file
5. Deploy — Vercel runs `npm run build` automatically

### Option C — Any Node host (Render, Fly.io, a VPS)

```bash
npm run build
npm run start
```

Make sure `DATABASE_URL` points at a reachable Postgres instance and that
`npx prisma migrate deploy` has been run against it first.

---

## 5. Customization guide

**Rebranding.** Every color, font, and spacing decision lives in `tailwind.config.ts` under
`theme.extend.colors` / `fontFamily`, matching the token names documented in
`DESIGN_SYSTEM.md`. Swap the hex values there and the whole site updates — no component files
need touching for a palette change. To swap fonts, edit the three `next/font/google` imports at
the top of `app/layout.tsx`.

**Copy.** All marketing copy is inline JSX/data arrays inside each `components/*.tsx` file —
nothing is generated dynamically, so it's safe to search-and-replace product names, prices, and
testimonials directly in those files. Pricing tiers and their features live in
`components/Pricing.tsx`; the day-by-day product content lives in `components/LaunchScrubber.tsx`.

**Adding a section.** Create a new component in `components/`, then add it to the composition in
`app/page.tsx`. Use `border-b border-line2` on your section to keep the hairline rhythm
consistent with the rest of the page.

**Logo / imagery.** No raster logo is used — the wordmark in `components/Nav.tsx` and
`components/Footer.tsx` is text-based by design (see `DESIGN_SYSTEM.md`, "why no stock imagery").
Drop an SVG mark into `components/Nav.tsx` if you have one.

---

## 6. Performance notes

- Fonts are loaded via `next/font/google` (self-hosted at build time, no runtime font-request
  waterfall, automatic `font-display: swap`).
- The only client-heavy component is `LaunchScrubber.tsx`; everything else that doesn't need
  interactivity is a server component by default (App Router).
- `next.config.js` sets `output: "standalone"` so the Docker image only ships the files actually
  needed at runtime, not the full `node_modules`.
- No external image hosts are hit at runtime — this build intentionally uses no photography (see
  `DESIGN_SYSTEM.md`), which removes a common source of layout shift and slow LCP on landing
  pages.

---

## 7. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) + React 18 | Server components by default, file-based API routes, one deployable unit |
| Styling | Tailwind CSS | Design tokens as config, no runtime CSS-in-JS cost |
| Motion | Framer Motion | Used sparingly for the one orchestrated hero reveal and the scrubber transitions |
| Backend | Next.js Route Handlers | No separate server to deploy or keep in sync with the frontend |
| ORM / DB | Prisma + SQLite (dev) / Postgres (prod) | Type-safe queries, trivial local setup, one-line swap to production DB |
| Validation | Zod | Shared, explicit request validation on every API route |

---

## 8. License

This codebase is provided as a deliverable for the commissioning buyer to use, modify, and
rebrand freely for their own product.
