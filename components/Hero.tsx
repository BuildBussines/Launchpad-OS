"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "hero" }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="top" className="relative overflow-hidden border-b border-line2 grid-bg">
      {/* radial fade over the grid so it recedes toward the edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(10,17,32,0) 0%, #0A1120 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-content gap-12 px-6 pb-24 pt-16 md:grid-cols-[1.1fr_0.9fr] md:pb-32 md:pt-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 font-mono text-sm text-text-lo"
          >
            A one-time purchase, not a subscription
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance font-display text-4xl font-semibold leading-[1.08] text-text-hi sm:text-5xl md:text-[3.25rem]"
          >
            Go from idea to a live product in seven days, not seven months
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-text-lo"
          >
            Launchpad OS is the planning system, design kit, and automation scripts we built
            after shipping eleven products the slow way. Follow the sequence and you launch on
            day seven with a working product, not a plan for one.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="hero-email" className="sr-only">
              Work email
            </label>
            <input
              id="hero-email"
              type="email"
              required
              placeholder="you@yourstartup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-line bg-panel px-4 py-3 text-sm text-text-hi placeholder:text-text-lo/60 focus:border-amber"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="whitespace-nowrap rounded-sm bg-amber px-5 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "done" ? "You're on the list" : "Get launch-day access"}
            </button>
          </motion.form>
          <p className="mt-3 text-xs text-text-lo">
            {status === "error"
              ? "Something went wrong on our end — please try again."
              : "Join the list for the founder rate before public pricing opens. No spam."}
          </p>
        </div>

        {/* Static preview of the 7-day sequence, drawing the eye toward the interactive scrubber below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative hidden rounded-sm border border-line bg-panel/60 p-6 md:block"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-text-lo">Launch sequence</p>
          <div className="mt-5 space-y-3">
            {["Foundation", "Structure", "Design", "Build", "Content", "Distribution", "Launch"].map(
              (step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-amber">D{i + 1}</span>
                  <div className="h-px flex-1 bg-line" />
                  <span className="text-sm text-text-lo">{step}</span>
                </div>
              )
            )}
          </div>
          <p className="mt-6 text-xs text-text-lo">
            Scroll down to scrub through each day and see exactly what unlocks.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
