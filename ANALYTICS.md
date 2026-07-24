# ANALYTICS.md — what the site measures and why

Built Jul 25, 2026.

The site's job is turning a browsing client into a conversation. Everything here exists to answer one question — **is that happening, and what causes it** — and nothing is collected that doesn't serve it.

---

## Two providers, and why

| | Page views | Custom events | Retention |
|---|---|---|---|
| **Vercel Web Analytics** | ✅ Hobby | ❌ **Pro only** | 1 month on Hobby |
| **Umami Cloud** (free) | ✅ | ✅ | longer than Vercel Hobby |

Vercel Web Analytics doesn't collect custom events below the Pro plan — its own pricing page lists Custom Events as `—` for Hobby and says outright: *"Upgrade to Pro to capture more events, send custom events, and access an extended reporting window."* Hobby also keeps only a **1-month** window, which is too short to see whether a blog post is compounding.

So: Vercel keeps page views (already wired, zero maintenance), Umami takes the events. Umami is cookieless, so **no consent banner is needed**.

Expect the two page-view counts to **disagree** — different bot filtering, and content blockers hit them differently. Treat Umami as the source of truth; it has both halves. To run a single script instead, delete `<Analytics />` from `app/layout.tsx`.

---

## The event dictionary

Seven events. Each earns its place by answering a question you'd otherwise guess at.

| Event | Properties | Fires on | The question it answers |
|---|---|---|---|
| `contact_click` | `source` | hero CTA, contact CTA, email link, FindMe email, blog post footer | **The conversion.** How many readers try to start a conversation — and which surface produced it |
| `resume_download` | — | Contact | Who is vetting seriously rather than browsing |
| `twin_message_sent` | `turn` | twin chat | Does the digital twin get used, or is it maintenance for nobody |
| `project_click` | `label` | demo + source buttons, per project | Which project pulls people through — i.e. what to lead with |
| `profile_click` | `label` | each social in FindMe | Where people go next when they leave |
| `writing_opened` | — | "Writing" in the hero nav | Is the blog discoverable from the deck at all |
| `post_read` | `slug` | a sentinel after the article body | Read to the end, vs merely opened |

**`contact_click.source`** distinguishes `hero` (the CTA that only *scrolls* to Contact — top of funnel, not a conversion), `contact_cta` and `email` and `find_me` (real mail-client opens), and `post_footer` (a reader converting off an article — the number that tells you whether writing pays).

**`post_read` matters more than page views.** A search result someone bounces off counts identically to a piece somebody actually read. This separates them, and it's the only way to judge whether the writing is working.

### Reading them together

The funnel the site is built around:

```
page view  →  writing_opened  →  post_read  →  contact_click (source=post_footer)
page view  →  project_click   →  contact_click (source=contact_cta | email)
```

Ratios worth watching, in rough order of usefulness:

- **`contact_click` ÷ page views** — the only number that measures the site's stated goal.
- **`post_read` ÷ `/blog/<slug>` page views** — whether a post holds attention, per post. Low means the intro or the topic is wrong, not the SEO.
- **`contact_click` with `source=post_footer`** — whether the blog converts or just draws traffic. This decides whether to keep writing.
- **`writing_opened` ÷ home page views** — whether the nav link is doing anything.
- **`twin_message_sent` per session** — the twin has a real maintenance cost (a Python function, Gemini spend, a rate limiter). This is the evidence for keeping or cutting it.

---

## Rules

These are enforced by design in `lib/analytics.ts` — keep them that way.

1. **Event names are a closed union**, never free strings. A typo would silently create a second near-identical metric and split the data — the thing that makes analytics untrustworthy six months in.
2. **Properties stay low-cardinality.** A handful of known values. High-cardinality properties make reports unreadable.
3. **Two properties maximum.** That's the ceiling on Vercel Pro, and more than two dimensions is rarely legible anyway.
4. **Never record visitor input.** The twin event carries the *turn number*, never the question. Anything a visitor types is their data, and an analytics store is the wrong place for it. This applies to any future contact form too.
5. **Instrumentation must never break a click.** `trackEvent()` swallows its own errors — an analytics failure should cost a data point, not the action the visitor actually took.

---

## How it's wired

```
lib/analytics.ts                          event union + trackEvent() + deliver()
components/analytics/event-tracking.tsx   one delegated click listener (client)
components/analytics/read-tracker.tsx     IntersectionObserver sentinel (client)
app/layout.tsx                            <Analytics />, Umami <Script>, <EventTracking />
```

**Sections stay server components.** They opt in declaratively:

```tsx
<a data-track="resume_download">
<a data-track="project_click" data-track-label="EdgarBrief · source">
```

`data-track-<prop>` attributes past the first become event properties. One delegated listener on `document` handles the whole site, in the capture phase so it runs before anything that might stop propagation.

The alternative — a client component per tracked link — would have pushed client boundaries into Hero, Contact, Projects and FindMe, shipping their markup twice (HTML *and* RSC payload) just to instrument a click. The site's near-zero client JS is part of why its Core Web Vitals are free; this keeps it.

### Adding an event

1. Add the name to the `AnalyticsEvent` union in `lib/analytics.ts` with a comment saying what question it answers. If you can't write that comment, don't add the event.
2. Put `data-track="your_event"` on the element (server components), or call `trackEvent("your_event")` directly (client components — see `twin-chat.tsx`).
3. Nothing else. The listener picks it up.

### Changing provider

`deliver()` in `lib/analytics.ts`, and the `<Script>` in `app/layout.tsx`. Nothing else in the codebase knows who collects.

---

## Setup

Page views work already. For the events:

1. Sign up at [cloud.umami.is](https://cloud.umami.is), add `karankh.tech`, copy the **Website ID**.
2. Vercel → Project → Settings → Environment Variables → `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
3. **Redeploy.** `NEXT_PUBLIC_*` vars are inlined at build time — setting the variable changes nothing until the next build.

Leave it unset locally; the script is gated on it, so dev and preview traffic stay out of the production numbers.

---

## What this will *not* tell you

- **What people searched to find you** → [Google Search Console](./SEO.md), already verified. GSC covers *how you're found*; this covers *what happens after they land*. Complements, not overlaps — check both.
- **Whether ChatGPT or Perplexity cited you** → mostly invisible; AI crawlers rarely send referred traffic. Staying crawlable (SEO.md) is still the whole strategy there.
- **Heatmaps or session replay** → not installed, and not worth the weight or the privacy surface at this size.

## Caveats

- **Ad blockers eat some share of both providers.** Absolute numbers are floors, not truth. Trends and ratios are what to read.
- **Numbers will be tiny for a while.** The site was indexed Jul 13, 2026 and the blog holds one post. Don't over-read a single day; the value is months of trend.
- **Vercel Hobby: 50,000 events/month**, then collection pauses after a 3-day grace period until the next cycle. Page views alone won't come close at this traffic. Check Umami's current free-tier limits when you sign up.
