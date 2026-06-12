# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: Next.js version

This project runs **Next.js 16** (`next@^16.2.9`) with **React 19.2** and the App Router. This is newer than the model's training data and has breaking changes from older Next.js. **Before writing or changing framework code, read the relevant guide under `node_modules/next/dist/docs/`** (start at `index.md`). Those docs also contain inline "AI agent hint" comments flagging version-specific gotchas — for example, fixing slow client-side navigation requires exporting `unstable_instant` from the route, not just wrapping in `<Suspense>`. Do not rely on memorized Next.js APIs.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (flat config, eslint-config-next)
```

There is no test runner configured yet.

## Architecture

- **App Router** under `app/`. `app/layout.tsx` is the root layout (loads Geist fonts via `next/font/google`, sets `<html>`/`<body>`); `app/page.tsx` is the home route. Add routes as nested directories with `page.tsx`.
- **Styling: Tailwind CSS v4** via the PostCSS plugin (`@tailwindcss/postcss`, configured in `postcss.config.mjs`). There is no `tailwind.config.js` — theme tokens are defined in CSS. `app/globals.css` imports Tailwind with `@import "tailwindcss"` and declares design tokens in an `@theme inline { ... }` block (colors, `--font-sans`/`--font-mono` wired to the Geist font CSS variables).
- **TypeScript** is strict; the `@/*` path alias maps to the repo root.
- **Static assets** live in `public/`.
