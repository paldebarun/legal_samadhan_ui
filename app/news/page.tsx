import type { Metadata } from "next";
import News from "@/components/News";


const NewsImages = [
  "/site_logo.jpg",
  "/news/813f228a-caf0-4b7a-a4ad-42b2b371a1bf.jpeg",
];

const siteUrl = process.env.SITE_URL || "https://legal-samadhan-ui-qy2u.vercel.app";

export const metadata: Metadata = {
  title: "News & Events | Legal Samadhan - Latest Updates",
  description:"Stay updated with Legal Samadhan's latest news and events in the legal world, including industry developments, seminars, webinars, and legal updates from corporate, real estate, insolvency, and government sectors.",
  keywords:"Legal Samadhan, legal news, events, legal updates, corporate law news, real estate law events, insolvency updates, government affairs news, law seminars, webinars",
  alternates: {
    canonical: `${siteUrl}/news`,
  },
  icons: {
    icon: "/site_logo.jpg",        
    shortcut: "/site_logo.jpg",   
    apple: "/site_logo.jpg",          
  },
  openGraph: {
    title: "Legal Samadhan News & Events - Latest Legal Updates",
    description:"Discover the latest news and events from Legal Samadhan. Stay informed on seminars, webinars, and updates from the legal industry across corporate, real estate, insolvency, and government sectors.",
    url: `${siteUrl}/news`,
    type: "website",
    images: NewsImages.map((path) => ({
      url: `${siteUrl}${path}`,
      width: 1200,
      height: 630,
      alt: "Legal Samadhan News & Events Image",
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Samadhan News & Events - Stay Informed",
    description:"Explore Legal Samadhan's news and events to stay up-to-date on the latest legal developments, seminars, and webinars across corporate, real estate, insolvency, and government law.",
    images: NewsImages.map((path) => `${siteUrl}${path}`),
  },
};

export default function NewsPage() {
  return <News />;
}
