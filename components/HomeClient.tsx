"use client";

import React from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

const banner_data = [
  {
    heading: "Upholding Justice for All",
    paragraph:
      "Justice is not merely a legal term; it is the foundation of a civilized society. It ensures that fairness prevails over bias, and that every citizen, regardless of status, receives equal treatment under the law. We are committed to safeguarding these principles, ensuring that no voice goes unheard, and no right is left unprotected.",
    image: "/home/_.jpeg",
  },
  {
    heading: "Empowering Through Legal Awareness",
    paragraph:
      "An informed citizen is a powerful citizen. Legal awareness bridges the gap between the rights we possess and the ability to defend them. By educating communities about the law, we encourage people to stand up for themselves and others.",
    image: "/home/c211e859-c8a5-465b-b892-aeb8989199db.jpeg",
  },
//   {
//     heading: "Defending Rights, Preserving Dignity",
//     paragraph:
//       "Every individual has the right to live with dignity, free from oppression and exploitation. The law exists not just to punish wrongdoing but to protect the values that make life meaningful.",
//     image: "/home/law lawyer aesthetic alex claremont diaz red white and royal blue.jpeg",
//   },
  
];

const publications_data = [
  {
    title: "The Changing Face of Indian Corporate Law",
    description:
      "An overview of recent amendments impacting corporate governance and compliance requirements in India.",
    author: "Adv. Meera Sharma",
    date: "2025-06-12",
    backgroundImage: "/cards.jpeg",
  },
  {
    title: "Constitutional Safeguards for Freedom of Speech",
    description:
      "A detailed analysis of Article 19 and the reasonable restrictions imposed by the Indian legal framework.",
    author: "Prof. Rajesh Malhotra",
    date: "2025-05-28",
    backgroundImage: "/cards.jpeg",
  },
  {
    title: "Cybersecurity Laws in the Digital Era",
    description:
      "Understanding the IT Act, data protection laws, and their implications for businesses in India.",
    author: "Adv. Karan Patel",
    date: "2025-05-10",
    backgroundImage: "/cards.jpeg",
  },
  {
    title: "Judicial Activism and Social Justice",
    description:
      "Exploring the role of the judiciary in promoting equality and protecting marginalized communities.",
    author: "Justice (Retd.) Neha Iyer",
    date: "2025-04-18",
    backgroundImage: "/cards.jpeg",
  },
  {
    title: "The Evolving Landscape of Environmental Law",
    description:
      "How Indian laws are adapting to address climate change and sustainable development challenges.",
    author: "Dr. Sameer Gupta",
    date: "2025-04-01",
    backgroundImage: "/cards.jpeg",
  },
  {
    title: "ADR Mechanisms: Arbitration and Mediation in India",
    description:
      "A guide to alternative dispute resolution methods and their increasing popularity in India.",
    author: "Adv. Ritu Verma",
    date: "2025-03-15",
    backgroundImage: "/cards.jpeg",
  },
  {
    title: "The Intersection of AI and Indian Law",
    description:
      "Legal challenges and regulatory considerations for artificial intelligence technologies in India.",
    author: "Adv. Arjun Nair",
    date: "2025-03-02",
    backgroundImage: "/cards.jpeg",
  },
  {
    title: "Women’s Rights and Legal Reforms",
    description:
      "Recent legal developments empowering women and ensuring gender equality in India.",
    author: "Adv. Priya Kapoor",
    date: "2025-02-18",
    backgroundImage: "/cards.jpeg",
  },
  {
    title: "Intellectual Property Laws in a Globalized Market",
    description:
      "Protecting innovation and creativity through robust IP enforcement mechanisms.",
    author: "Prof. Anil Khanna",
    date: "2025-02-05",
    backgroundImage: "/cards.jpeg",
  },
  {
    title: "Taxation Reforms and Business Compliance",
    description:
      "Insights into GST updates, corporate tax changes, and compliance obligations for companies.",
    author: "CA & Legal Expert Sunita Rao",
    date: "2025-01-25",
    backgroundImage: "/cards.jpeg",
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
        <button className="relative md:w-4/12 lg:w-4/12 hover:cursor-pointer text-xl sm:text-2xl px-3 lg:text-4xl rounded-full py-3 md:py-4 overflow-hidden group border-2 border-transparent hover:border-purple-900 transition-all duration-300">
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
          {publications_data.map((pub, index) => (
            <SwiperSlide
              key={index}
              className="relative h-[300px] hover:cursor-pointer min-h-[300px] max-h-[300px] overflow-hidden rounded-xl shadow-lg flex flex-col justify-end"
              style={{
                backgroundImage: `url(${pub.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 text-white p-4">
                <h3 className="text-xl font-bold mb-2">{pub.title}</h3>
                <p className="text-sm mb-3 line-clamp-3">{pub.description}</p>
                <div className="flex justify-between text-xs opacity-80">
                  <span>{pub.author}</span>
                  <span>{new Date(pub.date).toISOString().split("T")[0]}</span>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Latest News & Events Heading */}
      <div className="sm:flex-row flex-col flex gap-1 px-6 py-10">
        <p className="text-black text-4xl sm:text-5xl md:text-7xl font-bold">
          Latest{" "}
        </p>
        <span className="text-purple-900 text-4xl sm:text-5xl md:text-7xl font-bold">
          News & Events
        </span>
      </div>

      {/* Button */}
      <div className="w-full py-10 px-6">
        <button className="relative md:w-4/12 lg:w-4/12 hover:cursor-pointer text-xl sm:text-2xl px-3 lg:text-4xl rounded-full py-3 md:py-4 overflow-hidden group border-2 border-transparent hover:border-purple-900 transition-all duration-300">
          <span className="absolute inset-0 bg-purple-900 transition-all duration-300"></span>
          <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
          <span className="relative z-10 text-white group-hover:text-purple-900 transition-colors duration-300">
            See all News and Events
          </span>
        </button>
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
