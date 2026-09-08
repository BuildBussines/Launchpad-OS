const columns = [
  {
    title: "Product",
    links: [
      { label: "The system", href: "#system" },
      { label: "Pricing", href: "#pricing" },
      { label: "Results", href: "#proof" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "mailto:hello@launchpados.example" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Refund policy", href: "/refunds" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "Twitter / X", href: "https://x.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink py-16">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold text-text-hi">Launchpad OS</p>
            <p className="mt-3 max-w-[32ch] text-sm text-text-lo">
              The planning system, design kit, and automation scripts for shipping a product in a
              week.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs text-text-lo">{col.title}</p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-lo transition-colors hover:text-text-hi"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line2 pt-6 text-xs text-text-lo sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Launchpad OS. All rights reserved.</p>
          <p>Built and sold as a digital download. No refund on custom review calls once booked.</p>
        </div>
      </div>
    </footer>
  );
}
