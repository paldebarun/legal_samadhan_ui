"use client";

import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";

const team_data = [
  {
    image: "https://aquilaw.com/images/admin/lawyers/horizontal/1679553470.png",
    name: "John Doe",
    designation: "Senior Partner",
    description:
      "Expert in corporate and commercial litigation with 20+ years of experience.",
  },
  {
    image: "https://aquilaw.com/images/admin/lawyers/horizontal/1679553470.png",
    name: "Jane Smith",
    designation: "Associate Partner",
    description:
      "Specializes in real estate and property law advisory for corporate clients.",
  },
  {
    image: "https://aquilaw.com/images/admin/lawyers/horizontal/1679553470.png",
    name: "Robert Johnson",
    designation: "Legal Advisor",
    description:
      "Handles government affairs and public policy matters with great expertise.",
  },
  {
    image: "https://aquilaw.com/images/admin/lawyers/horizontal/1679553470.png",
    name: "Emily Davis",
    designation: "Associate",
    description:
      "Focuses on insolvency and restructuring cases for corporate clients.",
  },
  {
    image: "https://aquilaw.com/images/admin/lawyers/horizontal/1679553470.png",
    name: "Michael Brown",
    designation: "Senior Counsel",
    description:
      "Experienced in corporate M&A, financing, and commercial dispute resolution.",
  },
  {
    image: "https://aquilaw.com/images/admin/lawyers/horizontal/1679553470.png",
    name: "Sarah Wilson",
    designation: "Associate Partner",
    description:
      "Advises clients on real estate transactions, leasing, and joint development agreements.",
  },
  {
    image: "https://aquilaw.com/images/admin/lawyers/horizontal/1679553470.png",
    name: "David Lee",
    designation: "Legal Consultant",
    description:
      "Provides counsel on corporate governance, compliance, and litigation strategies.",
  },
  {
    image: "https://aquilaw.com/images/admin/lawyers/horizontal/1679553470.png",
    name: "Laura Martinez",
    designation: "Senior Associate",
    description:
      "Specialist in insolvency, restructuring, and bankruptcy advisory services.",
  },
];

const practiceAreas = [
  "Corporate Law",
  "Real Estate",
  "Insolvency & Restructuring",
  "Government Affairs",
];

const designations = [
  "Senior Partner",
  "Associate Partner",
  "Legal Advisor",
  "Senior Associate",
];

const locations = ["New York", "Los Angeles", "Chicago", "Houston"];

const Team = () => {
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [designationOpen, setDesignationOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const [selectedPractice, setSelectedPractice] = useState("Practice Areas");
  const [selectedDesignation, setSelectedDesignation] = useState("Designation");
  const [selectedLocation, setSelectedLocation] = useState("Location");

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="hero-section relative w-full flex items-center justify-center h-[300px] md:h-[400px] lg:h-[500px]"
        style={{
          backgroundImage:
            "url('https://aquilaw.com/front/assets/img/team/team-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <p className="relative text-white text-center text-3xl md:text-6xl leading-normal font-bold w-7/12">
          Delivering Extraordinary Values Always
        </p>
      </section>

      {/* Section Heading */}
      <div className="w-full flex flex-col sm:flex-row gap-1 py-6 px-6">
        <span className="text-4xl md:text-6xl lg:text-8xl font-bold">Our</span>
        <p className="text-4xl md:text-6xl lg:text-8xl font-bold text-purple-950">
          Lawyers
        </p>
      </div>

      {/* Filter Area with Dropdowns */}
      <div
        className="filter-areas px-3 py-6 w-full grid gap-2 
                sm:grid-cols-1 sm:grid-rows-4
                md:grid-cols-2 md:grid-rows-2
                lg:grid-cols-4 lg:grid-rows-1"
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name"
          className="w-full border px-4 py-3 rounded-full focus:outline-none"
        />

        {/* Practice Areas Dropdown */}
        <div className="relative">
          <button
            className="flex items-center justify-between border px-4 py-3 rounded-full w-full hover:cursor-pointer"
            onClick={() => setPracticeOpen(!practiceOpen)}
          >
            <span className="font-bold text-purple-950">
              {selectedPractice}
            </span>
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
                  }}
                >
                  {area}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Designation Dropdown */}
        <div className="relative">
          <button
            className="flex items-center justify-between border px-4 py-3 rounded-full w-full hover:cursor-pointer"
            onClick={() => setDesignationOpen(!designationOpen)}
          >
            <span className="font-bold text-purple-950">
              {selectedDesignation}
            </span>
            <RiArrowDownSLine className="text-purple-950" />
          </button>
          {designationOpen && (
            <ul className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-md">
              {designations.map((desig, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  onClick={() => {
                    setSelectedDesignation(desig);
                    setDesignationOpen(false);
                  }}
                >
                  {desig}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <button
            className="flex items-center justify-between border px-4 py-3 rounded-full w-full hover:cursor-pointer"
            onClick={() => setLocationOpen(!locationOpen)}
          >
            <span className="font-bold text-purple-950">{selectedLocation}</span>
            <RiArrowDownSLine className="text-purple-950" />
          </button>
          {locationOpen && (
            <ul className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-md">
              {locations.map((loc, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  onClick={() => {
                    setSelectedLocation(loc);
                    setLocationOpen(false);
                  }}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Team Cards */}
      <div
        className="team-details w-full grid gap-6 
                sm:grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3 p-6"
      >
        {team_data.map((member, index) => (
          <div
            key={index}
            className="w-full h-[500px] hover:cursor-pointer relative group overflow-hidden rounded-lg"
            style={{
              backgroundImage: `url('${member.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Overlay that expands height on hover */}
            <div className="detail-cover absolute top-0 left-0 w-full h-0 group-hover:h-full bg-purple-900/60 transition-[height] duration-[500ms] ease-in-out flex items-end">
              <div className="p-4">
                <p className="text-white leading-normal relative">
                  {member.description}
                </p>
                <IoIosArrowRoundForward className="text-white mt-2" />
              </div>
            </div>

            {/* Name & Designation */}
            <div className="absolute top-4 left-4">
              <p className="text-black relative leading-normal font-bold text-xl group-hover:text-white">
                {member.name}
              </p>
              <p className="text-slate-500 relative leading-normal group-hover:text-white">
                {member.designation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
