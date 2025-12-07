import type { Metadata } from "next";
import axios from "axios";
import { publications_Url } from "@/utils/config";

// This ensures the route is dynamic
export const dynamic = "force-dynamic";

const siteUrl =
  process.env.SITE_URL || "https://legal-samadhan-ui-qy2u.vercel.app";
  const bannerImage = "/publications/Lady_Justice.jpeg";

export async function generateMetadata(
  { params }: { params: { pub_id: string } }
): Promise<Metadata> {
    const { pub_id } = await params;


  // Default fallback metadata if fetch fails
  let publication = {
    title: "Publication",
    description:
      "Read detailed insights from Legal Samadhan's expert legal publications.",
    practice_area: { name: "" },
    published_on: "",
    authors: [],
    image: "/publications/Lady_Justice.jpeg",
  };

  // Fetch publication details (safe fetch → won't crash page)
  try {
    const { data } = await axios.get(`${publications_Url}/${pub_id}`);
    if (data?.publication) {
      publication = {
        ...publication,
        ...data.publication,
      };
    }
  } catch (error) {
    console.error("Metadata fetch failed for publication:", error);
  }

  const ogImage = `${siteUrl}/publications/Lady_Justice.jpeg`;

  return {
    title: `${publication.title} | Legal Samadhan`,
    
    description: publication.description?.slice(0, 160),
    keywords: [
      publication.practice_area?.name,
      "Legal Samadhan publication",
      "legal insights",
      "law articles",
      "legal expertise",
      "corporate law",
      "real estate law",
    ],

    alternates: {
      canonical: `${siteUrl}/publications/${pub_id}`,
    },

    openGraph: {
      title: publication.title,
      description: publication.description?.slice(0, 200),
      url: `${siteUrl}/publications/${pub_id}`,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: publication.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: publication.title,
      description: publication.description?.slice(0, 200),
      images: [ogImage],
    },
    
  };
}

export default function PublicationDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  
  {children}</>;
}
