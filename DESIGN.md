# DESIGN.md — karankh.tech design base

**July 14, 2026** (rev 5). Design sample/reference for the phased redesign; [PROJECT.md](./PROJECT.md) defers to it for visual/design decisions. This doc is a template, not a lock — **each step is discussed with Karan and built one by one.**

**Live mock:** [`design/hero-mock.html`](./design/hero-mock.html) — open in a browser. The hero *composition* of that file is the target for the hero step; its hardcoded hex palette is superseded by the shadcn theme (below).

## Foundation: shadcn/ui (decided Jul 13, 2026 — implemented)

The site is built on **shadcn/ui**, initialized in-place with Karan's theme preset:

```bash
pnpm dlx shadcn@latest init --preset bIkf4u8 --template next
```

- Style **`base-vega`**, built on **Base UI** primitives (not Radix): components take a `render` prop instead of `asChild`; a `Button` rendering an `<a>` also needs `nativeButton={false}`.
- All registry components are installed in `components/ui/` (**shadcn-managed** — never hand-edit; regenerate with `pnpm dlx shadcn@latest add <name> -o`).
- Page sections composing them live in `components/sections/`; content stays in typed TS under `app/data/`.
- Theme = neutral oklch CSS variables in `app/globals.css`. **Light is the default**; a `.dark` token set ships with the preset but no toggle is wired (decision pending, see below).
- Rule: style with **semantic tokens only** (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`, `bg-primary`…). No raw hex, no one-off palettes in components.
- Rule (Karan, Jul 14, 2026): **pending-content placeholders use the shadcn `Empty` component** (dashed border, `EmptyMedia` icon, mono caption) — no hand-drawn CSS effects with raw color values. (The hero's older raw-rgba silhouette placeholder predates this rule and is a candidate for the same treatment.)

## Direction

Light editorial minimalism, replicating the composition of a user-supplied reference (Wolfpixel UI/UX personal-portfolio shot on Dribbble): quiet ground, one grotesque typeface, oversized "Hello" greeting, monochrome B&W portrait bleeding off the right edge — plus a **twin message bar** in the hero (inspired by "Ask FranckGPT" on franckpoingt.dev). All of it expressed through the shadcn theme and components.

Positioning shift baked into the design: **RAG expert first, agentic AI second** — not generic "AI/ML engineer". This drives copy, section order, and SEO.

## Hero anatomy (top to bottom) — future step, build with shadcn primitives

1. **Nav** — name left; `About · Projects · Experience · Notes` center; `Book a call ↗` right. ("Notes" appears only once the blog ships.)
2. **Stats row** — honest, content-driven: `3+ years in ML` · `1 RAG in production` · `7 open-source projects`. Update as facts change.
3. **Vertical rail** (left edge, mono, rotated) — `RAG & AGENTIC AI ENGINEER`, hairline rule, `2026`.
4. **Two-deck display** (revised Jul 13, 2026 — replaces the bare `Hello`; the greeting alone carried no information and buried the name and positioning): deck 1 `Hey, I'm Karan.` (display size), deck 2 at ~45% scale `I build RAG systems & AI agents.` with the key terms in full ink and connective words muted. Both decks are the real `<h1>`.
5. **Support line** (Karan's own wording — copy here should sound like him, not like AI-generated feature triads) — `— focused on moving RAG from concept to robust, verifiable production tech.` Followed by the pill `Book a call ↗` CTA (pills are reserved site-wide for this one action: nav, hero, contact finale).
6. **Twin message bar** — directly below the intro line: pill-shaped input, green "online" dot, placeholder `Ask my twin — RAG work, agents, availability…`, dark circular send button. Mono microcopy beneath: `beta — answers from this site's content`. Candidate components: `input-group`, `button`, and (for answers) `message`/`bubble` — already installed.
7. **Scroll cue** — `Scroll down ↓`.
8. **Portrait** — absolute right, full hero height, ~42% width, B&W, backdrop blended into the page ground.

## Theme tokens

The old custom palette (`ground`/`ink`/`hairline` hexes) is **retired**. Equivalent roles map to shadcn tokens from the preset:

| Role | shadcn token / class |
|---|---|
| page ground | `background` |
| headings, primary text | `foreground` |
| secondary text, labels, rails | `muted-foreground` |
| cards, message bar surface | `card` (+ `ring-foreground/10` from the Card component) |
| inset panels | `muted` |
| rules, borders | `border` (applied globally by the base layer) |
| dark CTA / send button | `primary` + `primary-foreground` |
| status green (semantic only) | no theme token — semantic emerald dot (`bg-emerald-500`), used solely for availability / twin-online. No decorative accent color anywhere. |

Changing the theme later = swapping the preset variables in `app/globals.css`; components don't change.

## Typography

- **Settled (Jul 13, 2026): Instrument Sans** via `next/font/google`, wired as `--font-sans` by the preset. (The Aeonik-license question is closed; revisiting it later is a font-variable swap, not a rebuild.)
- **Mono** (rails, labels, stats captions, microcopy): Geist Mono (`--font-geist-mono` → `--font-mono`).
- Display setting: medium weight, tight tracking, `text-wrap: balance` on headings; mono labels uppercase, tracked wide. `font-heading` is available and currently maps to `--font-sans`.

## Portrait spec (needed from Karan)

- Plain **light backdrop** close to the page `background` (a white wall in soft daylight works).
- Soft directional light from one side; waist-up; camera at eye level; looking into the lens.
- Convert to B&W, lifted contrast; export ≥1600px wide.
- The build masks/blends the backdrop into the page ground — a busy or dark background breaks the design.
- Until the shoot: build proceeds with a gradient placeholder.

## Twin message bar — behavior

- **Launch (no backend):** submitting opens a lightweight answer sheet under the bar, fed by curated Q&A hardcoded from the page's own content, with deep links to sections. The `beta` microcopy keeps it honest — it must never pretend to be a live LLM.
- **Phase 3 (digital twin):** same UI, live brain — RAG over the site content, résumé, and repos; streaming answers with source chips. Green dot = twin online.
- Fully keyboard-accessible; the bar is a real `<form>` from day one.

## Page frame (settled Jul 14, 2026)

Scroll sections share the hero text's inset on **both sides**: full-width container with `px-[clamp(64px,7vw,110px)]` in `app/page.tsx`, no max-width. Karan rejected a centered `max-w-6xl` box ("very centric, blank space on sides, doesn't match the first page") and an asymmetric left-only alignment. Result: "About me", every section label, and the footer start exactly under "Hey, I'm", mirrored on the right.

## About section (built Jul 14, 2026 — from a bento reference Karan supplied)

Custom full-width composition in `components/sections/about.tsx` (deliberately **not** the shared sticky-label `Section` wrapper — About is the showcase moment right after the hero); copy in `app/data/about.ts`. Three-column bento at `lg` (`1.1fr / 0.85fr / 1fr`), two columns at `sm`, stacked on mobile:

1. **Text column** — display `About me` h2, niche intro (chunking / retrieval quality / evals), green-dot availability line, and the **`Elsewhere` block** (below).
2. **Anchor column** — stat `Card`: the grounding **standard, not a marketing metric** (`100%` / "of answers grounded in retrieved, citable sources"); below it the portrait slot (`Empty`, `aspect-[4/5] max-h-[540px]`) awaiting the B&W shoot.
3. **Proof column** — `OPEN SOURCE` link tile (whole card clickable to GitHub) + two `+`-marker working-style points.

### `Elsewhere` block — brand marks (built Jul 19, 2026)

Social handles with real logos, in the About text column. shadcn `ItemGroup`/`Item` rows (rendered as `<a>`), each `size="sm"`: a `size-9` chip echoing the stat card's icon chip (`rounded-full bg-background ring-1 ring-foreground/10`), then the **handle** as the loud line with the platform name as a mono caption under it — the mark already names the platform, so no element repeats its neighbour. Capped at `max-w-[24rem]` so the trailing `↗` stays tied to its row. Driven by `profile.socials`; adding a platform is one entry there plus one glyph.

**The marks** (`components/brand-marks.tsx` — not shadcn-managed, but not a section either): lucide-react v1 dropped brand icons and shadcn has no logo registry, so these are each platform's own official geometry, inlined. They carry no baked-in `fill` — `fill-current` means a mark takes the page's ink at rest, keeping the section monochrome, and its **real brand color appears on hover/focus**. That's how a real logo and the "semantic tokens only" rule coexist; brand hexes live in `app/data/profile.ts` (`SocialLink.brand`), never in the theme.

`brand: null` means "no color to reveal", and those chips **invert** to light-on-ink instead: GitHub and X are black brands, so inversion *is* their official lockup, and email isn't a brand at all. Email also gets a typographic mono `@` rather than an icon — it reads as a peer of the marks without pretending to be one, and stays optically solid where a stroked lucide glyph would look thin beside filled logos. Instagram is the one gradient: flat ink at rest, its brand gradient (an SVG `linearGradient`) on hover.

Dropped from the reference: the hand-drawn arrow doodle (off-voice) and its second photo (single portrait slot until the shoot). Body copy scales `15→17px` with a vw clamp for wide screens.

## Slide mode — the page as a deck (built Jul 19, 2026, from Karan's brief)

On a laptop the page scrolls one screen at a time: a wheel flick advances exactly one section, like slides. On a phone it is the plain continuous page it always was. **No scroll hijacking** — this is native CSS scroll-snap, so trackpad momentum, the scrollbar, `Page Down`, `Home`/`End`, find-in-page and deep links all behave normally, and there is no JS in the scroll path.

**One gate, defined once.** `@custom-variant slides` in `app/globals.css` is `(width >= 64rem) and (height >= 44rem)`; the snap rules and every `slides:` utility sit behind it, so the layout and the snapping can never disagree. The 44rem floor is measured, not guessed — below it the About and Projects slides stop fitting a screen, which is where a deck stops being worth it, so those windows fall back to the continuous page.

- `scroll-snap-type: y mandatory` on `html`; `scroll-snap-align: start` + `scroll-snap-stop: always` on `[data-slide]`. `stop: always` is what makes one flick move one slide instead of coasting past several.
- `components/sections/slide.tsx` wraps each section: `min-h-svh` (never `h-`, so a slide grows rather than clipping) and the shared frame inset. Sections drop their `border-t` and rhythm padding in slide mode — the screen change *is* the separation.
- `prefers-reduced-motion: reduce` drops `scroll-behavior: smooth` to `auto`, so the deck steps rather than glides.

**The rail** (`components/slide-rail.tsx`) — the hero's vertical rail promoted to the spine of the deck. It holds the current slide's name at the top, `2026` at the bottom, and between them the hero's hairline broken into one segment per slide, inked on the one you are standing on. Quantised scrolling hides how much page is left, so the rail is where that information goes; it is also the only navigation once the hero's header scrolls away. Segments are anchors, so it is keyboard-navigable. Slide mode only — the hero renders its own local rail below the gate.

**Deck order** lives in `app/data/slides.ts` and drives both the page and the rail. Two composition changes fell out of making every section fit a screen, and both stand on their own merits:

1. **Projects split in two** — the featured build (`#projects`) holds a screen alone, the rest of the work follows as `#more-projects`. The featured RAG system carries the whole pitch; it should not share a screen.
2. **Education + Certifications share one screen** — three certification lines in a 900px void did not earn a slide. Both sections keep their own ids, so `#certifications` still resolves.

Verified in headless Chrome at 1280×704, 1440×900 and 1512×800: every slide is exactly one viewport, no overflow. At 390×844 and 768×1024 snapping is `none` and the rail is `display: none`.

## Below the fold — current state

About (above) → Skills (`Badge`) → Projects (featured `Card` with retrieval-pipeline badges) → More projects (list) → Experience → Education + Certifications → Contact → footer. All on semantic tokens. Section order/refinement (RAG & GenAI first, quiet list with big hover previews, etc.) happens per-step during the build; sections after About still use the sticky mono-label `Section` wrapper. Semantic landmarks, keyboard navigation, `prefers-reduced-motion` fallbacks throughout.

## SEO implications

Title, meta description, keywords, and JSON-LD `knowsAbout` shift to lead with RAG & agentic AI. OG image already regenerated in the light style (colors only — copy shift pending). Same Person/ProfilePage entity — no re-verification needed (see [SEO.md](./SEO.md)).

## Pending decisions

1. ~~Typeface~~ — **settled:** Instrument Sans via the shadcn preset.
2. Portrait shoot (spec above).
3. Contact-form delivery backend (Resend vs Formspree) — unchanged from PROJECT.md §8.
4. Dark-mode toggle — `.dark` tokens exist; decide whether/when to wire `next-themes` + a toggle.
