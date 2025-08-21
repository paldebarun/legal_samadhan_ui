import type { Metadata } from "next";
import News from "@/components/News";

const NewsImages = [
  "/news/813f228a-caf0-4b7a-a4ad-42b2b371a1bf.jpeg",

];

export const metadata: Metadata = {
    title: "News & Events | Legal Samadhan - Latest Updates",
    description:
      "Stay updated with Legal Samadhan's latest news and events in the legal world, including industry developments, seminars, webinars, and legal updates from corporate, real estate, insolvency, and government sectors.",
    keywords:
      "Legal Samadhan, legal news, events, legal updates, corporate law news, real estate law events, insolvency updates, government affairs news, law seminars, webinars",
    openGraph: {
      title: "Legal Samadhan News & Events - Latest Legal Updates",
      description:
        "Discover the latest news and events from Legal Samadhan. Stay informed on seminars, webinars, and updates from the legal industry across corporate, real estate, insolvency, and government sectors.",
      images: NewsImages.map((url) => ({
        url,
        width: 1200,
        height: 630,
        alt: "Legal Samadhan News & Events Image",
      })),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Legal Samadhan News & Events - Stay Informed",
      description:
        "Explore Legal Samadhan's news and events to stay up-to-date on the latest legal developments, seminars, and webinars across corporate, real estate, insolvency, and government law.",
      images: NewsImages,
    },
  };

export default function NewsPage() {
  return <News />;
}
