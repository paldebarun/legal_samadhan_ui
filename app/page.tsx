import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

const siteUrl = process.env.SITE_URL || "https://legalsamadhan.co.in";

const homeImages = [
  "/site_logo.jpg",
  "/home/_.jpeg",
  "/home/c211e859-c8a5-465b-b892-aeb8989199db.jpeg",
];

export const metadata: Metadata = {
  title: "Legal Samadhan | Trusted Law Firm & Expert Legal Services",
  description:
    "Legal Samadhan delivers trusted legal expertise across corporate, commercial, real estate, and dispute resolution domains. Stay updated with our latest publications, news, and events.",
  keywords:
    "Legal Samadhan, law firm, legal experts, corporate law, commercial law, real estate law, dispute resolution, legal services, publications, news, events",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  icons: {
    icon: "/site_logo.jpg",
    shortcut: "/site_logo.jpg",
    apple: "/site_logo.jpg",
  },
  openGraph: {
    title: "Legal Samadhan | Trusted Law Firm & Expert Legal Services",
    description:
      "We provide expert legal solutions across corporate, commercial, real estate, and dispute resolution sectors. Explore our publications, news, and events.",
    type: "website",
    url: siteUrl,
    images: homeImages.map((path) => ({
      url: `${siteUrl}${path}`,
      width: 1200,
      height: 630,
      alt: "Legal Samadhan Home Banner",
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Samadhan | Trusted Law Firm & Expert Legal Services",
    description:
      "Expert legal services in corporate, commercial, real estate, and dispute resolution. Discover publications, news, and updates from Legal Samadhan.",
    images: homeImages.map((path) => `${siteUrl}${path}`),
    
  },
};



export default function Home() {
  return <HomeClient />;
}
