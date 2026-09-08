const props = [
  {
    label: "You stop rebuilding the same scaffolding",
    detail:
      "Every project starts with the same roadmap, the same landing page skeleton, the same analytics setup. Launchpad OS gives you that scaffolding once so day one starts on the actual idea.",
  },
  {
    label: "You launch before the idea goes cold",
    detail:
      "Momentum is the real constraint on side projects, not skill. A fixed seven-day sequence keeps you moving instead of polishing something no one has seen yet.",
  },
  {
    label: "You make fewer decisions, and better ones",
    detail:
      "Pricing structure, tech choices, and launch-day logistics are pre-decided by people who've shipped before. You spend your judgment on the parts only you can call.",
  },
  {
    label: "You own it outright",
    detail:
      "One purchase, lifetime access, all future template updates included. No seat fees, no recurring charge to keep using a system you already learned.",
  },
];

export default function ValueProps() {
  return (
    <section className="border-b border-line2 py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-[52ch]">
          <h2 className="text-balance font-display text-3xl font-semibold text-text-hi sm:text-4xl">
            Built for the founder who has started a project before
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-lo">
            You don&apos;t need more inspiration. You need the version of this that doesn&apos;t
            stall out in week three.
          </p>
        </div>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {props.map((item) => (
            <div key={item.label} className="grid gap-2 py-7 md:grid-cols-[minmax(0,26ch)_1fr] md:gap-10">
              <h3 className="font-display text-lg font-medium text-text-hi">{item.label}</h3>
              <p className="text-sm leading-relaxed text-text-lo md:max-w-[60ch]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
