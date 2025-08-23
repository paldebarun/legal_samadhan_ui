"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { TeamMember } from "@/store/slices/teamSlice";
import { setTeam, setLoading } from "@/store/slices/teamSlice";
import { teams_url } from "@/utils/config";
import toast from "react-hot-toast";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationPin, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";

const TeamMemberPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const dispatch = useDispatch();
  const { team } = useSelector((state: RootState) => state.team);

  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoadingLocal] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      setLoadingLocal(true);

      // Check in Redux state first
      const foundMember = team.find((m: TeamMember) => m._id === id);
      if (foundMember) {
        setMember(foundMember);
        setLoadingLocal(false);
        return;
      }

      // If not found, fetch from API
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${teams_url}/${id}`);
        const apiMember: TeamMember = data.teamMember;

        if (apiMember) {
          setMember(apiMember);
          dispatch(setTeam([...team, apiMember]));
        } else {
          setMember(null);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch team member");
        setMember(null);
      } finally {
        setLoadingLocal(false);
        dispatch(setLoading(false));
      }
    };

    fetchMember();
  }, [id, team, dispatch]);

  if (loading)
    return (
      <div className="col-span-full flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!member) return <p>Team member not found</p>;

  return (
    <div className="w-full">
      <section className="flex md:flex-row flex-col bg-purple-900">
        {/* Image on small screens */}
        <div className="w-[300px] sm:w-5/12 mx-auto block md:hidden py-3">
          <Image
            src={member.image_url}
            alt={member.name}
            width={300}
            height={300}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-8/12 px-2 md:px-10 py-3 md:py-10 space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white">
            {member.designation}
          </h1>
          <p className="text-2xl sm:text-4xl lg:text-6xl text-white">
            {member.name}
          </p>

          {/* Phone */}
          <div className="flex items-center gap-3 text-md lg:text-xl">
            <FaPhone className="text-white" />
            <ul className="flex gap-2 text-white">
              {member.contacts.map((contact, index) => (
                <li className="flex gap-1" key={index}>
                  <a href={`tel:${contact}`} className="hover:underline">
                    {contact}
                  </a>
                  {index !== member.contacts.length - 1 && <span>/</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Email */}
          <div className="flex gap-3 items-center text-white text-md lg:text-xl">
            <IoMdMail />
            <a href={`mailto:${member.email}`} className="hover:underline">
              {member.email}
            </a>
          </div>

          {/* Location */}
          <div className="flex gap-3 items-center text-white text-md lg:text-xl">
            <FaLocationPin />
            <ul className="gap-2 flex">
              {member.location.map((location, index) => (
                <li className="flex gap-1" key={index}>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    {location}
                  </a>
                  {index !== member.location.length - 1 && <span>/</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* LinkedIn */}
          <div className="flex gap-3 items-center text-white text-md lg:text-xl">
            <FaLinkedin />
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Image on medium+ screens */}
        <div className="md:w-[300px] lg:w-[400px] mx-auto hidden md:block px-2 py-3">
          <Image
            src={member.image_url}
            alt={member.name}
            width={400}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Expertise + Bio */}
      <section className="w-full px-6 flex flex-col py-10 gap-6 items-start">
        <p className="text-2xl sm:text-3xl font-bold">Expertise</p>
        <div className="flex flex-wrap gap-3 w-full md:w-7/12">
          {member.expertise.map((exp, index) => (
            <span
              key={index}
              className="px-4 py-2 text-slate-500 border border-slate-400 rounded-full text-sm font-medium"
            >
              {exp.name}
            </span>
          ))}
        </div>

        <p className="text-2xl sm:text-3xl font-bold">Bio</p>
        <p className="w-full text-slate-600 text-sm sm:text-lg text-left">
          {member.bio}
        </p>
      </section>
    </div>
  );
};

export default TeamMemberPage;
