import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My App | LawProj",
  description: "A Next.js SEO-friendly app migrated from Vite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
        <link
          rel="preload"
          as="image"
          href="/home/_.jpeg"
        />
        <link
          rel="preload"
          as="image"
          href="/home/c211e859-c8a5-465b-b892-aeb8989199db.jpeg"
        />


        <link
          rel="preload"
          as="image"
          href="/cards.jpeg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
