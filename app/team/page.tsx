import type { Metadata } from "next";
import Team from "@/components/Team";

const siteUrl = process.env.SITE_URL || "https://legalsamadhan.co.in";

export const metadata: Metadata = {
  title: "Our Lawyers | Expert Legal Team - Legal Samadhan",
  description:
    "Meet our experienced legal team specializing in corporate law, real estate, insolvency, and government affairs. Trusted advisors for your legal needs.",
  keywords:
    "Lawyers, Legal Team, Corporate Law, Real Estate Law, Insolvency, Government Affairs",
  alternates: {
      canonical: `${siteUrl}/team`,
    },
  openGraph: {
    title: "Our Lawyers - Legal Samadhan",
    description:
      "Meet our expert team of lawyers providing professional legal services across multiple domains.",
    images: [
      {
        url: `${siteUrl}/team/ead3f1b8-e56b-48c8-903e-ca36c969a7c9.jpeg`,
        width: 1200,
        height: 630,
        alt: "Legal Samadhan Expert Legal Team",
      },
    ],
    type: "website",
    url: `${siteUrl}/team`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Lawyers - Legal Samadhan",
    description:
      "Meet our expert team of lawyers providing professional legal services across multiple domains.",
    images: [`${siteUrl}/team/ead3f1b8-e56b-48c8-903e-ca36c969a7c9.jpeg`],
    
  },
};

export default function TeamPage() {
  return <Team />;
}
