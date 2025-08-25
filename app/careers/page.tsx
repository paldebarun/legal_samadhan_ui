import type { Metadata } from "next";
import CareerComponent from "@/components/Careers";

const careerImages = [
  "/site_logo.jpg",
  "/careers/832a2286-53fc-4af3-8471-5ff18f1b76af.jpeg",
];

const siteUrl = process.env.SITE_URL || "https://legal-samadhan-ui-qy2u.vercel.app";

export const metadata: Metadata = {
  title: "Careers | Legal Samadhan - Join Our Team",
  description:"Explore exciting career opportunities at Legal Samadhan. Join our team of legal and management professionals, or apply for internships. Build your future with us.",
  keywords:"Legal Samadhan Careers, Legal Jobs, Management Jobs, Law Firm Careers, Internships, Legal Professionals, Management Professionals, Work with Legal Samadhan",
  alternates: {
    canonical: `${siteUrl}/careers`,
  },
  icons: {
    icon: "/site_logo.jpg",        
    shortcut: "/site_logo.jpg",       
    apple: "/site_logo.jpg",          
  },
  openGraph: {
    title: "Careers at Legal Samadhan - Join Our Team",
    description:"Discover career opportunities at Legal Samadhan. Apply for roles in legal, management, or internship categories and grow with us.",
    url: `${siteUrl}/careers`,
    type: "website",
    images: careerImages.map((path) => ({
      url: `${siteUrl}${path}`,
      width: 1200,
      height: 630,
      alt: "Legal Samadhan Careers",
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Legal Samadhan - Join Our Team",
    description:"Explore jobs and internships at Legal Samadhan. Work with legal experts and management professionals in a leading law firm.",
    images: careerImages.map((path) => `${siteUrl}${path}`),
  },
};

export default function CareerPage() {
  return <CareerComponent />;
}
