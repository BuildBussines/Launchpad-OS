# Design System — Launchpad OS

This document explains the design decisions behind the site, not just the values, so you can
rebrand it without breaking the logic that holds it together.

## 1. The idea the design is built around

The product is a *sequence* — seven fixed days, each unlocking specific deliverables. Almost
every distinctive choice on the page comes from taking that literally: a mission-control /
technical-schematic aesthetic (grid backgrounds, hairline dividers, monospace data readouts,
a countdown) instead of a generic "friendly SaaS" look. That's also where the standout
interaction comes from — the day-by-day scrubber isn't decoration bolted onto a template, it's
the product's own structure made draggable.

If you rebrand this for a different digital product, the first question to ask is: **what is
this product's own natural structure or vernacular?** Swap the mission-control framing for
whatever that is, rather than keeping the countdown motif for an unrelated product.

## 2. Color

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0A1120` | Primary background — deep blueprint navy, not pure black |
| `panel` | `#111B30` | Raised surface (cards, the scrubber panel) |
| `panel2` | `#16223C` | Secondary surface / nested panel |
| `line` | `#2A3A57` | Structural hairline borders and dividers |
| `line2` | `#1C2A46` | Faint grid lines, low-emphasis borders |
| `paper` | `#F0EDE4` | The one light section (pricing) — a deliberate register change |
| `amber` | `#FFB020` | Primary accent — CTAs, active states, the one accent used for emphasis |
| `signal` | `#FF5E45` | Countdown/alert accent — used only in the scrubber's T-minus readout |
| `text-hi` | `#EEF1F7` | Primary text on dark backgrounds |
| `text-lo` | `#8C97AF` | Secondary/muted text on dark backgrounds |
| `text-ink` | `#141B2B` | Primary text on the light pricing section |

**Rule of thumb when editing:** `amber` is the only accent used for interactive/emphasis
moments (CTAs, active tab states, bullet marks). `signal` (red) appears in exactly one place —
the countdown readout — so it reads as a deliberate signal, not just a second brand color. If
you add more accent colors, you dilute this; prefer reusing `amber` first.

## 3. Typography

| Token | Typeface | Role |
|---|---|---|
| `font-display` | Space Grotesk (500/600/700) | Headlines, section titles, wordmark — has enough technical/geometric character to support the mission-control tone without being a novelty face |
| `font-body` | Inter (400/500/600) | Body copy, UI labels — chosen for legibility at small sizes, not personality |
| `font-mono` | IBM Plex Mono (400/500) | Used *only* for actual data-like content: day counters, countdown readout, price figures, the wordmark's status dot label. Not used decoratively on ordinary labels. |

Body copy is capped at roughly 50–60 characters per line (`max-w-[52ch]` / `max-w-[60ch]`
utility classes) per standard readability guidance — check this if you change font sizes.

## 4. Layout

- **Alignment:** left-aligned throughout, matching the "technical document" register. No
  centered hero — the split hero (copy left, sequence preview right) mirrors the
  dashboard-and-readout framing used again in the scrubber section.
- **Grid rhythm:** sections are separated by a 1px `border-b border-line2` hairline rather than
  large blank gaps or shadowed cards. This is a functional structural device (like divisions on
  a schematic), not decoration — keep it if you preserve the technical tone, drop it if you
  move toward a softer brand.
- **Cards vs. panels:** the site avoids the generic "identical rounded card with soft shadow"
  pattern. Panels use small, consistent corner radii (`rounded-sm`, 2px) or none, hairline
  borders instead of shadows, and the *pricing* section is the one place a real shadow appears
  (`shadow-[6px_6px_0_0_...]`, a hard offset shadow rather than a soft blur) specifically to
  make the recommended tier feel like a distinct, stamped object.

## 5. Motion

One orchestrated moment: the hero's headline, subtext, form, and preview panel stagger in on
page load (`Hero.tsx`, `framer-motion`, staggered `delay` values). Everywhere else, motion is a
direct response to a user action:
- Dragging the scrubber crossfades the content panel and animates the progress bar
- Opening an FAQ item rotates the `+` marker
- Hover states are simple opacity/color transitions, not transforms

There are no scroll-triggered fade-ins on every section — that pattern was deliberately avoided
as the most common tell of a templated page.

## 6. Why no stock photography

Digital products selling a *system* (templates, workflows, scripts) tend to reach for stock
photos of laptops-on-desks or generic "team collaborating" imagery that adds no real
information. This design uses no photography at all — the SVG/CSS-based schematic elements and
the interactive scrubber carry the visual weight instead, and the wordmark is text-based. If
your rebrand benefits from real product screenshots (e.g. actual Notion/Figma screens), the
natural place to add them is inside the scrubber's right-hand content panel in
`LaunchScrubber.tsx`.

## 7. Rebranding checklist

1. Update color tokens in `tailwind.config.ts` (`theme.extend.colors`) — see the rationale above
   before introducing new accent colors.
2. Swap the three `next/font/google` imports in `app/layout.tsx` if changing typefaces; keep the
   display/body/mono three-role split even if the specific faces change.
3. Replace copy directly in each `components/*.tsx` file (see README "Customization guide").
4. If your product isn't structured as a fixed sequence, consider whether `LaunchScrubber.tsx`'s
   interaction pattern still fits, or whether your product's own structure suggests a different
   standout interaction (a comparison slider, a live calculator, an unlockable checklist, etc.).
   The principle to preserve is: the interaction should demonstrate the product, not just
   decorate the page.
