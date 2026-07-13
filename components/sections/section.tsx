type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-t py-16"
    >
      <h2
        id={`${id}-heading`}
        className="mb-8 font-mono text-sm uppercase tracking-widest text-muted-foreground"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
