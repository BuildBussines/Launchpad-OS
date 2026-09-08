"use client";

import { useState } from "react";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    tagline: "The planning layer",
    features: [
      "Positioning + ICP templates",
      "Notion launch workspace",
      "Landing page copy template",
      "Lifetime access, free updates",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 129,
    tagline: "The full 7-day system",
    features: [
      "Everything in Starter",
      "Figma UI kit, 40+ components",
      "Deploy + analytics automation scripts",
      "Launch day runbook + retro template",
      "Lifetime access, free updates",
    ],
    highlighted: true,
  },
  {
    id: "founder",
    name: "Founder's Bundle",
    price: 249,
    tagline: "Pro, plus direct feedback",
    features: [
      "Everything in Pro",
      "One 30-minute launch review call",
      "Private founders channel access",
      "Priority template requests",
      "Lifetime access, free updates",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  async function handlePurchase(tierId: string) {
    setLoadingTier(tierId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: tierId }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } finally {
      setLoadingTier(null);
    }
  }

  return (
    <section id="pricing" className="border-b border-line2 bg-paper py-24 text-text-ink">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-[52ch]">
          <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">
            One purchase. No subscription to remember to cancel.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-ink/70">
            Pick the tier that matches how much of the sequence you want built for you.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-sm border p-7 ${
                tier.highlighted
                  ? "border-2 border-ink bg-white shadow-[6px_6px_0_0_#141B2B]"
                  : "border-paperLine bg-white/60"
              }`}
            >
              {tier.highlighted && (
                <p className="mb-4 inline-block w-fit rounded-sm bg-ink px-2 py-1 font-mono text-[11px] text-amber">
                  Most founders choose this
                </p>
              )}
              <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-text-ink/60">{tier.tagline}</p>

              <p className="mt-6 font-mono text-4xl">
                ${tier.price}
                <span className="ml-1 text-sm font-normal text-text-ink/50">one-time</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(tier.id)}
                disabled={loadingTier === tier.id}
                className={`mt-8 rounded-sm px-5 py-3 text-sm font-medium transition-opacity disabled:opacity-60 ${
                  tier.highlighted
                    ? "bg-ink text-white hover:opacity-90"
                    : "border border-ink text-ink hover:bg-ink hover:text-white"
                }`}
              >
                {loadingTier === tier.id ? "Preparing checkout…" : `Get ${tier.name}`}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-text-ink/60">
          30-day refund if the sequence isn&apos;t a fit for how you build. No forms, just email us.
        </p>
      </div>
    </section>
  );
}
