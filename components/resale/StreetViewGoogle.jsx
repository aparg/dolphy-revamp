"use client";
import { useState, useEffect } from "react";

const NearbyPlacesGoogle = ({
  width = 600,
  height = 400,
  location = "University of Oxford",
  zoom = 13,
  defaultCategories = ["restaurants", "schools", "hospitals", "shopping"],
}) => {
  // Predefined categories that users can select from
  const availableCategories = [
    { id: "restaurants", label: "Restaurants" },
    { id: "schools", label: "Schools" },
    { id: "hospitals", label: "Hospitals" },
    { id: "shopping", label: "Malls" },
  ];

  // State to track selected categories
  const [selectedCategories, setSelectedCategories] =
    useState(defaultCategories);
  const [mapSrc, setMapSrc] = useState("");

  // Update map source when selected categories change
  useEffect(() => {
    const query = `all ${selectedCategories.join(" and ")} near ${location}`;
    setMapSrc(
      `https://www.google.com/maps?q=${encodeURIComponent(
        query
      )}&z=${zoom}&output=embed`
    );
  }, [selectedCategories, location]);

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div className="relative max-w-full">
      {/* <h3 className="text-start text-lg font-normal mb-4">{location}</h3> */}
      <div className="mb-2 flex flex-wrap justify-start gap-1.5">
        {availableCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`px-1.5 py-0.5 text-[10px] rounded-md transition-colors ${
              selectedCategories.includes(category.id)
                ? "bg-gray-50 text-gray-700 border border-gray-200"
                : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {selectedCategories.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded text-center">
          Please select at least one category to view nearby places
        </div>
      ) : (
        <div
          className="overflow-hidden bg-none"
          style={{ height: `${height}px` }}
        >
          <iframe
            className="max-w-full"
            height={height}
            width={width}
            src={mapSrc}
            title="Google Nearby Places"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default NearbyPlacesGoogle;
