"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const pages = [
  { module: "News and Events", route: "/admin/NewsEvents" },
  { module: "Publications", route: "/admin" },
  { module: "Practice area", route: "/admin/PracticeArea" },
  { module: "Queries", route: "/admin/Queries" },
  { module: "Applications", route: "/admin/Application" },
  { module: "Team", route: "/admin/Team" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <div className="w-full ">
      <p className="p-3 text-xl font-bold">Dashboard navigation</p>

      {/* Shadcn Select Dropdown */}
      <div className="p-3 w-60">
        <Select defaultValue="" onValueChange={handleNavigation}>
          <SelectTrigger>
            <SelectValue placeholder="Select a module" />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.route} value={page.route}>
                {page.module}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <main>{children}</main>
    </div>
  );
}
