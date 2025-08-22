// app/team/layout.tsx
import type { ReactNode } from "react";


export default function TeamLayout({ children }: { children: ReactNode }) {
  const teamImages = [
    "/images/team1.jpg",
    "/images/team2.jpg",
    "/images/team3.jpg",
  ];

  return (
    <>
      <head>
        {teamImages.map((img, i) => (
          <link key={i} rel="preload" as="image" href={img} />
        ))}
      </head>
      <main>{children}</main>
    </>
  );
}
