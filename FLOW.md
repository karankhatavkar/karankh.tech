# Site Flow — Direction & Brainstorm

> **Status:** the flow below is **decided** (Jul 19, 2026); the brainstorm that
> produced it is kept underneath as rationale. Captures the Jul 16 and Jul 19, 2026
> discussions on reshaping the page flow. Not referenced by CLAUDE.md / PROJECT.md /
> ROADMAP.md on purpose — this is a scratch/thinking doc.

## Decided flow

Six slides. Every early slide is evidence; biography is deliberately last-but-one.

```
1  HERO          positioning + stats + CTA
2  EDGARBRIEF    the proof — live, clickable, grounded by design
3  HOW I BUILD   generalise from EdgarBrief into repeatable method
                 (chunking · retrieval quality · evals · scoping→build→evals→handover)
4  DEPTH         the 6 other projects + skills strip — "the ML underneath"
5  BACKGROUND    the 4-node spine — absorbs Experience / Education / Certifications
6  CONTACT       the ask
```

Reads as: *here's the thing → here's how I make things → here's the range behind
it → here's where the judgment came from → let's talk.*

### Why this shape

- **Evidence before claims.** The old order asserted competence (About, Skills) before
  proving it. EdgarBrief is live and clickable — it moves to slide 2 and carries the pitch.
- **Skills stops being a slide.** ~50 items across 5 categories is an ATS artifact, not a
  buyer artifact — and listing Java/MySQL/Kubernetes beside RAG reads *generalist junior*
  rather than *RAG specialist*. It survives as a trimmed strip inside DEPTH.
- **"More projects" stops being a slide.** The six academic-ML repos are supporting
  material proving range, not the pitch; they merge into DEPTH.
- **Three date-stamped lists become one.** Experience + Education + Certifications
  collapse into the spine (see below).
- **Amdocs is not a headline.** Deliberate call, Jul 19 — the role was junior and largely
  observational, so giving it a full slide overstates it. Its evidentiary weight lives in
  the spine as node 3. Copy in `app/data/experience.ts` stays as-is.
- **HOW I BUILD is load-bearing.** With Amdocs demoted, this is the slide that converts a
  skeptic: it shows you *think* like someone who has shipped, using the strongest writing
  already on the site (currently buried in `app/data/about.ts`).

## Rollout phases

| Phase | Scope | Status |
|---|---|---|
| **Phase 1 — reorder** | Move EdgarBrief to slide 2, shift About below it. Pure ordering; no copy or component rewrites. | in progress |
| **Phase 2 — rebuild the slides** | Rewrite About → **HOW I BUILD**; fold Skills + More projects into **DEPTH**; build the 4-node **BACKGROUND** spine over Experience/Education/Certifications. | not started |
| **Phase 3 — digital twin chat** | The "ask my twin" chat window — the pull layer, and the site's real differentiator. Deferred deliberately: a mediocre twin would *disprove* the RAG pitch rather than demo it, so it ships only once phases 1–2 stand on their own. | not started |

> Phase numbering here is local to this document — it is **not** the same axis as the
> build phases in [ROADMAP.md](./ROADMAP.md).

## Goal lens

Everything below is judged against one goal: **win freelance/contract LLM & RAG
work.** A visitor is a potential client, not a recruiter reading a CV.

## Prior flow (what the decision above replaces)

Single-page vertical scroll, stacked in résumé order:

`Hero → About → Skills → Projects → Experience → Education → Certifications → Contact`

- Mechanically clean, but structurally it's **a web résumé** — the same shape every
  dev portfolio has. The order/form says nothing about "this person is a RAG engineer."
- Experience, Education, Certifications are three near-identical date-stamped lists.
- The planned "ask my twin" chat (the real differentiator) is not in it yet.

## Core insight — push vs pull

The original idea was a **lifeline / ladder / path** timeline ("when I did what").
Honest read: the *instinct* is good, the *literal execution* fights the goal.

- **Timelines are self-centered** (my journey) when a buyer wants **outcome-first**
  framing (what you can build for me).
- **Timelines foreground time** → spotlights "junior + currently a student," exactly
  what an outcomes-first layout should de-emphasize.
- **Timelines are greedy for completeness** → the format pressures you to fill every
  gap, which is how "here it is, all of it" happens. This is the privacy worry, and
  it's real — but it's a *content-scoping* choice, not inherent to the format.

The deeper point: **"if you ask, you get it" is literally the product.** Karan is a
RAG engineer; the planned "ask my twin" chat *is* the pull model productized.

- **Push site** — lay it all out, linear, complete. Generic; the thing the gut resists.
- **Pull site** — a *tight* visible surface + "ask my twin for anything deeper." The
  site itself demonstrates RAG. Privacy instinct and RAG positioning point at the
  **same answer**: minimal professional surface on the wall, depth retrieved on demand.

**Resolution:** keep the visible surface a tight *professional* spine; everything
personal / the "why" / the messy middle lives behind the twin. Nothing personal ever
goes on the wall.

## New concept — the 4-node spine

Collapse Experience + Education + Certifications into **one spine of four stops**.
Each stop is a **phase of capability** (a theme), not a job title. **Capability is the
headline; the résumé entry is the footnote.** Dates are a small annotation.

The arc: **physical signals → data → retrieved knowledge → what I build now.**
Reads as: *"I came to LLMs through real systems engineering, not a bootcamp."*

| Node | Underlying fact | What it says |
|---|---|---|
| **1 — origin** | B.Tech Electronics & Communication, MIT-WPU, 2018–2022 | Started in hardware / signal processing; understands systems from the physical layer up. |
| **2 — data** | Sisai internship, 2021–2022 | Real-time pipeline for 1,000+ industrial sensors (InfluxDB), Z-score anomaly detection, role-based dashboards. Theme: *making messy streaming data trustworthy at scale.* |
| **3 — RAG (proven)** | Amdocs, Software Developer, 2022–2025 | Production RAG — LangChain, FAISS, hybrid BM25 retrieval, a question-rephrasing step that fixed multi-turn context loss, a dashboard to trace retrieval failures and cut hallucinations. **Biggest node.** |
| **4 — now** | Independent: RAG & agentic systems for clients · M.Tech AI/ML (Ramaiah, 2025–present, GPA 9.4) underneath | Present practice + available for work. Ends the spine pointing *forward*, into the "book a call" CTA. |

Two deliberate fixes baked in:

1. **Node 4 is the present, not school.** M.Tech is a detail *under* the "now" node,
   never the headline. Freelance sites live and die on the "available, here's what I
   build today" node.
2. **RAG appears twice on purpose** — proven (Node 3, Amdocs evidence) and current
   offering (Node 4). Continuity, not history. Stops the marquee skill from reading
   as "past."

## Wording

Original draft `Signals / Pipelines / RAG / Deepening` was rejected — mixes registers
(domain / artifact / acronym / vague verb) and "deepening" is dead weight.

Three coherent naming systems considered:

| | Node 1 (E&C) | Node 2 (Sisai) | Node 3 (Amdocs) | Node 4 (now) |
|---|---|---|---|---|
| **A · plain / buyer-legible** | Hardware & signals | Data pipelines | RAG in production | Building AI systems now |
| **B · one-word concept** | Signals | Streams | Retrieval | Agents |
| **C · active (what you do)** | Sensing | Streaming | Retrieving | Reasoning |

- **A** = safe, instantly clear (buyer may not be technical).
- **B** = memorable/designed; story "from physical signals to intelligent agents"; slight clarity risk.
- **C** = active but "Sensing" is a stretch for an electronics degree.

**Leaning recommendation: combine A + B** — one-word concept as a small kicker, plain
phrase as the real label. Memorable *and* clear:

```
01 · SIGNALS          02 · STREAMS          03 · RETRIEVAL        04 · NOW
Hardware & signals    Real-time pipelines   RAG in production     Building AI systems
E&C · MIT-WPU         1000+ sensors ·       LangChain · FAISS ·   RAG & agents for
'18–'22               InfluxDB · '21–22     hybrid search '22–25   clients · M.Tech '25→
                                            ▲ biggest node        ▲ points to "book a call"
```

## Open decisions

- [x] **Site's primary job** — **prove-capability-fast.** Demonstrate-the-twin is the
      phase 3 goal, not the phase 1 one; tell-your-journey was rejected as the backbone
      (it foregrounds time, which spotlights "junior + current student").
- [x] **Where the spine sits in the page** — slide 5, **BACKGROUND**, between DEPTH and
      CONTACT. Hand-off to the twin gets designed in phase 3.
- [ ] **Wording** — confirm "kicker + plain label" format; lock the concept vocabulary (A vs B vs a custom word per node).
- [ ] **Visual form of the spine** — horizontal 4-step rail vs vertical connected line vs four framed cards with a through-line (decide *after* concept lock).
- [ ] **Hero stat `1 · RAG in production`** — decide what the "1" counts now that Amdocs
      is not a headline claim.
