# Perth Concrete Care

Next.js 15 + Tailwind v4 implementation of the design spec in `design.md`.

## Run

```bash
npm install
npm run dev
```

Opens at http://localhost:3000.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind v4 (@theme CSS-first tokens in `app/globals.css`) |
| Animation | GSAP + ScrollTrigger, Lenis, Framer Motion |
| Fonts | `next/font` — Inter; Söhne Breit slot ready for `localFont({ src })` |

## Structure

```
app/
  globals.css         — §02–§05 token system, @theme, utilities
  layout.tsx          — Nav + Footer + SmoothScroll wrapper
  page.tsx            — Homepage (§08)
  services/           — index + [slug] detail
  work/               — index + [slug] detail
  about/
  contact/
components/
  Nav.tsx / Footer.tsx / SmoothScroll.tsx
  ui/                 — Button, Container, Reveal primitives
  home/               — 11 homepage sections (Hero → QuoteForm)
lib/utils.ts          — cn(), phone/email constants
```

## Design token map

Everything lives in `app/globals.css` under `@theme`. Tailwind v4 reads these
directly — no `tailwind.config.ts` required. Components reference tokens as
`var(--color-ink)`, `var(--ease-default)`, etc.

## Signature moments (§06)

1. **Hero** — scroll-scrubbed video (`components/home/Hero.tsx`). GSAP
   ScrollTrigger pins the section, drives `video.currentTime` from scroll
   progress. Drop a Mux/Cloudflare Stream source into the `<video>` element to
   activate. A CSS poster gradient is shown until then.
2. **Process** — 6-step pinned sequence with cross-fades and a progress rail.
3. **Exposure picker** — four-tile educator with hover/tap driving the sample.
4. **Gallery** — inertial horizontal scroll, per-frame centre-scale.
5. **Before / After** — draggable divider with keyboard + pointer support.

## Production checklist

- [ ] License Söhne Breit, drop `.woff2` into `/public/fonts`, wire via
      `next/font/local` in `app/fonts.ts`.
- [ ] Replace placeholder gradient cards with `next/image` once photography
      is shot (aspect ratios already declared — zero CLS on swap).
- [ ] Host the hero finish-reveal video on Mux or Cloudflare Stream.
- [ ] Wire `QuoteForm.submit` to a Server Action → Resend + Notion/Airtable.
- [ ] Add Sentry, Vercel Analytics + Plausible.
- [ ] Run Lighthouse against §11 budgets before launch.
