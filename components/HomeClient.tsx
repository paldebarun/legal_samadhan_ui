"use client";

import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import {banner_data} from "../utils/banner_data"



const dummyPublications = [
  {
    practice_area: { _id: "1", name: "Corporate Law" },
    published_on: new Date("2024-05-15"),
    authors: ["John Doe", "Jane Smith"],
    title: "Corporate Governance in 2024",
    description: "An in-depth analysis of corporate governance trends and regulations.",
    link: "https://example.com/publication/corporate-governance-2024"
  },
  {
    practice_area: { _id: "2", name: "Real Estate" },
    published_on: new Date("2023-11-10"),
    authors: ["Emily Davis", "Michael Brown"],
    title: "Real Estate Market Trends",
    description: "Exploring the latest trends and legal challenges in the real estate sector.",
    link: "https://example.com/publication/real-estate-trends-2023"
  },
  {
    practice_area: { _id: "3", name: "Insolvency & Restructuring" },
    published_on: new Date("2025-01-20"),
    authors: ["Sarah Wilson", "David Lee"],
    title: "Corporate Restructuring Strategies",
    description: "Guidance on insolvency and restructuring best practices for corporates.",
    link: "https://example.com/publication/corporate-restructuring-2025"
  },
  {
    practice_area: { _id: "4", name: "Government Affairs" },
    published_on: new Date("2024-08-05"),
    authors: ["Laura Martinez", "Robert Johnson"],
    title: "Navigating Public Policy & Regulations",
    description: "Insights into government affairs and public policy compliance.",
    link: "https://example.com/publication/government-affairs-2024"
  },
  {
    practice_area: { _id: "1", name: "Corporate Law" },
    published_on: new Date("2024-09-10"),
    authors: ["Alice Brown"],
    title: "Corporate Law Updates",
    description: "Latest corporate law amendments and their impact.",
    link: "https://example.com/publication/corporate-law-updates"
  },
  {
    practice_area: { _id: "2", name: "Real Estate" },
    published_on: new Date("2023-05-15"),
    authors: ["Tom Green"],
    title: "Property Law Simplified",
    description: "Simplifying property law for investors and homeowners.",
    link: "https://example.com/publication/property-law-simplified"
  },
];

const news_and_events_data = [
  {
    category: "News",
    description:
      "High Court issues landmark judgment on corporate governance reforms.",
    date: "2025-07-15",
  },
  {
    category: "Event",
    description:
      "Annual Legal Awareness Workshop scheduled for September 2025.",
    date: "2025-09-05",
  },
  {
    category: "News",
    description: "New bill proposed to strengthen cybersecurity laws in India.",
    date: "2025-06-28",
  },
  {
    category: "Event",
    description: "International Conference on Arbitration to be held in New Delhi.",
    date: "2025-10-12",
  },
  {
    category: "News",
    description:
      "Supreme Court expands interpretation of environmental protection laws.",
    date: "2025-05-20",
  },
];

export default function HomeClient() {
  const router = useRouter();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="hero-section relative w-full">
        <Swiper
          effect="fade"
          modules={[EffectFade, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="h-[300px] md:h-[500px] lg:h-[600px]"
        >
          {banner_data.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="w-full h-full flex items-center justify-center relative"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative z-10 text-center px-6 md:px-20">
                  <h2 className="text-white text-3xl md:text-6xl font-bold mb-4">
                    {slide.heading}
                  </h2>
                  <p className="text-white max-w-3xl mx-auto text-lg md:text-xl">
                    {slide.paragraph}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Latest Publications Heading */}
      <div className="flex gap-1 px-6 py-10">
        <p className="text-black text-4xl sm:text-5xl md:text-7xl font-bold">
          Latest{" "}
        </p>
        <span className="text-purple-900 text-4xl sm:text-5xl md:text-7xl font-bold">
          Publications
        </span>
      </div>

      {/* Button */}
      <div className="w-full md:py-10 px-6">
      <button
        onClick={() => router.push("/publications")}
        className="relative md:w-4/12 lg:w-4/12 hover:cursor-pointer text-xl sm:text-2xl px-3 lg:text-4xl rounded-full py-3 md:py-4 overflow-hidden group border-2 border-transparent hover:border-purple-900 transition-all duration-300"
      >
        <span className="absolute inset-0 bg-purple-900 transition-all duration-300"></span>
        <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
        <span className="relative z-10 text-white group-hover:text-purple-900 transition-colors duration-300">
          See all publications
        </span>
      </button>
    </div>
      {/* Publications Slider */}
      <div className="publications-highlights w-full px-6 py-10">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
        >
          {dummyPublications.map((pub, index) => (
            <SwiperSlide
            key={index}
            className="bg-white h-[300px] min-h-[300px] max-h-[300px] rounded-xl shadow-lg p-6 flex flex-col justify-between border-purple-900 hover:cursor-pointer border-2"
          >
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-purple-950">{pub.title}</h3>
              <p className="text-sm mb-3 line-clamp-3 text-gray-700">{pub.description}</p>
              <div className="flex justify-between text-xs opacity-80 text-gray-600">
                <span>{pub.authors.join(", ")}</span>
                <span>{pub.published_on.toISOString().split("T")[0]}</span>
              </div>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-xs mt-2 block"
              >
                Read More
              </a>
            </div>
          </SwiperSlide>
          
          ))}
        </Swiper>
      </div>

      {/* Latest News & Events Section */}
      <div className="sm:flex-row flex-col flex gap-1 px-6 py-10">
        <p className="text-black text-4xl sm:text-5xl md:text-7xl font-bold">
          Latest{" "}
        </p>
        <span className="text-purple-900 text-4xl sm:text-5xl md:text-7xl font-bold">
          News & Events
        </span>
      </div>

      {/* News & Events Slider */}
      <section className="latest-news-and-events w-full px-6 py-10">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
        >
          {news_and_events_data.map((item, index) => (
            <SwiperSlide
              key={index}
              className="bg-white h-[300px] min-h-[300px] max-h-[300px] rounded-xl shadow-lg p-6 flex flex-col justify-between border-purple-900 hover:cursor-pointer border-2"
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
              <p className="text-gray-700 text-sm line-clamp-3">
                {item.description}
              </p>
              <span className="text-xs text-gray-500">
                {new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short", day: "numeric" }).format(new Date(item.date))}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
