import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About Us | My Law Firm",
  description:
    "Learn more about our team, history, and mission to provide justice for all.",
  keywords: "law, about us, legal services, attorneys",
  openGraph: {
    title: "About Us | My Law Firm",
    description:
      "Learn more about our team, history, and mission to provide justice for all.",
    images: [
      {
        url: "/about-banner.jpg",
        width: 1200,
        height: 630,
        alt: "About Our Law Firm",
      },
    ],
    type: "website",
  },
};

export default function AboutPage() {
  return <About />;
}
