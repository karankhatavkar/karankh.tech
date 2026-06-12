import { education } from "@/app/data/education";
import { Section } from "@/app/components/ui/Section";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-8">
        {education.map((entry) => (
          <article key={entry.institution}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium text-zinc-100">
                {entry.institution}
              </h3>
              <span className="font-mono text-xs text-zinc-500">
                {entry.period} · {entry.location}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              {entry.degree} · {entry.detail}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
