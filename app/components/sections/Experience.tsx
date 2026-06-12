import { experience } from "@/app/data/experience";
import { Section } from "@/app/components/ui/Section";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-12">
        {experience.map((job) => (
          <article key={job.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium text-zinc-100">
                {job.company}
              </h3>
              <span className="font-mono text-xs text-zinc-500">
                {job.period} · {job.location}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-400">{job.role}</p>
            <ul className="mt-4 space-y-2">
              {job.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-5 text-sm leading-relaxed text-zinc-300 before:absolute before:left-0 before:text-zinc-600 before:content-['—']"
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
