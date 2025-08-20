
import type { ReactNode } from "react";
import Head from "next/head";


const preloadImages = [
  "/about_Us.jpg",
  "/mission.jpg",
  "/about-banner.jpg",
  "/practice-areas.jpg",
  "https://aquilaw.com/front/assets/img/about-banner.jpg",
  "https://aquilaw.com/front/assets/img/practice-areas.jpg",
];

export default function AboutLayout({ children }: { children: ReactNode }) {
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
