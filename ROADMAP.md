# karankh.tech — Implementation Roadmap

Phased build plan for the portfolio. Each phase ends with a **working, deployable site** at increasing fidelity — you can stop, review, or ship after any phase. See [PROJECT.md](./PROJECT.md) for the full spec and content.

> This is **Next.js 16** — consult `node_modules/next/dist/docs/` before writing framework code (see [AGENTS.md](./AGENTS.md)).

---

## Phase 1 — Basic working site (MVP)

**Goal:** a complete, real site with all content. Plain but legible. No fancy yet.

- Typed content modules under `app/data/*` — profile, skills, projects, experience, education, certifications.
- All sections rendered on the single page (`app/page.tsx`) in order, semantic HTML.
- Minimal dark styling: background, readable text, basic spacing. Stock Tailwind, no custom design system.
- Move résumé into `public/` (e.g. `resume.pdf`), add a plain download link.
- Replace "Create Next App" metadata with real title/description.

**Outcome:** everything on the page and accurate; looks like a clean draft. ✅ Deployable.

## Phase 2 — Design pass ("premium minimalism")

**Goal:** make it look designed.

- Design foundation: dark token ladder, deliberate **type scale**, spacing rhythm, hairline borders, mono labels (define in `app/globals.css` `@theme`).
- Lay out each section properly — hero as a typographic showpiece; projects as real cards; structured experience/education/certifications.
- Monochrome **texture**: grain overlay + soft radial gradient glow.
- Sticky scroll-spy nav.

**Outcome:** polished, intentional dark portfolio. Still static. ✅ Deployable.

## Phase 3 — Motion & micro-interactions (the "fancy")

**Goal:** bring it to life.

- Scroll-triggered reveals (IntersectionObserver), hero entrance animation.
- Hover micro-interactions on project cards, links, nav.
- Smooth-scroll, subtle depth/parallax.
- `prefers-reduced-motion` fallbacks throughout.
- Animation approach: CSS-first; escalate to `motion`/Framer only if the hero needs orchestration.

**Outcome:** distinctive, high-craft, memorable. ✅ Deployable.

## Phase 4 — Functional completeness

**Goal:** everything works end-to-end.

- Contact form via Server Action (`useActionState`, zod validation, pending + success/error states) — **delivery stubbed** until Resend/Formspree is chosen.
- Visible email + LinkedIn + GitHub + résumé download in contact section.
- SEO: OG/Twitter tags, generated OG image, sitemap, robots, canonical `https://karankh.tech`.
- Vercel Analytics; accessibility + contrast + keyboard pass.

**Outcome:** launch-ready except the form's email backend. ✅ Deployable.

## Phase 5 — Deploy & final polish

**Goal:** live on karankh.tech.

- Wire contact delivery (Resend vs Formspree — to decide).
- Deploy to Vercel; connect domain via Cloudflare (records DNS-only / grey-clouded).
- Lighthouse + cross-device QA, final tweaks.

**Outcome:** **live.** 🚀

## Phase 6 — Writing / blog (shipped Jul 25, 2026)

**Goal:** the one lever that can rank the site for anything besides Karan's name.

- MDX pipeline: `content/blog/*.mdx`, frontmatter as the single source of truth, `lib/blog.ts` as the only reader. No database, no CMS — publishing is a commit.
- `/blog` index + `/blog/[slug]`, "Writing" in the hero nav.
- SEO: sitemap entries per post, RSS, `BlogPosting` JSON-LD referencing the existing Person node, per-post OG cards.
- Fixed the sitemap's `lastModified: new Date()`, which claimed the homepage changed on every deploy.
- Route transition: the nav word travels into the blog header (see [DESIGN.md](./DESIGN.md)).

**Outcome:** one file and one commit publishes a post; everything else is derived. Full detail in [BLOG.md](./BLOG.md). ✅ Deployable.

---

**Cadence:** build a phase → review → proceed.

## Still open

Carried from the phases above and from PROJECT.md §8 — none of these block anything:

1. **Contact form** — *the highest-value gap.* Contact ships `mailto:` links only; the form was never built (PROJECT.md §5). `mailto:` does nothing visible for a visitor without a configured mail client, and a failed click leaves no lead and no trace — on a site whose entire job is converting a browsing client into a conversation.
2. **Umami website ID** — analytics shipped Jul 25, 2026. Page views run on Vercel; the seven custom events run on Umami Cloud, because Vercel only collects those on **Pro** (and keeps just a 1-month window on Hobby). Code is done — all that's left is signing up at cloud.umami.is, setting `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in Vercel, and redeploying. See [ANALYTICS.md](./ANALYTICS.md).
3. **Portrait shoot** — the hero and About still run the abstract placeholder (spec in DESIGN.md).
4. **"How I build" slide** — deferred at Phase 4; the slot is reserved in FLOW.md.
5. **More posts** — the blog pipeline is done; it currently holds one article, which ranks for nothing. Per SEO.md this is the only lever for non-branded queries.
6. **SEO checklist leftovers** (SEO.md) — Bing Webmaster Tools import, the LinkedIn profile Website field, and post-deploy validation are all still unticked.
7. **Dark-mode toggle** — `.dark` tokens exist, nothing wired.
8. **Publication (MixVal)** — add to the site and as `Person.subjectOf` once published.
9. **Repo hygiene** — `pnpm lint` fails repo-wide on ~190 errors from the stray `.claude/worktrees/slide-deck-scroll/` copy; needs an `eslint.config.mjs` ignore. Source itself is clean. `public/` also still carries the create-next-app SVGs (`next.svg`, `vercel.svg`, `window.svg`, `globe.svg`, `file.svg`).

## File structure (actual, Jul 25 2026)

```
app/
  layout.tsx                    root metadata, fonts, <html>/<body>
  page.tsx                      composes the deck
  globals.css                   light tokens, slide mode, twin panel, route transitions
  data/                         typed content + JSON-LD builders
  blog/                         the writing section — see BLOG.md
  sitemap.ts robots.ts          SEO routes
  opengraph-image.tsx icon.tsx apple-icon.tsx twitter-image.tsx
components/
  sections/                     Hero, About, Depth, Projects, Contact, Section, Slide
  twin/                         the digital-twin chat
  ui/                           shadcn-managed — regenerate, don't hand-edit
  json-ld.tsx slide-rail.tsx spine-track.tsx brand-marks.tsx …
content/blog/*.mdx              posts
lib/                            blog.ts, metadata.ts, utils.ts
mdx-components.tsx              article typography (required by @next/mdx)
api/*.py                        the twin's FastAPI backend (Vercel Python functions)
public/                         resume.pdf, favicon
```
