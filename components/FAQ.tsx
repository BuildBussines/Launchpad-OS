"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need to follow the seven days literally, back to back?",
    a: "No. Most people run it over one to two focused weekends, or evenings across two weeks. The sequence is the order that works, not a deadline you have to hit in real time.",
  },
  {
    q: "What tools does this actually run in?",
    a: "Notion for the planning workspace, Figma for the UI kit, and shell scripts plus a small Node CLI for the automation. You don't need to know how to code to use the templates, but the automation scripts assume basic command-line comfort.",
  },
  {
    q: "Is this only for SaaS products?",
    a: "It's built around software products with a landing page and an early user base — SaaS, tools, and apps. The planning and design templates generalize well; the deploy automation assumes a typical web stack.",
  },
  {
    q: "What happens after I buy — is there ongoing access?",
    a: "You get lifetime access to everything, including future template updates, under one account. There's no recurring charge and nothing that expires.",
  },
  {
    q: "What if I get through it and it's not for me?",
    a: "Email us within 30 days of purchase and we'll refund it, no form or justification required.",
  },
  {
    q: "Can I use this with a team, not solo?",
    a: "Yes — the Notion workspace and Figma kit both support multiple collaborators. The sequence works well as a shared team sprint, not just a solo run.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-[52ch]">
          <h2 className="text-balance font-display text-3xl font-semibold text-text-hi sm:text-4xl">
            Questions before you commit
          </h2>
        </div>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium text-text-hi">{item.q}</span>
                  <span
                    className={`shrink-0 font-mono text-lg text-amber transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-6 pr-10 text-sm leading-relaxed text-text-lo">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
