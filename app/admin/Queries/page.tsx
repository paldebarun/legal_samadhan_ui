"use client";

import React, { useEffect, useState } from "react";
import { messages_url } from "@/utils/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DecodedToken } from "../page";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export interface Query {
  _id: string;
  fullname: string;
  email: string;
  subject: string;
  message: string;
  agreement: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface QueryAPIResponse {
  success: boolean;
  messages: Query[];
}

const Querypage = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [queries, setQueries] = useState<Query[]>([]);



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
    const fetchQueries = async () => {
      const toastId = toast.loading("Loading queries...");
      try {
        
        const { data } = await axios.get<QueryAPIResponse>(messages_url);

        if (data.success) {
          setQueries(data.messages);
        } else {
          toast.error("Failed to load queries");
        }
      } catch (e) {
        console.error("Error fetching queries:", e);
        toast.error("Error fetching queries");
      } finally {

        toast.dismiss(toastId);
      }
    };

    if (isAuthorized) fetchQueries();
  }, [isAuthorized]);


  const handleDelete = async (id: string) => {
   

    const toastId = toast.loading("Deleting...");
    try {
     
      await axios.delete(`${messages_url}/${id}`);

      setQueries((prev) => prev.filter((q) => q._id !== id));
      toast.success("Query deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete query");
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
      <h1 className="text-2xl font-bold mb-6">User Queries</h1>

      {queries.length === 0 ? (
        <p className="text-gray-600">No queries found.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {queries.map((q:Query) => (
            <AccordionItem key={q._id} value={q._id}>
              <AccordionTrigger>
                {q.fullname} — {q.subject}
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  <span className="font-medium">Email:</span> {q.email}
                </p>
                <p className="mt-2">{q.message}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Submitted on {new Date(q.createdAt).toLocaleString()}
                </p>
                <div className="mt-4">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(q._id)}
                  >
                    Delete
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
        All <span className="font-semibold">user queries</span> are listed
        above in an <span className="font-semibold">accordion format</span>.
        Click a query to view its details.
      </li>
      <li>
        Each query displays the user’s{" "}
        <span className="font-semibold">name</span>,{" "}
        <span className="font-semibold">email</span>,{" "}
        <span className="font-semibold">subject</span>,{" "}
        <span className="font-semibold">message</span>, and{" "}
        <span className="font-semibold">submission date</span>.
      </li>
      <li>
        Use the <span className="text-red-600 font-semibold">Delete</span>{" "}
        button to remove spam or irrelevant queries. Deletions are{" "}
        <span className="italic">permanent</span> and cannot be undone.
      </li>
      <li>
        If the query is important, ensure it is{" "}
        <span className="font-semibold">handled offline</span> before deleting
        from the system.
      </li>
      <li>
        Queries are automatically{" "}
        <span className="font-semibold">sorted by submission time</span>. The
        latest queries appear on top.
      </li>
      <li>
        This page is <span className="font-semibold">restricted</span> to
        administrators only. Unauthorized users are redirected to{" "}
        <span className="font-semibold">Login</span>.
      </li>
      <li>
        Do not share query details publicly —{" "}
        <span className="font-semibold">respect user privacy</span> and
        maintain confidentiality.
      </li>
      <li>
        For large volumes of queries, consider{" "}
        <span className="font-semibold">downloading or exporting</span> the
        data before deletion (feature can be added later).
      </li>
    </ul>
  </div>
</div>

    </div>
  );
};

export default Querypage;


