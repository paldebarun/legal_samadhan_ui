"use client";

import React, { useEffect, useState, use } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { publications_Url } from "@/utils/config";
import { Publication as PublicationType } from "@/store/slices/publicationSlice";

import BannerComponent from "@/components/Banner";

const PublicationDetailPage = ({ params }: { params: Promise<{ pub_id: string }> }) => {

  const { pub_id } = use(params);

  const { publications } = useSelector((state: RootState) => state.publication);

  const [publication, setPublication] = useState<PublicationType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("This is the id :", pub_id);


    const found = publications.find((p) => p._id === pub_id);

    if (found) {
      setPublication(found);
      setLoading(false);
      return;
    }

    // 2️⃣ Fetch from API if not found
    const fetchPublication = async () => {
      try {
        console.log("This is publication id : ",pub_id)
        const { data } = await axios.get(`${publications_Url}/${pub_id}`);
        setPublication(data.publication);
      } catch (err) {
        console.error("Error loading publication", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [pub_id, publications]);

  if (loading) {
    return (
      <div className="w-full flex h-screen items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!publication) {
    return <div className="p-6 text-center">Publication not found.</div>;
  }

  return (
    <div className="w-full mx-auto min-h-screen">
      <BannerComponent
        image="/publications/Lady_Justice.jpeg"
        text="View Publication Overview"
      />
      <div className="sm:w-8/12 p-6 mx-auto">
     

      <h1 className="text-3xl font-bold text-purple-950 mb-3 ">{publication.title}</h1>

      <p className="text-gray-600 mb-4">
        {publication.practice_area?.name} | {new Date(publication.published_on).toDateString()}
      </p>
      <p className="text-sm font-semibold mb-4">
        Authors: {publication.authors.join(", ")}
      </p>

      <p className="text-sm md:text-lg text-gray-800 leading-relaxed  mb-6">{publication.description}</p>


     {publication.link !="none" && <a
        href={publication.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        View External Link
      </a>}

      </div>
    </div>
  );
};

export default PublicationDetailPage;
