"use client";

import { Job } from "@/store/slices/jobSlice";
import { application_url } from "@/utils/config";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface ManagementProfessionalMenuProps {
  managementProfessionalJobs: Job[];
}

interface ApplicationForm {
  job: string; 
  first_name: string;
  last_name: string;
  graduated_from: string;
  percentage_of_grade: number;
  current_employer: string;
  current_designation: string;
  location_preference: string;
  availability: string;
  email: string;
}

interface Application {
  job: string; 
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
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface APIResponse {
  success: boolean;
  application: Application;
}

export default function ManagementProfessionalMenu({
  managementProfessionalJobs,
}: ManagementProfessionalMenuProps) {
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ApplicationForm>();

  const onSubmit = async (formData: ApplicationForm) => {
    const toastId = toast.loading("Submitting...");
    console.log("This is the job_id : ",selectedJobId)
    try {
      const { data } = await axios.post<APIResponse>(application_url, formData);

      if (data.success) {
        toast.success("Application submitted");
        reset();
        setOpen(false);
        setSelectedJobId(null);
      } else {
        toast.error("Internal server error");
      }
    } catch (e) {
      toast.error("Submission failed");
      console.log("This is the error : ", e);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleApplyClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setValue("job", jobId);
    setOpen(true);
  };

  return (
    <div className="w-11/12 mx-auto">
      {managementProfessionalJobs.length > 0 ? (
        <ul className="w-full space-y-8 px-1  md:px-6 py-2 md:py-10 bg-slate-100">
          {managementProfessionalJobs.map((job: Job, idx: number) => (
            <li
              key={job._id}
              className={`p-2 md:p-6 ${
                idx !== managementProfessionalJobs.length - 1
                  ? "border-b-2 border-slate-300"
                  : ""
              }`}
            >
              {/* Practices */}
              <div>
                <p className="text-xl md:text-3xl font-bold mb-2">Practices:</p>
                <ul className="list-disc list-inside text-sm md:text-2xl space-y-1 text-slate-500 marker:text-purple-900">
                  {job.practices.map((practice, index) => (
                    <li key={index}>{practice}</li>
                  ))}
                </ul>
              </div>

              {/* Experience */}
              <div className="flex gap-3 items-center mt-4">
                <p className="text-xl md:text-3xl font-bold">Experience:</p>
                <p className="text-sm md:text-2xl text-slate-500">{job.experience} years</p>
              </div>

              {/* Locations */}
              <div className="mt-4">
                <p className="text-xl md:text-3xl font-bold mb-2">Locations:</p>
                <ul className="list-disc list-inside text-sm md:text-2xl space-y-1 text-slate-500 marker:text-purple-900">
                  {job.locations.map((location, index) => (
                    <li key={index}>{location}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mt-4">
                <p className="text-xl md:text-3xl font-bold mb-2">Requirements:</p>
                <ul className="list-disc list-inside text-sm md:text-2xl space-y-1 text-slate-500 marker:text-purple-900">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
              <Button 
                className="mt-10"
                onClick={() => handleApplyClick(job._id)}
              >
                Apply Now
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-center font-medium">
          No job posts yet
        </p>
      )}

      {/* Application Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Apply for Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("job")} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input {...register("first_name", { required: true })} placeholder="First Name" className="border p-2 rounded text-xs sm:text-sm md:text-md" />
              <input {...register("last_name", { required: true })} placeholder="Last Name" className="border p-2 rounded text-xs sm:text-sm md:text-md" />
              <input {...register("graduated_from", { required: true })} placeholder="Graduated From" className="border p-2 rounded text-xs sm:text-sm md:text-md" />
              <input type="number" {...register("percentage_of_grade", { required: true })} placeholder="Percentage/Grade" className="border p-2 rounded text-xs sm:text-sm md:text-md" />
              <input {...register("current_employer", { required: true })} placeholder="Current Employer" className="border p-2 rounded text-xs sm:text-sm md:text-md" />
              <input {...register("current_designation", { required: true })} placeholder="Current Designation" className="border p-2 rounded text-xs sm:text-sm md:text-md" />
              <select {...register("location_preference", { required: true })} className="border p-2 rounded text-xs sm:text-sm md:text-md">
                <option value="">Select Location Preference</option>
                <option value="Haryana">Haryana</option>
              </select>
              <input type="date" {...register("availability", { required: true })} className="border p-2 rounded text-xs sm:text-sm md:text-md" />
              <input type="email" {...register("email", { required: true })} placeholder="Email" className="border p-2 rounded text-xs sm:text-sm md:text-md col-span-2" />
            </div>
            <Button type="submit" className="w-full bg-purple-900 text-white">Submit Application</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
