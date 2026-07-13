import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import { site } from "@/app/data/site";
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
    "freelance machine learning engineer",
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
    creator: "@KhatavkarKaran",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
