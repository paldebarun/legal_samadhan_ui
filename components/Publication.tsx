"use client";

import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import {publications_Url} from '../utils/config'
import {practice_area_url} from '../utils/config'

interface Publication {
  title: string;
  description: string;
  authors: string[];
  link: string;
  practice_area?: { name: string };
  published_on: Date; 
}

const Publication: React.FC = () => {
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState("All");
  const [yearOpen, setYearOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [practiceAreas, setPracticeAreas] = useState<string[]>(["All"]);
  const [years, setYears] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Fetch publications
        const { data }: { data: Publication[] } = await axios.get(publications_Url);
        const formatted: Publication[] = data.map((pub) => ({
          ...pub,
          published_on: new Date(pub.published_on),
        }));
        setPublications(formatted);
  
        // Extract unique years
        const uniqueYears = Array.from(
          new Set(formatted.map((pub) => pub.published_on.getFullYear().toString()))
        );
        setYears(["All", ...uniqueYears]);
  
        // Fetch practice areas
        const res = await axios.get<{ name: string }[]>(practice_area_url);
        const areasFromApi = res.data.map((area) => area.name);
        setPracticeAreas(["All", ...areasFromApi]);
      } catch (e) {
        toast.error("Internal server error");
        console.error("Error fetching data", e);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 10;

  // Filtered publications
  const filteredPublications = publications.filter(
    (pub) =>
      (selectedPractice === "All" || pub.practice_area?.name === selectedPractice) &&
      (selectedYear === "All" || pub.published_on.getFullYear().toString() === selectedYear) &&
      pub.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastPub = currentPage * publicationsPerPage;
  const indexOfFirstPub = indexOfLastPub - publicationsPerPage;
  const currentPublications = filteredPublications.slice(indexOfFirstPub, indexOfLastPub);
  const totalPages = Math.ceil(filteredPublications.length / publicationsPerPage);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="hero-section relative w-full flex items-center justify-center h-[300px] md:h-[400px] lg:h-[500px]"
        style={{
          backgroundImage: "url('/publications/35db0edc-6cea-4aa8-80b8-361e33d2e618.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <p className="relative text-white text-center text-3xl md:text-6xl leading-normal font-bold w-7/12">
          Delivering Legal Excellence with Integrity and Insight
        </p>
      </section>

      {/* Heading */}
      <div className="w-full flex flex-col sm:flex-row gap-1 py-6 px-6">
        <span className="text-4xl md:text-6xl lg:text-8xl font-bold">Our Briefings</span>
        <p className="text-4xl md:text-6xl lg:text-8xl font-bold text-purple-950">& Insights</p>
      </div>

      {/* Filters */}
      <div className="filter-areas px-3 py-6 w-full grid gap-2 sm:grid-cols-1 lg:grid-cols-3 lg:grid-rows-1">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Do a quick search by title"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border px-4 py-3 rounded-full focus:outline-none"
        />

        {/* Practice Areas Dropdown */}
        <div className="relative">
          <button
            className="flex items-center justify-between border px-4 py-3 rounded-full w-full hover:cursor-pointer"
            onClick={() => setPracticeOpen(!practiceOpen)}
          >
            <span className="font-bold text-purple-950">{selectedPractice}</span>
            <RiArrowDownSLine className="text-purple-950" />
          </button>
          {practiceOpen && (
            <ul className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-md">
              {practiceAreas.map((area, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  onClick={() => {
                    setSelectedPractice(area);
                    setPracticeOpen(false);
                    setCurrentPage(1);
                  }}
                >
                  {area}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Year Dropdown */}
        <div className="relative">
          <button
            className="flex items-center justify-between border px-4 py-3 rounded-full w-full hover:cursor-pointer"
            onClick={() => setYearOpen(!yearOpen)}
          >
            <span className="font-bold text-purple-950">{selectedYear}</span>
            <RiArrowDownSLine className="text-purple-950" />
          </button>
          {yearOpen && (
            <ul className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-md">
              {years.map((year, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  onClick={() => {
                    setSelectedYear(year);
                    setYearOpen(false);
                    setCurrentPage(1);
                  }}
                >
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Publication Listing */}
      <section className="publication-listing px-6 py-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : currentPublications.length > 0 ? (
          currentPublications.map((pub, index) => (
            <div key={index} className="border rounded-lg h-[300px] p-4 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-purple-950">{pub.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {pub.practice_area?.name} | {pub.published_on.toDateString()}
              </p>
              <p className="text-gray-700 mb-2">{pub.description}</p>
              <p className="text-sm font-semibold mb-2">
                Authors: {pub.authors.join(", ")}
              </p>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No publications found.</p>
        )}
      </section>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Publication;
