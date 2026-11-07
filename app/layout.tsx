import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/app/data/site";
import { EventTracking } from "@/components/analytics/event-tracking";

// Inlined at build time, so this must be set in Vercel's env vars before the
// build that should start reporting — not just at runtime.
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  category: "technology",
  keywords: [
    "Karan Khatavkar",
    "AI engineer",
    "ML engineer",
    "LLM developer",
    "RAG",
    "LangChain",
    "NLP",
    "deep learning",
    "AI research engineer",
  ],
  openGraph: {
    type: "profile",
    firstName: "Karan",
    lastName: "Khatavkar",
    username: "karankhatavkar",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.socialDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: site.twitterHandle,
    title: site.title,
    description: site.socialDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        {/* Page views — the only thing Vercel Web Analytics collects on the
            Hobby plan. Custom events (see `lib/analytics.ts`) need Pro, so
            Umami below carries those. */}
        <Analytics />
        {/* Umami: cookieless, so no consent banner is required. Rendered only
            when a website ID is configured, which keeps local development and
            preview deploys out of the production numbers. */}
        {umamiWebsiteId && (
          <Script
            src={
              process.env.NEXT_PUBLIC_UMAMI_SRC ??
              "https://cloud.umami.is/script.js"
            }
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
        <EventTracking />
      </body>
    </html>
  );
}
