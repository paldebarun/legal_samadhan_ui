import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./provider";
import Disclaimer from "@/components/Disclaimer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const preloaded_images = [
  "/site_logo.jpg",
  "/home/_.jpeg",
  "/home/c211e859-c8a5-465b-b892-aeb8989199db.jpeg",
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {preloaded_images.map((src, idx) => (
          <link key={idx} rel="preload" as="image" href={src} />
        ))}
        <link rel="icon" href="/site_logo.jpg" />
      </head>

      <body className="antialiased">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <Providers>{children}</Providers>
        <Footer />
        <Disclaimer/>
        
      </body>
    </html>
  );
}
