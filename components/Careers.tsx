"use client";

import BannerComponent from "./Banner";
import Heading from "./Heading";
import { useState, useEffect } from "react";
import ManagementProfessionalMenu from "./ManagementProfessionalMenu";
import LegalProfessionalMenu from "./LegalProfessionalMenu";
import InternshipMenu from "./InternshipMenu";
import { jobs_url } from "@/utils/config";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setJobs, setError, setLoading, Job } from "@/store/slices/jobSlice";
import { RootState } from "../store/store";

const categories = ["Legal Professionals", "Management Professionals", "Internship"];

interface JobApiResponse {
  success: boolean;
  jobs: Job[];
}

const CareerComponent: React.FC = () => {
  const [category, setCategory] = useState<string>("Legal Professionals");
  

  const dispatch = useDispatch();

  const { jobs, loading, error } = useSelector((state: RootState) => state.job);

  const legalProfessionalJobs = jobs.filter(
    (job) => job.category === "legal_professionals"
  );
  const managementProfessionalJobs = jobs.filter(
    (job) => job.category === "management_professionals"
  );
  const internshipJobs = jobs.filter(
    (job) => job.category === "internship"
  );

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get<JobApiResponse>(jobs_url);
        dispatch(setJobs(data.jobs));
      } catch (err) {
        dispatch(setError("Failed to fetch job data"));
        console.log("This is the error of career data fetching : ",err)
        toast.error("Error fetching job data");
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (jobs.length === 0) {
      fetchJobData();
    }
    

  }, [dispatch, jobs.length]);


  return (
    <div className="w-full">
      <BannerComponent
        image="/careers/832a2286-53fc-4af3-8471-5ff18f1b76af.jpeg"
        text="Want to work with us ?"
      />
      <Heading first_text="Join" second_text="us now" />

      <div className="w-full">
        <div className="w-full sm:w-10/12 mx-auto px-3 md:px-6 md:py-10 flex lg:flex-row items-center   flex-col  justify-between text-md sm:text-xl lg:text-2xl font-semibold hover:cursor-pointer">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => setCategory(cat)}
              className={`${
                category === cat
                  ? "text-black border-b-4 border-purple-900"
                  : "text-slate-500 border-b-0 hover:bg-slate-200 "
              } transition-all duration-200 md:px-3 py-1 px-1 md:py-3`}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Loading and error states */}
        {loading && <div className="col-span-full flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
          </div>}
        {error && <p className="text-center text-lg text-red-500">{error}</p>}

        {/* Menu Section */}
        <div className="w-full px-6 py-6">
          {category === "Legal Professionals" && <LegalProfessionalMenu legalProfessionalJobs={legalProfessionalJobs}/>}
          {category === "Management Professionals" && <ManagementProfessionalMenu managementProfessionalJobs={managementProfessionalJobs}/>}
          {category === "Internship" && <InternshipMenu internshipJobs={internshipJobs}/>}
        </div>
      </div>
    </div>
  );
};

export default CareerComponent;
