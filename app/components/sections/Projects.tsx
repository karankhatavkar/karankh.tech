import { featuredProject, projects } from "@/app/data/projects";
import { Section } from "@/app/components/ui/Section";

// Reads the real architecture: one query fans out to two retrievers that are
// fused, grounded, and resolved into a cited answer. The flow itself is the
// pitch — hybrid retrieval in, verifiable answer out.
function RetrievalPipeline() {
  const node =
    "inline-flex items-center rounded border border-white/10 px-2 py-1.5 text-zinc-400";
  const arrow = "flex items-center text-zinc-600";

  return (
    <div className="mt-6 rounded-lg border border-white/10 bg-black/40 p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
        Retrieval pipeline
      </p>
      <div className="flex flex-wrap items-stretch gap-1.5 font-mono text-xs">
        <span className={node}>query</span>
        <span className={arrow} aria-hidden>
          →
        </span>
        {/* Two parallel retrievers in one stage = hybrid retrieval. */}
        <span className="inline-flex flex-col justify-center gap-1 rounded border border-white/10 px-2 py-1.5 text-zinc-300">
          <span>semantic · pgvector</span>
          <span>lexical · full-text</span>
        </span>
        <span className={arrow} aria-hidden>
          →
        </span>
        <span className={node}>RRF fusion</span>
        <span className={arrow} aria-hidden>
          →
        </span>
        <span className={node}>grounding</span>
        <span className={arrow} aria-hidden>
          →
        </span>
        <span className="inline-flex items-center rounded border border-white/25 bg-white/[0.04] px-2 py-1.5 font-medium text-zinc-100">
          cited answer
        </span>
      </div>
    </div>
  );
}

function FeaturedProjectCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
        {featuredProject.eyebrow}
      </p>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-50">
        {featuredProject.name}
      </h3>
      <p className="mt-1 text-zinc-400">{featuredProject.tagline}</p>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
        {featuredProject.summary}
      </p>

      <RetrievalPipeline />

      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {featuredProject.capabilities.map((capability) => (
          <div key={capability.label}>
            <dt className="text-sm font-medium text-zinc-200">
              {capability.label}
            </dt>
            <dd className="mt-0.5 text-sm leading-relaxed text-zinc-500">
              {capability.detail}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-7 font-mono text-xs uppercase tracking-wider text-zinc-500">
        {featuredProject.tech.join(" · ")}
      </p>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-6 text-sm">
        <a
          href={featuredProject.liveHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-2.5 font-medium text-black transition-colors hover:bg-white"
        >
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          Open demo
        </a>
        <a
          href={featuredProject.sourceHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 font-medium text-zinc-200 transition-colors hover:border-white/50"
        >
          Source
        </a>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <FeaturedProjectCard />

      <ul className="mt-4 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
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
