"use client";

import { useEffect } from "react";

// Function to check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = "__test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Function to capitalize first letter
const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function FilterStateManager({ filters }) {
  useEffect(() => {
    // Set filter state in localStorage
    if (isLocalStorageAvailable()) {
      const filterState = {
        saleLease: filters.transactionType || "For Sale",
        priceDropped: filters.mlsStatus === "Price Change",
        priceRange: {
          min: filters.minPrice || 0,
          max: filters.maxPrice || 0,
        },
        houseType: filters.propertyType || null,
        Basement: [],
        Roads: [],
        washroom: filters.minBaths || 0,
        priceDecreased: filters.mlsStatus === "Price Change" ? true : null,
        city: filters.city?.toLowerCase() || null,
        openHouse: filters.isOpenHouse || false,
      };

      window.localStorage.setItem("filterState", JSON.stringify(filterState));
      if (filters.city) {
        window.localStorage.setItem(
          "selectedCity",
          capitalizeFirstLetter(filters.city)
        );
      }
    }
  }, [filters]);

  return null;
}
