import type { ReactNode } from "react";
import Head from "next/head";

export default function PracticeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/practice-banner.jpg" />
      </Head>
      <main>{children}</main>
    </>
  );
}
