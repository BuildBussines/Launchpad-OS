# Career & Content Starter Pack — Store Site

A plain HTML/CSS/JS storefront page for selling a digital template bundle, with a JazzCash
payment flow (buyer pays via JazzCash, sends a screenshot over WhatsApp, seller delivers the
files manually). No backend, no database, no build step.

## Files

- `index.html` — the whole page
- `styles.css` — all styling
- `script.js` — buy modal, WhatsApp link, copy-to-clipboard
- `assets/` — preview images of the product files

## Before you publish — edit these

Search each file for `EDIT ME`:

1. **`index.html`** — your JazzCash number, account title, and price
2. **`script.js`** — your WhatsApp number (`WHATSAPP_NUMBER`, digits only, country code first)
3. **`index.html`** footer — your name/contact email

## Deploying

No build step needed — this is static HTML.

**Netlify:** [app.netlify.com](https://app.netlify.com) → drag this whole folder onto the
"Deploy manually" box, or connect this repo under **Add new site → Import an existing project**.

**GitHub Pages:** Settings → Pages → Deploy from branch → `main` → `/ (root)`.

## Note on the actual product files

The template files buyers receive (resumes + spreadsheets) are **not** in this repo on purpose
— this repo is public, and including them would let anyone download the paid product for free.
Keep those files privately and send them manually after confirming payment.
