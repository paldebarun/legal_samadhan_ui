"use client";

import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import { teams_url} from "@/utils/config";
import axios from "axios";
import { TeamMember } from "../store/slices/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setTeam, setLoading, setError } from "../store/slices/teamSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BannerComponent from "./Banner";
import Heading from "./Heading";

interface ApiResponse{
  success:boolean,
  teamMembers:TeamMember[]
}


const Team: React.FC = () => {
  const dispatch = useDispatch();

  const router=useRouter();

  const [practiceOpen, setPracticeOpen] = useState(false);
  const [designationOpen, setDesignationOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const [selectedPractice, setSelectedPractice] = useState("Practice Areas");
  const [selectedDesignation, setSelectedDesignation] = useState("Designation");
  const [selectedLocation, setSelectedLocation] = useState("Location");

  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [designations, setDesignations] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const [filteredTeam, setFilteredTeam] = useState<TeamMember[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const { team, loading, error } = useSelector(
    (state: RootState) => state.team
  );
  
  useEffect(() => {
    let updatedTeam = [...team];
  
    if (selectedPractice !== "Practice Areas") {
      updatedTeam = updatedTeam.filter(member =>
        member.expertise.some(ex => ex.name === selectedPractice)
      );
    }
  
    if (selectedDesignation !== "Designation") {
      updatedTeam = updatedTeam.filter(member =>
        member.designation === selectedDesignation
      );
    }
  
    if (selectedLocation !== "Location") {
      updatedTeam = updatedTeam.filter(member =>
        member.location.includes(selectedLocation)
      );
    }
  
    if (searchQuery.trim() !== "") {
      updatedTeam = updatedTeam.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    setFilteredTeam(updatedTeam);
  }, [team, selectedPractice, selectedDesignation, selectedLocation, searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
  
        const { data } = await axios.get<ApiResponse>(teams_url);

        
  
        const uniquePracticeAreas = Array.from(
          new Set(
            data.teamMembers
              .map((m: TeamMember) => {
                console.log("This is the expertise: ", m.expertise);
                return m.expertise.map((ex) => ex.name); 
              })
              .flat()
          )
        );
        console.log("These are the unique practice areas : ",uniquePracticeAreas)
        setPracticeAreas(uniquePracticeAreas);
        
  
        const uniqueDesignations:string[] = Array.from(
          new Set(data.teamMembers.map((m:TeamMember) => m.designation))
        );
        setDesignations(uniqueDesignations);
  
        const uniqueLocations:string[] = Array.from(
          new Set(data.teamMembers.flatMap((m:TeamMember) => m.location))
        );
        setLocations(uniqueLocations);
  
        dispatch(setTeam(data.teamMembers));

        console.log("This is team data in api call : ",team)
      } catch (e) {
        dispatch(setError("Internal server error"));
        toast.error("Internal server error");
        console.error("Error fetching data", e);
      } finally {
        dispatch(setLoading(false));
      }
    };
  
    if (team.length === 0) {
      console.log("calling the api for team");
      fetchData();
    } 
    else {
     console.log("This is team data : ",team)

     const uniquePracticeAreas = Array.from(
      new Set(team.map((m: TeamMember) => {
            console.log("This is the expertise: ", m.expertise);
            return m.expertise.map((ex) => ex.name); 
          })
          .flat()
      )
    );
    console.log("These are the unique practice areas : ",uniquePracticeAreas)
    setPracticeAreas(uniquePracticeAreas);

      const uniqueDesignations = Array.from(
        new Set(team.map((m:TeamMember) => m.designation))
      );
      setDesignations(uniqueDesignations);
  
      const uniqueLocations = Array.from(
        new Set(team.flatMap((m:TeamMember) => m.location))
      );
      setLocations(uniqueLocations);
  
      console.log("Not calling the team api");
    }
  }, [team, dispatch]); 
  
  return (
    <div className="w-full">
      {/* Hero Section */}

      <BannerComponent image="/team/ead3f1b8-e56b-48c8-903e-ca36c969a7c9.jpeg" text="Delivering Extraordinary Values Always" />

      {/* Section Heading */}
     
      <Heading first_text="Our" second_text="Lawyers" />

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
              {/* You might want to replace these with data from API later */}
              {practiceAreas.map(
                (area, i) => (
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
                )
              )}
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
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
        </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          filteredTeam.map((member) => (
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
              <div className="detail-cover absolute top-0 left-0 w-full h-0 group-hover:h-full bg-purple-900/60 transition-[height] duration-[500ms] ease-in-out flex items-end"
              onClick={() => router.push(`/team/${member._id}`)}
              >
                <div className="p-4">
                  <p className="text-white text-xs md:text-sm lg:text-md leading-normal relative">
                  {member.bio.length > 300 ? member.bio.slice(0, 300) + "..." : member.bio}
                  </p>
                  <IoIosArrowRoundForward  className="text-white text-4xl mt-2" />
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
