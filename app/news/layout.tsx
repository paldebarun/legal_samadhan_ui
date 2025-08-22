import type { ReactNode } from "react";


export default function NewsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <head>
        <link rel="preload" as="image" href="/news/813f228a-caf0-4b7a-a4ad-42b2b371a1bf.jpeg" />
      </head>
      <main>{children}</main>
    </>
  );
}
