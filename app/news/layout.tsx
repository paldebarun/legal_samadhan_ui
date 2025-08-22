import type { ReactNode } from "react";
import Head from "next/head";

export default function NewsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="/news/813f228a-caf0-4b7a-a4ad-42b2b371a1bf.jpeg"
        />
      </Head>
      <main>{children}</main>
    </>
  );
}
