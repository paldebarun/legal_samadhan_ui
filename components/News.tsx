"use client";

import React, { useState } from "react";
import Link from "next/link";

const dummyNews = [
  {
    category: "News",
    date: "2025-02-01",
    title: "New Legal Updates Released",
    description: "Government releases new legal updates impacting corporate law.",
    link: "/news/legal-updates-2025",
  },
  {
    category: "Event",
    date: "2024-12-15",
    title: "Annual Legal Seminar",
    description: "Join industry experts discussing emerging trends in law.",
    link: "/events/annual-legal-seminar-2024",
  },
  {
    category: "News",
    date: "2024-10-20",
    title: "Court Ruling on Property Law",
    description: "A landmark judgment has been delivered regarding property disputes.",
    link: "/news/court-ruling-property-law-2024",
  },
  {
    category: "Event",
    date: "2025-03-05",
    title: "Webinar on Real Estate Law",
    description: "An online session covering the latest real estate regulations.",
    link: "/events/webinar-real-estate-law-2025",
  },
  {
    category: "News",
    date: "2023-08-12",
    title: "New Insolvency Guidelines",
    description: "Updates to insolvency regulations for corporates and SMEs.",
    link: "/news/insolvency-guidelines-2023",
  },
];

const News: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dummyNews.length / itemsPerPage);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="hero-section relative w-full flex items-center justify-center h-[300px] md:h-[400px] lg:h-[500px]"
        style={{
          backgroundImage: "url('/news/813f228a-caf0-4b7a-a4ad-42b2b371a1bf.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <p className="relative text-white text-center text-3xl md:text-6xl leading-normal font-bold w-7/12">
          Stay Updated with Our Latest News & Events
        </p>
      </section>

      {/* Heading */}
      <div className="w-full flex flex-col sm:flex-row gap-1 py-6 px-6">
        <span className="text-4xl md:text-6xl lg:text-8xl font-bold">News</span>
        <p className="text-4xl md:text-6xl lg:text-8xl font-bold text-purple-950">& Events</p>
      </div>

      {/* News/Event Listing */}
      <section className="news-listing px-6 py-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="bg-white h-[300px] min-h-[300px] max-h-[300px] rounded-xl shadow-lg p-6 flex flex-col justify-between border-purple-900 hover:cursor-pointer border-2 hover:shadow-xl transition"
          >
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full w-fit ${
                item.category === "News"
                  ? "bg-purple-900 text-white"
                  : "bg-white border-2 border-purple-900 text-purple-900"
              }`}
            >
              {item.category}
            </span>
            <p className="text-gray-700 text-sm line-clamp-3">{item.description}</p>
            <span className="text-xs text-gray-500">
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(item.date))}
            </span>
          </Link>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 py-10">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-4 py-2 rounded ${
              currentPage === num ? "bg-purple-950 text-white" : "border"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default News;
