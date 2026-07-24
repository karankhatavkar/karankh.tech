# BLOG.md — the writing section

Built Jul 25, 2026. Lives at **`/blog`**, labelled **"Writing"** in the nav.

The design constraint was Karan's: **no database.** Posts are MDX files in the repo, so publishing is a commit. Everything downstream — the index, the post page, the sitemap, the RSS feed, the share card — is derived at build time from one file. There is no manual step and nothing to keep in sync by hand.

> Why files and not a CMS: at one or two posts a month, files-in-git beat a database on every axis that matters here. Free, versioned (a post can be diffed and reverted), no runtime dependency, no backups, and the pages stay fully static so Core Web Vitals are unaffected. A database would have made the site slower and added a failure mode for no SEO gain.

---

## Publishing a post

1. Create `content/blog/my-post-slug.mdx`. **The filename is the URL** — `my-post-slug` serves at `/blog/my-post-slug`.
2. Write it (frontmatter contract below).
3. `pnpm dev`, read it at `/blog/my-post-slug`.
4. Commit and push. Vercel builds; the post, the sitemap entry, the feed item, and the share card all appear together.

Fixing a typo from a phone: edit the file in GitHub's web UI or mobile app. No local machine, still triggers the deploy.

### Frontmatter

```yaml
---
title: "Your RAG pipeline breaks on the second question"
description: "One or two lines. Doubles as the meta description and the index card summary — aim for ~150 characters."
date: 2026-07-25          # publication date
updated: 2026-08-14       # optional; only when you make a substantive edit
tags: [rag, retrieval]    # optional
---
```

`title`, `description`, and `date` are required. A missing or malformed field **fails the build** with the filename and the field named — that is deliberate, so a post can't ship without a meta description.

### Drafts

Prefix the filename with an underscore: `_half-finished.mdx`. It stays in the repo and out of the router, the index, the sitemap, and the feed.

---

## What one file produces

| Surface | Generated from |
|---|---|
| `/blog/<slug>` | the MDX body, rendered through `mdx-components.tsx` |
| `/blog` index card | `title`, `description`, `date`, `tags`, computed reading time |
| `<title>`, meta description, canonical | `title`, `description` |
| OG/Twitter card image | `app/blog/[slug]/opengraph-image.tsx` — the post title on the site's share-card canvas |
| `sitemap.xml` entry | `updated ?? date` as `lastmod` |
| `feed.xml` item | title, description, date, tags |
| `BlogPosting` JSON-LD | all of the above, with `author`/`publisher` pointing at the homepage's Person node |

Reading time is computed from the body at ~200 wpm — not authored.

---

## File map

```
content/blog/*.mdx              the posts — the only thing you edit
lib/blog.ts                     reads the directory, parses frontmatter, validates
app/blog/layout.tsx             the reading-room frame: header, footer, column
app/blog/page.tsx               the index
app/blog/[slug]/page.tsx        the post
app/blog/[slug]/opengraph-image.tsx   per-post share card
app/blog/loading.tsx            skeleton (cold loads only — see below)
app/blog/feed.xml/route.ts      RSS
app/data/blog-structured-data.ts      BlogPosting + Blog JSON-LD builders
mdx-components.tsx              article typography
```

---

## Constraints worth knowing before changing anything

**Everything is prerendered, and that is load-bearing.** `generateStaticParams` + `dynamicParams = false` on the post page, `force-static` on the feed. That is what keeps `lib/blog.ts`'s filesystem reads build-time only — `content/` is never shipped to the server and is excluded from the Python function bundle in `vercel.json`. Making any blog route dynamic breaks this: it would try to read `content/` from inside a serverless function whose bundle doesn't contain it.

**A metadata image in a dynamic segment needs its own `generateStaticParams`.** It does not inherit the page's. Without it the OG card renders on demand and hits the same problem.

**MDX plugins must be strings in `next.config.ts`, not imported functions.** Turbopack is Next 16's default bundler and hands plugin config to Rust, which can't receive JS functions. Options must stay serializable.

**Frontmatter needs `remark-frontmatter`.** `@next/mdx` doesn't handle it natively and will render the YAML block as visible body text without it. `lib/blog.ts` reads the values separately with gray-matter; the plugin only stops it being printed.

**Build page metadata with `socialCard()` from `lib/metadata.ts`.** Next *replaces* `openGraph`/`twitter` when a route defines them rather than merging with the root layout, so a page that sets them by hand silently loses `siteName`, `locale`, `@creator`, and `summary_large_image` — which downgrades the share preview to a small thumbnail.

---

## The loading state

`app/blog/loading.tsx` is a skeleton of the page — bars where the headline, standfirst, and post rows will be, breathing as one object. Not a spinner.

**You will rarely see it.** The routes are prerendered and prefetched on hover, so it only appears on a cold first visit over a slow connection. To check it: devtools Network → Slow 3G → hard-reload `/blog`.

---

## Getting posts indexed

Automatic. The sitemap regenerates on every build, and Google recrawls it on its own schedule — days to weeks for a young site.

To speed up the first few, request indexing per URL in Search Console (the property is already verified — see [SEO.md](./SEO.md)). Don't reach for Google's Indexing API; it's officially limited to `JobPosting` and `BroadcastEvent`.

**`lastmod` honesty matters here.** Post dates come from frontmatter, and `site.homeUpdated` is a hand-maintained constant rather than `new Date()`. Google honours `lastmod` only while it stays accurate; a feed that reports a change on every deploy gets the signal discounted site-wide, including for posts. Bump `homeUpdated` when homepage copy changes.

---

## Writing strategy

The infrastructure was the easy part. Per SEO.md, content is the only lever for non-branded queries ("freelance RAG developer", "LLM consultant"), and depth beats volume: a handful of posts drawn from work actually shipped will outrank a pile of generic explainers, and they double as collateral to send clients. Thin, scaled content is explicitly against Google's policies.

Candidate topics from real work: the multi-turn context-loss fix (shipped as the first post), BM25 hybrid-weight tuning, dynamic chunking, the retrieval-failure tracing dashboard.

Voice: casual and straight, friendly but professional, honest about numbers. Same rules as the rest of the site's copy.
