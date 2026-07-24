# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: Next.js version

This project runs **Next.js 16** (`next@^16.2.9`) with **React 19.2** and the App Router. This is newer than the model's training data and has breaking changes from older Next.js. **Before writing or changing framework code, read the relevant guide under `node_modules/next/dist/docs/`** (start at `index.md`). Those docs also contain inline "AI agent hint" comments flagging version-specific gotchas — for example, fixing slow client-side navigation requires exporting `unstable_instant` from the route, not just wrapping in `<Suspense>`. Do not rely on memorized Next.js APIs.

## Commands

```bash
pnpm dev      # start dev server at http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # ESLint (flat config, eslint-config-next)
```

There is no test runner configured yet.

## Architecture

- **App Router** under `app/`. `app/layout.tsx` is the root layout (loads Instrument Sans as `--font-sans` and Geist Mono as `--font-geist-mono` via `next/font/google`, sets `<html>`/`<body>`); `app/page.tsx` is the home route. Add routes as nested directories with `page.tsx`.
- **UI: shadcn/ui** (style `base-vega`, built on **Base UI** — not Radix). Registry components live in `components/ui/` and are **shadcn-managed**: don't hand-edit them; regenerate with `pnpm dlx shadcn@latest add <name> -o`. Page sections composing them live in `components/sections/`. Config in `components.json`; theme applied from Karan's preset (`shadcn init --preset bIkf4u8`).
- **Base UI gotchas:** components take a `render` prop instead of Radix's `asChild` (e.g. `<Button render={<a href=… />}>`); when a `Button` renders a non-`<button>` element, also pass `nativeButton={false}` or it warns in the console.
- **Styling: Tailwind CSS v4** via the PostCSS plugin (`@tailwindcss/postcss`, configured in `postcss.config.mjs`). There is no `tailwind.config.js` — the shadcn theme lives in `app/globals.css` as CSS variables mapped in an `@theme inline { ... }` block. Use semantic token classes (`bg-background`, `text-muted-foreground`, `border-border`, `bg-card`…), never raw hex in components. Light is the default; a `.dark` token set exists but no toggle is wired.
- **Linting:** `react-hooks/set-state-in-effect` is disabled for `components/ui/**` and `hooks/**` in `eslint.config.mjs` because upstream shadcn code trips it; everything else lints normally.
- **TypeScript** is strict; the `@/*` path alias maps to the repo root.
- **Static assets** live in `public/`.
- **Analytics** — full detail in [ANALYTICS.md](./ANALYTICS.md). `<Analytics />` (page views) in the root layout, plus a site-wide event layer. Sections stay server components and opt in declaratively with `data-track="event_name"` / `data-track-<prop>="value"`; one delegated listener (`components/analytics/event-tracking.tsx`) turns those into calls. The event vocabulary is a closed union in `lib/analytics.ts` — add events there, not as free strings. **Vercel collects custom events on Pro only**, so events go to **Umami Cloud** instead (`NEXT_PUBLIC_UMAMI_WEBSITE_ID`, script gated on it being set); `deliver()` in `lib/analytics.ts` is the single swap point if that ever changes. Never put visitor input (twin questions, form text) into event properties.
- **Blog (`/blog`)** — full detail in [BLOG.md](./BLOG.md). One MDX file per post in `content/blog/`, frontmatter (`title`, `description`, `date`, optional `updated`, `tags`) as the single source of truth. `lib/blog.ts` reads it with `fs` + gray-matter and feeds the index, the post page, `app/sitemap.ts`, `app/blog/feed.xml`, and the per-post OG card — so publishing is one file and one commit, with no manual step. A `_`-prefixed filename is a draft and is skipped everywhere. Every blog route is prerendered (`generateStaticParams` + `dynamicParams = false`; `force-static` on the feed), which is what keeps those `fs` reads build-time only — don't make one dynamic without moving the content read.
- **MDX gotchas:** remark/rehype plugins in `next.config.ts` must be **strings, not imported functions** — Turbopack (Next 16's default bundler) passes plugin config to Rust and can't accept JS functions. Options must stay serializable. Article typography lives in the root `mdx-components.tsx`, which is required for `@next/mdx` to work at all.
- **Metadata gotcha:** Next *replaces* `openGraph`/`twitter` when a route defines them; it does not merge with the root layout's. Build page cards with `socialCard()` from `lib/metadata.ts` or they silently lose `siteName`, `locale`, `@creator`, and `summary_large_image`.
- **Route transitions** (`experimental.viewTransition`, rules in `app/globals.css`): the hero nav's "Writing" and the blog header's "Writing" share `<ViewTransition name="writing-mark">`, so the word morphs between pages instead of being swapped. Two things cost real time to discover:
  - React's per-component `enter`/`exit` props **do not fire on a route change** — navigation replaces the whole tree, so React never sees an element entering a surviving parent. Drive page-level motion off `transitionTypes` on `<Link>` + `html:active-view-transition-type(...)` in CSS instead. Keep an unscoped base rule too: the browser's own back/forward buttons carry no type.
  - Chrome aborts any view transition with `InvalidStateError` while `document.hidden` is true. Browser-automation tools background the tab constantly, so transitions appear broken under automation and screenshots never capture the view-transition overlay layer. Verify with `document.getAnimations()` filtered to `::view-transition-*` pseudo-elements, and check `document.hidden` at the moment the transition starts before believing a failure.
  - `viewTransition` does **not** switch Next to the experimental React channel (`needsExperimentalReact()` only checks `taint`/`transitionIndicator`/`gestureTransition`) and does not need to — the default bundled canary React ships a working `ViewTransition`. Don't add `gestureTransition` to "fix" it.
