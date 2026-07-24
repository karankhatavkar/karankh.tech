import { ImageResponse } from "next/og";
import { profile } from "@/app/data/profile";
import { formatPostDate, getPost, getPostSlugs } from "@/lib/blog";

export const alt = "Article by Karan Khatavkar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A metadata image in a dynamic segment is its own route handler and needs its
// own params — it does not inherit the page's. Without this the card is
// rendered on demand, which would mean reading `content/` from inside a
// serverless function whose bundle doesn't contain it.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// Per-post share card, generated at build time — one per post, no design work
// per post. Deliberately the same canvas as the site-wide card in
// `app/opengraph-image.tsx` (white ground, hairline frame, mono kicker) so a
// shared article still reads as this site; the post title takes the position
// the name holds there.
export default async function PostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  // Long titles need to step down or they overflow the card.
  const titleSize = !post ? 72 : post.title.length > 62 ? 58 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 84,
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 22% 12%, rgba(10,10,10,0.04) 0%, rgba(10,10,10,0) 55%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            display: "flex",
            border: "1px solid #e5e5e5",
            borderRadius: 20,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: "#737373",
          }}
        >
          {post ? formatPostDate(post.date).toUpperCase() : "WRITING"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.08,
              color: "#0a0a0a",
            }}
          >
            {post?.title ?? "Writing"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", color: "#0a0a0a" }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", color: "#737373" }}>
            karankh.tech/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
