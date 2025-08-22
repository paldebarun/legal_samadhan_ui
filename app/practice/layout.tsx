import type { ReactNode } from "react";


export default function PracticeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <head>
        <link rel="preload" as="image" href="/practice-banner.jpg" />
      </head>
      <main>{children}</main>
    </>
  );
}
