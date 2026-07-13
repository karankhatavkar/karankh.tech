import { experience } from "@/app/data/experience";
import { Section } from "@/components/sections/section";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-12">
        {experience.map((job) => (
          <article key={job.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium">{job.company}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {job.period} · {job.location}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{job.role}</p>
            <ul className="mt-4 space-y-2">
              {job.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-5 text-sm leading-relaxed before:absolute before:left-0 before:text-muted-foreground/60 before:content-['—']"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
