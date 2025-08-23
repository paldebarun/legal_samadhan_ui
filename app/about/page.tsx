import type { Metadata } from "next";
import About from "@/components/About";

const siteUrl = process.env.SITE_URL || "https://legal-samadhan-ui-qy2u.vercel.app";

export const metadata: Metadata = {
  title: "About Us | Legal Samadhan - Trusted Legal Experts",
  description:
    "Discover Legal Samadhan's story, mission, and team of expert lawyers providing comprehensive legal solutions across corporate, commercial, and real estate law.",
  keywords:
    "Legal Samadhan, law firm, about us, legal services, corporate law, real estate law, commercial law, expert attorneys, legal team, legal expertise",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Legal Samadhan - Trusted Legal Experts",
    description:
      "Learn about Legal Samadhan, our mission, values, and team of expert attorneys delivering innovative and strategic legal solutions.",
    url: `${siteUrl}/about`,
    type: "website",
    images: [
      "/site_logo.jpg",
      "/about/when heroes fall by giana darling.jpeg",
      "/about/f379a178-10db-4d41-9055-05cef71089f4.jpeg",
      "/about/d4e108a8-ded6-4f94-85a1-6274f81b4c18.jpeg",
      "/about/Trust, transparency & modern contract….jpeg",
      "/about/Illigal Law.jpeg",
      "/about/ATTAR-SINGH-copy-768x964.jpg",
      "/about/VINOD-GAHLOT-e1550170635108-768x966.jpg",
      "/mission.jpg",
      "/about/Law, Order and Justice.jpeg",
    ].map((path) => ({
      url: `${siteUrl}${path}`, 
      width: 1200,
      height: 630,
      alt: "Legal Samadhan About Image",
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "About Legal Samadhan - Trusted Legal Experts",
    description:
      "Meet the team at Legal Samadhan, understand our mission, and explore our commitment to delivering expert legal solutions.",
    images: [
      `${siteUrl}/site_logo.jpg`,
      `${siteUrl}/about/when heroes fall by giana darling.jpeg`,
      `${siteUrl}/about/f379a178-10db-4d41-9055-05cef71089f4.jpeg`,
      `${siteUrl}/about/ATTAR-SINGH-copy-768x964.jpg`,
    ],
  },
};

export default function AboutPage() {
  return <About />;
}
