# SEO — strategy & implementation

SEO layer for karankh.tech, researched July 2026. Goal: **win the name query** ("Karan Khatavkar"), look sharp when shared (LinkedIn especially), and be **citable by AI engines** (ChatGPT, Perplexity, Google AI Overviews) — the channels prospective freelance clients actually use.

## Strategy (what the research says works in 2026)

Google's [official AI-search optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) is blunt: AI features in Search run on the same fundamentals as classic Search — indexability, unique people-first content, semantic HTML, structured data for rich results. "GEO/AEO hacks" don't deliver sustainable results.

For a single-page personal portfolio, that translates to three plays:

1. **Entity SEO.** Make "Karan Khatavkar" an unambiguous entity: `Person` + `ProfilePage` JSON-LD with `sameAs` links to LinkedIn/GitHub, consistent name/role everywhere, canonical URL. This is what drives the name SERP, knowledge-panel eligibility, and AI-answer citations.
2. **Complete technical hygiene.** Canonical, sitemap, robots, OG/Twitter cards, favicons (Google shows favicons in SERPs — needs ≥48×48), fast static pages. The site is fully prerendered with zero client JS beyond Next's runtime — Core Web Vitals are effectively free.
3. **AI-crawler openness.** robots.txt allows all crawlers including GPTBot / ClaudeBot / PerplexityBot. Being retrievable is a precondition for being recommended when someone asks an AI "who can build me a RAG pipeline?".

### Rejected tactics (and why)

- **`llms.txt`** — Google explicitly doesn't read it; measured crawler pickup is negligible (~400 fetches in 500M AI-bot visits per one 90-day study). On a one-page site there's nothing to curate anyway.
- **Keyword stuffing / long-tail page variants** — violates Google's scaled-content policies; a portfolio lives or dies on its brand query.
- **Schema over-markup** (ItemList of projects, FAQ, etc.) — no rich-result eligibility for this content; noise dilutes the Person entity.

## Implemented (all verified against the production build)

| Surface | File | Notes |
|---|---|---|
| Site constants | `app/data/site.ts` | Single source for URL/title/description |
| Metadata | `app/layout.tsx` | `metadataBase`, canonical, OG `profile` type, Twitter `summary_large_image`, robots directives (`max-image-preview:large`), author/creator, keywords |
| Theme meta | `app/layout.tsx` | `viewport` export: `themeColor` + `colorScheme: dark` |
| JSON-LD | `app/data/structured-data.ts` → rendered in `app/page.tsx` | `@graph`: `Person` (sameAs, knowsAbout, alumniOf, hasCredential, Pune address) + `WebSite` + `ProfilePage` (Google's recommended pattern for personal sites) |
| OG/share image | `app/opengraph-image.tsx` (+ `twitter-image.tsx` re-export) | 1200×630, generated at build with `ImageResponse`; dark monochrome card in Geist (Next 16's bundled OG font) matching the site design |
| Favicons | `app/icon.tsx` (32 + 48 px), `app/apple-icon.tsx` (180 px), `public/favicon.ico` (legacy fallback) | "K" monogram; 48px size satisfies Google's SERP-favicon minimum |
| Sitemap | `app/sitemap.ts` | Single URL, `lastModified` at build time |
| Robots | `app/robots.ts` | Allow all (incl. AI crawlers), sitemap pointer |

Everything is statically prerendered (`npm run build` shows all routes `○/●`), so metadata is in the initial HTML for every crawler — no streaming-metadata concerns.

## Post-deploy checklist (manual, one-time)

1. **Google Search Console** — verify `karankh.tech` as a *Domain* property via a DNS TXT record in Cloudflare (no code needed; alternatively set `metadata.verification.google`). Then submit `https://karankh.tech/sitemap.xml` and request indexing for the homepage.
2. **Bing Webmaster Tools** — import the verified GSC property (one click). Bing powers ChatGPT's web search — worth the five minutes.
3. **Backlinks from your own profiles** (the highest-leverage off-site action):
   - LinkedIn → add `https://karankh.tech` as the profile Website and in the About section.
   - GitHub → set the profile website field + mention in the profile README.
   - These reciprocate the site's `sameAs` links, letting Google/AI engines reconcile the entity from both directions.
4. **Validate after deploy:**
   - Structured data: [Rich Results Test](https://search.google.com/test/rich-results) and [validator.schema.org](https://validator.schema.org/)
   - Share cards: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), [OpenGraph.xyz](https://www.opengraph.xyz/)
5. **Monitor** — Search Console's Performance report (includes a generative-AI section) monthly; watch the "Karan Khatavkar" query position.

## Future levers (when ready to invest more)

- **Content is the only way to rank for non-branded queries** ("freelance RAG developer", "LLM consultant"). Project case-study pages or short write-ups would target those; AI Overviews strongly favor sources updated within ~6 months. (Blog is out of scope for v1 per PROJECT.md.)
- **Publication (MixVal)** — once published, add it to the site and as `Person.subjectOf`/`author` markup; academic citations are strong E-E-A-T signals.
- Keep `lastModified`/content fresh: rebuild+redeploy on every content change (sitemap date updates automatically).
