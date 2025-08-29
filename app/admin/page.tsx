"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { publications_Url, practice_area_url } from "../../utils/config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  setPublications,
  setLoading,
  setError,
  Publication,
} from "../../store/slices/publicationSlice";
import { setPracticeAreas } from "@/store/slices/practiceareaSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { practiceAreas } from "@/components/About";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";





interface PublicationAPIResponse {
  success: boolean;
  publications: Publication[];
}

interface PracticeArea {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PracticeAreaAPIResponse {
  success: boolean;
  practiceAreas: PracticeArea[];
}

interface CreatePublicationResponse {
  success: boolean;
  publication: Publication;
}


export interface DecodedToken {
    role: string;
  
  }

// Publication Table Columns
const publicationColumns: ColumnDef<Publication>[] = [
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "authors",
    header: "Authors",
    cell: ({ row }) => row.original.authors.join(", "),
  },
  {
    accessorKey: "published_on",
    header: "Year",
    cell: ({ row }) => new Date(row.original.published_on).getFullYear(),
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) =>
      row.original.link ? (
        <a
          href={row.original.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline"
        >
          View
        </a>
      ) : (
        "—"
      ),
  },
];

export default function PublicationTablePage() {
    const dispatch = useDispatch();
    const { publications } = useSelector((state: RootState) => state.publication);
    const { practiceareas } = useSelector((state: RootState) => state.practicearea);
    const router = useRouter(); 
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [formData, setFormData] = useState({
        practice_area: "",
        published_on: "",
        authors: "",
        title: "",
        description: "",
        link: "",
    });
    const [selectedPublication, setSelectedPublication] =useState<Publication | null>(null);
    
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
  
   
    // Fetch publications & practice areas
    useEffect(() => {
    
    // if (!isAuthorized) return; 

    const fetchAllData = async () => {
      const toastId = toast.loading("Loading data...");
      try {
        dispatch(setLoading(true));

        const { data: pubData } = await axios.get<PublicationAPIResponse>(
          publications_Url
        );
        const uniqueYears = Array.from(
          new Set(
            pubData.publications.map((pub: Publication) =>
              new Date(pub.published_on).getFullYear().toString()
            )
          )
        );
        const areasFromApi = pubData.publications.map(
          (publication: Publication) => publication.practice_area?.name
        );
        dispatch(
          setPublications({
            publications: pubData.publications,
            practiceAreas: areasFromApi,
            years: ["All", ...uniqueYears],
          })
        );

        if (!practiceareas || practiceareas.length === 0) {
          const { data: areaData } = await axios.get<PracticeAreaAPIResponse>(
            practice_area_url
          );
          dispatch(setPracticeAreas(areaData.practiceAreas));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        dispatch(setError("Failed to fetch data"));
        toast.error("Failed to fetch data");
      } finally {
        toast.dismiss(toastId);
        dispatch(setLoading(false));
      }
    };

    if (
      publications.length === 0 ||
      (practiceareas && practiceareas.length === 0)
    ) {
      fetchAllData();
    }
  }, [dispatch, publications.length, practiceareas]);

  // Add Publication
  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.link ||
      !formData.practice_area ||
      !formData.published_on
    ) {
      toast.error("Please fill required fields");
      return;
    }

    const toastId = toast.loading("Creating publication...");
    try {
      const payload = {
        ...formData,
        authors: formData.authors
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a.length > 0),
      };
      const { data } = await axios.post<CreatePublicationResponse>(
        publications_Url,
        payload
      );

      if (data.success) {
        dispatch(
          setPublications({
            publications: [...publications, data.publication],
            practiceAreas: [...practiceAreas, formData.practice_area],
            years: [
              "All",
              ...new Set(
                [...publications, data.publication].map((p) =>
                  new Date(p.published_on).getFullYear().toString()
                )
              ),
            ],
          })
        );
        toast.success("Publication created!");
        setAddOpen(false);
        setFormData({
          practice_area: "",
          published_on: "",
          authors: "",
          title: "",
          description: "",
          link: "",
        });
      }
    } catch (err) {
      console.error("Error creating publication:", err);
      toast.error("Failed to create publication");
    } finally {
      toast.dismiss(toastId);
    }
  };

  // Update Publication
  const handleUpdatePublication = async () => {
    if (!selectedPublication) return;
    const toastId = toast.loading("Updating publication...");
    try {
      const payload = {
        ...selectedPublication,
        authors: selectedPublication.authors.join(","),
      };
      const { data } = await axios.put(
        `${publications_Url}/${selectedPublication._id}`,
        payload
      );

      dispatch(
        setPublications({
          publications: publications.map((p) =>
            p._id === data.publication._id ? data.publication : p
          ),
          practiceAreas: practiceAreas,
          years: [
            "All",
            ...new Set(
              publications.map((p) =>
                new Date(p.published_on).getFullYear().toString()
              )
            ),
          ],
        })
      );
      toast.success("Publication updated!");
      setUpdateOpen(false);
      setSelectedPublication(null);
    } catch (err) {
      console.error("Error updating publication:", err);
      toast.error("Failed to update publication");
    } finally {
      toast.dismiss(toastId);
    }
  };

  // Delete Publication
  const handleDeletePublication = async (publication: Publication) => {
    const toastId = toast.loading("Deleting publication...");
    try {
      await axios.delete(`${publications_Url}/${publication._id}`);
      dispatch(
        setPublications({
          publications: publications.filter((p) => p._id !== publication._id),
          practiceAreas: practiceAreas,
          years: [
            "All",
            ...new Set(
              publications
                .filter((p) => p._id !== publication._id)
                .map((p) => new Date(p.published_on).getFullYear().toString())
            ),
          ],
        })
      );
      toast.success("Publication deleted!");
    } catch (err) {
      console.error("Error deleting publication:", err);
      toast.error("Failed to delete publication");
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
        <h1 className="text-2xl font-bold">Publications Table</h1>

        {/* Add Publication Modal */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>Add +</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            {" "}
            <DialogHeader>
              {" "}
              <DialogTitle>Add Publication</DialogTitle>{" "}
            </DialogHeader>{" "}
            <div className="grid gap-4 py-4">
              {" "}
              <div className="grid gap-2">
                {" "}
                <Label>Practice Area</Label>{" "}
                <Select
                  value={formData.practice_area}
                  onValueChange={(val) =>
                    setFormData({ ...formData, practice_area: val })
                  }
                >
                  {" "}
                  <SelectTrigger>
                    {" "}
                    <SelectValue placeholder="Select practice area" />{" "}
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {" "}
                    {practiceareas.map((area: PracticeArea) => (
                      <SelectItem key={area._id} value={area._id}>
                        {" "}
                        {area.name}{" "}
                      </SelectItem>
                    ))}{" "}
                  </SelectContent>{" "}
                </Select>{" "}
              </div>{" "}
              <div className="grid gap-2">
                {" "}
                <Label>Title</Label>{" "}
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />{" "}
              </div>{" "}
              <div className="grid gap-2">
                {" "}
                <Label>Description</Label>{" "}
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />{" "}
              </div>{" "}
              <div className="grid gap-2">
                {" "}
                <Label>Authors (comma separated)</Label>{" "}
                <Input
                  value={formData.authors}
                  onChange={(e) =>
                    setFormData({ ...formData, authors: e.target.value })
                  }
                />{" "}
              </div>{" "}
              <div className="grid gap-2">
                {" "}
                <Label>Published On</Label>{" "}
                <Input
                  type="date"
                  value={formData.published_on}
                  onChange={(e) =>
                    setFormData({ ...formData, published_on: e.target.value })
                  }
                />{" "}
              </div>{" "}
              <div className="grid gap-2">
                {" "}
                <Label>Link</Label>{" "}
                <Input
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />{" "}
              </div>{" "}
            </div>{" "}
            <DialogFooter>
              {" "}
              <Button onClick={handleSubmit}>Submit</Button>{" "}
            </DialogFooter>{" "}
          </DialogContent>{" "}
        </Dialog>

        {/* Update Publication Modal */}
        <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Update Publication</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Select
                value={selectedPublication?.practice_area?._id || ""}
                onValueChange={(val) =>
                  setSelectedPublication((prev) =>
                    prev
                      ? {
                          ...prev,
                          practice_area:
                            practiceareas.find((area) => area._id === val) ||
                            prev.practice_area,
                        }
                      : null
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select practice area" />
                </SelectTrigger>
                <SelectContent>
                  {practiceareas.map((area) => (
                    <SelectItem key={area._id} value={area._id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                value={selectedPublication?.title || ""}
                onChange={(e) =>
                  setSelectedPublication((prev) =>
                    prev ? { ...prev, title: e.target.value } : null
                  )
                }
              />
              <Textarea
                value={selectedPublication?.description || ""}
                onChange={(e) =>
                  setSelectedPublication((prev) =>
                    prev ? { ...prev, description: e.target.value } : null
                  )
                }
              />
              <Input
                value={selectedPublication?.authors.join(",") || ""}
                onChange={(e) =>
                  setSelectedPublication((prev) =>
                    prev
                      ? {
                          ...prev,
                          authors: e.target.value
                            .split(",")
                            .map((a) => a.trim()),
                        }
                      : null
                  )
                }
              />
              <Input
                type="date"
                value={selectedPublication?.published_on || ""}
                onChange={(e) =>
                  setSelectedPublication((prev) =>
                    prev ? { ...prev, published_on: e.target.value } : null
                  )
                }
              />
              <Input
                value={selectedPublication?.link || ""}
                onChange={(e) =>
                  setSelectedPublication((prev) =>
                    prev ? { ...prev, link: e.target.value } : null
                  )
                }
              />
            </div>
            <DialogFooter>
              <Button onClick={handleUpdatePublication}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={publicationColumns}
        data={publications}
        onDelete={handleDeletePublication}
        onUpdate={(publication) => {
          setSelectedPublication(publication);
          setUpdateOpen(true);
        }}
      />

      {/* Admin Instructions */}
      <div className="mt-10 p-6 bg-purple-50 border border-purple-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-purple-900">
          Admin Instructions
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Use the &quot;Add +&quot; button to create a new publication.</li>
          <li>
            Ensure that all required fields (Title, Link, Practice Area,
            Published On) are filled before submitting.
          </li>
          <li>Authors should be entered as a comma-separated list.</li>
          <li>
            The &quot;Link&quot; field should point to the official publication URL.
          </li>
          <li>You can view existing publications directly in the table.</li>
          <li>
            Use the update button to modify any publication. Ensure data is
            correct before submitting updates.
          </li>
          <li>
            Use the delete button to remove publications that are outdated or
            incorrect.
          </li>
        </ul>
      </div>
    </div>
  );
}
