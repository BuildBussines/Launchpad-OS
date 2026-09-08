import Link from "next/link";

// This page only renders when STRIPE_SECRET_KEY is not configured — see
// app/api/checkout/route.ts. It exists so the purchase flow is testable
// end-to-end before real payments are wired up.
export default function CheckoutDemoPage({
  searchParams,
}: {
  searchParams: { order?: string; tier?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
      <div className="max-w-md rounded-sm border border-line bg-panel p-10">
        <p className="font-mono text-xs text-amber">Demo checkout</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-text-hi">
          Order {searchParams.order ?? "—"} created
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-lo">
          Tier: <span className="text-text-hi">{searchParams.tier ?? "unknown"}</span>. This
          placeholder confirms your backend and pricing wiring work end to end. Add a
          STRIPE_SECRET_KEY to .env to replace this with a real Stripe Checkout redirect — see
          README.md.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-sm bg-amber px-5 py-3 text-sm font-medium text-ink"
        >
          Back to the site
        </Link>
      </div>
    </main>
  );
}
