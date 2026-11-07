import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPostingSchema } from "@/app/data/blog-structured-data";
import { profile } from "@/app/data/profile";
import { JsonLd } from "@/components/json-ld";
import { ReadTracker } from "@/components/analytics/read-tracker";
import { formatPostDate, getPost, getPostSlugs, lastTouched } from "@/lib/blog";
import { socialCard } from "@/lib/metadata";

// Every post is prerendered at build time, and `dynamicParams = false` makes
// an unknown slug a 404 instead of a render attempt. Together they keep the
// filesystem reads in `lib/blog.ts` build-only — nothing touches `fs` at
// request time in production.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    ...socialCard({
      title: post.title,
      description: post.description,
      url,
      article: {
        publishedTime: post.date,
        modifiedTime: lastTouched(post),
        tags: post.tags,
      },
    }),
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Turbopack resolves this template literal into a module for each file in
  // the directory, so the body is bundled per-post rather than all at once.
  const { default: Body } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />

      <article className="py-16 sm:py-24">
        <header className="max-w-[46rem] border-b pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {" · "}
            {post.readingMinutes} min read
          </p>
          <h1 className="mt-6 text-[clamp(30px,4.4vw,48px)] leading-[1.06] font-[520] tracking-[-0.035em] text-balance">
            {post.title}
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-[1.6] text-muted-foreground">
            {post.description}
          </p>
          {post.updated && (
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
              Updated{" "}
              <time dateTime={post.updated}>
                {formatPostDate(post.updated)}
              </time>
            </p>
          )}
        </header>

        {/* Reading measure lives here rather than on the layout so the header
            and body share one column width. */}
        <div className="max-w-[46rem] pt-10">
          <Body />
          {/* Sits after the body so it only enters the viewport once the post
              has actually been scrolled through. */}
          <ReadTracker slug={post.slug} />
        </div>
      </article>

      <aside className="max-w-[46rem] rounded-lg border bg-card p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {profile.role}
        </p>
        <p className="mt-4 text-[15px] leading-[1.7] text-foreground/85">
          I&apos;m {profile.name.split(" ")[0]}, an AI research engineer. I
          build RAG systems and AI agents, with evals that show whether they
          actually work.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
          <Link
            href="/#contact"
            className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            data-track="contact_click"
            data-track-source="post_footer"
          >
            Get in touch
          </Link>
          <Link
            href="/blog"
            className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            All writing
          </Link>
        </div>
      </aside>
    </>
  );
}
