"use client";

import React, { useEffect  } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { banner_data } from "../utils/banner_data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setPublications,
  setLoading as setPublicationsLoading,
  setError as setPublicationsError,
  Publication
 
} from "../store/slices/publicationSlice";
import {
  setNewsEvents,
  setLoading as setNewsLoading,
  setError as setNewsError,
  
} from "../store/slices/newsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import {
  publications_Url,
  news_and_events_Url,
} from "../utils/config";
import Heading from './Heading'
import { PublicationAPIResponse} from "./Publication";
import { NewsEventAPIResponse } from "./News";


export default function HomeClient() {
  const router = useRouter();
  const dispatch = useDispatch();
  

  const { publications, loading: pubLoading } = useSelector(
    (state: RootState) => state.publication
  );
  const { newsEvents, loading: newsLoading } = useSelector(
    (state: RootState) => state.news
  );

  // Fetch Publications
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        dispatch(setPublicationsLoading(true));

        const { data } = await axios.get<PublicationAPIResponse>(publications_Url);
        const formatted: Publication[] = data.publications.map((pub: Publication) => ({
          ...pub,
          published_on: pub.published_on,
          practice_area: pub.practice_area || { name: "Unknown" },
        }));

        const uniqueYears: string[] = Array.from(
          new Set(
            formatted.map((pub: Publication) =>
              new Date(pub.published_on).getFullYear().toString()
            )
          )
        );

       
        const areasFromApi = data.publications.map(
          (publication: Publication) => publication.practice_area?.name
        );

        dispatch(
          setPublications({
            publications: formatted,
            practiceAreas: ["All", ...areasFromApi],
            years: ["All", ...uniqueYears],
          })
        );
      } catch (e) {
        console.log("This is the error: ",e)
        dispatch(setPublicationsError("Internal server error"));
        toast.error("Internal server error");
      } finally {
        dispatch(setPublicationsLoading(false));
      }
    };

    if (publications.length === 0) fetchPublications();
  }, [dispatch, publications.length]);

  // Fetch News & Events
  useEffect(() => {
    const fetchNews = async () => {
      try {
        dispatch(setNewsLoading(true));
        const { data } = await axios.get<NewsEventAPIResponse>(news_and_events_Url);
        dispatch(setNewsEvents(data.newsEvents));
      } catch (e) {
        console.log("This is the error for news fetching : ",e)
        dispatch(setNewsError("Failed to fetch news & events"));
        toast.error("Failed to fetch news & events");
      } finally {
        dispatch(setNewsLoading(false));
      }
    };

    if (newsEvents.length === 0) fetchNews();
  }, [dispatch, newsEvents.length]);

  

  // Show only latest 6 publications
  const latestPublications = publications.slice(0, 6);

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

      

      {/* Latest Publications Section */}
      <Heading first_text="Latest " second_text="Publications" />

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
        {pubLoading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
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
            {latestPublications.map((pub, index) => (
              <SwiperSlide
                key={index}
                className="bg-white h-[300px] min-h-[300px] max-h-[300px] rounded-xl shadow-lg p-6 flex flex-col justify-between border-purple-900 hover:cursor-pointer border-2"
              >
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 text-purple-950">
                    {pub.title}
                  </h3>
                  <p className="text-sm mb-3 line-clamp-3 text-gray-700">
                    {pub.description}
                  </p>
                  <div className="flex justify-between text-xs opacity-80 text-gray-600">
                    <span>{pub.authors?.join(", ")}</span>
                    <span>
                      {new Date(pub.published_on).toISOString().split("T")[0]}
                    </span>
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
        )}
      </div>

      {/* Latest News & Events Section */}

      <Heading first_text="Latest" second_text="News & Events" />

      {/* News & Events Slider */}
      <section className="latest-news-and-events w-full px-6 py-10">
        {newsLoading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
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
          {newsEvents.map((item, index) => (
            <SwiperSlide
              key={index}
              className="bg-white h-[300px] min-h-[300px] max-h-[300px] rounded-xl shadow-lg p-6 flex flex-col justify-between border-purple-900 hover:cursor-pointer border-2 space-y-3"
            >
              
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full w-fit ${
                  item.category === "news"
                    ? "bg-purple-900 text-white"
                    : "bg-white border-2 border-purple-900 text-purple-900"
                }`}
              >
                {item.category}
              </span>
              <p className="text-gray-700  text-sm line-clamp-3">
                {item.title}
              </p>
              <span className="text-xs text-gray-500">
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(item.date))}
              </span>
              <a
                    href={item.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs mt-2 block"
                  >
                    Read More
                  </a>
            </SwiperSlide>
          ))}
        </Swiper>
        )}
      </section>
    </div>
  );
}

