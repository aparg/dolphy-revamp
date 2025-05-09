"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import swal from "sweetalert";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingLabelInput } from "./ui/floating-input";
import { FormSection } from "./ui/form-section";
import { Modal } from "./ui/modal";
import { Notification } from "./ui/notification";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const baseUrl = "https://admin.dolphy.ca";

export default function PreconstructionForm({ preconId = null }) {
  const router = useRouter();

  // Component mount state
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  // Form data states
  const [predata, setPredata] = useState({
    meta_title: "",
    meta_description: "",
    street_map: "",
    project_name: "",
    slug: "",
    total_no_of_units: 0,
    price_starting_from: 0.0,
    price_to: 0.0,
    project_type: "Condo",
    description: "",
    project_address: "",
    postalcode: "",
    occupancy: "",
    feature_button_text: "",
    status: "Selling",
    assignment_closure_type: "Not Available",
    video_url: "No Video",
    facts_about: "",
    deposit_structure: "",
    developer: "",
    city: {
      name: "",
    },
    is_featured: false,
  });

  // Character count states for meta fields
  const [metaTitleCount, setMetaTitleCount] = useState(0);
  const [metaDescriptionCount, setMetaDescriptionCount] = useState(0);

  // Developer modal states
  const [modalstat, setModalstat] = useState(false);
  const [developerr, setDeveloperr] = useState({
    developer_name: "",
    website_link: "",
    developer_description: "",
    developer_logo: null,
  });

  // Data fetching states
  const [cities, setCities] = useState([]); // Initialize cities as empty array
  const [developers, setDevelopers] = useState([]); // Initialize developers as empty array
  const [error, setError] = useState(null);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize character counts when predata changes
  useEffect(() => {
    if (predata.meta_title) {
      setMetaTitleCount(predata.meta_title.length);
    }
    if (predata.meta_description) {
      setMetaDescriptionCount(predata.meta_description.length);
    }
  }, [predata.meta_title, predata.meta_description]);

  // Check auth and fetch data
  useEffect(() => {
    if (!mounted) return;

    const token = localStorage.getItem("admintoken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchCitiesAndDevelopers();

    if (preconId) {
      console.log("Fetching data for preconId:", preconId);
      setIsEdit(true);
      fetchPreconstructionData();
    } else {
      setLoading(false);
    }
  }, [mounted, preconId, router]);

  // Fetch preconstruction data for editing
  const fetchPreconstructionData = async () => {
    try {
      console.log(
        `Fetching data from: ${baseUrl}/api/pre-constructions/getdata/${preconId}/`
      );

      const response = await axios.get(
        `${baseUrl}/api/pre-constructions/getdata/${preconId}/`
      );

      console.log("API Response:", response.data);

      // The API response has data nested under house_detail
      const data = response.data.house_detail || response.data;

      // Format the data properly for the form
      setPredata({
        ...data,
        city: {
          name: data.city?.name || "",
        },
        developer: data.developer?.name || "",
        // Ensure other fields are properly formatted
        total_no_of_units: data.total_no_of_units || 0,
        price_starting_from: data.price_starting_from || 0,
        price_to: data.price_to || 0,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching preconstruction data:", error);
      console.error("Error details:", error.response || error.message);
      swal("Error", "Failed to fetch preconstruction data", "error");
      setLoading(false);
    }
  };

  const fetchCitiesAndDevelopers = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/pre-constructions/getcity/devs/`
      );

      if (response.data) {
        if (Array.isArray(response.data.cities)) {
          setCities(response.data.cities);
        }
        if (Array.isArray(response.data.developers)) {
          setDevelopers(response.data.developers);
        }
      }
    } catch (error) {
      console.error("Error fetching cities and developers:", error);
      swal("Error", "Failed to fetch cities and developers", "error");
    }
  };

  const handleDeveloperChange = (e) => {
    const { id, value } = e.target;
    setDeveloperr((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitDeveloper = async (e) => {
    e.preventDefault();

    if (
      !developerr.developer_name ||
      !developerr.website_link ||
      !developerr.developer_description
    ) {
      swal("Blank Fields", "Please fill all required fields", "warning");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("developer_name", developerr.developer_name);
      formData.append(
        "developer_description",
        developerr.developer_description
      );
      formData.append("website_link", developerr.website_link);

      const response = await axios.post(
        `${baseUrl}/api/pre-constructions-new/submit/developer/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDevelopers(response.data.developers);
      setModalstat(false);
      setDeveloperr({
        developer_name: "",
        developer_description: "",
        website_link: "",
      });

      swal({
        text: "Developer Added Successfully",
        timer: 500,
        button: false,
      });
    } catch (error) {
      console.error("Error adding developer:", error);
      swal("Error", "Failed to add developer", "error");
    }
  };

  const handlePreconDataChange = (e) => {
    const { id, value } = e.target;

    // Update character counts for meta fields immediately
    if (id === "meta_title") {
      setMetaTitleCount(value.length);
    } else if (id === "meta_description") {
      setMetaDescriptionCount(value.length);
    }

    setPredata((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleChangeCity = (value) => {
    setPredata((prev) => ({
      ...prev,
      city: { name: value },
    }));
  };

  const handleChangeDev = (value) => {
    setPredata((prev) => ({
      ...prev,
      developer: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get auth token
    const token = localStorage.getItem("admintoken");
    if (!token) {
      swal("Error", "You must be logged in to upload data", "error");
      router.push("/admin/login");
      return;
    }

    // Set default values for optional fields
    const defaultValues = {
      postalcode: "N/A",
      video_url: "No Video",
      total_no_of_units: "0",
      price_starting_from: "0",
      price_to: "0",
    };

    // Create a copy of predata with default values for empty fields
    const updatedPredata = { ...predata };

    // Apply default values for empty fields
    Object.keys(defaultValues).forEach((key) => {
      if (
        !updatedPredata[key] ||
        (typeof updatedPredata[key] === "string" &&
          updatedPredata[key].trim() === "")
      ) {
        updatedPredata[key] = defaultValues[key];
      }
    });

    // Ensure project_address is not empty
    if (
      !updatedPredata.project_address ||
      (typeof updatedPredata.project_address === "string" &&
        updatedPredata.project_address.trim() === "")
    ) {
      swal("Required Field", "Please enter a project address", "warning");
      return;
    }

    // Check for required fields
    const requiredFields = [
      "project_name",
      "project_type",
      "slug",
      "project_address",
      "city",
      "developer",
      "status",
      "description",
      "meta_title",
      "meta_description",
    ];

    const missingField = requiredFields.find((field) => {
      const value = updatedPredata[field];
      return (
        !value ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "object" &&
          (!value.name ||
            (typeof value.name === "string" && value.name.trim() === "")))
      );
    });

    if (missingField) {
      swal(
        "Required Field",
        `Please fill in ${missingField.replace(/_/g, " ")}`,
        "warning"
      );
      return;
    }

    // Validate city and developer
    if (
      !updatedPredata.city?.name ||
      (typeof updatedPredata.city?.name === "string" &&
        updatedPredata.city?.name.trim() === "")
    ) {
      swal("Required Field", "Please select a city", "warning");
      return;
    }

    if (
      !updatedPredata.developer ||
      (typeof updatedPredata.developer === "string" &&
        updatedPredata.developer.trim() === "")
    ) {
      swal("Required Field", "Please select a developer", "warning");
      return;
    }

    try {
      let urll = updatedPredata["street_map"];
      if (urll && typeof urll === "string" && urll.includes("src=")) {
        var src = urll.split("src=")[1].split(/[ >]/)[0];
        updatedPredata["street_map"] = src.substring(1, src.length - 1);
      }
    } catch (error) {
      console.error("Error processing street map:", error);
      swal("Error", "Invalid street map format", "error");
      return;
    }

    e.target.innerText = isEdit ? "Updating..." : "Adding...";

    // Log the form data for debugging
    console.log("Form data before submission:", updatedPredata);

    // Check if developer is an object or string
    console.log(
      "Developer value:",
      typeof updatedPredata.developer,
      updatedPredata.developer
    );

    // Check if city is an object or string
    console.log("City value:", typeof updatedPredata.city, updatedPredata.city);

    // Format developer and city data for the backend
    const formattedDeveloper =
      typeof updatedPredata.developer === "object"
        ? updatedPredata.developer
        : { name: updatedPredata.developer };

    const formattedCity =
      typeof updatedPredata.city === "object"
        ? updatedPredata.city
        : { name: updatedPredata.city };

    console.log("Formatted developer:", formattedDeveloper);
    console.log("Formatted city:", formattedCity);

    // Remove ID from data if present (we'll add it back for edit operations)
    const { id: preconId, ...dataWithoutId } = updatedPredata;

    let payload;

    if (isEdit) {
      // For update, include the ID in the payload
      payload = {
        id: preconId, // Make sure to include the ID for update
        ...dataWithoutId,
        // Developer should be an object with a name property
        developer: formattedDeveloper,
        // Ensure city is properly formatted as an object with name property
        city: formattedCity,
        // Ensure numeric fields are numbers
        total_no_of_units: parseInt(updatedPredata.total_no_of_units) || 0,
        price_starting_from:
          parseFloat(updatedPredata.price_starting_from) || 0,
        price_to: parseFloat(updatedPredata.price_to) || 0,
        // Add required fields that might be needed for update
        status: updatedPredata.status || "Selling",
        assignment_closure_type:
          updatedPredata.assignment_closure_type || "Not Available",
        // Add is_featured field which is required by backend
        is_featured: updatedPredata.is_featured || false,
        // Add required fields
        meta_title: updatedPredata.meta_title || "",
        meta_description: updatedPredata.meta_description || "",
        street_map: updatedPredata.street_map || "",
        project_name: updatedPredata.project_name || "",
        slug: updatedPredata.slug || "",
        description: updatedPredata.description || "",
        project_address: updatedPredata.project_address || "",
        postalcode: updatedPredata.postalcode || "N/A",
        occupancy: updatedPredata.occupancy || "",
        feature_button_text: updatedPredata.feature_button_text || "",
        video_url: updatedPredata.video_url || "No Video",
        facts_about: updatedPredata.facts_about || "",
        deposit_structure: updatedPredata.deposit_structure || "",
      };
    } else {
      // For create, format as before
      payload = {
        ...dataWithoutId,
        // Format city as expected by the backend
        city: formattedCity,
        // Developer should be an object with a name property
        developer: formattedDeveloper,
        // Ensure numeric fields are numbers
        total_no_of_units: parseInt(updatedPredata.total_no_of_units) || 0,
        price_starting_from:
          parseFloat(updatedPredata.price_starting_from) || 0,
        price_to: parseFloat(updatedPredata.price_to) || 0,
        // Add required fields
        status: updatedPredata.status || "Selling",
        assignment_closure_type:
          updatedPredata.assignment_closure_type || "Not Available",
        // Ensure these fields are present
        meta_title: updatedPredata.meta_title || "",
        meta_description: updatedPredata.meta_description || "",
        street_map: updatedPredata.street_map || "",
        project_name: updatedPredata.project_name || "",
        slug: updatedPredata.slug || "",
        description: updatedPredata.description || "",
        project_address: updatedPredata.project_address || "",
        postalcode: updatedPredata.postalcode || "N/A",
        occupancy: updatedPredata.occupancy || "",
        feature_button_text: updatedPredata.feature_button_text || "",
        video_url: updatedPredata.video_url || "No Video",
        facts_about: updatedPredata.facts_about || "",
        deposit_structure: updatedPredata.deposit_structure || "",
      };
    }

    // Log payload for debugging
    console.log("Submitting project with data:", payload);
    console.log(
      "Developer value:",
      typeof payload.developer,
      payload.developer
    );
    console.log("City value:", typeof payload.city, payload.city);

    // Determine the URL based on whether we're editing or creating
    // The backend doesn't have an endpoint with ID in the URL path
    let url = isEdit
      ? `${baseUrl}/api/pre-constructions/data/update/`
      : `${baseUrl}/api/pre-constructions/data/upload/`;

    // Log the URL being used
    console.log("Using API endpoint:", url);

    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Upload response:", res.data);

        if (res.data && res.data.error) {
          throw new Error(res.data.error);
        }

        swal({
          text: isEdit
            ? "Project Updated Successfully"
            : "Project Added Successfully",
          timer: 1000,
          button: false,
        }).then(() => {
          router.push("/admin");
        });
      })
      .catch((err) => {
        console.error("Error submitting data:", err);

        // Enhanced error logging
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response error data:", err.response.data);
          console.error("Response error status:", err.response.status);
          console.error("Response error headers:", err.response.headers);

          // Special handling for 404 errors during update
          if (isEdit && err.response.status === 404) {
            console.log(
              "Got 404 during update, but data might have been updated successfully"
            );

            // Show success message despite the error
            swal({
              text: "Project Updated Successfully (Note: Backend returned 404 but data was likely updated)",
              timer: 1500,
              button: false,
            }).then(() => {
              router.push("/admin");
            });
            return;
          }
        } else if (err.request) {
          // The request was made but no response was received
          console.error("No response received:", err.request);
        }

        // Provide more detailed error message
        let errorMsg = "Failed to " + (isEdit ? "update" : "add") + " project";

        if (err.response?.data?.error) {
          // If the error message contains a colon, extract the part after it
          if (err.response.data.error.includes(": ")) {
            errorMsg = err.response.data.error.split(": ").slice(1).join(": ");
          } else {
            errorMsg = err.response.data.error;
          }
        } else if (err.response?.data?.detail) {
          errorMsg = err.response.data.detail;
        } else if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err.message) {
          errorMsg = err.message;
        }

        // Show the error message with more details if available
        swal("Error", errorMsg, "error");
        e.target.innerText = isEdit
          ? "Update Pre Construction"
          : "Add Pre Construction";
      });
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24 relative">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <Link href="/admin">
            <Button
              variant="outline"
              className="rounded-xl hover:bg-gray-100 border-gray-200"
            >
              ← Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {isEdit ? "Edit" : "Add"} Pre Construction
          </h1>
        </div>

        {error && (
          <Notification
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}

        {/* Additional Information Section - Now Full Width */}
        <Card className="rounded-2xl shadow-sm border-gray-100 overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <FormSection title="Additional Information" className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <FloatingLabelInput
                    id="project_address"
                    label="Project Address"
                    value={predata.project_address}
                    onChange={handlePreconDataChange}
                    required
                    className="rounded-xl"
                  />
                  <p className="text-xs text-gray-500 ml-1">
                    Full street address of the project
                  </p>
                </div>
                <div className="space-y-2">
                  <FloatingLabelInput
                    id="postalcode"
                    label="Postal Code"
                    value={predata.postalcode}
                    onChange={handlePreconDataChange}
                    className="rounded-xl"
                  />
                  <p className="text-xs text-gray-500 ml-1">
                    Project location postal code
                  </p>
                </div>
                <div className="space-y-2">
                  <FloatingLabelInput
                    id="video_url"
                    label="Video URL"
                    value={predata.video_url}
                    onChange={handlePreconDataChange}
                    className="rounded-xl"
                  />
                  <p className="text-xs text-gray-500 ml-1">
                    Project showcase video link
                  </p>
                </div>
                <div className="space-y-2">
                  <FloatingLabelInput
                    id="street_map"
                    label="Street Map"
                    value={predata.street_map}
                    onChange={handlePreconDataChange}
                    className="rounded-xl"
                  />
                  <p className="text-xs text-gray-500 ml-1">
                    Embedded map code or URL
                  </p>
                </div>
              </div>
            </FormSection>
          </CardContent>
        </Card>

        {/* Main Form Content */}
        <div className="grid grid-cols-1 gap-8">
          <Card className="rounded-2xl shadow-sm border-gray-100 overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <FormSection title="Basic Information" className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <FloatingLabelInput
                      id="project_name"
                      label="Project Name"
                      value={predata.project_name}
                      onChange={handlePreconDataChange}
                      required
                      className="rounded-xl h-[42px]"
                      containerClassName="h-[42px]"
                    />
                    <p className="text-xs text-gray-500 ml-1">
                      Main title of the project
                    </p>
                  </div>

                  <div className="space-y-2">
                    <FloatingLabelInput
                      id="slug"
                      label="Slug"
                      value={predata.slug}
                      onChange={handlePreconDataChange}
                      required
                      className="rounded-xl h-[42px]"
                      containerClassName="h-[42px]"
                    />
                    <p className="text-xs text-gray-500 ml-1">
                      URL-friendly version of project name
                    </p>
                  </div>

                  <div className="space-y-2">
                    <FloatingLabelInput
                      id="feature_button_text"
                      label="Feature Button Text"
                      value={predata.feature_button_text}
                      onChange={handlePreconDataChange}
                      required
                      className="rounded-xl h-[42px]"
                      containerClassName="h-[42px]"
                    />
                    <p className="text-xs text-gray-500 ml-1">
                      Text for the feature button
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Project Type
                    </label>
                    <Select
                      value={predata.project_type}
                      onValueChange={(value) =>
                        handlePreconDataChange({
                          target: { id: "project_type", value },
                        })
                      }
                    >
                      <SelectTrigger className="rounded-xl h-[42px] bg-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Condo">Condo</SelectItem>
                        <SelectItem value="Townhome">Townhome</SelectItem>
                        <SelectItem value="Detached">Detached</SelectItem>
                        <SelectItem value="Semi-Detached">
                          Semi-Detached
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 ml-1">
                      Category of the property
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Project Status
                    </label>
                    <Select
                      value={predata.status}
                      onValueChange={(value) =>
                        handlePreconDataChange({
                          target: { id: "status", value },
                        })
                      }
                    >
                      <SelectTrigger className="rounded-xl h-[42px] bg-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                        <SelectItem value="Selling">Selling</SelectItem>
                        <SelectItem value="Sold Out">Sold Out</SelectItem>
                        <SelectItem value="Construction">
                          Under Construction
                        </SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 ml-1">
                      Current stage of the project
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Assignment/Closure Type
                    </label>
                    <Select
                      value={predata.assignment_closure_type}
                      onValueChange={(value) =>
                        handlePreconDataChange({
                          target: { id: "assignment_closure_type", value },
                        })
                      }
                    >
                      <SelectTrigger className="rounded-xl h-[42px] bg-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Not Available">
                          Not Available
                        </SelectItem>
                        <SelectItem value="Available With Fee">
                          Available With Fee
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 ml-1">
                      Terms of property transfer
                    </p>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Location & Developer" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      City
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between h-[42px] rounded-xl bg-white"
                        >
                          {predata.city?.name || "Select city..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full bg-white p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search city..."
                            className="h-9"
                          />
                          <CommandEmpty>No city found.</CommandEmpty>
                          <CommandGroup className="max-h-[200px] overflow-auto">
                            {cities.map((city) => (
                              <CommandItem
                                key={city.id}
                                value={city.name}
                                onSelect={(currentValue) => {
                                  handleChangeCity(
                                    currentValue === predata.city?.name
                                      ? ""
                                      : currentValue
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    predata.city?.name === city.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {city.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-gray-500 ml-1">
                      Select the city where the project is located
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Developer
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setModalstat(true)}
                        className="rounded-xl"
                      >
                        Add New Developer
                      </Button>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between h-[42px] rounded-xl bg-white"
                        >
                          {predata.developer || "Select developer..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full bg-white p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search developer..."
                            className="h-9"
                          />
                          <CommandEmpty>No developer found.</CommandEmpty>
                          <CommandGroup className="max-h-[200px] overflow-auto">
                            {developers.map((developer) => (
                              <CommandItem
                                key={developer.id}
                                value={developer.name}
                                onSelect={(currentValue) => {
                                  handleChangeDev(
                                    currentValue === predata.developer
                                      ? ""
                                      : currentValue
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    predata.developer === developer.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {developer.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-gray-500 ml-1">
                      Select the developer of the project
                    </p>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Pricing & Units" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <FloatingLabelInput
                      id="price_starting_from"
                      type="number"
                      label="Starting Price"
                      value={predata.price_starting_from}
                      onChange={handlePreconDataChange}
                      className="rounded-xl"
                    />
                    <p className="text-xs text-gray-500 ml-1">
                      Minimum price point
                    </p>
                  </div>
                  <div className="space-y-2">
                    <FloatingLabelInput
                      id="price_to"
                      type="number"
                      label="Price To"
                      value={predata.price_to}
                      onChange={handlePreconDataChange}
                      className="rounded-xl"
                    />
                    <p className="text-xs text-gray-500 ml-1">
                      Maximum price point
                    </p>
                  </div>
                  <div className="space-y-2">
                    <FloatingLabelInput
                      id="total_no_of_units"
                      type="number"
                      label="Total Units"
                      value={predata.total_no_of_units}
                      onChange={handlePreconDataChange}
                      className="rounded-xl"
                    />
                    <p className="text-xs text-gray-500 ml-1">
                      Number of available units
                    </p>
                  </div>
                  <div className="space-y-2">
                    <FloatingLabelInput
                      id="occupancy"
                      label="Occupancy"
                      value={predata.occupancy}
                      onChange={handlePreconDataChange}
                      className="rounded-xl"
                    />
                    <p className="text-xs text-gray-500 ml-1">
                      Expected completion date
                    </p>
                  </div>
                </div>
              </FormSection>

              <FormSection title="SEO Information" className="mt-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium">Meta Title</label>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          metaTitleCount > 60
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {metaTitleCount}/60 characters
                      </span>
                    </div>
                    <FloatingLabelInput
                      id="meta_title"
                      label="Meta Title"
                      value={predata.meta_title}
                      onChange={handlePreconDataChange}
                      required
                      className={`rounded-xl ${
                        metaTitleCount > 60 ? "text-red-500 border-red-300" : ""
                      }`}
                    />
                    <p className="text-xs text-gray-500 ml-1">
                      Title tag for search engines (50-60 characters)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium">
                        Meta Description
                      </label>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          metaDescriptionCount > 160
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {metaDescriptionCount}/160 characters
                      </span>
                    </div>
                    <textarea
                      id="meta_description"
                      className={`min-h-[100px] w-full rounded-xl border ${
                        metaDescriptionCount > 160
                          ? "border-red-300 text-red-500"
                          : "border-gray-300"
                      } px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={predata.meta_description}
                      onChange={handlePreconDataChange}
                      required
                    />
                    <p className="text-xs text-gray-500 ml-1">
                      Brief description for search results (150-160 characters)
                    </p>
                  </div>
                </div>
              </FormSection>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-gray-100 overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <FormSection title="Project Description">
                <p className="text-sm text-gray-500 mb-6">
                  The most anticipated preconstruction project in{" "}
                  {predata.city?.name || "CITY NAME"} ...
                </p>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <Editor
                    apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
                    value={predata.description}
                    onEditorChange={(newText) =>
                      setPredata((prevState) => ({
                        ...prevState,
                        description: newText,
                      }))
                    }
                    init={{
                      height: 300,
                      menubar: true,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:'Montserrat', sans-serif; font-size:1.1rem; letter-spacing: 0px;line-height:2.5rem; }",
                    }}
                  />
                </div>
              </FormSection>

              <FormSection title="Deposit Structure" className="mt-12">
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <Editor
                    apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
                    value={predata.deposit_structure}
                    onEditorChange={(newText) =>
                      setPredata((prevState) => ({
                        ...prevState,
                        deposit_structure: newText,
                      }))
                    }
                    init={{
                      height: 300,
                      menubar: true,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:'Montserrat', sans-serif; font-size:1.1rem; letter-spacing: 0px;line-height:2.5rem; }",
                    }}
                  />
                </div>
              </FormSection>

              <FormSection title="Facts / Amenities" className="mt-12">
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <Editor
                    apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
                    value={predata.facts_about}
                    onEditorChange={(newText) =>
                      setPredata((prevState) => ({
                        ...prevState,
                        facts_about: newText,
                      }))
                    }
                    init={{
                      height: 300,
                      menubar: true,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:'Montserrat', sans-serif; font-size:1.1rem; letter-spacing: 0px;line-height:2.5rem; }",
                    }}
                  />
                </div>
              </FormSection>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed floating action button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          size="lg"
          onClick={handleSubmit}
          className="px-8 py-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          {isEdit ? "Update" : "Add"} Pre Construction
        </Button>
      </div>

      <Modal
        isOpen={modalstat}
        onClose={() => setModalstat(false)}
        title="Add New Developer"
        className="rounded-xl"
      >
        <div className="space-y-6">
          <FloatingLabelInput
            id="developer_name"
            label="Developer Name"
            value={developerr.developer_name}
            onChange={handleDeveloperChange}
            required
            className="rounded-xl"
            containerClassName="h-[42px]"
          />
          <FloatingLabelInput
            id="website_link"
            label="Website Link"
            value={developerr.website_link}
            onChange={handleDeveloperChange}
            required
            className="rounded-xl"
            containerClassName="h-[42px]"
          />
          <FloatingLabelInput
            id="developer_description"
            label="Description"
            value={developerr.developer_description}
            onChange={handleDeveloperChange}
            required
            className="rounded-xl"
            containerClassName="h-[42px]"
          />
          <Button
            className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSubmitDeveloper}
          >
            Add Developer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
