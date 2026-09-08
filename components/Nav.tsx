"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#system", label: "The system" },
  { href: "#proof", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "Questions" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur border-b border-line2" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold text-text-hi">
          <span className="inline-block h-2 w-2 rounded-full bg-amber animate-blink" aria-hidden="true" />
          Launchpad OS
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-lo transition-colors hover:text-text-hi"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#pricing"
          className="rounded-sm border border-amber bg-amber/10 px-4 py-2 text-sm font-medium text-amber transition-colors hover:bg-amber hover:text-ink"
        >
          Get the system
        </a>
      </nav>
    </header>
  );
}
