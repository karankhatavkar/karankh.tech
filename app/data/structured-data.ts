import { certifications } from "./certifications";
import { education } from "./education";
import { profile } from "./profile";
import { site } from "./site";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

// Profiles beyond the visible Contact links (which stay email/LinkedIn/GitHub
// per PROJECT.md) — each corroborates the Person entity for search/AI engines.
const extraProfiles = [
  "https://huggingface.co/karankhatavkar",
  "https://www.kaggle.com/devkarankh",
  "https://orcid.org/0009-0008-0175-5970",
  "https://www.upwork.com/freelancers/karankh",
  "https://x.com/KhatavkarKaran",
  "https://www.youtube.com/@dev_brew",
  "https://www.instagram.com/dev_brew/",
];

// ProfilePage + Person graph per Google's profile-page structured data
// guidelines. `sameAs` ties the site to LinkedIn/GitHub so search and AI
// engines reconcile them as one entity.
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: "karankhatavkar",
      url: site.url,
      jobTitle: "AI/ML Engineer",
      description: profile.bio,
      email: profile.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressCountry: "IN",
      },
      sameAs: [
        ...profile.socials.map((social) => social.href),
        ...extraProfiles,
      ],
      knowsAbout: [
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "LangChain",
        "Natural Language Processing",
        "Deep Learning",
        "PyTorch",
        "TensorFlow",
        "Transformers",
        "Machine Learning",
        "Signal Processing",
      ],
      alumniOf: education.map((entry) => ({
        "@type": "CollegeOrUniversity",
        name: entry.institution,
      })),
      hasCredential: certifications.map((cert) => ({
        "@type": "EducationalOccupationalCredential",
        name: `Microsoft Certified: ${cert.name} (${cert.code})`,
        recognizedBy: { "@type": "Organization", name: "Microsoft" },
      })),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": personId },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profilepage`,
      url: site.url,
      name: site.title,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      dateModified: new Date().toISOString(),
      inLanguage: "en",
    },
  ],
} as const;
