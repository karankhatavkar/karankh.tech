import { Hero } from "@/app/components/sections/Hero";
import { About } from "@/app/components/sections/About";
import { Skills } from "@/app/components/sections/Skills";
import { Projects } from "@/app/components/sections/Projects";
import { Experience } from "@/app/components/sections/Experience";
import { Education } from "@/app/components/sections/Education";
import { Certifications } from "@/app/components/sections/Certifications";
import { Contact } from "@/app/components/sections/Contact";
import { profile } from "@/app/data/profile";
import { structuredData } from "@/app/data/structured-data";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escape "<" so page content can never break out of the script tag.
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
      <footer className="border-t border-white/10 py-10 font-mono text-xs text-zinc-600">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </main>
  );
}
