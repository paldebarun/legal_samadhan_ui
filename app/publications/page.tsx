import type { Metadata } from "next";
import Publication from "@/components/Publication";

const publicationImages = [
  "/site_logo.jpg",
  "/publications/35db0edc-6cea-4aa8-80b8-361e33d2e618.jpeg",
];

const siteUrl =
  process.env.SITE_URL || "https://legal-samadhan-ui-qy2u.vercel.app";

export const metadata: Metadata = {
  title: "Publications | Legal Samadhan - Expert Legal Insights",
  description:
    "Stay updated with Legal Samadhan's latest publications across corporate law, real estate, insolvency, government affairs, and more. Explore in-depth analyses and expert insights from our experienced legal team.",
  keywords:
    "Legal Samadhan, legal publications, corporate law insights, real estate law, insolvency analysis, government affairs, law firm articles, expert legal advice, legal insights, professional legal writing",
  alternates: {
    canonical: `${siteUrl}/publications`,
  },
  openGraph: {
    title: "Legal Samadhan Publications - Expert Legal Insights",
    description:
      "Discover in-depth publications from Legal Samadhan's legal experts across multiple practice areas, providing authoritative insights, analyses, and updates in corporate, commercial, real estate, and government law.",
    url: `${siteUrl}/publications`,
    type: "website",
    images: publicationImages.map((path) => ({
      url: `${siteUrl}${path}`,
      width: 1200,
      height: 630,
      alt: "Legal Samadhan Publication Image",
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Samadhan Publications - Expert Legal Insights",
    description:
      "Explore Legal Samadhan's publications across corporate law, real estate, insolvency, and government affairs. Gain valuable legal insights from our experts.",
    images: publicationImages.map((path) => `${siteUrl}${path}`),
  },
};

export default function PublicationPage() {
  return <Publication />;
}
