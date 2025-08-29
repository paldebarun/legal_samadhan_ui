"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { login_url } from "@/utils/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Show loading toast
    const toastId = toast.loading("Authenticating");

    try {
      const res = await axios.post(login_url, formData);

      if (res.data.success) {
     
        sessionStorage.setItem("token", res.data.token);
        // sessionStorage.setItem("user", JSON.stringify(res.data.user));

    

        // Redirect
        router.push("/admin");
      } else {
        setError(res.data.message || "Login failed");
        toast.error(res.data.message || "Login failed", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      const message = "Something went wrong";
      setError(message);
      toast.error(message, { id: toastId });
    }
    finally{
        toast.dismiss(toastId)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <Card className="w-full m-10 max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="w-full max-w-md m-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-900 text-center">
        ⚠️ This page is restricted. Normal users should not attempt to access it.
      </div>
    </div>
  );
}
