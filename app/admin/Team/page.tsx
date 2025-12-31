"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { teams_url,practice_area_url } from "@/utils/config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  setTeam,
  setLoading,
  setError,
  TeamMember,
  Expertise
} from "@/store/slices/teamSlice";
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
import {
    setPracticeAreas,
    PracticeArea,
} from "@/store/slices/practiceareaSlice";
import { Checkbox } from "@/components/ui/checkbox";




interface PracticeAreaAPIResponse {
    success: boolean;
    practiceAreas: PracticeArea[];
  }

// API Response type
interface TeamAPIResponse {
  success: boolean;
  teamMembers: TeamMember[];
}

// Define Team Member Columns
export const teamColumns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "email",
    header: "Email",
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
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const url = row.original.image_url;
      const displayText = url.length > 30 ? url.slice(0, 30) + "..." : url;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {displayText}
        </a>
      );
    },
  }
  
];

export default function TeamPage() {
  const dispatch = useDispatch();
  const { team } = useSelector((state: RootState) => state.team);
  const { practiceareas } = useSelector((state: RootState) => state.practicearea);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({});
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(
    null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role === "admin") setIsAuthorized(true);
      else router.push("/login");
    } catch {
      router.push("/login");
    }
  }, [router]);

  // Fetch team members
  useEffect(() => {
    if (!team || team.length === 0) {
      const fetchTeam = async () => {
        const toastId = toast.loading("Loading team members...");
        try {
          dispatch(setLoading(true));
          const { data } = await axios.get<TeamAPIResponse>(teams_url);
          dispatch(setTeam(data.teamMembers));
        } catch (err) {
          dispatch(setError("Failed to fetch team members"));
          toast.error("Failed to fetch team members");
        } finally {
          toast.dismiss(toastId);
          dispatch(setLoading(false));
        }
      };
      fetchTeam();
    }
  }, [dispatch, team]);


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


  const handleAddMember = async () => {
    if (!newMember.name?.trim()) {
      toast.error("Name is required");
      return;
    }
    console.log("This is team Member ",newMember)
    const toastId = toast.loading("Adding team member...");
    try {
      const formData = new FormData();

      Object.entries(newMember).forEach(([key, value]) => {
        if (key === "expertise" && Array.isArray(value)) {
          (value as Expertise[]).forEach((v) => formData.append("expertise", v._id));
        } 
        else if (key === "contacts" && Array.isArray(value)) {
          (value as string[])
            .filter((phone) => phone.trim() !== "")
            .forEach((phone) => formData.append("contacts", phone));
        }
        else if (value) formData.append(key, value as string);
      });
  
      if (imageFile) formData.append("imageFile", imageFile);
  
      

      
      console.log("This is the formData : ",formData)

      const { data } = await axios.post(teams_url, formData);
      console.log("This is the api response : ",data)
      dispatch(setTeam([...team, data.teamMember]));
      toast.success("Team member added!");
      setAddOpen(false);
      setNewMember({});
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add team member");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleDeleteMember = async (member: TeamMember) => {
    const toastId = toast.loading("Deleting team member...");
    try {
      await axios.delete(`${teams_url}/${member._id}`);
      dispatch(setTeam(team.filter((m:TeamMember) => m._id !== member._id)));
      toast.success("Team member deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete team member");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleUpdateMember = async () => {
    if (!selectedMember?.name?.trim()) {
      toast.error("Name is required");
      return;
    }
    
    console.log("This is the selected member : ",selectedMember)

    const toastId = toast.loading("Updating team member...");
    try {

      const formData = new FormData();
      Object.entries(selectedMember).forEach(([key, value]) => {
        if (key === "expertise" && Array.isArray(value)) {
          (value as Expertise[]).forEach((v) => formData.append("expertise", v._id));
        } 
        else if (key === "contacts" && Array.isArray(value)) {
          value
            .filter((phone) => phone.trim() !== "")
            .forEach((phone) => formData.append("contacts", phone));
        } 
        else if (value) formData.append(key, value as string);
      });
      if (imageFile) formData.append("imageFile", imageFile);

      const { data } = await axios.put(
        `${teams_url}/${selectedMember._id}`,
        formData
      );

      console.log("This is the upadation response : ",data)
      dispatch(
        setTeam(
          team.map((m:TeamMember) =>
            m._id === data.teamMember._id ? data.teamMember : m
          )
        )
      );
      toast.success("Team member updated!");
      setUpdateOpen(false);
      setSelectedMember(null);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update team member");
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
        <h1 className="text-2xl font-bold">Team Members</h1>

        {/* Add Modal */}
      
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
  <DialogTrigger asChild>
    <Button>Add +</Button>
  </DialogTrigger>

  <DialogContent className="max-h-[100vh] overflow-auto">
    <DialogHeader>
      <DialogTitle>Add Team Member</DialogTitle>
    </DialogHeader>

    {/* Scrollable Inputs Section */}
    <div className="max-h-[55vh] overflow-y-auto p-2 space-y-2">
      <Input
        placeholder="Name"
        value={newMember.name || ""}
        onChange={(e) =>
          setNewMember({ ...newMember, name: e.target.value })
        }
      />

      <Input
        placeholder="Designation"
        value={newMember.designation || ""}
        onChange={(e) =>
          setNewMember({ ...newMember, designation: e.target.value })
        }
      />

      <Input
        placeholder="Email"
        type="email"
        value={newMember.email || ""}
        onChange={(e) =>
          setNewMember({ ...newMember, email: e.target.value })
        }
      />

      {/* Phone Numbers */}
      <div className="space-y-2 space-x-2">
        <label className="font-medium">Phone Numbers</label>

        {newMember.contacts?.map((phone, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Phone number"
              value={phone}
              onChange={(e) => {
                const updated = [...(newMember.contacts || [])];
                updated[index] = e.target.value;
                setNewMember({ ...newMember, contacts: updated });
              }}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const updated = newMember.contacts?.filter((_, i) => i !== index);
                setNewMember({ ...newMember, contacts: updated });
              }}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setNewMember({
              ...newMember,
              contacts: [...(newMember.contacts || []), ""],
            })
          }
        >
          + Add Phone Number
        </Button>
      </div>

      <Input
        placeholder="Bio"
        value={newMember.bio || ""}
        onChange={(e) =>
          setNewMember({ ...newMember, bio: e.target.value })
        }
      />

      <Input
        placeholder="Twitter"
        value={newMember.twitter || ""}
        onChange={(e) =>
          setNewMember({ ...newMember, twitter: e.target.value })
        }
      />

      <Input
        placeholder="LinkedIn"
        value={newMember.linkedin || ""}
        onChange={(e) =>
          setNewMember({ ...newMember, linkedin: e.target.value })
        }
      />

      <Input
        placeholder="Facebook"
        value={newMember.facebook || ""}
        onChange={(e) =>
          setNewMember({ ...newMember, facebook: e.target.value })
        }
      />

      <Input
        placeholder="Instagram"
        value={newMember.instagram || ""}
        onChange={(e) =>
          setNewMember({ ...newMember, instagram: e.target.value })
        }
      />

      {/* Locations */}
<div className="space-y-2 space-x-2">
  <label className="font-medium">Locations</label>

  {newMember.location?.map((loc, index) => (
    <div key={index} className="flex gap-2">
      <Input
        placeholder="Location"
        value={loc}
        onChange={(e) => {
          const updated = [...(newMember.location || [])];
          updated[index] = e.target.value;
          setNewMember({ ...newMember, location: updated });
        }}
      />

      <Button
        type="button"
        variant="destructive"
        onClick={() => {
          const updated = newMember.location?.filter((_, i) => i !== index);
          setNewMember({ ...newMember, location: updated });
        }}
      >
        Remove
      </Button>
    </div>
  ))}

  <Button
    type="button"
    variant="outline"
    onClick={() =>
      setNewMember({
        ...newMember,
        location: [...(newMember.location || []), ""],
      })
    }
  >
    + Add Location
  </Button>
</div>

    </div>

    {/* Fixed Bottom Section */}
    <div className="pt-4 space-y-4 border-t">
      {/* Expertise */}
      <div className="space-y-2">
        <label className="font-medium">Expertise</label>
        <div className="flex flex-col space-y-1 max-h-40 overflow-y-auto border p-2 rounded">
          {practiceareas.map((pa) => (
            <div key={pa._id} className="flex items-center space-x-2">
              <Checkbox
                checked={!!newMember.expertise?.some((e) => e._id === pa._id)}
                onCheckedChange={(checked) => {
                  let updated = newMember.expertise
                    ? [...newMember.expertise]
                    : [];
                  checked
                    ? updated.push({ _id: pa._id, name: pa.name })
                    : (updated = updated.filter((e) => e._id !== pa._id));
                  setNewMember({ ...newMember, expertise: updated });
                }}
              />
              <span>{pa.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Input
        type="file"
        onChange={(e) =>
          setImageFile(e.target.files ? e.target.files[0] : null)
        }
      />

      <Button onClick={handleAddMember} className="w-full">
        Submit
      </Button>
    </div>
  </DialogContent>
</Dialog>





        {/* Update Modal */}
        <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
  <DialogContent className="max-h-[100vh] overflow-auto">
    <DialogHeader>
      <DialogTitle>Update Team Member</DialogTitle>
    </DialogHeader>

    {/* Scrollable Inputs Section */}
    <div className="max-h-[55vh] overflow-y-auto p-2 space-y-2">
      <Input
        placeholder="Name"
        value={selectedMember?.name || ""}
        onChange={(e) =>
          setSelectedMember((prev) =>
            prev ? { ...prev, name: e.target.value } : null
          )
        }
      />

      <Input
        placeholder="Designation"
        value={selectedMember?.designation || ""}
        onChange={(e) =>
          setSelectedMember((prev) =>
            prev ? { ...prev, designation: e.target.value } : null
          )
        }
      />

      <Input
        placeholder="Email"
        type="email"
        value={selectedMember?.email || ""}
        onChange={(e) =>
          setSelectedMember((prev) =>
            prev ? { ...prev, email: e.target.value } : null
          )
        }
      />

      {/* Phone Numbers */}
      <div className="space-y-2 space-x-2">
        <label className="font-medium">Phone Numbers</label>

        {selectedMember?.contacts?.map((phone, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Phone number"
              value={phone}
              onChange={(e) => {
                if (!selectedMember) return;
                const updated = [...selectedMember.contacts];
                updated[index] = e.target.value;
                setSelectedMember({ ...selectedMember, contacts: updated });
              }}
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (!selectedMember) return;
                const updated = selectedMember.contacts.filter(
                  (_, i) => i !== index
                );
                setSelectedMember({ ...selectedMember, contacts: updated });
              }}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (!selectedMember) return;
            setSelectedMember({
              ...selectedMember,
              contacts: [...(selectedMember.contacts || []), ""],
            });
          }}
        >
          + Add Phone Number
        </Button>
      </div>

      <Input
        placeholder="Bio"
        value={selectedMember?.bio || ""}
        onChange={(e) =>
          setSelectedMember((prev) =>
            prev ? { ...prev, bio: e.target.value } : null
          )
        }
      />

      <Input
        placeholder="Twitter"
        value={selectedMember?.twitter || ""}
        onChange={(e) =>
          setSelectedMember((prev) =>
            prev ? { ...prev, twitter: e.target.value } : null
          )
        }
      />

      <Input
        placeholder="LinkedIn"
        value={selectedMember?.linkedin || ""}
        onChange={(e) =>
          setSelectedMember((prev) =>
            prev ? { ...prev, linkedin: e.target.value } : null
          )
        }
      />

      <Input
        placeholder="Facebook"
        value={selectedMember?.facebook || ""}
        onChange={(e) =>
          setSelectedMember((prev) =>
            prev ? { ...prev, facebook: e.target.value } : null
          )
        }
      />

      <Input
        placeholder="Instagram"
        value={selectedMember?.instagram || ""}
        onChange={(e) =>
          setSelectedMember((prev) =>
            prev ? { ...prev, instagram: e.target.value } : null
          )
        }
      />

      {/* Locations */}
      <div className="space-y-2 space-x-2">
        <label className="font-medium">Locations</label>

        {selectedMember?.location?.map((loc, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Location"
              value={loc}
              onChange={(e) => {
                if (!selectedMember) return;
                const updated = [...selectedMember.location];
                updated[index] = e.target.value;
                setSelectedMember({ ...selectedMember, location: updated });
              }}
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (!selectedMember) return;
                const updated = selectedMember.location.filter(
                  (_, i) => i !== index
                );
                setSelectedMember({ ...selectedMember, location: updated });
              }}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (!selectedMember) return;
            setSelectedMember({
              ...selectedMember,
              location: [...(selectedMember.location || []), ""],
            });
          }}
        >
          + Add Location
        </Button>
      </div>
    </div>

    {/* Fixed Bottom Section */}
    <div className="pt-4 space-y-4 border-t">
      {/* Expertise */}
      <div className="space-y-2">
        <label className="font-medium">Expertise</label>
        <div className="flex flex-col space-y-1 max-h-40 overflow-y-auto border p-2 rounded">
          {practiceareas.map((pa) => (
            <div key={pa._id} className="flex items-center space-x-2">
              <Checkbox
                checked={!!selectedMember?.expertise?.some(
                  (e) => e._id === pa._id
                )}
                onCheckedChange={(checked) => {
                  if (!selectedMember) return;
                  let updated = selectedMember.expertise
                    ? [...selectedMember.expertise]
                    : [];
                  checked
                    ? updated.push({ _id: pa._id, name: pa.name })
                    : (updated = updated.filter((e) => e._id !== pa._id));
                  setSelectedMember({ ...selectedMember, expertise: updated });
                }}
              />
              <span>{pa.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Input
        type="file"
        onChange={(e) =>
          setImageFile(e.target.files ? e.target.files[0] : null)
        }
      />

      <Button onClick={handleUpdateMember} className="w-full">
        Update
      </Button>
    </div>
  </DialogContent>
</Dialog>



      </div>

      <DataTable
        columns={teamColumns}
        data={team}
        onDelete={handleDeleteMember}
        onUpdate={(member) => {
          setSelectedMember(member);
          setUpdateOpen(true);
        }}
      />
      
      <div className="mt-10">
  <div className="bg-purple-50 border border-purple-200 rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-bold mb-3 text-purple-900">
      Admin Instructions
    </h2>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      <li>
        This page allows you to <span className="font-semibold">manage team members</span> for the website.
      </li>
      <li>
        Use the <span className="text-green-600 font-semibold">Add +</span> button to create a new team member. 
        Fill in all required fields such as <span className="font-semibold">name, designation, email, bio</span>, and upload an image.
      </li>
      <li>
        The <span className="font-semibold">profile image link</span> is hosted on 
        <span className="font-semibold text-sky-600"> Cloudinary</span> and is accessible directly from the table.
      </li>
      <li>
        You can assign multiple <span className="font-semibold">practice areas (expertise)</span> by selecting from the available list.
      </li>
      <li>
        Each member’s <span className="font-semibold">social links</span> (Twitter, LinkedIn, Facebook, Instagram) and 
        <span className="font-semibold">contacts</span> can also be added.
      </li>
      <li>
        Click the <span className="text-blue-600 font-semibold">Update</span> button to edit an existing team member’s details.
        The update form is pre-filled with the current information.
      </li>
      <li>
        Use the <span className="text-red-600 font-semibold">Delete</span> button to remove a team member.
        Deletions are <span className="italic">permanent</span> and cannot be undone.
      </li>
      <li>
        Team members are displayed in a <span className="font-semibold">table</span> with details like 
        name, designation, email, and profile image link.
      </li>
      <li>
        This page is <span className="font-semibold">restricted</span> to administrators only. Unauthorized users 
        will be redirected to <span className="font-semibold">Login</span>.
      </li>
      <li>
        Ensure all team member details are accurate, as they will be displayed on the public site.
      </li>
      <li>
        Upload only <span className="font-semibold">.jpg</span>, <span className="font-semibold">.png</span> and <span className="font-semibold">.jpeg</span> only.
      </li>
    </ul>
  </div>
</div>


    </div>
  );
}
