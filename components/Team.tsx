"use client";

import React, { useState, useEffect,useCallback } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import { teams_url } from "@/utils/config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setTeam, setLoading, setError, TeamMember } from "../store/slices/teamSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BannerComponent from "./Banner";
import Heading from "./Heading";

interface ApiResponse {
  success: boolean;
  teamMembers: TeamMember[];
}

const Team: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [practiceOpen, setPracticeOpen] = useState(false);
  const [designationOpen, setDesignationOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const [selectedPractice, setSelectedPractice] = useState("Practice Areas");
  const [selectedDesignation, setSelectedDesignation] = useState("Designation");
  const [selectedLocation, setSelectedLocation] = useState("Location");

  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [designations, setDesignations] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const { team, loading, error } = useSelector((state: RootState) => state.team);

  // Function to compute filtered team based on filters
  const getFilteredTeam = useCallback(() => {
    let filtered = [...team];
  
    if (selectedPractice !== "Practice Areas") {
      filtered = filtered.filter(member =>
        member.expertise.some(ex => ex.name === selectedPractice)
      );
    }
  
    if (selectedDesignation !== "Designation") {
      filtered = filtered.filter(member => member.designation === selectedDesignation);
    }
  
    if (selectedLocation !== "Location") {
      filtered = filtered.filter(member => member.location.includes(selectedLocation));
    }
  
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(member => member.name.toLowerCase().includes(q));
    }
  
    return filtered;
  }, [team, selectedPractice, selectedDesignation, selectedLocation, searchQuery]);
  

  const [filteredTeam, setFilteredTeam] = useState<TeamMember[]>(getFilteredTeam());

  // Update filtered team whenever filters or team data change
  useEffect(() => {
    setFilteredTeam(getFilteredTeam());
  }, [getFilteredTeam]);

  // Fetch team data
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get<ApiResponse>(teams_url);

        dispatch(setTeam(data.teamMembers));

        // Compute unique dropdown values only once
        setPracticeAreas(
          Array.from(
            new Set(data.teamMembers.flatMap(m => m.expertise.map(ex => ex.name)))
          )
        );
        setDesignations(
          Array.from(new Set(data.teamMembers.map(m => m.designation)))
        );
        setLocations(
          Array.from(new Set(data.teamMembers.flatMap(m => m.location)))
        );
      } catch (e) {
        dispatch(setError("Internal server error"));
        toast.error("Internal server error");
        console.error("Error fetching data", e);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (team.length === 0) {
      fetchData();
    } else {
      // Compute unique dropdown values from existing team
      setPracticeAreas(
        Array.from(
          new Set(team.flatMap(m => m.expertise.map(ex => ex.name)))
        )
      );
      setDesignations(Array.from(new Set(team.map(m => m.designation))));
      setLocations(Array.from(new Set(team.flatMap(m => m.location))));
    }
  }, [team, dispatch]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <BannerComponent
        image="/team/ead3f1b8-e56b-48c8-903e-ca36c969a7c9.jpeg"
        text="Delivering Extraordinary Values Always"
      />

      {/* Section Heading */}
      <Heading first_text="Our" second_text="Lawyers" />

      {/* Filter Area */}
      <div className="filter-areas px-3 py-6 w-full grid gap-2 sm:grid-cols-1 sm:grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
        <input
          type="text"
          placeholder="Search by name"
          className="w-full border px-4 py-3 rounded-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Dropdowns */}
        {[
          { open: practiceOpen, setOpen: setPracticeOpen, selected: selectedPractice, setSelected: setSelectedPractice, options: practiceAreas },
          { open: designationOpen, setOpen: setDesignationOpen, selected: selectedDesignation, setSelected: setSelectedDesignation, options: designations },
          { open: locationOpen, setOpen: setLocationOpen, selected: selectedLocation, setSelected: setSelectedLocation, options: locations },
        ].map((dropdown, idx) => (
          <div key={idx} className="relative">
            <button
              className="flex items-center justify-between border px-4 py-3 rounded-full w-full hover:cursor-pointer"
              onClick={() => dropdown.setOpen(!dropdown.open)}
            >
              <span className="font-bold text-purple-950">{dropdown.selected}</span>
              <RiArrowDownSLine className="text-purple-950" />
            </button>
            {dropdown.open && (
              <ul className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-md">
                {dropdown.options.map((option, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                    onClick={() => {
                      dropdown.setSelected(option);
                      dropdown.setOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Team Cards */}
      <div className="team-details w-full grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          filteredTeam.map(member => (
            <div
              key={member._id}
              className="md:w-[350px] w-[250px] h-[350px] md:h-[450px] hover:cursor-pointer relative group overflow-hidden rounded-lg"
              style={{
                backgroundImage: `url('${member.image_url}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay */}
              <div
                className="detail-cover absolute top-0 left-0 w-full h-0 group-hover:h-full bg-purple-900/60 transition-[height] duration-500
                ease-in-out flex items-end"
                onClick={() => router.push(`/team/${member._id}`)}
              >
                <div className="p-4">
                  <p className="text-white text-xs md:text-sm lg:text-md leading-normal relative">
                    {member.bio.length > 300 ? member.bio.slice(0, 300) + "..." : member.bio}
                  </p>
                  <IoIosArrowRoundForward className="text-white text-4xl mt-2" />
                </div>
              </div>

              {/* Name & Designation */}
              <div className="absolute top-4 left-4">
                <p className="text-black relative leading-normal font-bold text-sm sm:text-md lg:text-xl group-hover:text-white">
                  {member.name}
                </p>
                <p className="text-slate-500 relative leading-normal group-hover:text-white">
                  {member.designation}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Team;
