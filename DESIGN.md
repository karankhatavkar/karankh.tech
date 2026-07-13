# DESIGN.md — karankh.tech design base

Locked **July 13, 2026** (rev 3.1). This is the design source of truth for the Phase 2 redesign; [PROJECT.md](./PROJECT.md) defers to it for visual/design decisions. Details will be refined during the build, but the base below does not change without a deliberate decision.

**Live mock:** [`design/hero-mock.html`](./design/hero-mock.html) — open in a browser. The hero section of that file *is* the target design; everything below it is spec notes.

## Direction

Light editorial minimalism, replicating the composition of a user-supplied reference (Wolfpixel UI/UX personal-portfolio shot on Dribbble, set in Aeonik): warm-gray ground, one grotesque typeface, oversized "Hello" greeting, monochrome B&W portrait bleeding off the right edge with its backdrop matched to the page ground — plus a **twin message bar** in the hero (inspired by "Ask FranckGPT" on franckpoingt.dev).

Positioning shift baked into the design: **RAG expert first, agentic AI second** — not generic "AI/ML engineer". This drives copy, section order, and SEO.

## Hero anatomy (top to bottom)

1. **Nav** — name left; `About · Projects · Experience · Notes` center; `Book a call ↗` right. ("Notes" appears only once the blog ships.)
2. **Stats row** — honest, content-driven: `3+ years in ML` · `1 RAG in production` · `7 open-source projects`. Update as facts change.
3. **Vertical rail** (left edge, mono, rotated) — `RAG & AGENTIC AI ENGINEER`, hairline rule, `2026`.
4. **Greeting** — oversized `Hello` (tight tracking ~ -0.05em, weight ~520, line-height 0.88).
5. **Intro line** — `— It's Karan. I build RAG systems and AI agents that hold up in production.`
6. **Twin message bar** — directly below the intro line: pill-shaped input, green "online" dot, placeholder `Ask my twin — RAG work, agents, availability…`, dark circular send button. Mono microcopy beneath: `beta — answers from this site's content`.
7. **Scroll cue** — `Scroll down ↓`.
8. **Portrait** — absolute right, full hero height, ~42% width, B&W, backdrop blended into the page ground.

## Palette (light-only)

| Token | Value | Use |
|---|---|---|
| ground | `#F0EFED` | page background (warm gray — not pure white; enables the portrait blend) |
| ink | `#161719` | headings, primary text, send button |
| ink-2 | `#45474B` | secondary text |
| ink-3 | `#8B8D91` | labels, rails, placeholders |
| surface | `#FFFFFF` | message bar, cards |
| hairline | `rgba(22,23,25,0.16)` | rules, borders |
| status green | `#2E7D46` | **semantic only** — availability / twin-online dot. No decorative accent color anywhere. |

Dark theme is out of scope (deliberately light-only; tokens make a dark variant a later add, not a rebuild).

## Typography

- **Primary (everything):** reference uses **Aeonik** (commercial, ~$60–200 web license). Free stand-in: **Instrument Sans** via `next/font/google` (alternatives: Schibsted Grotesk, Hanken Grotesk). → **Decision pending: license vs stand-in.**
- **Mono (rails, labels, stats captions, microcopy):** Geist Mono (already wired).
- Display setting: medium weight, tight tracking, `text-wrap: balance` on headings; mono labels uppercase, tracked wide.

## Portrait spec (needed from Karan)

- Plain **light-gray backdrop** close to `#F0EFED` (a white wall in soft daylight works).
- Soft directional light from one side; waist-up; camera at eye level; looking into the lens.
- Convert to B&W, lifted contrast; export ≥1600px wide.
- The build masks/blends the backdrop into the page ground — a busy or dark background breaks the design.
- Until the shoot: build proceeds with the gradient placeholder.

## Twin message bar — behavior

- **Launch (no backend):** submitting opens a lightweight answer sheet under the bar, fed by curated Q&A hardcoded from the page's own content, with deep links to sections. The `beta` microcopy keeps it honest — it must never pretend to be a live LLM.
- **Phase 3 (digital twin):** same UI, live brain — RAG over the site content, résumé, and repos; streaming answers with source chips. Green dot = twin online.
- Fully keyboard-accessible; the bar is a real `<form>` from day one.

## Below the fold (to be designed in-system during the build)

About (short, may reuse a second portrait crop) → Skills (RAG & GenAI first) → Projects (quiet list, big hover previews, RAG/agent work first) → Experience → Education → Certifications → Contact. Semantic landmarks, keyboard navigation, `prefers-reduced-motion` fallbacks throughout.

## SEO implications

Title, meta description, keywords, and JSON-LD `knowsAbout` shift to lead with RAG & agentic AI. OG image regenerated in the light style. Same Person/ProfilePage entity — no re-verification needed (see [SEO.md](./SEO.md)).

## Pending decisions

1. Typeface: license Aeonik vs Instrument Sans stand-in.
2. Portrait shoot (spec above).
3. Contact-form delivery backend (Resend vs Formspree) — unchanged from PROJECT.md §8.
