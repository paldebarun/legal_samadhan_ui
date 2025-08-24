import type { Metadata } from "next";
import TeamDetail from "@/components/TeamDetail";

const siteUrl = process.env.SITE_URL || "https://legal-samadhan-ui-qy2u.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata>  {
  const {id} = await params;

  return {
    title: "Team Details | Legal Samadhan - Meet Our Experts",
    description:
      "Learn more about the dedicated professionals at Legal Samadhan. Explore detailed profiles of our legal experts, their expertise, and contributions to justice.",
    keywords:
      "Legal Samadhan, legal team, attorneys, lawyers, legal experts, law firm team, meet our team, professional legal services, justice experts",
    alternates: {
      canonical: `${siteUrl}/team/${id}`,
    },
    openGraph: {
      title: "Legal Samadhan Team - Trusted Legal Experts",
      description:
        "Meet the Legal Samadhan team. Discover the expertise, backgrounds, and roles of our professionals who are committed to delivering trusted legal services.",
      url: `${siteUrl}/team/${id}`,
      type: "profile",
      images: [
        {
          url: `${siteUrl}/site_logo.jpg`,
          width: 1200,
          height: 630,
          alt: "Legal Samadhan Team",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Legal Samadhan Team - Trusted Legal Experts",
      description:
        "Explore the profiles of Legal Samadhan's dedicated legal professionals and their expertise in justice and legal services.",
      images: [`${siteUrl}/site_logo.jpg`],
    },
  };
}

export default function TeamDetailPage() {
  return <TeamDetail />;
}
