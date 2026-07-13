import { Button } from "@/components/ui/button";
import { profile } from "@/app/data/profile";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[80vh] flex-col justify-center py-20"
    >
      <p className="mb-6 font-mono text-sm uppercase tracking-widest text-muted-foreground">
        {profile.role}
      </p>
      <h1 className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-2xl text-2xl leading-snug text-muted-foreground">
        {profile.tagline}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button size="lg" nativeButton={false} render={<a href="#contact" />}>
          Get in touch
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<a href={profile.resumeHref} />}
        >
          Résumé
        </Button>
      </div>
    </section>
  );
}
