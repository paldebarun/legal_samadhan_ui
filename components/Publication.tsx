"use client";

import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { publications_Url, practice_area_url } from "../utils/config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store"; 
import {
  setPublications,
  setLoading,
  setError,
} from "../store/slices/publicationSlice";
import BannerComponent from "./Banner";
import Heading from "./Heading";


interface PublicationType {
  title: string;
  description: string;
  authors: string[]; 
  link: string;
  published_on: string;
 
}

const Publication: React.FC = () => {
  const dispatch = useDispatch();
  const {
    publications,
    practiceAreas,
    years,
    loading,
  } = useSelector((state: RootState) => state.publication);

  const [practiceOpen, setPracticeOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState("All");
  const [yearOpen, setYearOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

   
        const { data } = await axios.get<PublicationType[]>(publications_Url);
        const formatted = data.map((pub:PublicationType) => ({
          ...pub,
          published_on: pub.published_on, 
        }));
        

    
        const uniqueYears: string[] = Array.from(
          new Set(
            formatted.map((pub: PublicationType) => {
              const date = new Date(pub.published_on); 
              return date.getFullYear().toString();
            })
          )
        );


        const res = await axios.get<{ name: string }[]>(practice_area_url);
        const areasFromApi = res.data.map((area) => area.name);

        dispatch(
          setPublications({
            publications: formatted,
            practiceAreas: ["All", ...areasFromApi],
            years: ["All", ...uniqueYears],
          })
        );
      } catch (e) {
        dispatch(setError("Internal server error"));
        toast.error("Internal server error");
        console.error("Error fetching data", e);
      } finally {
        dispatch(setLoading(false));
      }
    };

    
    if (publications.length === 0) {
      console.log("calling the api for publication")
      fetchData();
    }
    else{
      console.log("Not calling the publication api")
    }
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 10;

  // Filtered publications
  const filteredPublications = publications.filter(
    (pub) =>
      (selectedPractice === "All" ||
        pub.practice_area?.name === selectedPractice) &&
        (selectedYear === "All" ||
        new Date(pub.published_on).getFullYear().toString() === selectedYear) &&
      pub.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastPub = currentPage * publicationsPerPage;
  const indexOfFirstPub = indexOfLastPub - publicationsPerPage;
  const currentPublications = filteredPublications.slice(
    indexOfFirstPub,
    indexOfLastPub
  );
  const totalPages = Math.ceil(filteredPublications.length / publicationsPerPage);

  return (
    <div className="w-full">
      {/* Hero Section */}

      <BannerComponent image="/publications/35db0edc-6cea-4aa8-80b8-361e33d2e618.jpeg" text="Delivering Legal Excellence with Integrity and Insight" />

      {/* Heading */}

      <Heading first_text="Our Briefings" second_text="& Insights" />

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
        ) : (
          currentPublications.map((pub, index) => (
            <div
              key={index}
              className="border rounded-lg h-[300px] p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-purple-950">{pub.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {pub.practice_area?.name} |{" "}
                {new Date(pub.published_on).toDateString()}
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
        ) }
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
