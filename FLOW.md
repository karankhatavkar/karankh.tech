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
                 ▲ DEFERRED to phase 4 (Jul 20, 2026) — the slot stays reserved
                   here; the deck runs without it until then
4  DEPTH         the 6 other projects + skills strip — "the ML underneath"
5  ABOUT         bio + testimonials + the background spine as a 5-stop track
                 — absorbs Experience / Education / Certifications
6  CONTACT       the ask
```

Reads as: *here's the thing → here's how I make things → here's the range behind
it → here's where the judgment came from → let's talk.*

### Interim flow — until HOW I BUILD lands (decided Jul 20, 2026)

With HOW I BUILD deferred to phase 4, the deck runs **five slides**:

```
1  HERO       positioning + stats + CTA
2  FEATURED   EdgarBrief + the RFP client build — live, clickable proof
3  DEPTH      the 6 ML repos, ranked + the full skills strip, weighted
4  ABOUT      intro + the 5-stop background spine
5  CONTACT    the ask
```

Reads as: *here's the thing → here's the range behind it → here's where the judgment
came from → let's talk.*

The method is not wholly absent in the meantime: FEATURED already renders EdgarBrief's
retrieval pipeline plus `structure-aware chunking` and `grounded by design` — three of
HOW I BUILD's four principles, shown rather than stated. What is genuinely missing until
phase 4 is the *engagement* half: `scope → build → evals → handover`. A visitor can infer
how Karan engineers; they cannot infer what it is like to hire him.

**ABOUT drops from 3 to 4** once DEPTH exists, restoring "evidence before claims".

### As shipped (Jul 21, 2026)

The deck today is the **interim flow** above — five slides, one short of target:

```
1  HERO        2  FEATURED       3  DEPTH       4  ABOUT       5  CONTACT
```

- **DEPTH shipped Jul 21, 2026**, absorbing SKILLS and MORE PROJECTS. Both standalone
  slides are gone: `components/sections/skills.tsx` is deleted and `MoreProjects` is
  removed from `projects.tsx`. Only HOW I BUILD is still missing from the target.
- **ABOUT dropped from 3 to 4** in the same change, as this document said it would once
  DEPTH existed. "Evidence before claims" is restored and biography is last-but-one.
- **BACKGROUND never became its own slide.** It merged into **ABOUT** as a horizontal
  track. That is a permanent change, not a staging step — the target above is updated to
  match.
- **A testimonial panel shipped in ABOUT** and is not part of any decision recorded here:
  auto-rotating vertical ticker, no controls, scales to any number of entries in
  `app/data/testimonials.ts`. Currently seeded with visibly-marked placeholders — real,
  attributed quotes are still outstanding.

### Why this shape

- **Evidence before claims.** The old order asserted competence (About, Skills) before
  proving it. EdgarBrief is live and clickable — it moves to slide 2 and carries the pitch.
- **Skills stops being a slide.** ~50 items across 5 categories is an ATS artifact, not a
  buyer artifact — and listing Java/MySQL/Kubernetes beside RAG reads *generalist junior*
  rather than *RAG specialist*. It survives as a strip inside DEPTH.
  **The trim was reversed on Jul 21, 2026** — Karan's call: keep every item, rank them by
  ink instead. The full list stays in `app/data/skills.ts`; `coreSkills` in
  `app/data/depth.ts` marks the ~16 the RAG and agent work runs on, and those render at
  full weight while the rest recede to `muted-foreground/65`. This answers the original
  concern without deleting anything: the specialism is what the eye lands on, and a client
  checking "has he touched Postgres" still gets an answer. The borrowed idiom is the
  hero's muted/full-ink `expertise` segments, so the two slides read as one system.
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
  **Deferred to phase 4 on Jul 20, 2026** — the reasoning above still stands, so this is a
  sequencing call, not a reversal. One consequence to carry: `about.stat`, `about.points`
  and `about.openSource` were evicted when About went track-led and render nowhere in the
  meantime. They are this slide's raw material, so they stay in `app/data/about.ts`
  awaiting it rather than being deleted.

## Rollout phases

| Phase | Scope | Status |
|---|---|---|
| **Phase 1 — reorder** | Move EdgarBrief to slide 2, shift About below it. Pure ordering; no copy or component rewrites. | **done** |
| **Phase 2 — rebuild the slides** | Fold Skills + More projects into **DEPTH**; build the **BACKGROUND** spine over Experience/Education/Certifications. | **done** — spine shipped Jul 20 (as a track inside About, not its own slide); DEPTH shipped Jul 21 |
| **Phase 3 — digital twin chat** | The "ask my twin" chat window — the pull layer, and the site's real differentiator. Deferred deliberately: a mediocre twin would *disprove* the RAG pitch rather than demo it, so it ships only once the deck stands on its own. | not started |
| **Phase 4 — HOW I BUILD** | Rewrite the method slide: chunking · retrieval quality · evals · honest degradation, over the `scope → build → evals → handover` arc. Rehomes `about.stat` / `about.points` / `about.openSource`, which currently render nowhere. | not started — **postponed here Jul 20, 2026** |

> **Why HOW I BUILD sits after the twin.** Karan's call, Jul 20, 2026: not next, but the
> one after. It was originally phase 2's headline slide; the rationale for building it did
> not change, only its turn in the queue. Note the knock-on: phase 3's twin therefore ships
> before the site ever states its method explicitly, so until phase 4 the method has to be
> inferred from the featured builds alone.

> Phase numbering here is local to this document — it is **not** the same axis as the
> build phases in [ROADMAP.md](./ROADMAP.md).

## Goal lens

> **Nov 2026:** the freelance goal below is retired. The site now presents Karan
> as a full-time AI Research Engineer; résumé and "book a call" are removed.
> The layout rationale still holds; read "client" as "visitor".

Everything below was judged against one goal: **win freelance/contract LLM & RAG
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

## DEPTH — the range slide (designed Jul 20, 2026, not built)

Folds the two weakest slides — `SKILLS` and `MORE PROJECTS` — into one. Slide 3 in the
interim flow, 4 once HOW I BUILD lands.

### Layout — two columns

```
⟨TITLE⟩

┌─ projects, stacked in line ──────────────┐  ┌─ skills strip ─────┐
│ Founder's Court                        ↗ │  │ LLM & GenAI        │
│ Claude Agent Skill that judges…          │  │ [RAG][LangChain]…  │
│                          Claude · Skills │  │                    │
├──────────────────────────────────────────┤  │ ML & Deep Learning │
│ BioBERT Medical NER                    ↗ │  │ [PyTorch][BERT]…   │
│ Fine-tuned BioBERT for token-level…      │  │                    │
│                    PyTorch · HuggingFace │  │ Serving & Infra    │
├──────────────────────────────────────────┤  │ [FastAPI][Docker]  │
│ … 4 more                                 │  │                    │
└──────────────────────────────────────────┘  └────────────────────┘
```

- **Left — the six repos as rows**, not cards in a grid. `MoreProjects` in
  `components/sections/projects.tsx` already renders exactly this: a `divide-y` list,
  each row carrying name + `↗`, description, and tech. It is close to reusable as-is.
- **Right — the skills strip**, grouped by category. `components/sections/skills.tsx`
  already renders category + wrapped `Badge` list; it needs to become a single narrow
  column rather than its current `sm:grid-cols-2`.
- **Weighting:** left needs the width (descriptions run to `max-w-[60ch]`), right only
  wraps chips. Roughly `1.6fr / 1fr`.
- **Mobile:** stacks, projects first — the repos are the substance, skills the annotation.

### Two things this layout forces

1. **Trimming `app/data/skills.ts` becomes a blocker, not a nice-to-have.** ~50 badges
   across 5 categories cannot fit a third-width column without blowing the slide's
   vertical budget. This doc already decided skills "survives as a trimmed strip"; the
   two-column design makes that mandatory. Trim toward the positioning: lead **LLM &
   GenAI**, keep **ML & Deep Learning**, compress **Serving & Infra**, and cut the
   generalist tail (Java, MySQL, Kubernetes, Bash) that reads *junior* beside RAG.
2. **The project rows lose their right-hand tech column.** `MoreProjects` currently uses
   `sm:grid-cols-[1fr_auto]` to right-align the tech list on each row. In a narrowed
   left column that will crowd; tech likely moves beneath the description.

### Vertical budget

Six rows at roughly 90px each plus a heading is ~550px, against a `min-h-svh` slide.
It fits, but with little slack — the rows already tighten in slide mode via
`slides:py-[clamp(14px,2.4vh,24px)]`. Verify before calling it done.

### As built (Jul 21, 2026) — where the sketch above was wrong

The sketch is kept for its reasoning, but four of its calls did not survive contact:

1. **Skills was never trimmed.** Karan reversed it — full list, ranked by ink. See
   *Why this shape*. The "blocker" in point 1 above dissolved: what actually blew the
   vertical budget was ~50 **badges**, not ~50 **items**. Set as running type separated
   by `·`, all five categories fit a 0.85fr column in ~180px.
2. **Neither old component was reused.** `MoreProjects` and `Skills` were both deleted
   rather than adapted; `components/sections/depth.tsx` renders both halves fresh.
3. **The rows kept their right-hand tech column.** Point 2 predicted it would crowd. It
   does not — the description moved behind a hover, so the always-visible row is just
   `nn · name · ↗ · tech` and has room to spare.
4. **Vertical budget was never tight.** The collapsed index is ~330px, not ~550px, and
   only one description is ever open. Verified at 1512×798 with slide mode active: the
   whole slide sits on one screen with ~100px of slack, and expanding a row shifts the
   centred block by about a pixel.

### Title — open

Karan's note: *"More / Projects / or something."* Undecided. The constraint is that
**slide 2 is already projects**, so a rail reading `Featured → Projects` says the same
word twice for two different things, and "More projects" frames substantial ML work as
leftovers.

Note that the rail label and the slide heading are **separate fields** — `label` in
`app/data/slides.ts`, `title` on the `Section` component — so a short rail word can pair
with a longer heading.

| Rail label | Heading | Note |
|---|---|---|
| `Depth` | The ML underneath | This doc's own phrase; frames the repos as foundation rather than surplus. **Leaning pick.** |
| `ML work` | Machine learning underneath the RAG | Plainest; no ambiguity with slide 2. |
| `More` | More projects | Status quo. Weakest framing — "more" concedes they are secondary. |

## The background spine — as shipped

Collapse Experience + Education + Certifications into **one spine**, shipped as **five
stops** on a horizontal track inside ABOUT. Each stop is a **phase of capability** (a
theme), not a job title. **Capability is the headline; the résumé entry is the
footnote.** Dates are a small annotation.

> Written as a 4-node design; shipped as 5. The differences are recorded in
> *Superseded decisions* below rather than deleted — the reasoning behind the original
> calls still matters even where Karan overrode them.

Content lives in `app/data/background.ts`; the component is
`components/spine-track.tsx`, composed by `components/sections/about.tsx`.

**Order: newest first** (decided Jul 20, 2026 — reverses the original draft). The
forward arc opened on a 2018 electronics degree, which frames Karan as *an electronics
grad who pivoted* rather than a RAG engineer — the same "foregrounds time, spotlights
junior" failure this doc rejected for the page as a whole. Numbering runs `01 = now`,
so the index reads as recency, not chronology.

The underlying arc is *physical signals → data → retrieved knowledge → what I build
now*, read backwards. **Nothing is hidden** — all five stops are always rendered; the
earlier ones are simply further along the track.

| Node | Underlying fact | What it says |
|---|---|---|
| **01 · AGENTS** | Independent: RAG & agentic systems for clients, Bengaluru, 2025→ | Present practice + available for work. Carries the "book a call" CTA. |
| **02 · RESEARCH** | M.Tech AI & ML, M.S. Ramaiah, 2025–present, GPA 9.4 | Formal grounding under the practice. **Its own node as of Jul 20, 2026** — see *Superseded decisions*. |
| **03 · RETRIEVAL** | Amdocs, Software Developer, 2022–2025 | Production RAG — LangChain, FAISS, hybrid BM25 retrieval, a question-rephrasing step that fixed multi-turn context loss, a dashboard to trace retrieval failures and cut hallucinations. **The strongest evidence node.** |
| **04 · PIPELINES** | Sisai internship, 2021–2022 | Real-time pipeline for 1,000+ industrial sensors (InfluxDB), Z-score anomaly detection, role-based dashboards. Theme: *making messy streaming data trustworthy at scale.* |
| **05 · SIGNALS** | B.Tech Electronics & Communication, MIT-WPU, 2018–2022 | Started in hardware / signal processing; understands systems from the physical layer up. |

⚠️ **Every `claim` line in `app/data/background.ts` is placeholder copy** — drafted to
the right length so the layout could be judged, not written in Karan's voice. Rewriting
them is outstanding work.

### Node anatomy

Each node is a **claim with a footnote**, six fields. The claim line is the only new
copy on the slide; everything else already exists in `app/data/`.

```
01                    index (mono) — 01 = now, reads as recency not chronology
NOW                   kicker: one-word concept
RAG & agents for clients   label: plain, buyer-legible heading
⟨one sentence⟩        the claim — what capability this bought    ← NEW copy
Independent · '25→    evidence: the résumé entry, mono, small
[ chip ] [ chip ]     concrete technical artifacts
```

### Certifications — shipped

AZ-900 / AI-900 / DP-900 are fundamentals-tier — attached to a node they'd carry weight
they haven't earned, and they read *junior* more than *competent*. Shipped as **one
quiet mono line below the track, attached to nothing**: `Certified · AZ-900 · AI-900 ·
DP-900`. Cutting them entirely remains defensible.

### Visual form — as shipped

An **auto-drifting horizontal track** of five cards, scrollable and draggable. Not the
ticked rail this doc originally specified.

```
BACKGROUND

────────────────────────────────────────────────────  (one unbroken hairline)
  01 · AGENTS      ←   02 · RESEARCH   ←   03 · RETRIEVAL   ←   04 · PIPELINES  →
  RAG & agents         M.Tech in AI&ML     RAG in production     Real-time data
  for clients
  ⟨claim⟩              ⟨claim⟩             ⟨claim⟩               ⟨claim⟩
  Independent '25→     Ramaiah · GPA 9.4   Amdocs · '22–25       Sisai · '21–22
  [evals][handover]    [deep learning]     [LangChain][FAISS]    [InfluxDB]

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬───────────────────    SCROLL →

Certified · AZ-900 · AI-900 · DP-900
```

- **Direction runs against the reading order.** Arrows point **left**, back toward
  `01`, so the track reads *everything led here* rather than *here is my journey
  forward*. The arrows sit on one unbroken hairline — each card and each arrow spacer
  carries the same `border-t`, because a rule that breaks at every gap reads as loose
  marks, not flow.
- **Ordinal, not scaled to time.** Nodes 04 and 05 overlap in reality (the Sisai
  internship ran *during* the B.Tech), so a time-scaled track would be quietly false.
- **All stops at uniform ink** (Jul 20, 2026). An earlier build dimmed the inactive
  cards to 45%; Karan removed it — the track is one continuous thing to read across,
  not a carousel with a selected item. Removing it also deleted the highlight-follows-
  scroll logic, leaving the drift and the settle as the only systems touching scroll.
- **The drift makes one pass and stops.** No pause control by design, so a perpetual
  loop would fail WCAG 2.2.2; one pass means there is no indefinitely-moving content to
  stop. It also pauses on hover and focus, yields permanently once the visitor scrolls,
  never runs off-screen, and is disabled under `prefers-reduced-motion`.
- **Drag-to-scroll for mice** (`cursor: grab`). A mouse wheel emits only vertical delta,
  so without it a horizontal track is unreachable by mouse entirely. Translating vertical
  wheel to horizontal scroll was rejected: it would trap the page's vertical scroll
  whenever the cursor crossed the track — the scroll hijacking DESIGN.md rules out.
- **Affordance:** the native scrollbar is hidden in favour of a progress hairline whose
  lit segment shows both how much track exists and where you are on it, plus a `SCROLL →`
  hint that fades once you move. The scroller takes `tabIndex={0}` so hiding the
  scrollbar does not make it unreachable by keyboard.
- **Mobile:** the track keeps its horizontal scroll; native touch scrolling is left
  alone rather than reimplemented.

**RAG appears twice on purpose** — proven (node 03, Amdocs) and current offering (node
01). Continuity, not history. Stops the marquee skill from reading as "past."

### Known-unstable

**Scroll alignment.** Resting mid-scroll can leave card 01 clipped against the frame
inset — the same line the heading and every section label align to. Mitigations shipped:
CSS scroll-snap was removed (`x mandatory` put snap points past the end of the scroll
range, so reaching the end yanked back to card 02), replaced by a JS settle on
`scrollend` that corrects only the two edges. Nearest-card-start snapping was rejected
as the wrong model for this geometry: a card is ~330px but the whole scroll range is
~190px, so every stop past the first collapses to `max`.

**None of the scroll behaviour is verified.** The browser bridge used during the build
had no animation frames — `requestAnimationFrame`, IntersectionObserver and
`behavior: "smooth"` were all silent no-ops — so every scroll test returned misleading
results. Auto-drift, settle and drag all need checking in a real focused browser.

### Superseded decisions

Kept because the reasoning still informs future calls, even where the decision was
overridden.

1. **~~Two visible, two folded behind a `Collapsible`~~** — superseded Jul 20, 2026.
   The argument was that a tight visible surface *is* the pull model expressed as a
   static component, and the only place it is demonstrable before the twin ships.
   Karan wanted an animated, scrollable track with nothing hidden; the pull model now
   waits entirely on phase 3.
2. **~~M.Tech as a detail under the "now" node, never its own headline~~** — superseded
   Jul 20, 2026 by Karan's explicit call. The concern stands on record: promoting it
   makes *"currently a student"* the second thing a buyer reads, which is the exact
   impression reversing the order was meant to remove. Watch for it once real copy
   lands.
3. **~~A ticked rail rotating `slide-rail.tsx`'s motif~~** — superseded by the card
   track. The instinct was to reuse existing vocabulary rather than invent; worth
   keeping in mind, but the track needed card-shaped stops the rail could not carry.
4. **~~The arc as disclosure-trigger copy~~** — the line *"Earlier — I came to LLMs
   through pipelines and signals, not a bootcamp"* was written to sit on a fold trigger.
   With no fold, it has nowhere to live. It is a good sentence and is currently
   **unused** — a candidate for HOW I BUILD or the ABOUT intro.

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

**Locked (Jul 20, 2026): A + B** — one-word concept as a small kicker, plain phrase as
the real label. Memorable *and* clear. Two amendments to column B:

- **Pipelines**, not *Streams* — more accurate and more legible to a non-technical buyer.
- **Agents**, not *Now* — names what Karan sells instead of naming a date, and completes
  the sentence a reader should leave with: *signals → pipelines → retrieval → agents.*

As shipped, across five stops (M.Tech's `RESEARCH` was not in the original scheme —
it arrived with the node):

```
01 · AGENTS       02 · RESEARCH      03 · RETRIEVAL      04 · PIPELINES     05 · SIGNALS
RAG & agents      M.Tech in AI & ML  RAG in production   Real-time data     Hardware &
for clients                                              pipelines          signals
Independent '25→  Ramaiah · GPA 9.4  Amdocs · '22–25     Sisai · '21–22     MIT-WPU '18–22
▲ carries CTA                        ▲ strongest evidence
```

`AGENTS` is locked for node 01 — it names what Karan sells rather than naming a date,
and it completes the sentence *signals → pipelines → retrieval → agents*.

**Open: `RESEARCH` for node 02.** It may overclaim for a taught M.Tech. Alternatives
worth a look: *Foundations*, *Theory*, *Study*. Flagged in `app/data/background.ts`.

## Open decisions

- [x] **Site's primary job** — **prove-capability-fast.** Demonstrate-the-twin is the
      phase 3 goal, not the phase 1 one; tell-your-journey was rejected as the backbone
      (it foregrounds time, which spotlights "junior + current student").
- [x] **Where the spine sits in the page** — **merged into ABOUT** as a track, not its
      own slide. Hand-off to the twin gets designed in phase 3.
- [x] **Wording** — **kicker + plain label**, vocabulary B with *Pipelines* and *Agents*
      substituted. `AGENTS` locked for node 01.
- [x] **Visual form of the spine** — **auto-drifting horizontal card track**, scrollable
      and draggable, uniform ink, arrows pointing back toward `01`.
- [x] **Node order** — **newest first**, `01 = now`.
- [x] **How much shows** — **all five**, nothing folded.
- [x] **M.Tech placement** — **its own node (02)**, by Karan's call. Reverses the earlier
      decision; the original concern is on record under *Superseded decisions*.
- [x] **Certifications** — quiet mono line below the track.
- [x] **Deck order without HOW I BUILD** — five slides, **DEPTH at 3**; see *Interim flow*.
- [x] **Where ABOUT sits** — drops from 3 to **4** when DEPTH lands. It is early today
      only because the slides meant to precede it do not exist.
- [x] **DEPTH's layout** — two columns: project rows left, skills strip right. Shipped
      Jul 21, 2026 at `1.15fr / 0.85fr`.
- [x] **DEPTH's title** — rail label `Depth`, heading **"The ML underneath"**.
- [x] **DEPTH's claim** — *not his first rodeo*: seniority, not breadth. The RAG
      specialism sits on top of real ML work rather than substituting for it.
- [x] **Skills: keep or trim** — **keep all ~50, rank by ink.** Reverses the trim; see
      *Why this shape*.
- [x] **How the six repos show** — a ranked index, ordered by proximity to the RAG and
      agent work and numbered `01`–`06` so the ranking is legible rather than arbitrary.
      Name and stack always visible; the description costs a hover, because six open
      paragraphs bury the ranking the list exists to show. The reveal is a CSS
      `0fr → 1fr` grid row — no state, no client boundary. Below `slides:` every
      description is simply open: there is no hover on a phone, and content behind an
      interaction that cannot happen is content that does not exist.

### Outstanding

- [ ] **Real copy for the spine.** Every `claim` in `app/data/background.ts` is
      placeholder. Highest-value writing task on the deck.
- [ ] **Real testimonials.** `app/data/testimonials.ts` holds marked placeholders.
      Three is the floor for rotating; below that the panel shows one static quote.
      Attribution is not optional — an anonymous quote contradicts the grounded-and-
      citable pitch it sits beside.
- [ ] **Verify the track's scroll behaviour in a real browser.** Drift, settle and drag
      are all unverified — see *Known-unstable*.
- [ ] **`RESEARCH` as node 02's kicker** — may overclaim for a taught M.Tech.
- [ ] **`pgvector` and `PydanticAI` are missing from `app/data/skills.ts`.** Both are load
      bearing in EdgarBrief and are the strongest RAG signals on the site, but the toolkit
      cannot show what the list does not contain. A content edit, not a build.
- [ ] **Where the testimonials sit.** Proposed (not decided): move them out of ABOUT to
      **CONTACT**. ABOUT currently does two jobs that want opposite ends of the funnel —
      testimonials are a conversion device that works hardest beside the CTA, the spine
      is biography that belongs last-but-one. Splitting relieves ABOUT and gives CONTACT
      more than a form and a footer.
- [ ] **Orphaned About content.** `about.stat`, `about.points`, `about.openSource`
      render nowhere until phase 4. Consider an interim home for the `100%` standard.
- [ ] **Hero stat `1 · RAG in production`** — decide what the "1" counts now that Amdocs
      is not a headline claim.
