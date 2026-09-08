"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Day = {
  day: number;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
};

const days: Day[] = [
  {
    day: 1,
    phase: "Foundation",
    title: "Decide what you're actually building",
    description:
      "Before any design or code, you lock the positioning so day four doesn't undo day two.",
    deliverables: ["Positioning one-pager", "Ideal customer canvas", "Pricing hypothesis worksheet"],
  },
  {
    day: 2,
    phase: "Structure",
    title: "Set up the operating system",
    description:
      "A Notion workspace pre-built for a launch, not a generic team wiki — roadmap, backlog, and a metrics dashboard already wired together.",
    deliverables: ["Notion launch workspace", "Roadmap + backlog templates", "Metrics dashboard"],
  },
  {
    day: 3,
    phase: "Design",
    title: "Design the product surface",
    description:
      "A component kit built for launch pages and early product screens, not a general-purpose UI library you have to fight into shape.",
    deliverables: ["Figma UI kit, 40+ components", "Landing page starter", "Light and dark themes"],
  },
  {
    day: 4,
    phase: "Build",
    title: "Wire up the plumbing",
    description:
      "The unglamorous infrastructure — deploys, analytics, email capture — scripted so you configure instead of write.",
    deliverables: ["One-command deploy script", "Analytics + event wiring", "Email capture endpoint"],
  },
  {
    day: 5,
    phase: "Content",
    title: "Write everything you'll need",
    description:
      "Fill-in-the-blank templates for the copy that actually moves launch-week numbers, not generic marketing filler.",
    deliverables: ["Landing page copy template", "Launch thread template", "Cold outreach sequence"],
  },
  {
    day: 6,
    phase: "Distribution",
    title: "Prepare the launch runbook",
    description:
      "A minute-by-minute plan for launch day so you're executing a checklist instead of improvising under pressure.",
    deliverables: ["Launch day runbook", "Press + community list template", "Launch platform kit"],
  },
  {
    day: 7,
    phase: "Launch",
    title: "Ship it",
    description:
      "Go live against a pre-flight checklist, then capture what happened while it's still fresh with the built-in retro template.",
    deliverables: ["Go-live checklist", "Post-launch retro template", "Week-two follow-up plan"],
  },
];

export default function LaunchScrubber() {
  const [value, setValue] = useState(1);
  const active = useMemo(() => days[value - 1], [value]);
  const remaining = 7 - value;

  return (
    <section id="system" className="border-b border-line2 bg-ink py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-[60ch]">
          <p className="mb-3 font-mono text-sm text-text-lo">The system, day by day</p>
          <h2 className="text-balance font-display text-3xl font-semibold text-text-hi sm:text-4xl">
            Drag through the week and see exactly what you get, when you get it
          </h2>
        </div>

        <div className="mt-14 rounded-sm border border-line bg-panel">
          {/* Readout header */}
          <div className="flex flex-col justify-between gap-4 border-b border-line px-6 py-5 sm:flex-row sm:items-center">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl text-amber" aria-hidden="true">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-sm text-text-lo">of 7 days</span>
            </div>
            <div className="font-mono text-sm text-signal">
              {remaining === 0 ? "T-00 — LIVE" : `T-minus ${remaining} day${remaining === 1 ? "" : "s"} to launch`}
            </div>
          </div>

          {/* Scrub track */}
          <div className="px-6 pt-8">
            <input
              type="range"
              min={1}
              max={7}
              step={1}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              aria-label="Scrub through the 7-day launch sequence"
              className="scrubber-range w-full"
            />
            <div className="mt-2 flex justify-between font-mono text-[11px] text-text-lo">
              {days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setValue(d.day)}
                  className={`px-1 transition-colors ${
                    d.day === value ? "text-amber" : "hover:text-text-hi"
                  }`}
                >
                  D{d.day}
                </button>
              ))}
            </div>
          </div>

          {/* Content panel */}
          <div className="grid gap-8 px-6 py-9 md:grid-cols-[1fr_1fr] md:gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.day}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-mono text-xs uppercase tracking-wide text-amber">
                  Phase — {active.phase}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-text-hi">
                  {active.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-lo">{active.description}</p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.day}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="rounded-sm border border-line2 bg-panel2 p-5"
              >
                <p className="font-mono text-xs text-text-lo">Unlocks on day {active.day}</p>
                <ul className="mt-3 space-y-2">
                  {active.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-hi">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar across the bottom, tied to the same value */}
          <div className="h-1 w-full bg-line2">
            <motion.div
              className="h-full bg-amber"
              animate={{ width: `${(value / 7) * 100}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrubber-range {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: #2a3a57;
          border-radius: 2px;
          outline: none;
        }
        .scrubber-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 3px;
          background: #ffb020;
          border: 2px solid #0a1120;
          cursor: grab;
          margin-top: -8px;
        }
        .scrubber-range::-webkit-slider-thumb:active {
          cursor: grabbing;
        }
        .scrubber-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 3px;
          background: #ffb020;
          border: 2px solid #0a1120;
          cursor: grab;
        }
        .scrubber-range::-moz-range-track {
          height: 4px;
          background: #2a3a57;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}
