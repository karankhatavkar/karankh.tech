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

---

**Cadence:** build a phase → review → proceed.

## Proposed file structure (target)

```
app/
  layout.tsx            # fonts, metadata, <Analytics/>, global bg/grain
  page.tsx              # composes sections in order
  globals.css           # dark-only tokens, type scale, grain/gradient utilities
  data/                 # typed content (profile, skills, projects, experience, education, certifications)
  actions/contact.ts    # 'use server' — validates (zod), stubbed delivery
  components/
    sections/           # Hero, About, Skills, Projects, Experience, Education, Certifications, Contact
    ui/                 # Section, Reveal, Nav, SocialLinks, SubmitButton, Grain
public/
  resume.pdf            # moved from assets/Resume_2-3.pdf
  + favicon, og image
```
