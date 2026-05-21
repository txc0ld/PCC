# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint via Next.js
npm run typecheck  # tsc --noEmit (no emit, type errors only)
```

There are no tests. Type-check with `npm run typecheck` before considering work complete.

## Stack

- **Next.js 15** App Router — all pages under `app/`, path alias `@/` maps to root
- **Tailwind v4** — CSS-first, no `tailwind.config.ts`. All design tokens live in `app/globals.css` under `@theme` and are referenced as `var(--color-ink)`, `var(--ease-default)`, etc.
- **GSAP + ScrollTrigger** — imported dynamically (`await import("gsap")`) inside `useEffect` to avoid SSR issues. Always check `prefers-reduced-motion` before registering scroll animations.
- **Lenis** — smooth scroll, initialised in `components/SmoothScroll.tsx` (client component mounted in root layout)
- **Framer Motion** — used for simpler enter/exit transitions alongside GSAP

## Architecture

`app/layout.tsx` wraps every page with `<SmoothScroll />`, `<Nav />`, `<SectionIndex />`, and `<Footer />`. The homepage (`app/page.tsx`) renders 11 sections in a fixed order defined by `design.md §08` — do not reorder them.

**Component layers:**
- `components/ui/` — primitives (`Button`, `Container`, `ImagePlate`, `Reveal`). Use these as the base layer for new UI.
- `components/home/` — one file per homepage section. Each section is a self-contained client component.
- `components/Nav.tsx`, `Footer.tsx`, `SmoothScroll.tsx`, `SectionIndex.tsx` — layout-level singletons.

**Shared constants** (`lib/utils.ts`): `cn()` (clsx wrapper), `PHONE_DISPLAY`, `PHONE_HREF`, `EMAIL`. Always pull contact info from here, never hardcode it.

## Design tokens

`app/globals.css` is the single source of truth. Key namespaces:

| Prefix | Examples |
|---|---|
| `--color-` | `ink`, `charcoal`, `graphite`, `pcc-green`, `cream`, `bone`, `paper` |
| `--text-` | `display-xl` (144px) → `eyebrow` (12px) |
| `--ease-` | `default`, `io`, `micro`, `spring` |
| `--duration-` | `instant` (100ms) → `cinematic` (1200ms) |

Non-`@theme` globals (`--hairline`, `--nav-h`) are on `:root` and not available as Tailwind utilities — reference them via `var()` in CSS or inline styles.

## Signature interactive sections

- **Hero** (`components/home/Hero.tsx`) — GSAP ScrollTrigger pins the section and scrubs `video.currentTime`. Only activates when a `<source>` element exists inside the video; falls back gracefully otherwise.
- **Process** (`components/home/Process.tsx`) — pinned 6-step sequence with cross-fades and a progress rail.
- **ExposurePicker** — hover/tap drives a concrete exposure sample.
- **Gallery** — inertial horizontal scroll with per-frame centre-scale.
- **BeforeAfter** — draggable divider supporting pointer, touch, and keyboard.

## Pending production work

- Söhne Breit font: wire via `next/font/local` in `app/fonts.ts` once `.woff2` files are available.
- Replace gradient placeholder cards with `next/image` (aspect ratios already declared — zero CLS).
- Hero video: host on Mux or Cloudflare Stream; both domains are already in `next.config.ts` `remotePatterns`.
- `QuoteForm` submission: wire to a Server Action → Resend + Notion/Airtable.
