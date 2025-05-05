"use client";

import Image from "next/image";
import swal from "sweetalert";
import Link from "next/link";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Modal } from "../../components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Trash2 } from "lucide-react";

const baseUrl = "https://admin.dolphy.ca";

export default function PlanPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [mounted, setMounted] = useState(false);
  const [modalImagesOpen, setModalImagesOpen] = useState(false);
  const [modalPlansOpen, setModalPlansOpen] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [uploadPlans, setUploadPlans] = useState([]);
  const [uploadPlanType, setUploadPlanType] = useState("1 BED");
  const [uploadPlanPrice, setUploadPlanPrice] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [preconData, setPreconData] = useState({
    project_name: "",
    images: [],
    floor_plans: [],
  });
  const [choices, setChoices] = useState([
    { id: 1, name: "1 BED" },
    { id: 2, name: "2 BED" },
    { id: 3, name: "3 BED" },
    { id: 4, name: "STUDIO" },
    { id: 5, name: "PENTHOUSE" },
  ]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("admintoken")) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [imagesRes, plansRes] = await Promise.all([
        axios.get(`${baseUrl}/api/pre-constructions/images/${id}/`),
        axios.get(`${baseUrl}/api/pre-constructions/plans/${id}/`),
      ]);

      // Normalize plan data
      const plans = (plansRes.data.plans || []).map((plan) => ({
        ...plan,
        id: plan.id,
        url: plan.image || plan.url,
        type: plan.type_of_plan?.choice || plan.type || "1 BED",
        beds: parseInt(plan.beds) || 0,
        baths: parseInt(plan.baths) || 0,
        area: parseInt(plan.area) || 0,
        price: parseInt(plan.price) || 0,
      }));

      // Sort plans by type and price
      plans.sort((a, b) => {
        if (a.type === b.type) {
          return a.price - b.price;
        }
        return (
          choices.findIndex((c) => c.name === a.type) -
          choices.findIndex((c) => c.name === b.type)
        );
      });

      setPreconData({
        project_name: imagesRes.data.preconstinfo?.name || "",
        images: (imagesRes.data.images || []).map((img) => ({
          ...img,
          url: img.images || img.url,
        })),
        floor_plans: plans,
      });

      // Update active tab to one with plans if possible
      const tabWithPlans = choices.findIndex((choice) =>
        plans.some((plan) => plan.type === choice.name)
      );
      if (tabWithPlans >= 0) {
        setActiveTab(tabWithPlans);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMsg =
        error.response?.data?.error || error.message || "Failed to fetch data";
      swal("Error", errorMsg, "error");
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!mounted) return;

    if (uploadImages.length === 0) {
      swal("No Images", "Please select images to upload", "warning");
      return;
    }

    setIsUploading(true);
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Validate file sizes
    const invalidFiles = Array.from(uploadImages).filter(
      (file) => file.size > maxSize
    );
    if (invalidFiles.length > 0) {
      setIsUploading(false);
      swal(
        "Error",
        "Some images exceed the 5MB size limit. Please compress them and try again.",
        "error"
      );
      return;
    }

    try {
      const formData = new FormData();
      Array.from(uploadImages).forEach((file) => {
        formData.append("images", file);
      });

      const response = await axios.post(
        `${baseUrl}/api/pre-constructions/upload/images/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response.data);

      // Always fetch the latest data after upload, regardless of response format
      await fetchData();

      setModalImagesOpen(false);
      setUploadImages([]);
      swal({
        text: "Images uploaded successfully",
        icon: "success",
        timer: 1500,
        button: false,
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      let errorMsg = "Failed to upload images";

      if (error.response?.data) {
        console.log("Error response data:", error.response.data);
        errorMsg =
          error.response.data.message ||
          error.response.data.error ||
          error.message;
      }

      // Even if we get an error, try to fetch the latest data
      // as the upload might have succeeded despite the error response
      try {
        await fetchData();
      } catch (fetchError) {
        console.error("Error fetching updated data:", fetchError);
      }

      swal("Error", errorMsg, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePlanUpload = async (e) => {
    e.preventDefault();
    if (uploadPlans.length === 0) {
      swal("No Plans", "Please select floor plans to upload", "warning");
      return;
    }

    if (!uploadPlanType || !uploadPlanPrice) {
      swal(
        "Missing Information",
        "Please fill in both plan type and starting price",
        "warning"
      );
      return;
    }

    if (uploadPlanPrice <= 0) {
      swal(
        "Invalid Price",
        "Please enter a valid price greater than 0",
        "warning"
      );
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    const maxSize = 10 * 1024 * 1024; // 10MB for floor plans

    // Validate file sizes and types
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const invalidFiles = Array.from(uploadPlans).filter(
      (file) => file.size > maxSize || !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setIsUploading(false);
      swal(
        "Error",
        "Some floor plans are invalid. Please ensure all files are images (JPG, PNG, WebP) under 10MB.",
        "error"
      );
      return;
    }

    Array.from(uploadPlans).forEach((file) => {
      formData.append("images", file);
    });
    formData.append("typee", uploadPlanType);
    formData.append("starting", uploadPlanPrice);

    try {
      const response = await axios.post(
        `${baseUrl}/api/pre-constructions/upload/plans/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );

      // Always fetch the latest data after upload
      await fetchData();

      // Switch to the tab of the newly uploaded plans
      const newPlanTabIndex = choices.findIndex(
        (choice) => choice.name === uploadPlanType
      );
      if (newPlanTabIndex >= 0) {
        setActiveTab(newPlanTabIndex);
      }

      setModalPlansOpen(false);
      setUploadPlans([]);
      setUploadPlanType("1 BED");
      setUploadPlanPrice(0);
      swal({
        text: "Floor Plans Uploaded Successfully",
        icon: "success",
        timer: 1500,
        button: false,
      });
    } catch (error) {
      console.error("Error uploading plans:", error);
      let errorMsg = "Failed to upload floor plans";

      if (error.response?.data) {
        console.log("Error response data:", error.response.data);
        errorMsg =
          error.response.data.message ||
          error.response.data.error ||
          error.message;
      }

      // Even if we get an error, try to fetch the latest data
      // as the upload might have succeeded despite the error response
      try {
        await fetchData();
      } catch (fetchError) {
        console.error("Error fetching updated data:", fetchError);
      }

      swal("Error", errorMsg, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageDelete = async (imageId) => {
    if (!mounted) return;

    if (!imageId) {
      swal("Error", "Invalid image ID", "error");
      return;
    }

    try {
      const response = await axios.delete(
        `${baseUrl}/api/pre-constructions/image/delete/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            id: imageId,
            preconst: id,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setPreconData((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img.id !== imageId),
        }));

        swal({
          text: "Image Deleted Successfully",
          icon: "success",
          timer: 1500,
          button: false,
        });
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      let errorMsg = "Failed to delete image";

      if (error.response?.data) {
        console.log("Error response data:", error.response.data);
        errorMsg =
          error.response.data.message ||
          error.response.data.error ||
          error.message;
      }

      swal("Error", errorMsg, "error");
    }
  };

  const handlePlanDelete = async (planId) => {
    try {
      await axios.delete(`${baseUrl}/api/pre-constructions/plans/delete/`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { id: planId },
      });

      setPreconData((prev) => ({
        ...prev,
        floor_plans: prev.floor_plans.filter((plan) => plan.id !== planId),
      }));

      swal({
        text: "Plan Deleted Successfully",
        timer: 1000,
        button: false,
      });
    } catch (error) {
      console.error("Error deleting plan:", error);
      const errorMsg =
        error.response?.data?.error || error.message || "Failed to delete plan";
      swal("Error", errorMsg, "error");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button
                variant="outline"
                className="rounded-xl hover:bg-gray-100 border-gray-200"
              >
                ← Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {preconData.project_name}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Images Section */}
          <Card className="rounded-2xl shadow-sm border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Project Images
                  </h2>
                  <Button
                    onClick={() => setModalImagesOpen(true)}
                    className="rounded-xl bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 shadow-sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Images
                  </Button>
                </div>

                {preconData.images.length === 0 ? (
                  <div
                    onClick={() => setModalImagesOpen(true)}
                    className="col-span-full flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center font-medium">
                      Click here to upload project images
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Supported formats: JPG, PNG, WebP (Max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {preconData.images.map((image) => (
                      <div
                        key={image.id}
                        className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 transition-transform hover:scale-[1.02] duration-300"
                      >
                        <Image
                          src={image.url}
                          alt="Project Image"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                            onClick={() => handleImageDelete(image.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Floor Plans Section */}
          <Card className="rounded-2xl shadow-sm border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Floor Plans
                  </h2>
                  <Button
                    onClick={() => setModalPlansOpen(true)}
                    className="rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-sm"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Plans
                  </Button>
                </div>

                <Tabs
                  defaultValue={choices[activeTab].name}
                  className="w-full"
                  onValueChange={(value) =>
                    setActiveTab(
                      choices.findIndex((choice) => choice.name === value)
                    )
                  }
                >
                  <TabsList className="grid grid-cols-5 gap-2 bg-gray-100/80 p-1 rounded-lg">
                    {choices.map((choice) => (
                      <TabsTrigger
                        key={choice.id}
                        value={choice.name}
                        className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
                      >
                        {choice.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {choices.map((choice) => (
                    <TabsContent
                      key={choice.id}
                      value={choice.name}
                      className="mt-6"
                    >
                      {preconData.floor_plans.filter(
                        (plan) => plan.type === choice.name
                      ).length === 0 ? (
                        <div
                          onClick={() => setModalPlansOpen(true)}
                          className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Upload className="w-12 h-12 text-gray-400 mb-4" />
                          <p className="text-gray-500 text-center font-medium">
                            Click here to upload {choice.name} floor plans
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Supported formats: JPG, PNG, WebP (Max 10MB)
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {preconData.floor_plans
                            .filter((plan) => plan.type === choice.name)
                            .map((plan) => (
                              <div
                                key={plan.id}
                                className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 transition-transform hover:scale-[1.02] duration-300"
                              >
                                <Image
                                  src={plan.url}
                                  alt={`${plan.type} Floor Plan`}
                                  fill
                                  className="object-contain p-2"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <div className="absolute inset-x-0 bottom-0 p-4">
                                    <p className="text-white font-medium mb-1">
                                      Starting from
                                    </p>
                                    <p className="text-2xl font-bold text-white">
                                      ${plan.price.toLocaleString()}
                                    </p>
                                  </div>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-4 right-4 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                                    onClick={() => handlePlanDelete(plan.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upload Images Modal */}
      <Modal
        isOpen={modalImagesOpen}
        onClose={() => setModalImagesOpen(false)}
        title="Upload Project Images"
      >
        <form onSubmit={handleImageUpload} className="space-y-6">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6 border border-dashed border-gray-200">
              <Label htmlFor="images" className="mb-2 block">
                Select Images (Max 5MB each)
              </Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setUploadImages(e.target.files)}
                className="rounded-xl bg-white"
              />
              <p className="mt-2 text-sm text-gray-500">
                Supported formats: JPG, PNG, WebP
              </p>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-sm transition-all duration-200"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isUploading ? "Uploading..." : "Upload Images"}
          </Button>
        </form>
      </Modal>

      {/* Upload Plans Modal */}
      <Modal
        isOpen={modalPlansOpen}
        onClose={() => setModalPlansOpen(false)}
        title="Upload Floor Plans"
      >
        <form onSubmit={handlePlanUpload} className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Plan Type</Label>
              <Select value={uploadPlanType} onValueChange={setUploadPlanType}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  {choices.map((choice) => (
                    <SelectItem key={choice.id} value={choice.name}>
                      {choice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label htmlFor="price">Starting Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  value={uploadPlanPrice}
                  onChange={(e) => setUploadPlanPrice(e.target.value)}
                  placeholder="Enter starting price"
                  className="rounded-xl pl-7"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-dashed border-gray-200">
              <Label htmlFor="plans" className="mb-2 block">
                Select Floor Plans (Max 10MB each)
              </Label>
              <Input
                id="plans"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setUploadPlans(e.target.files)}
                className="rounded-xl bg-white"
              />
              <p className="mt-2 text-sm text-gray-500">
                Supported formats: JPG, PNG, WebP
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-sm transition-all duration-200"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isUploading ? "Uploading..." : "Upload Plans"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
