"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const LastSearchSection = () => {
  const [lastSearchData, setLastSearchData] = useState(null);

  useEffect(() => {
    // Get last search from localStorage
    const filterState = localStorage.getItem("filterState");
    if (filterState) {
      const parsedFilterState = JSON.parse(filterState);
      setLastSearchData(parsedFilterState);
    }
  }, []);

  if (!lastSearchData) return null;

  // Generate the appropriate text based on the search filters
  const getSearchText = () => {
    const parts = [];

    // Handle Open Houses first as it's a special case
    if (lastSearchData.openHouse) {
      parts.push("Open Houses");
      if (lastSearchData.city) {
        parts.push(
          "in",
          lastSearchData.city.charAt(0).toUpperCase() +
            lastSearchData.city.slice(1)
        );
      } else {
        parts.push("in Ontario");
      }
      return parts.join(" ");
    }

    // Handle Price Dropped listings
    if (lastSearchData.priceDropped) {
      parts.push("Price Dropped");
    }

    // Add house type
    if (lastSearchData.houseType) {
      parts.push(lastSearchData.houseType);
    } else {
      parts.push("Homes");
    }

    // Add transaction type
    parts.push(lastSearchData.saleLease || "For Sale");

    // Add location
    if (lastSearchData.city) {
      parts.push(
        "in",
        lastSearchData.city.charAt(0).toUpperCase() +
          lastSearchData.city.slice(1)
      );
    } else {
      parts.push("in Ontario");
    }

    // Add price range
    if (lastSearchData.priceRange) {
      const { min, max } = lastSearchData.priceRange;
      if (min > 0 && max > 0) {
        parts.push(
          `between $${Math.floor(min / 1000)}k-$${Math.floor(max / 1000)}k`
        );
      } else if (min > 0) {
        parts.push(`over $${Math.floor(min / 1000)}k`);
      } else if (max > 0) {
        parts.push(`under $${Math.floor(max / 1000)}k`);
      }
    }

    // Add bathroom count
    if (lastSearchData.washroom > 0) {
      parts.push(`with ${lastSearchData.washroom}+ bathrooms`);
    }

    return parts.join(" ");
  };

  // Generate URL from filter state
  const generateURLFromFilterState = () => {
    const parts = [];

    // Start with base path
    parts.push("/resale/ontario");

    // Add city if present
    if (lastSearchData.city) {
      parts.push(lastSearchData.city.toLowerCase());
    }

    // Add price dropped filter (should come before property type)
    if (lastSearchData.priceDropped) {
      parts.push("price-dropped");
    }

    // Add property type if present
    if (lastSearchData.houseType) {
      const houseTypeSlug = lastSearchData.houseType
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace("semi-detached homes", "semi-detached")
        .replace("detached homes", "detached")
        .replace("condo apartment", "condos")
        .replace("condo townhome", "condo-townhomes")
        .replace("townhomes", "townhomes");
      parts.push(houseTypeSlug);
    }

    // Add price range if present
    if (lastSearchData.priceRange) {
      const { min, max } = lastSearchData.priceRange;
      if (min > 0 && max > 0) {
        parts.push(
          `between-${Math.floor(min / 1000)}k-${Math.floor(max / 1000)}k`
        );
      } else if (min > 0) {
        parts.push(`over-${Math.floor(min / 1000)}k`);
      } else if (max > 0) {
        parts.push(`under-${Math.floor(max / 1000)}k`);
      }
    }

    // Add washroom count if present
    if (lastSearchData.washroom > 0) {
      parts.push(`${lastSearchData.washroom}-plus-bath`);
    }

    // Add open house filter
    if (lastSearchData.openHouse) {
      parts.push("open-houses");
    }

    // Add transaction type
    if (lastSearchData.saleLease === "For Lease") {
      parts.push("for-lease");
    }

    return parts.join("/");
  };

  const url = generateURLFromFilterState();

  // Don't render if we only have base URL
  if (url === "/resale/ontario") return null;

  return (
    <div className="text-center text-sm mt-4">
      Last Search:{" "}
      <Link
        href={url}
        className="text-sm font-normal text-black hover:underline decoration-1 decoration-black underline-offset-4"
      >
        {getSearchText()}
      </Link>
    </div>
  );
};

export default LastSearchSection;
