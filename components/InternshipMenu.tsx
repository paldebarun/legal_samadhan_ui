"use client";

import { Job } from "@/store/slices/jobSlice";
import { application_url } from "@/utils/config";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface InternshipMenuProps {
  internshipJobs: Job[];
}

interface InternshipApplicationForm {
  job: string;
  first_name: string;
  last_name: string;
  college: string;
  current_year_in_college: number;
  email: string;
  location_preference: string;
  availability: string;
}

interface Application {
  job: string;
  first_name: string;
  last_name: string;
  college: string;
  current_year_in_college: number;
  email: string;
  location_preference: string;
  availability: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface APIResponse {
  success: boolean;
  application: Application;
}

export default function InternshipMenu({ internshipJobs }: InternshipMenuProps) {
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<InternshipApplicationForm>();

  const onSubmit = async (formData: InternshipApplicationForm) => {
    console.log("This is the selected job id : ",selectedJobId)
    const toastId = toast.loading("Submitting...");
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
      console.error("Error submitting internship application:", e);
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
      {internshipJobs.length > 0 ? (
        <ul className="w-full space-y-8 px-1 md:px-6 py-2 md:py-10 bg-slate-100">
          {internshipJobs.map((job: Job, idx: number) => (
            <li
              key={job._id}
              className={`p-2 md:p-6 ${
                idx !== internshipJobs.length - 1 ? "border-b-2 border-slate-300" : ""
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

              {/* Experience (optional for internship) */}
              {job.experience > 0 && (
                <div className="flex gap-3 items-center mt-4">
                  <p className="text-xl md:text-3xl font-bold">Experience:</p>
                  <p className="text-sm md:text-2xl text-slate-500">{job.experience} years</p>
                </div>
              )}

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

              <Button className="mt-10" onClick={() => handleApplyClick(job._id)}>
                Apply Now
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-center font-medium">No internship jobs available</p>
      )}

      {/* Application Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Apply for Internship</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("job")} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register("first_name", { required: true })}
                placeholder="First Name"
                className="border p-2 rounded text-xs sm:text-sm md:text-md"
              />
              <input
                {...register("last_name", { required: true })}
                placeholder="Last Name"
                className="border p-2 rounded text-xs sm:text-sm md:text-md"
              />
              <input
                {...register("college", { required: true })}
                placeholder="College"
                className="border p-2 rounded text-xs sm:text-sm md:text-md"
              />
              <input
                type="number"
                {...register("current_year_in_college", { required: true })}
                placeholder="Current Year in College"
                className="border p-2 rounded text-xs sm:text-sm md:text-md"
              />
              <select
      {...register("location_preference", { required: true })}
      className="border p-2 rounded text-xs sm:text-sm md:text-md"
    >
      <option value="">Select Location Preference</option>
      <option value="Haryana">Haryana</option>
     
    </select>
              <input
                type="date"
                {...register("availability", { required: true })}
                className="border p-2 rounded text-xs sm:text-sm md:text-md"
              />
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="border p-2 rounded text-xs sm:text-sm md:text-md col-span-2"
              />
            </div>
            <Button type="submit" className="w-full bg-purple-900 text-white">
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
