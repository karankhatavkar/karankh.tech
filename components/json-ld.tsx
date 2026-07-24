// Renders a JSON-LD block. The `<` escape is the important part: without it,
// a title or description containing "</script>" would break out of the tag.
// Centralised so every structured-data surface gets that protection by
// construction rather than by remembering.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
