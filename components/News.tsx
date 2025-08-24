"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { news_and_events_Url } from "../utils/config";
import {
  setNewsEvents,
  setLoading,
  setError,
} from "../store/slices/newsSlice";
import BannerComponent from "./Banner";
import Heading from "./Heading";

const News: React.FC = () => {
  const dispatch = useDispatch();
  const { newsEvents, loading } = useSelector(
    (state: RootState) => state.news
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(news_and_events_Url);
        dispatch(setNewsEvents(res.data));
      } catch (err) {
        console.error("Error fetching news & events:", err);
        dispatch(setError("Failed to fetch news & events"));
      } finally {
        dispatch(setLoading(false));
      }
    };
  
    if (newsEvents.length === 0) {
      console.log("calling the api for News");
      fetchNewsEvents();
    } else {
      console.log("Not calling the api for News");
    }
  });
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newsEvents.length / itemsPerPage);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <BannerComponent 
       image='/news/813f228a-caf0-4b7a-a4ad-42b2b371a1bf.jpeg' 
       text="Stay Updated with Our Latest News & Events" 
      />
      {/* Heading */}

      <Heading first_text="News" second_text="& Events" />

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
                <p className="text-gray-700 text-sm line-clamp-3">
                  {item.title.length > 200
                    ? item.title.slice(0, 200) + "..."
                    : item.title}
                </p>
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
