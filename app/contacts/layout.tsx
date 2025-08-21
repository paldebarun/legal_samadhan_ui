import type { ReactNode } from "react";
import Head from "next/head";

const preloadImages = [
  "/nehru.jpeg",
  "/vr_krishna_iyer.jpeg",
  "/br_ambedkar_image.jpeg",
];

export default function ContactLayout({ children }: { children: ReactNode }) {
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
