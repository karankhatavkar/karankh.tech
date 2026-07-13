type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

// Two-column editorial grid: a sticky mono label in the left column indexes
// the section, continuing the hero's vertical-rail language down the page.
export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="grid gap-6 border-t py-16 sm:grid-cols-[minmax(140px,200px)_1fr] sm:gap-10 sm:py-20"
    >
      <h2
        id={`${id}-heading`}
        className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground sm:sticky sm:top-10 sm:self-start"
      >
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
