import type { Metadata } from "next";
import PracticeComponent from "@/components/Practice";


export const metadata: Metadata = {
  title: "Practice Areas | Expert Legal Services",
  description:
    "Explore our core practice areas, including civil litigation, real estate, corporate law, public policy, insolvency, and more. Our team delivers expert legal solutions tailored to your needs.",
  keywords:
    "law firm practice areas, civil litigation, corporate law, real estate legal services, insolvency, public policy, legal expertise",
  openGraph: {
    title: "Our Practice Areas - Law Firm",
    description:
      "Discover our extensive legal expertise across corporate, real estate, insolvency, and public policy domains.",
    images: [
      {
        url: "https://aquilaw.com/front/assets/img/practice-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Law Firm Practice Areas",
      },
    ],
    type: "website",
  },
};

export default function PracticePage() {
  return <PracticeComponent />;
}
