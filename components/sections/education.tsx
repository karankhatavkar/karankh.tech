import { education } from "@/app/data/education";
import { Section } from "@/components/sections/section";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-8">
        {education.map((entry) => (
          <article key={entry.institution}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium">{entry.institution}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {entry.period} · {entry.location}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {entry.degree} · {entry.detail}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
