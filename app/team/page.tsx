// /app/team/page.tsx

import type { Metadata } from "next";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "Our Lawyers | Expert Legal Team - Law Firm",
  description:
    "Meet our experienced legal team specializing in corporate law, real estate, insolvency, and government affairs. Trusted advisors for your legal needs.",
  keywords:
    "Lawyers, Legal Team, Corporate Law, Real Estate Law, Insolvency, Government Affairs",
  openGraph: {
    title: "Our Lawyers - Law Firm",
    description:
      "Meet our expert team of lawyers providing professional legal services across multiple domains.",
    images: [
      {
        url: "/team/ead3f1b8-e56b-48c8-903e-ca36c969a7c9.jpeg",
        width: 1200,
        height: 630,
        alt: "Law Firm Expert Legal Team",
      },
    ],
    type: "website",
  },
};

export default function TeamPage() {
  return <Team />;
}
