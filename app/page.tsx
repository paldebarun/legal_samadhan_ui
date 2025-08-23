// app/page.tsx
import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

const siteUrl = process.env.SITE_URL || "https://legalsamadhan.co.in";


const homeImages = [
  "/site_logo.jpg",
  "/home/_.jpeg",
  "/home/c211e859-c8a5-465b-b892-aeb8989199db.jpeg",
];

export const metadata: Metadata = {
  title: "Home | Legal Samadhan - Trusted Legal Experts",
  description:
    "Explore Legal Samadhan's expertise in justice, legal awareness, rights defense, and more. Stay updated with our latest publications, news, and events.",
  keywords:
    "Legal Samadhan, law firm, justice, legal awareness, rights defense, legal news, publications, events, expert attorneys, legal services",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: "Legal Samadhan - Upholding Justice for All",
    description:
      "We are committed to safeguarding justice, empowering through legal awareness, and defending rights for all.",
    type: "website",
    images: homeImages.map((path) => ({
      url: `${siteUrl}${path}`,
      width: 1200,
      height: 630,
      alt: "Legal Samadhan Home Image",
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Samadhan - Trusted Legal Experts",
    description:
      "Discover Legal Samadhan's commitment to justice and legal excellence. Learn about our publications, news, events, and expert legal services.",
    images: homeImages.map((path) => `${siteUrl}${path}`),
  },
};


export default function Home() {
  return <HomeClient />;
}
