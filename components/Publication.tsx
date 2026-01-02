"use client";

import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { publications_Url} from "../utils/config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store"; 
import {
  setPublications,
  setLoading,
  setError,
  Publication as PublicationType
} from "../store/slices/publicationSlice";
import BannerComponent from "./Banner";
import Heading from "./Heading";
import Link from "next/link";



export interface PracticeArea {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string; 
  __v: number;
}


export interface PublicationAPIResponse{
  success:boolean,
  publications:PublicationType[]
}

export interface PracticeAreaAPIResponse{
  success:boolean,
  practiceAreas:PracticeArea[]
}



const Publication: React.FC = () => {
  const dispatch = useDispatch();
  const { publications, practiceAreas, years, loading } = useSelector(
    (state: RootState) => state.publication
  );

  const [practiceOpen, setPracticeOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState("All");
  const [yearOpen, setYearOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 10;

  // Fetch publications only once
  useEffect(() => {
    if (publications.length > 0) return;

    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get<PublicationAPIResponse>(publications_Url);
        
        const uniqueYears = Array.from(
          new Set(data.publications.map((pub:PublicationType) => new Date(pub.published_on).getFullYear().toString()))
        );

     
        const areasFromApi = data.publications.map(
          (publication: PublicationType) => publication.practice_area?.name
        );
        
        dispatch(
          setPublications({
            publications: data.publications,
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

    fetchData();
  }, [dispatch, publications.length]);

  // Filter publications
  const filteredPublications = publications.filter(pub => {
    const matchPractice = selectedPractice === "All" || pub.practice_area?.name === selectedPractice;
    const matchYear = selectedYear === "All" || new Date(pub.published_on).getFullYear().toString() === selectedYear;
    const matchSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPractice && matchYear && matchSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPublications.length / publicationsPerPage);
  const currentPublications = filteredPublications.slice(
    (currentPage - 1) * publicationsPerPage,
    currentPage * publicationsPerPage
  );

  return (
    <div className="w-full">
      <BannerComponent
        image="/publications/35db0edc-6cea-4aa8-80b8-361e33d2e618.jpeg"
        text="Delivering Legal Excellence with Integrity and Insight"
      />

      <Heading first_text="Our Briefings" second_text="& Insights" />

      {/* Filters */}
      <div className="filter-areas px-3 py-6 w-full grid gap-2 sm:grid-cols-1 lg:grid-cols-3 lg:grid-rows-1">
        <input
          type="text"
          placeholder="Do a quick search by title"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border px-4 py-3 rounded-full focus:outline-none"
        />

        <Dropdown
          options={practiceAreas}
          selected={selectedPractice}
          setSelected={setSelectedPractice}
          isOpen={practiceOpen}
          setIsOpen={setPracticeOpen}
          setCurrentPage={setCurrentPage}
        />

        <Dropdown
          options={years}
          selected={selectedYear}
          setSelected={setSelectedYear}
          isOpen={yearOpen}
          setIsOpen={setYearOpen}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Publication Listing */}
      <section className="publication-listing px-6 py-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : currentPublications.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 text-lg font-medium">
              No publications to show
            </p>
          </div>
        ):(
          currentPublications.map((pub, index) => (
            <div
              key={index}
              className="border rounded-lg min-h-[300px] p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-purple-950">{pub.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {pub.practice_area?.name} | {new Date(pub.published_on).toDateString()}
              </p>
              {(() => {
    const MAX_LEN = 180;
    const desc = pub.description;
    const shortDesc = desc.length > MAX_LEN ? desc.substring(0, MAX_LEN) : desc;

    return (
      <p className="text-gray-700 mb-2">
        {shortDesc}
        {desc.length > MAX_LEN && (
          <Link
            href={`/publications/${pub._id}`}
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            ... Read More
          </Link>
        )}
      </p>
    );
  })()}
              <p className="text-sm font-semibold mb-2">
                Authors: {pub.authors.join(", ")}
              </p>
              {pub.link && pub.link !="none" && <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Publication
              </a>}
            </div>
          ))
        )}
      </section>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 py-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-4 py-2 rounded ${currentPage === num ? "bg-purple-950 text-white" : "border"}`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable dropdown component
interface DropdownProps {
  options: string[];
  selected: string;
  setSelected: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  setCurrentPage: (val: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, setSelected, isOpen, setIsOpen, setCurrentPage }) => {
  return (
    <div className="relative">
      <button
        className="flex items-center justify-between border px-4 py-3 rounded-full w-full hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-purple-950">{selected}</span>
        <RiArrowDownSLine className="text-purple-950" />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-md">
          {options.map((option, i) => (
            <li
              key={i}
              className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
                setCurrentPage(1);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Publication;
