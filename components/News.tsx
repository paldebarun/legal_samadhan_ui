"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {news_and_events_Url} from '../utils/config'

interface NewsEvent {
  _id: string;
  title: string;
  category: string;
  date: string;
  linkedin_url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const News: React.FC = () => {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // loader state
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        setLoading(true);
        console.log("this is the api url : ",news_and_events_Url)
        const res = await axios.get(news_and_events_Url);
        setNewsEvents(res.data);
      } catch (err) {
        console.error("Error fetching news & events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsEvents();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newsEvents.length / itemsPerPage);

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

      {/* Loader */}
      {loading ? (
        <div className="col-span-full flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
      </div>
      ) : (
        <>
          {/* News/Event Listing */}
          <section className="news-listing px-6 py-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((item) => (
              <Link
                key={item._id}
                href={item.linkedin_url}
                target="_blank"
                className="bg-white h-[300px] min-h-[300px] max-h-[300px] rounded-xl shadow-lg p-6 flex flex-col justify-between border-purple-900 hover:cursor-pointer border-2 hover:shadow-xl transition"
              >
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full w-fit ${
                    item.category.toLowerCase() === "news"
                      ? "bg-purple-900 text-white"
                      : "bg-white border-2 border-purple-900 text-purple-900"
                  }`}
                >
                  {item.category}
                </span>
                <p className="text-gray-700 text-sm line-clamp-3">{item.title.length > 200 ? item.title.slice(0, 200) + "..." : item.title}</p>
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
        </>
      )}
    </div>
  );
};

export default News;
