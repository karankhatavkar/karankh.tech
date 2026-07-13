import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { profile } from "@/app/data/profile";
import { structuredData } from "@/app/data/structured-data";

export default function Home() {
  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escape "<" so page content can never break out of the script tag.
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <div className="mx-auto w-full max-w-3xl px-6">
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
        <footer className="border-t py-10 font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </main>
  );
}
