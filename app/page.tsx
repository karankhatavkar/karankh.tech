import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { MoreProjects, Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Slide } from "@/components/sections/slide";
import { SlideRail } from "@/components/slide-rail";
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
      <SlideRail />
      {/* On a laptop each Slide claims a screen and the page scrolls as a deck;
          on a phone they collapse back to the ordinary continuous page. Every
          slide but the hero carries the shared frame inset, so section labels
          still start exactly under "Hey, I'm" and the inset clears the rail.
          Order here must match `app/data/slides.ts`, which drives the rail. */}
      <Slide id="hero" bleed>
        <Hero />
      </Slide>
      <Slide id="about">
        <About />
      </Slide>
      <Slide id="skills">
        <Skills />
      </Slide>
      <Slide id="projects">
        <Projects />
      </Slide>
      <Slide id="more-projects">
        <MoreProjects />
      </Slide>
      <Slide id="experience">
        <Experience />
      </Slide>
      {/* One credentials screen — see the note in `app/data/slides.ts`. On the
          continuous page these stay two ordinary sections. */}
      <Slide id="education" className="slides:gap-16">
        <Education />
        <Certifications />
      </Slide>
      {/* The footer rides on the closing slide rather than taking a screen of
          its own — two lines of small print do not make a slide. */}
      <Slide id="contact">
        <Contact />
        <footer className="mt-16 flex flex-wrap justify-between gap-2 border-t py-10 font-mono text-xs text-muted-foreground slides:mt-0">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{profile.location}</span>
        </footer>
      </Slide>
    </main>
  );
}
