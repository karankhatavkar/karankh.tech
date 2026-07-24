import type { MDXComponents } from "mdx/types";

// Article typography for every MDX post. The site has no Tailwind typography
// plugin — prose is styled here so it uses the same semantic tokens and the
// same mono-label vocabulary as the rest of the page (see DESIGN.md), instead
// of a generic prose theme sitting alongside the design system.
const components: MDXComponents = {
  // h1 is rendered by the post page from frontmatter, so a stray `#` in the
  // body drops to h2 rather than fighting the title for the document outline.
  h1: ({ children }) => (
    <h2 className="mt-16 scroll-mt-24 text-2xl font-medium tracking-tight text-foreground first:mt-0 sm:text-3xl">
      {children}
    </h2>
  ),
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-16 scroll-mt-24 text-2xl font-medium tracking-tight text-foreground first:mt-0 sm:text-3xl"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-12 scroll-mt-24 text-lg font-medium tracking-tight text-foreground sm:text-xl"
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      {...props}
      className="mt-10 scroll-mt-24 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-[15px] leading-[1.75] text-foreground/85 sm:text-base">
      {children}
    </p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-foreground underline decoration-border underline-offset-[3px] transition-colors hover:decoration-foreground"
      // Outbound links open in place; only absolute ones get the safety rel.
      {...(href?.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.75] text-foreground/85 marker:text-muted-foreground sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 text-[15px] leading-[1.75] text-foreground/85 marker:text-muted-foreground sm:text-base">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-8 border-l-2 border-foreground/20 pl-5 text-[15px] leading-[1.7] text-muted-foreground italic sm:text-base">
      {children}
    </blockquote>
  ),
  // `pre` owns the block-code frame; the `code` inside it resets the inline
  // chip styling below via `[&>code]`, so one component covers both cases.
  // The `border-0` matters: without it every *line* of a code block picks up
  // the inline chip's hairline and reads as underlined.
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-lg border bg-card p-4 font-mono text-[13px] leading-[1.65] [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit">
      {children}
    </pre>
  ),
  // No border on the inline chip — a bordered fragment that wraps across two
  // lines reads as two broken boxes. `box-decoration-clone` is what makes the
  // background and padding render correctly on each fragment when it does wrap.
  code: ({ children }) => (
    <code className="box-decoration-clone rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground">
      {children}
    </code>
  ),
  hr: () => <hr className="mt-14 border-t" />,
  // Tables scroll inside their own box so a wide comparison never forces the
  // page body to scroll sideways on a phone.
  table: ({ children }) => (
    <div className="mt-8 overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b bg-muted/60 px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b px-4 py-3 align-top text-foreground/85 last:border-b-0">
      {children}
    </td>
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      className="mt-8 w-full rounded-lg border"
    />
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
