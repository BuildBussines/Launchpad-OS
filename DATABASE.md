# Database Schema — Launchpad OS

Defined in `prisma/schema.prisma`. Two models, deliberately kept separate.

## Why Lead and Order are separate tables

Marketing capture (an email from the hero form) should never be blocked on or lost because a
purchase didn't complete. `Lead` rows are created the moment someone submits an email, full
stop. `Order` rows are created when someone starts checkout, and are linked back to a `Lead` only
when we have a matching email — this lets you run remarketing to people who signed up but never
bought, which is usually the highest-leverage list you have.

## Lead

| Column | Type | Notes |
|---|---|---|
| `id` | `String` (cuid) | Primary key |
| `email` | `String` | Unique — repeat signups upsert rather than duplicate |
| `source` | `String?` | Where the email was captured (`"hero"`, `"exit-intent"`, `"pricing"`, etc.) — set by the client in the POST body |
| `createdAt` | `DateTime` | Defaults to now |
| `order` | `Order?` | Optional back-reference if this lead converted |

Indexed on `createdAt` for building "leads over time" dashboards/exports.

## Order

| Column | Type | Notes |
|---|---|---|
| `id` | `String` (cuid) | Primary key |
| `email` | `String` | Buyer email — not required to match an existing `Lead` |
| `tier` | `ProductTier` enum | `STARTER` \| `PRO` \| `FOUNDER` |
| `amountCents` | `Int` | Stored as integer cents to avoid floating-point money bugs |
| `currency` | `String` | Defaults to `"usd"` |
| `status` | `OrderStatus` enum | `PENDING` \| `PAID` \| `REFUNDED` \| `FAILED` |
| `stripeSessionId` | `String?` | Unique — set once a Stripe Checkout Session is created |
| `stripePaymentId` | `String?` | Set once payment is confirmed via webhook |
| `createdAt` / `updatedAt` | `DateTime` | Standard timestamps |
| `leadId` | `String?` | Optional FK back to the originating `Lead` |

Indexed on `email` and `status` — the two fields you'll filter admin/reporting queries on most.

**Order lifecycle:** a row is created as `PENDING` the instant someone clicks a pricing button
(see `app/api/checkout/route.ts`), before payment is confirmed. This means you can see and follow
up on abandoned checkouts, not just completed ones. A Stripe webhook handler (see README section
3) should flip `status` to `PAID` once `checkout.session.completed` fires, using
`stripeSessionId` to find the right row.

## Switching from SQLite to Postgres

The schema ships pointed at SQLite for zero-setup local development. To move to Postgres:

1. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql" // was "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
2. Update `DATABASE_URL` in `.env` to a Postgres connection string, e.g.:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/launchpad_os"
   ```
3. Run `npx prisma migrate dev --name init` to create the initial migration against Postgres
   (SQLite migrations aren't portable, so start a fresh migration history here).
4. In production, run `npx prisma migrate deploy` instead of `migrate dev`.

`docker-compose.yml` already provisions a Postgres instance for this — see README section 4A.

## Common queries you'll want

```ts
// All leads that never converted, for remarketing
const uncovertedLeads = await prisma.lead.findMany({ where: { order: null } });

// Revenue by tier
const revenueByTier = await prisma.order.groupBy({
  by: ["tier"],
  where: { status: "PAID" },
  _sum: { amountCents: true },
  _count: true,
});
```
