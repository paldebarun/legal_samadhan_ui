import type { ReactNode } from "react";


const preloadImages = [
  "/nehru.jpeg",
  "/vr_krishna_iyer.jpeg",
  "/br_ambedkar_image.jpeg",
];

export default function ContactLayout({ children }: { children: ReactNode }) {
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
