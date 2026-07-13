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
