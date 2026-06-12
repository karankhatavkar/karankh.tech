import { profile } from "@/app/data/profile";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[80vh] flex-col justify-center py-20"
    >
      <p className="mb-6 font-mono text-sm uppercase tracking-widest text-zinc-500">
        {profile.role}
      </p>
      <h1 className="text-5xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-2xl text-2xl leading-snug text-zinc-300">
        {profile.tagline}
      </p>
      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <a
          href="#contact"
          className="rounded-full bg-zinc-50 px-6 py-3 font-medium text-black transition-colors hover:bg-zinc-300"
        >
          Get in touch
        </a>
        <a
          href={profile.resumeHref}
          className="rounded-full border border-white/20 px-6 py-3 font-medium text-zinc-200 transition-colors hover:border-white/50"
        >
          Résumé
        </a>
      </div>
    </section>
  );
}
