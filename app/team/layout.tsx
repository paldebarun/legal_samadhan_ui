// app/team/layout.tsx
import type { ReactNode } from "react";
import Head from "next/head";

export default function TeamLayout({ children }: { children: ReactNode }) {
  const teamImages = [
    "/images/team1.jpg",
    "/images/team2.jpg",
    "/images/team3.jpg",
  ];

  return (
    <>
      <Head>
        {teamImages.map((img, i) => (
          <link key={i} rel="preload" as="image" href={img} />
        ))}
      </Head>
      <main>{children}</main>
    </>
  );
}
