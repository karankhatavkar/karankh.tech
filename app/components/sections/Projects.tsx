import { projects } from "@/app/data/projects";
import { Section } from "@/app/components/ui/Section";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.name} className="bg-black">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col p-6 transition-colors hover:bg-white/[0.03]"
            >
              <h3 className="text-lg font-medium text-zinc-100">
                {project.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-wider text-zinc-500">
                {project.tech.join(" · ")}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
