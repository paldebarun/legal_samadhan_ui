import type { Metadata } from "next";
import ContactComponent from "@/components/Contact";

const contactImages = [
  "/br_ambedkar_image.jpeg",
  "/nehru.jpeg",
  "/vr_krishna_iyer.jpeg",
];

export const metadata: Metadata = {
  title: "Contact Us | Legal Samadhan - Expert Legal Advice",
  description:
    "Get in touch with Legal Samadhan's expert legal team. Ask queries or seek advice on corporate law, real estate, insolvency, or any legal matters. Our lawyers are here to guide you with clarity and precision.",
  keywords:
    "Legal Samadhan, Contact, Legal Queries, Lawyers, Corporate Law, Real Estate Law, Insolvency Advice, Legal Consultation, Legal Support, Law Firm",
  openGraph: {
    title: "Contact Legal Samadhan - Expert Legal Team",
    description:
      "Reach out to Legal Samadhan's experienced legal team for consultations, advice, or legal queries across corporate, real estate, insolvency, and other practice areas.",
    images: contactImages.map((url) => ({
      url,
      width: 1200,
      height: 630,
      alt: "Legal Samadhan Contact Image",
    })),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Legal Samadhan - Expert Legal Advice",
    description:
      "Connect with Legal Samadhan's legal experts for queries or advice on corporate law, real estate, insolvency, and other legal matters.",
    images: contactImages,
  },
};

export default function ContactPage() {
  return <ContactComponent />;
}
