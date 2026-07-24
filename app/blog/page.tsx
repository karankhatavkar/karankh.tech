import type { Metadata } from "next";
import Link from "next/link";
import { blogSchema } from "@/app/data/blog-structured-data";
import { JsonLd } from "@/components/json-ld";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { socialCard } from "@/lib/metadata";

const title = "Writing";
const description =
  "Field notes on building RAG systems, AI agents, and AI workflows that survive production — retrieval, evals, and the parts that break after the demo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  ...socialCard({ title, description, url: "/blog" }),
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={blogSchema(posts)} />

      {/* The section marker lives in the header, where the nav word lands —
          repeating it here would make the travelling word look duplicated
          rather than moved. The headline carries the page on its own. */}
      <section className="py-16 sm:py-24">
        <h1 className="max-w-[16ch] text-[clamp(34px,5.5vw,60px)] leading-[1.02] font-[520] tracking-[-0.04em]">
          Notes from building this stuff
        </h1>
        <p className="mt-6 max-w-[58ch] text-base leading-[1.7] text-muted-foreground">
          Retrieval pipelines, evals, and the failures that only show up after
          the demo. Written from work I&apos;ve actually shipped, not from the
          docs.
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="border-t py-16 font-mono text-sm text-muted-foreground">
          Nothing published yet.
        </p>
      ) : (
        <ul className="border-t">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 border-b py-9 sm:grid-cols-[minmax(140px,190px)_1fr] sm:gap-10"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:pt-1.5">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </p>
                <div className="min-w-0">
                  <h2 className="text-xl leading-snug font-medium tracking-tight text-foreground underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-foreground/40 sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 max-w-[62ch] text-[15px] leading-[1.65] text-muted-foreground">
                    {post.description}
                  </p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                    {post.readingMinutes} min read
                    {post.tags.length > 0 && ` · ${post.tags.join(" · ")}`}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
