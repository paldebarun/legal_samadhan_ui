
import type { ReactNode } from "react";



const preloadImages = [
  // Hero Section
  "/about/when heroes fall by giana darling.jpeg",

  // Swiper Images
  "/about/f379a178-10db-4d41-9055-05cef71089f4.jpeg",
  "/about/d4e108a8-ded6-4f94-85a1-6274f81b4c18.jpeg",
  "/about/Trust, transparency & modern contract….jpeg",
  "/about/Illigal Law.jpeg",

  // Founder Images
  "/about/ATTAR-SINGH-copy-768x964.jpg",
  "/about/VINOD-GAHLOT-e1550170635108-768x966.jpg",

  // Mission
  "/mission.jpg",

  // Practice Areas Section
  "/about/Law, Order and Justice.jpeg",
];

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <head>
        {preloadImages.map((src, idx) => (
          <link key={idx} rel="preload" as="image" href={src} />
        ))}
      </head>
      <main>{children}</main>
    </>
  );
}
