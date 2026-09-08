const metrics = [
  { value: "1,340+", label: "founders who've run the sequence" },
  { value: "6.4 days", label: "median time to public launch" },
  { value: "212", label: "products launched on day 7 exactly" },
];

const testimonials = [
  {
    quote:
      "I had started the same SaaS idea three separate times over two years. Following the sequence, I had it in front of paying users in eight days.",
    name: "R. Okafor",
    role: "Founder, solo B2B tool",
  },
  {
    quote:
      "The Notion workspace alone was worth it. I stopped rebuilding my roadmap template for every new project I start.",
    name: "M. Santoro",
    role: "Indie developer, three launched products",
  },
  {
    quote:
      "What got me to actually launch was the runbook. Having a checklist for launch day removed all the last-minute improvising.",
    name: "J. Whitfield",
    role: "Product designer turned founder",
  },
];

export default function SocialProof() {
  return (
    <section id="proof" className="border-b border-line2 py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-6 border border-line bg-panel sm:grid-cols-3">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`px-8 py-9 ${i !== metrics.length - 1 ? "sm:border-r sm:border-line" : ""}`}
            >
              <p className="font-mono text-3xl text-amber">{m.value}</p>
              <p className="mt-2 text-sm text-text-lo">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col justify-between rounded-sm border border-line p-6">
              <blockquote className="text-sm leading-relaxed text-text-hi">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-xs text-text-lo">
                <span className="text-text-hi">{t.name}</span> — {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
