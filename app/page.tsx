// app/page.tsx
import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Home - Law Firm | Justice & Legal Awareness",
  description:
    "Explore our law firm's expertise in justice, legal awareness, rights defense, and more. Stay updated with the latest publications, news, and events.",
  keywords:
    "law firm, justice, legal awareness, rights defense, legal news, publications",
  openGraph: {
    title: "Law Firm - Upholding Justice for All",
    description:
      "We are committed to safeguarding justice, empowering through legal awareness, and defending rights for all.",
    type: "website",
  },
};

export default function Home() {
  return <HomeClient />;
}
