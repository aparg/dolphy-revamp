"use client";

import { useState, useEffect } from "react";
import ListingCard from "./ListingCard";

export default function FilteredListings({ cityName, initialData, filters }) {
  const [filteredData, setFilteredData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = "https://admin.dolphy.ca";
        let url = `${baseUrl}/api/pre-constructions-city/${cityName}/?`;

        if (filters.project_type) {
          url += `project_type=${encodeURIComponent(filters.project_type)}&`;
        }
        if (filters.price_range) {
          url += `price_range=${encodeURIComponent(filters.price_range)}&`;
        }

        console.log("Fetching filtered data from:", url);
        const response = await fetch(url);
        const data = await response.json();

        if (data?.data?.results) {
          setFilteredData(data.data);
        }
      } catch (error) {
        console.error("Error fetching filtered data:", error);
        setFilteredData(initialData);
      } finally {
        setIsLoading(false);
      }
    };

    if (filters.project_type || filters.price_range) {
      fetchFilteredData();
    } else {
      setFilteredData(initialData);
    }
  }, [filters, cityName, initialData]);

  const filteredprojects = (status) => {
    return filteredData.results.filter((item) => item.status === status);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Selling Projects Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
          {filteredprojects("Selling").map((listing, index) => (
            <ListingCard
              key={listing.slug}
              listing={listing}
              index={index + 1}
              city={cityName}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Projects Section */}
      {filteredprojects("Upcoming").length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-4">
            Launching Soon - New Construction Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
            {filteredprojects("Upcoming").map((listing, index) => (
              <ListingCard
                key={listing.slug}
                listing={listing}
                index={index + 1}
                city={cityName}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sold Out Projects Section */}
      {filteredprojects("Sold out").length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-4 text-red-600 italic">
            Sold out - New Construction Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
            {filteredprojects("Sold out").map((listing, index) => (
              <ListingCard
                key={listing.slug}
                listing={listing}
                index={index + 1}
                city={cityName}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
