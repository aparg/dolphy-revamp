"use client";

import { useState, useEffect } from "react";
import ListingCardHeroPrice from "@/components/ListingCardHeroPrice";
import Heading from "./design/Heading";
import { useRouter } from "next/navigation";

const FeaturedProjects = () => {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState("Townhomes");
  const [loading, setLoading] = useState(true);

  const filters = ["Townhomes", "Detached", "Semi-Detached", "Condos"];
  const filterToApiParam = {
    Townhomes: "Townhome",
    Detached: "Detached",
    "Semi-Detached": "Semi-Detached",
    Condos: "Condo",
    Featured: "Featured",
  };

  useEffect(() => {
    // Listen for property type selection
    const handlePropertyTypeSelected = (event) => {
      const selectedFilter = event.detail.filter;
      if (selectedFilter !== "Featured") {
        setFilter(selectedFilter);
      }
    };

    window.addEventListener("propertyTypeSelected", handlePropertyTypeSelected);

    // Check URL for initial tab
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam && filters.includes(tabParam)) {
      setFilter(tabParam);
    }

    return () => {
      window.removeEventListener(
        "propertyTypeSelected",
        handlePropertyTypeSelected
      );
    };
  }, []);

  useEffect(() => {
    fetchListings();
  }, [filter]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const projectType = filterToApiParam[filter];
      const url = projectType
        ? `https://admin.dolphy.ca/api/featured-preconstructions/?project_type=${projectType}`
        : "https://admin.dolphy.ca/api/featured-preconstructions/";

      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "success") {
        setListings(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="container py-5 scroll-mt-20 relative"
      id="featured-listings"
    >
      <Heading
        subtitle={"1500+ projects from all across Ontario and Alberta"}
        align="center"
        maxWidthsubtitle="90px"
      >
        Featured Pre Construction Projects in Canada
      </Heading>

      <div className="grid grid-cols-4 gap-1 mb-4 w-full max-w-[500px] mx-auto px-2">
        {filters.map((filterName) => (
          <button
            key={filterName}
            className={`px-2 py-1.5 text-[11px] sm:text-sm bg-transparent relative whitespace-nowrap hover:text-red-600 transition-colors ${
              filter === filterName
                ? "text-red-600 font-semibold after:content-[''] after:absolute after:bottom-[-2px] after:left-2 after:right-2 after:h-0.5 after:bg-red-600"
                : "text-gray-600"
            }`}
            onClick={() => setFilter(filterName)}
          >
            {filterName}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center mt-4">
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-4">No listings found for {filter}</div>
        ) : (
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4 p-2 md:p-4">
            {listings.map((listing) => (
              <ListingCardHeroPrice
                key={listing.id}
                name={listing.project_name}
                url_slug={listing.slug}
                img_url1={listing.images[0]}
                street={listing.project_address}
                city_name={listing.city.name}
                status={listing.status}
                price_starting_from={listing.price_starting_from}
                is_featured={listing.is_featured}
                ready_date={listing.occupancy}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProjects;
