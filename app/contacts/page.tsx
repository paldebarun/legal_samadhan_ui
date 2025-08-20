import type { Metadata } from "next";
import ContactComponent from "@/components/Contact";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Contact Us | Law Firm",
  description:
    "Get in touch with our legal experts. Ask queries about corporate law, real estate, insolvency, or any legal advice.",
  keywords:
    "Contact, Legal Queries, Lawyers, Corporate Law, Real Estate Law, Legal Advice",
  openGraph: {
    title: "Contact Us - Law Firm",
    description:
      "Reach out to our experienced legal team for any queries or consultations.",
    images: [
      {
        url: "/cards.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact Our Lawyers",
      },
    ],
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactComponent />;
}
