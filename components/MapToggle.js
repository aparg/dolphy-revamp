"use client";

import { useState } from "react";
import CityMap from "./CityMap";

export default function MapToggle({ properties, city }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMap(!showMap)}
        className={`text-sm px-4 py-2 rounded-md border transition-colors whitespace-nowrap flex items-center gap-2 ${
          showMap ? "bg-gray-100 border-gray-400" : "hover:bg-gray-50 border-gray-300"
        }`}
        aria-label={showMap ? "Hide Map View" : "Show Map View"}
      >
        <span>{showMap ? "Hide Map" : "Map View"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </button>

      {showMap && (
        <div className="fixed inset-0 z-50 bg-white lg:relative lg:w-1/2 lg:h-[calc(100vh-80px)]">
          <div className="absolute top-2 right-2 lg:hidden">
            <button
              onClick={() => setShowMap(false)}
              className="p-2 bg-white rounded-full shadow-md"
              aria-label="Close Map"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <CityMap properties={properties} city={city} />
        </div>
      )}
    </div>
  );
}
