"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FloatingLabelInput } from "../components/ui/floating-input";
import { Notification } from "../components/ui/notification";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [loginerror, setLoginerror] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setcredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        credentials.username === "Vishal" &&
        credentials.password === "Superuserpassword"
      ) {
        localStorage.setItem("admintoken", "thisismyrandomtoken");
        setLoginerror("Successfully Logged in");
        setcredentials({
          username: "",
          password: "",
        });
        router.push("/admin");
      } else {
        setLoginerror("Username or Password Incorrect");
      }
    } catch (error) {
      setLoginerror("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // If already logged in, redirect to admin page
    if (localStorage.getItem("admintoken")) {
      router.push("/admin");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader className="space-y-2 pb-8 pt-6">
          <CardTitle className="text-3xl font-bold text-center">
            Admin Login
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Enter your credentials to access the admin panel
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          {loginerror && (
            <Notification
              message={loginerror}
              type={loginerror.includes("Successfully") ? "success" : "error"}
              onClose={() => setLoginerror(null)}
              className="mb-8"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <FloatingLabelInput
              id="username"
              label="Username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="text-lg py-6"
            />
            <FloatingLabelInput
              id="password"
              type="password"
              label="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="text-lg py-6"
            />
            <Button 
              type="submit" 
              className="w-full py-6 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
