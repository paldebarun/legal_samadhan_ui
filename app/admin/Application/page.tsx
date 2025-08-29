"use client";

import React, { useEffect, useState } from "react";
import { application_url } from "@/utils/config";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { DecodedToken } from "../page";

// Interfaces for type safety
export interface Job {
  _id: string;
  practices: string[];
  experience: number;
  locations: string[];
  requirements: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Application {
  _id: string;
  job: Job;
  first_name: string;
  last_name: string;
  graduated_from: string;
  percentage_of_grade: number;
  current_employer: string;
  current_designation: string;
  college: string;
  current_year_in_college: number;
  location_preference: string;
  availability: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApplicationAPIResponse {
  success: boolean;
  applications: Application[];
}

const ApplicationPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const router = useRouter(); 
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role === "admin") {
        setIsAuthorized(true); 
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error("Invalid token", err);
      router.push("/login");
    }
  }, [router]);


  useEffect(() => {
    const fetchApplications = async () => {
      const toastId = toast.loading("Loading applications...");
      try {
        const { data } = await axios.get<ApplicationAPIResponse>(
          application_url
        );

        if (data.success) {
          setApplications(data.applications);
        } else {
          toast.error("Failed to load applications");
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
        toast.error("Error fetching applications");
      } finally {
        toast.dismiss(toastId);
      }
    };

    fetchApplications();
  }, []);

  // Delete handler
  const deleteHandler = async (id: string) => {
    const toastId = toast.loading("Rejecting application...");
    try {
      await axios.delete(`${application_url}/${id}`);
      toast.success("Application rejected");
      // Remove from state immediately
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      console.error("Error rejecting application:", err);
      toast.error("Failed to reject application");
    } finally {
      toast.dismiss(toastId);
    }
  };


  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Authorization required
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications found.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {applications.map((app:Application) => (
            <AccordionItem key={app._id} value={app._id}>
              <AccordionTrigger>
                {app.first_name} {app.last_name} — {app.job.category}
              </AccordionTrigger>
              <AccordionContent>
                {/* Applicant Info */}
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Applicant Details</h2>
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {app.first_name} {app.last_name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {app.email}
                  </p>
                  <p>
                    <span className="font-medium">College:</span>{" "}
                    {app.college} (Year {app.current_year_in_college})
                  </p>
                  {app.graduated_from && (
                    <p>
                      <span className="font-medium">Graduated From:</span>{" "}
                      {app.graduated_from}
                    </p>
                  )}
                  {app.percentage_of_grade > 0 && (
                    <p>
                      <span className="font-medium">Grade:</span>{" "}
                      {app.percentage_of_grade}%
                    </p>
                  )}
                  {app.current_employer && (
                    <p>
                      <span className="font-medium">Employer:</span>{" "}
                      {app.current_employer} ({app.current_designation})
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Location Preference:</span>{" "}
                    {app.location_preference}
                  </p>
                  <p>
                    <span className="font-medium">Availability:</span>{" "}
                    {new Date(app.availability).toLocaleDateString()}
                  </p>
                </div>

                {/* Job Info */}
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Job Details</h2>
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {app.job.category}
                  </p>
                  <p>
                    <span className="font-medium">Experience Required:</span>{" "}
                    {app.job.experience} years
                  </p>
                  <p>
                    <span className="font-medium">Locations:</span>{" "}
                    {app.job.locations.join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">Practices:</span>{" "}
                    {app.job.practices.join(", ")}
                  </p>
                  <p className="font-medium mt-2">Requirements:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {app.job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Submitted on {new Date(app.createdAt).toLocaleString()}
                </p>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => deleteHandler(app._id)}
                  >
                    Reject
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

<div className="mt-10">
  <div className="bg-purple-50 border border-purple-200 rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-bold mb-3 text-purple-900">
      Admin Instructions
    </h2>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      <li>
        All <span className="font-semibold">job applications</span> are listed
        above in an <span className="font-semibold">accordion format</span>.
        Click an application to view its full details.
      </li>
      <li>
        Each application displays the applicant’s{" "}
        <span className="font-semibold">personal details</span>,{" "}
        <span className="font-semibold">educational background</span>,{" "}
        <span className="font-semibold">work experience</span>, and{" "}
        <span className="font-semibold">job preferences</span>.
      </li>
      <li>
        Job details such as{" "}
        <span className="font-semibold">category</span>,{" "}
        <span className="font-semibold">experience required</span>,{" "}
        <span className="font-semibold">locations</span>,{" "}
        and <span className="font-semibold">requirements</span> are also
        included for reference.
      </li>
      <li>
        Use the <span className="text-red-600 font-semibold">Reject</span>{" "}
        button to remove unqualified or irrelevant applications. Rejections are{" "}
        <span className="italic">permanent</span> and cannot be undone.
      </li>
      <li>
        Always review important applications carefully before taking action.{" "}
        <span className="font-semibold">Offline processing</span> (e.g.,
        interviews, HR follow-ups) should happen before rejection.
      </li>
      <li>
        Applications are automatically{" "}
        <span className="font-semibold">sorted by submission date</span>. The
        most recent applications appear first.
      </li>
      <li>
        This page is <span className="font-semibold">restricted to
        administrators</span>. Unauthorized users are redirected to{" "}
        <span className="font-semibold">Login</span>.
      </li>
      <li>
        Application data is sensitive —{" "}
        <span className="font-semibold">do not share</span> without proper
        authorization and always{" "}
        <span className="font-semibold">respect applicant privacy</span>.
      </li>
      <li>
        For bulk processing, consider{" "}
        <span className="font-semibold">exporting applications</span> before
        rejecting them (feature can be added later).
      </li>
    </ul>
  </div>
</div>

    </div>
  );
};

export default ApplicationPage;
