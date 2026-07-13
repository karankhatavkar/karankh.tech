import { education } from "@/app/data/education";
import { Section } from "@/components/sections/section";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="divide-y">
        {education.map((entry) => (
          <article
            key={entry.institution}
            className="grid gap-x-8 gap-y-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-[150px_1fr]"
          >
            <div className="font-mono text-xs leading-relaxed text-muted-foreground">
              <p>{entry.period}</p>
              <p>{entry.location}</p>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-medium">{entry.institution}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {entry.degree} · {entry.detail}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
