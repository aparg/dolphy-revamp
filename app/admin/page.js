"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { SearchableCitySelect } from "./components/SearchableCitySelect";

let baseUrl = "https://admin.dolphy.ca";
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin token exists
    const adminToken = localStorage.getItem("admintoken");
    if (!adminToken) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  const [pageIndex, setPageIndex] = useState(1);
  const [filters, setFilters] = useState({
    city: "All",
    status: "All",
    typee: "All",
    search: "",
  });

  const { data } = useSWR(
    isAuthenticated
      ? `${baseUrl}/api/pre-constructions/?page=${pageIndex}&city=${filters.city}&status=${filters.status}&typee=${filters.typee}&search=${filters.search}`
      : null,
    fetcher
  );

  function checkPrev() {
    if (pageIndex === 1) {
      return false;
    }
    return true;
  }

  function checkNext() {
    if (data && pageIndex === data.data.totalPages) {
      return false;
    }
    return true;
  }

  const handleChange = (value, id) => {
    setFilters((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <Card className="mb-8 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleChange(e.target.value, "search")}
                    placeholder=" "
                    className="peer w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  />
                  <label className="absolute -top-2.5 left-2 px-1 text-xs font-medium text-gray-600 bg-white">
                    Search Projects
                  </label>
                </div>
                <div className="relative">
                  <SearchableCitySelect
                    value={filters.city}
                    onValueChange={(value) => handleChange(value, "city")}
                    className="peer"
                  />
                  <label className="absolute -top-2.5 left-2 px-1 text-xs font-medium text-gray-600 bg-white">
                    Select City
                  </label>
                </div>

                <div className="relative">
                  <Select
                    value={filters.typee}
                    onValueChange={(value) => handleChange(value, "typee")}
                  >
                    <SelectTrigger className="w-full peer">
                      <SelectValue placeholder=" " />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Townhome">Townhome</SelectItem>
                      <SelectItem value="Detached">Detached</SelectItem>
                      <SelectItem value="Semi-Detached">
                        Semi-Detached
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <label className="absolute -top-2.5 left-2 px-1 text-xs font-medium text-gray-600 bg-white">
                    Project Type
                  </label>
                </div>

                <div className="relative">
                  <Select
                    value={filters.status}
                    onValueChange={(value) => handleChange(value, "status")}
                  >
                    <SelectTrigger className="w-full peer">
                      <SelectValue placeholder=" " />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Selling">Selling</SelectItem>
                      <SelectItem value="Sold out">Sold out</SelectItem>
                    </SelectContent>
                  </Select>
                  <label className="absolute -top-2.5 left-2 px-1 text-xs font-medium text-gray-600 bg-white">
                    Status
                  </label>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <Link href="/admin/data/" className="block w-full md:w-auto">
                  <Button
                    variant="primary"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Add New Preconstruction
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count and Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-800">
              <span className="text-green-600 font-bold">
                {data?.data.totalCount}
              </span>{" "}
              Preconstructions Found | Page {pageIndex} of{" "}
              {data?.data.totalPages}
            </h2>
          </div>
          <div className="flex space-x-3">
            {checkPrev() && (
              <Button
                variant="outline"
                onClick={() => setPageIndex(pageIndex - 1)}
                className="border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                Previous
              </Button>
            )}
            {checkNext() && (
              <Button
                onClick={() => setPageIndex(pageIndex + 1)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Table Section */}
        <Card className="shadow-md">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">
                    S.N
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    City
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Project Type
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.results.map((post, index) => (
                  <TableRow
                    key={post.slug}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {post.project_name}
                    </TableCell>
                    <TableCell>{post.city.name}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {post.project_type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          post.status === "Selling"
                            ? "bg-green-100 text-green-800"
                            : post.status === "Upcoming"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link href={`/admin/data/${post.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-gray-100 transition-colors duration-200"
                          >
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/admin/plan/${post.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-gray-100 transition-colors duration-200"
                          >
                            Images
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
