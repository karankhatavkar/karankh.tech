
# karankh.tech

Personal portfolio of **[Karan Khatavkar](https://karankh.tech)** — AI/ML engineer (LLM, RAG & NLP), open to freelance & contract work.

Light-editorial, typography-led site: a single-page pitch that reads as a deck, plus a writing section at [/blog](https://karankh.tech/blog). Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui (Base UI). Deployed on Vercel at [karankh.tech](https://karankh.tech).

## Develop

```bash
pnpm dev      # dev server at http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # ESLint
```

## Docs

- [PROJECT.md](./PROJECT.md) — product & content spec
- [DESIGN.md](./DESIGN.md) — design base: tokens, page frame, hero anatomy, section builds, blog & route transition
- [ROADMAP.md](./ROADMAP.md) — phased build plan, what's shipped, what's still open
- [SEO.md](./SEO.md) — SEO strategy, implementation, and post-deploy checklist
- [BLOG.md](./BLOG.md) — **how to publish a post**, plus how the writing section works
- [ANALYTICS.md](./ANALYTICS.md) — what the site measures, the event dictionary, and how to read it
- [FLOW.md](./FLOW.md) — page-flow direction (scratch/rationale doc)

## Analytics

**Vercel Web Analytics** handles page views (live already); **Umami Cloud** handles the seven custom events, because Vercel only collects those on Pro. To switch the events on: sign up at [cloud.umami.is](https://cloud.umami.is), set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in Vercel, redeploy.

Full event dictionary, the funnel it measures, and the rules for adding events: [ANALYTICS.md](./ANALYTICS.md).

## Publishing a post

Add `content/blog/my-post.mdx` with `title` / `description` / `date` frontmatter, then commit. The post page, index card, sitemap entry, RSS item, and share card are all generated from that one file. See [BLOG.md](./BLOG.md).
