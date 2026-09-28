# Salon Website Template

A static, mobile-first website for a premium bridal salon — HTML5, Tailwind
CSS and vanilla JavaScript only (no React, no backend, no CMS). The current
configuration is **Panache The Salon** (Peshawar, Pakistan), but the whole
site is built to be reused for any salon by editing one config file, three
color variables, and the images in `/assets/`.

## Project structure

```
/
├── index.html              ← page structure — should rarely need editing
├── package.json
├── tailwind.config.js
├── src/input.css           ← theme (CSS variables) + custom components
├── css/output.css          ← built CSS (generated — do not hand-edit)
├── js/script.js            ← behavior — reads everything from data/salon-config.js
├── data/salon-config.js    ← ALL salon-specific content lives here
├── assets/
│   ├── logo/       (panache-logo.png, favicon.png)
│   ├── hero/       (hero-bridal.jpg)
│   ├── about/      (salon-interior.jpg)
│   ├── bridal/     (bridal-package.jpg, walima-package.jpg, mehndi-package.jpg,
│   │                portfolio-1.jpg … portfolio-8.jpg)
│   ├── gallery/    (gallery-1.jpg … gallery-8.jpg)
│   └── services/   (optional service photos)
└── README.md
```

## Running locally

```bash
npm install
npm run dev     # watches src/input.css and rebuilds css/output.css
```

Then open `index.html` directly in a browser, or serve the folder with any
static server (e.g. `npx serve .`). The committed `css/output.css` already
reflects the current config, so the site looks correct even before you run
`npm install`.

## Building for production

```bash
npm run build    # outputs a minified css/output.css
```

Deploy the folder as-is to Vercel, Netlify, or any static host.

## Current status: images

Every photo slot (hero, about, bridal packages, bridal portfolio, gallery,
logo) currently renders as a labeled placeholder because no real photography
has been added yet. Each slot has a fixed filename it's already wired to —
drop a file at that exact path and it replaces the placeholder automatically,
no code changes needed:

| Slot | Expected file |
|---|---|
| Logo (header + footer) | `assets/logo/panache-logo.png` |
| Favicon | `assets/logo/favicon.png` |
| Hero photo | `assets/hero/hero-bridal.jpg` |
| About / salon interior | `assets/about/salon-interior.jpg` |
| Bridal Package card | `assets/bridal/bridal-package.jpg` |
| Walima Package card | `assets/bridal/walima-package.jpg` |
| Mehndi Package card | `assets/bridal/mehndi-package.jpg` |
| Bridal Portfolio grid | `assets/bridal/portfolio-1.jpg` … `portfolio-8.jpg` (add/remove entries in config) |
| General gallery grid | `assets/gallery/gallery-1.jpg` … `gallery-8.jpg` (add/remove entries in config) |

Testimonials are real, attributed Google reviews (see `data/salon-config.js`)
— never replace them with invented quotes if you reuse this template
elsewhere; use the "Google Reviews" empty-state fallback until real reviews
are supplied instead.

---

## HOW TO REUSE THIS TEMPLATE FOR ANOTHER SALON

Everything below is done in **`data/salon-config.js`** and
**`src/input.css`** — you should not need to touch `index.html` or
`js/script.js` for a standard re-skin.

1. **Salon name / tagline / description** — `business.name`, `shortName`,
   `tagline`, `heroSupport`, `description` in `salon-config.js`.
2. **Logo** — replace `assets/logo/panache-logo.png` (and `favicon.png`)
   with the new salon's files, keeping the same filenames, or update
   `branding.logo` / `branding.favicon` to new filenames.
3. **Colors** — edit the three hex values at the top of `src/input.css`
   (`--color-primary`, `--color-secondary`, `--color-accent`) **and** their
   matching `-rgb` triplets just below them, then run `npm run build`. Every
   button, link, background and accent on the site reads from these.
4. **Hero image** — replace `assets/hero/hero-bridal.jpg` (or update
   `hero-image`'s `src` in `index.html` if you rename the file).
5. **Gallery images** — edit entries in `gallery: []` in `salon-config.js`:
   `{ src: "assets/gallery/xxx.jpg", alt: "...", category: "..." }`.
6. **Bridal images** — same pattern under `bridalPortfolio: []`, plus each
   `bridalPackages` entry's own `image` field.
7. **Services** — edit `serviceCategories`. Each category has a `category`
   name and a list of `services`, each with `name`, `description`, and a
   `priceType` of `"exact"`, `"starting"`, `"custom"`, or `"contact"`.
8. **Prices** — set via each service/package's `price` + `priceType` fields
   described above. Leave `priceType: "contact"` where prices aren't public.
9. **Bridal packages** — edit `bridalPackages`. Remove `isPlaceholder: true`
   once inclusions are confirmed for the new salon.
10. **Testimonials** — add real, attributed quotes to `testimonials: []` as
    `{ name, isLocalGuide, reviewCount, photoCount, rating, date, text }`.
    Never invent quotes, names, or ratings.
11. **Phone** — update `business.phoneDisplay` and `business.phoneIntl`
    (digits only, with country code, no punctuation).
12. **WhatsApp** — update `business.whatsappIntl` (same digits-only format).
13. **Address** — update `business.addressLines`, `business.city`,
    `business.country`.
14. **Opening hours** — edit the `openingHours` array (one row per day).
15. **Instagram** — update `social.instagram`.
16. **Facebook** — update `social.facebook`.
17. **SEO title** — update `seo.title`.
18. **SEO description** — update `seo.description` (and `seo.keywords`).
19. **Schema / structured data** — generated automatically from the config
    above at page load (see `injectStructuredData()` in `js/script.js`); no
    manual editing needed as long as steps 1–18 are done.

After changing colors, re-run `npm run build` (or `npm run dev` while
editing) so `css/output.css` picks up the new theme.

## Notes on this build

- Tailwind is compiled via the CLI (not the CDN) for production quality.
- WhatsApp is the only booking mechanism — there is no backend, login, or
  payment flow, by design.
- Image fallback: every photo slot tries to load its real file first and
  falls back to a labeled placeholder if it's missing — this check runs on
  both "not loaded yet" and "already failed before the script ran" cases,
  since images written directly in the HTML can finish failing before
  JavaScript attaches its listener.
