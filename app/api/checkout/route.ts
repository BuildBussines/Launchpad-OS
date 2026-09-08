import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// Keep tier pricing server-side as the source of truth — never trust a
// price sent from the client.
const TIER_CONFIG = {
  starter: { label: "Starter", amountCents: 4900, dbValue: "STARTER" as const },
  pro: { label: "Pro", amountCents: 12900, dbValue: "PRO" as const },
  founder: { label: "Founder's Bundle", amountCents: 24900, dbValue: "FOUNDER" as const },
};

const checkoutSchema = z.object({
  tier: z.enum(["starter", "pro", "founder"]),
  email: z.string().email().optional(),
});

// POST /api/checkout
// Creates a PENDING order, then returns a checkoutUrl the client redirects
// to. Swap the STRIPE_SECRET_KEY branch below for a real
// stripe.checkout.sessions.create() call once you have live keys — see
// README.md "Connecting real payments".
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { tier } = parsed.data;
  const config = TIER_CONFIG[tier];

  try {
    const order = await prisma.order.create({
      data: {
        email: parsed.data.email ?? "pending@checkout",
        tier: config.dbValue,
        amountCents: config.amountCents,
        status: "PENDING",
      },
    });

    if (process.env.STRIPE_SECRET_KEY) {
      // Real integration path — install the `stripe` package and uncomment:
      //
      // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      // const session = await stripe.checkout.sessions.create({
      //   mode: "payment",
      //   line_items: [{
      //     price_data: {
      //       currency: "usd",
      //       product_data: { name: `Launchpad OS — ${config.label}` },
      //       unit_amount: config.amountCents,
      //     },
      //     quantity: 1,
      //   }],
      //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?order=${order.id}`,
      //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#pricing`,
      //   metadata: { orderId: order.id },
      // });
      // await prisma.order.update({
      //   where: { id: order.id },
      //   data: { stripeSessionId: session.id },
      // });
      // return NextResponse.json({ checkoutUrl: session.url });
    }

    // Fallback for local dev / demo without Stripe keys configured: send
    // the buyer to a local placeholder checkout page carrying the order id.
    return NextResponse.json({
      checkoutUrl: `/checkout-demo?order=${order.id}&tier=${tier}`,
      orderId: order.id,
    });
  } catch (err) {
    console.error("Failed to create order", err);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
  }
}
