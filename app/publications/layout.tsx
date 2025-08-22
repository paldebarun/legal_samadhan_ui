import type { ReactNode } from "react";
import Head from "next/head";

export default function PublicationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="/publications/35db0edc-6cea-4aa8-80b8-361e33d2e618.jpeg"
        />
      </Head>
      <main>{children}</main>
    </>
  );
}
