import type { ReactNode } from "react";
import Head from "next/head";


const preloadImages = [
 "..image"
];

export default function CareersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        {preloadImages.map((src, idx) => (
          <link key={idx} rel="preload" as="image" href={src} />
        ))}
      </Head>
      <main>{children}</main>
    </>
  );
}