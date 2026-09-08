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

## Connecting to Supabase Postgres

The schema is configured for Supabase's Postgres, using two connection strings — this is
Supabase's recommended pattern for serverless hosts like Netlify:

- `DATABASE_URL` — the **pooled** connection (via PgBouncer, port `6543`), used at runtime by
  your deployed functions. Serverless functions open a lot of short-lived connections; going
  through the pooler avoids exhausting Postgres's connection limit.
- `DIRECT_URL` — the **direct** connection (port `5432`), used only when running
  `prisma migrate`. Migrations need a direct connection because PgBouncer's transaction mode
  doesn't support some of the session-level commands migrations issue.

**Where to find both:** in your Supabase project, go to **Project Settings → Database →
Connection string**. Supabase shows tabs for both pooled and direct — copy each into your `.env`
(or your host's environment variables) in the format shown in `.env.example`, substituting
`[YOUR-DB-PASSWORD]` with your project's database password (set when you created the project —
not the `anon`/`publishable` API key, which is a separate credential for the Supabase client SDK
and won't work here).

Then run your first migration against it:

```bash
npx prisma migrate dev --name init
```

In production, run `npx prisma migrate deploy` instead — it applies existing migrations without
prompting or generating new ones.

`docker-compose.yml`'s local Postgres service is only needed if you'd rather develop against a
local database instead of Supabase directly — either works.

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
