import { featuredProject, projects } from "@/app/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/sections/section";

// Reads the real architecture: one query fans out to two retrievers that are
// fused, grounded, and resolved into a cited answer. The flow itself is the
// pitch — hybrid retrieval in, verifiable answer out.
function RetrievalPipeline() {
  const arrow = "flex items-center text-muted-foreground/60";

  return (
    <div className="mt-6 rounded-lg border bg-muted/50 p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Retrieval pipeline
      </p>
      <div className="flex flex-wrap items-stretch gap-1.5 font-mono text-xs">
        <Badge variant="outline" className="font-mono">
          query
        </Badge>
        <span className={arrow} aria-hidden>
          →
        </span>
        {/* Two parallel retrievers in one stage = hybrid retrieval. */}
        <span className="inline-flex flex-col justify-center gap-1 rounded-md border bg-background px-2.5 py-1.5">
          <span>semantic · pgvector</span>
          <span>lexical · full-text</span>
        </span>
        <span className={arrow} aria-hidden>
          →
        </span>
        <Badge variant="outline" className="font-mono">
          RRF fusion
        </Badge>
        <span className={arrow} aria-hidden>
          →
        </span>
        <Badge variant="outline" className="font-mono">
          grounding
        </Badge>
        <span className={arrow} aria-hidden>
          →
        </span>
        <Badge className="font-mono">cited answer</Badge>
      </div>
    </div>
  );
}

function FeaturedProjectCard() {
  return (
    <Card className="sm:[--card-spacing:--spacing(8)]">
      <CardHeader>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {featuredProject.eyebrow}
        </p>
        <CardTitle className="mt-4 text-2xl font-semibold tracking-tight">
          {featuredProject.name}
        </CardTitle>
        <CardDescription>{featuredProject.tagline}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {featuredProject.summary}
        </p>

        <RetrievalPipeline />

        <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {featuredProject.capabilities.map((capability) => (
            <div key={capability.label}>
              <dt className="text-sm font-medium">{capability.label}</dt>
              <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                {capability.detail}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-7 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {featuredProject.tech.join(" · ")}
        </p>
      </CardContent>
      <CardFooter className="gap-3 border-t">
        <Button
          nativeButton={false}
          render={
            <a
              href={featuredProject.liveHref}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          Open demo
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={
            <a
              href={featuredProject.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          Source
        </Button>
      </CardFooter>
    </Card>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <FeaturedProjectCard />

      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.name}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card size="sm" className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {project.tech.join(" · ")}
                  </p>
                </CardContent>
              </Card>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
