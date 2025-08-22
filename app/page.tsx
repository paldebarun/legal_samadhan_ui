// app/page.tsx
import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Home | Legal Samadhan - Trusted Legal Experts",
  description:
    "Explore Legal Samadhan's expertise in justice, legal awareness, rights defense, and more. Stay updated with our latest publications, news, and events.",
  keywords:
    "Legal Samadhan, law firm, justice, legal awareness, rights defense, legal news, publications, events, expert attorneys, legal services",
  openGraph: {
    title: "Legal Samadhan - Upholding Justice for All",
    description:
      "We are committed to safeguarding justice, empowering through legal awareness, and defending rights for all.",
    type: "website",
    images: [
      "/site_logo.jpg",
      "/home/_.jpeg",
      "/home/c211e859-c8a5-465b-b892-aeb8989199db.jpeg"
    ].map((url) => ({
      url,
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
    images: [
      "/site_logo.jpg",
      "/home/_.jpeg",
      "/home/c211e859-c8a5-465b-b892-aeb8989199db.jpeg"
    ],
  },
};

export default function Home() {
  return <HomeClient />;
}
