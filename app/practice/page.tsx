import type { Metadata } from "next";
import PracticeComponent from "@/components/Practice";

const practiceImages = [
  "/practice/43c2ff63-d807-4338-b54c-6923ae9ac384.jpeg",
 
];

export const metadata: Metadata = {
  title: "Practice Areas | Legal Samadhan - Expert Legal Services",
  description:
    "Explore Legal Samadhan's core practice areas including criminal matters, family law, real estate, contract management, commercial disputes, MSME law, NIA cases, property disputes, and more. Our expert legal team delivers tailored solutions with integrity and insight.",
  keywords:
    "Legal Samadhan, law firm, practice areas, criminal law, family law, real estate law, contract management, commercial disputes, MSME law, NIA, property disputes, expert attorneys, legal services",
  openGraph: {
    title: "Legal Samadhan - Core Practice Areas",
    description:
      "Discover the comprehensive legal expertise of Legal Samadhan across multiple domains including corporate law, commercial disputes, real estate, insolvency, and more.",
    images: practiceImages.map((url) => ({
      url,
      width: 1200,
      height: 630,
      alt: "Legal Samadhan Practice Area Image",
    })),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Samadhan - Core Practice Areas",
    description:
      "Explore Legal Samadhan's extensive legal services and practice areas. Our team provides professional, tailored solutions for corporate, commercial, and property law matters.",
    images: practiceImages,
  },
};

export default function PracticePage() {
  return <PracticeComponent />;
}
