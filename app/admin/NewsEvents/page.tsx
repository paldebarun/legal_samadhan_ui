"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { news_and_events_Url } from "@/utils/config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  setNewsEvents,
  setLoading,
  setError,
  NewsEvent,
} from "@/store/slices/newsSlice";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { DecodedToken } from "../page";

// API Response type
interface NewsEventAPIResponse {
  success: boolean;
  newsEvents: NewsEvent[];
}

interface CreateNewsEventResponse {
  success: boolean;
  newsEvent: NewsEvent;
}


// Table Columns
export const newsEventColumns: ColumnDef<NewsEvent>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toDateString(),
  },
  {
    accessorKey: "linkedin_url",
    header: "Link",
    cell: ({ row }) =>
      row.original.linkedin_url ? (
        <a
          href={row.original.linkedin_url}
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

export default function NewsTablePage() {
  const dispatch = useDispatch();
  const { newsEvents, loading } = useSelector((state: RootState) => state.news);
  const router = useRouter(); 
  const [addOpen, setAddOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "news",
    date: "",
    linkedin_url: "",
  });
  const [selectedNewsEvent, setSelectedNewsEvent] = useState<NewsEvent | null>(null);

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
    if (!newsEvents || newsEvents.length === 0) {
      const fetchNewsEvents = async () => {
        const toastId = toast.loading("Loading results...");
        try {
          dispatch(setLoading(true));
          const { data } = await axios.get<NewsEventAPIResponse>(news_and_events_Url);
          dispatch(setNewsEvents(data.newsEvents));
        } catch (err) {
          console.error("Error fetching news & events:", err);
          dispatch(setError("Failed to fetch news & events"));
        } finally {
          toast.dismiss(toastId);
          dispatch(setLoading(false));
        }
      };
      fetchNewsEvents();
    }
  }, [dispatch, newsEvents]);

  const handleSubmit = async () => {
    const toastId = toast.loading("Creating News/Event...");
    try {
      const { data } = await axios.post<CreateNewsEventResponse>(
        news_and_events_Url,
        formData
      );
      if (data.success) {
        dispatch(setNewsEvents([...newsEvents, data.newsEvent]));
        toast.success("News/Event created!");
        setAddOpen(false);
        setFormData({ title: "", category: "news", date: "", linkedin_url: "" });
      }
    } catch (err) {
      console.error("Error creating news event:", err);
      toast.error("Failed to create news/event");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleDelete = async (newsEvent: NewsEvent) => {
    const toastId = toast.loading("Deleting...");
    try {
      await axios.delete(`${news_and_events_Url}/${newsEvent._id}`);
      dispatch(setNewsEvents(newsEvents.filter((n) => n._id !== newsEvent._id)));
      toast.success("News/Event deleted!");
    } catch (err) {
      console.error("Error deleting news/event:", err);
      toast.error("Failed to delete news/event");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleUpdateNewsEvent = async () => {
    if (!selectedNewsEvent) return;
    const toastId = toast.loading("Updating News/Event...");
    try {
      const { data } = await axios.put(`${news_and_events_Url}/${selectedNewsEvent._id}`, selectedNewsEvent);
      dispatch(
        setNewsEvents(
          newsEvents.map((n) => (n._id === data.newsEvent._id ? data.newsEvent : n))
        )
      );
      toast.success("News/Event updated!");
      setUpdateOpen(false);
      setSelectedNewsEvent(null);
    } catch (err) {
      console.error("Error updating news/event:", err);
      toast.error("Failed to update news/event");
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
        <h1 className="text-2xl font-bold">News and Events</h1>

        {/* Add Modal */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button>Add +</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add News/Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Select
                value={formData.category}
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <Input
                placeholder="LinkedIn URL"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Update Modal */}
        <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Update News/Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Title"
                value={selectedNewsEvent?.title || ""}
                onChange={(e) =>
                  setSelectedNewsEvent((prev) => prev ? { ...prev, title: e.target.value } : null)
                }
              />
              <Select
                value={selectedNewsEvent?.category || "news"}
                onValueChange={(val) =>
                  setSelectedNewsEvent((prev) => prev ? { ...prev, category: val } : null)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={selectedNewsEvent?.date || ""}
                onChange={(e) =>
                  setSelectedNewsEvent((prev) => prev ? { ...prev, date: e.target.value } : null)
                }
              />
              <Input
                placeholder="LinkedIn URL"
                value={selectedNewsEvent?.linkedin_url || ""}
                onChange={(e) =>
                  setSelectedNewsEvent((prev) => prev ? { ...prev, linkedin_url: e.target.value } : null)
                }
              />
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateNewsEvent}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={newsEventColumns}
        data={newsEvents}
        onDelete={handleDelete}
        onUpdate={(news) => {
          setSelectedNewsEvent(news);
          setUpdateOpen(true);
        }}
      />

<div className="mt-10 p-6 bg-purple-50 border border-purple-200 rounded-lg">
  <h2 className="text-lg font-semibold mb-2 text-purple-900">Admin Instructions</h2>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li>Use the &quot;Add +&quot; button to create a new News or Event item.</li>
    <li>Ensure that all required fields (Title, Category, Date) are filled before submitting.</li>
    <li>The &quot;Category&quot; should be correctly selected as either &quot;News&quot; or &quot;Events&quot;.</li>
    <li>The &quot;LinkedIn URL&quot; should point to the official page or source of the news/event (optional but recommended).</li>
    <li>After adding a new item, the table will automatically update with the latest entry.</li>
    <li>Use the update button to modify existing entries. Ensure data is correct before submitting updates.</li>
    <li>Use the delete button to remove entries that are outdated or incorrect.</li>
  </ul>
</div>
    </div>
  );
}
