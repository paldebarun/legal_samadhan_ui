// app/team/layout.tsx
import type { ReactNode } from "react";
import Head from "next/head";

export default function TeamLayout({ children }: { children: ReactNode }) {
  const teamImages = [
    "/team/ead3f1b8-e56b-48c8-903e-ca36c969a7c9.jpeg"
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
