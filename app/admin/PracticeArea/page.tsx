"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { practice_area_url } from "@/utils/config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  setPracticeAreas,
  setLoading,
  setError,
  PracticeArea,
} from "@/store/slices/practiceareaSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { DecodedToken } from "../page";

// API Response type
interface PracticeAreaAPIResponse {
  success: boolean;
  practiceAreas: PracticeArea[];
}

// Define Practice Area Columns
export const practiceAreaColumns: ColumnDef<PracticeArea>[] = [
  {
    accessorKey: "name",
    header: "Practice Area Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toDateString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => new Date(row.original.updatedAt).toDateString(),
  },
];

export default function PracticeAreaTablePage() {
    const dispatch = useDispatch();
    const { practiceareas } = useSelector((state: RootState) => state.practicearea);
  
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const router = useRouter(); 
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [newPracticeArea, setNewPracticeArea] = useState("");
    const [selectedPracticeArea, setSelectedPracticeArea] = useState<PracticeArea | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
      
        try {
          const decoded= jwtDecode<DecodedToken>(token);
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
      if (!practiceareas || practiceareas.length === 0) {
        const fetchPracticeAreas = async () => {
          const toastId = toast.loading("Loading results...");
          try {
            dispatch(setLoading(true));
            const { data } = await axios.get<PracticeAreaAPIResponse>(practice_area_url);
            dispatch(setPracticeAreas(data.practiceAreas));
          } catch (err) {
            console.error("Error fetching practice areas:", err);
            dispatch(setError("Failed to fetch practice areas"));
            toast.error("Failed to fetch practice areas");
          } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
          }
        };
  
        fetchPracticeAreas();
      }
    }, [dispatch, practiceareas]);
  
    const handleAddPracticeArea = async () => {
      if (!newPracticeArea.trim()) {
        toast.error("Name is required");
        return;
      }
      const toastId = toast.loading("Adding practice area...");
      try {
        const { data } = await axios.post(practice_area_url, { name: newPracticeArea });
        dispatch(setPracticeAreas([...practiceareas, data.practiceArea]));
        toast.success("Practice area added!");
        setAddOpen(false);
        setNewPracticeArea("");
      } catch (err) {
        console.error("Error adding practice area:", err);
        toast.error("Failed to add practice area");
      } finally {
        toast.dismiss(toastId);
      }
    };
  
    const handleDeletePracticeArea = async (practiceArea: PracticeArea) => {
      const toastId = toast.loading("Deleting practice area...");
      try {
        await axios.delete(`${practice_area_url}/${practiceArea._id}`);
        dispatch(setPracticeAreas(practiceareas.filter((p) => p._id !== practiceArea._id)));
        toast.success("Practice area deleted!");
      } catch (err) {
        console.error("Error deleting practice area:", err);
        toast.error("Failed to delete practice area");
      } finally {
        toast.dismiss(toastId);
      }
    };
  
    const handleUpdatePracticeArea = async () => {
      if (!selectedPracticeArea?.name.trim()) {
        toast.error("Name is required");
        return;
      }
      const toastId = toast.loading("Updating practice area...");
      try {
        const { data } = await axios.put(`${practice_area_url}/${selectedPracticeArea._id}`, {
          name: selectedPracticeArea.name,
        });
        dispatch(
          setPracticeAreas(
            practiceareas.map((p) => (p._id === data.practiceArea._id ? data.practiceArea : p))
          )
        );
        toast.success("Practice area updated!");
        setUpdateOpen(false);
        setSelectedPracticeArea(null);
      } catch (err) {
        console.error("Error updating practice area:", err);
        toast.error("Failed to update practice area");
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
      <div className="w-full p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Practice Areas</h1>
  
          {/* Add Modal */}
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>Add +</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Practice Area</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Practice Area Name"
                  value={newPracticeArea}
                  onChange={(e) => setNewPracticeArea(e.target.value)}
                />
                <Button onClick={handleAddPracticeArea} className="w-full">
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
  
          {/* Update Modal */}
          <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Practice Area</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Practice Area Name"
                  value={selectedPracticeArea?.name || ""}
                  onChange={(e) =>
                    setSelectedPracticeArea((prev) =>
                      prev ? { ...prev, name: e.target.value } : null
                    )
                  }
                />
                <Button onClick={handleUpdatePracticeArea} className="w-full">
                  Update
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
  
        <DataTable
          columns={practiceAreaColumns}
          data={practiceareas}
          onDelete={handleDeletePracticeArea}
          onUpdate={(practiceArea) => {
            setSelectedPracticeArea(practiceArea);
            setUpdateOpen(true);
          }}
        />
  
  <div className="mt-10 p-6 bg-purple-50 border border-purple-200 rounded-lg">
  <h2 className="text-lg font-semibold mb-2 text-purple-900">Admin Instructions</h2>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li>
      Use the <span className="text-green-600 font-semibold">&quot;Add +&quot;</span> button to create a new Practice Area.
    </li>
    <li>Ensure that the Practice Area name is descriptive and unique.</li>
    <li>
      After submission, the table will automatically update with the new entry.
    </li>
    <li>
      Verify the name before adding to prevent duplicates or incorrect entries.
    </li>
    <li>
      Use the table to view creation and 
      <span className="text-blue-600 font-semibold"> update </span> 
      dates for reference.
    </li>
    <li>
      To remove an entry, use the 
      <span className="text-red-600 font-semibold"> Delete </span> 
      button. Deletions are permanent, so confirm before proceeding.
    </li>
  </ul>
</div>


      </div>
    );
  }
  
