"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const priceRanges = [
  { label: "Under $500,000", range: { min: 0, max: 500000 } },
  { label: "Under $600,000", range: { min: 0, max: 600000 } },
  { label: "Under $700,000", range: { min: 0, max: 700000 } },
  { label: "Under $800,000", range: { min: 0, max: 800000 } },
  { label: "Under $1,000,000", range: { min: 0, max: 1000000 } },
  { label: "Under $1,500,000", range: { min: 0, max: 1500000 } },
  { label: "Under $2,000,000", range: { min: 0, max: 2000000 } },
  { label: "Under $2,500,000", range: { min: 0, max: 2500000 } },
  { label: "$2,000,000 and above", range: { min: 2000000, max: 0 } },
];

const propertyTypes = [
  { name: "All Properties", value: "all" },
  { name: "Semi Detached", value: "semi-detached" },
  { name: "Detached", value: "detached" },
  { name: "Townhomes", value: "townhouse" },
  { name: "Condo", value: "condo" },
];

const MapFilters = ({ onFilterChange }) => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 0 },
    type: "all"
  });

  const handlePriceChange = (range) => {
    const newFilters = {
      ...filters,
      priceRange: range
    };
    setFilters(newFilters);
    setIsPriceOpen(false);
    onFilterChange(newFilters);
  };

  const handleTypeChange = (type) => {
    const newFilters = {
      ...filters,
      type
    };
    setFilters(newFilters);
    setIsTypeOpen(false);
    onFilterChange(newFilters);
  };

  const getCurrentPriceLabel = () => {
    const current = priceRanges.find(
      p => p.range.min === filters.priceRange.min && p.range.max === filters.priceRange.max
    );
    return current?.label || "Price";
  };

  const getCurrentTypeLabel = () => {
    const current = propertyTypes.find(t => t.value === filters.type);
    return current?.name || "Property Type";
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
      {/* Price Range Dropdown */}
      <div className="relative">
        <Button
          variant="default"
          className="bg-white/90 backdrop-blur-sm hover:bg-white flex items-center gap-2 min-w-[160px] justify-between"
          onClick={() => {
            setIsPriceOpen(!isPriceOpen);
            setIsTypeOpen(false);
          }}
        >
          <span>{getCurrentPriceLabel()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        
        {isPriceOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 w-[200px] max-h-[400px] overflow-y-auto">
            {priceRanges.map(({ label, range }) => (
              <button
                key={label}
                className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-50 ${
                  filters.priceRange.min === range.min && 
                  filters.priceRange.max === range.max
                    ? "bg-blue-50 text-blue-600"
                    : ""
                }`}
                onClick={() => handlePriceChange(range)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Property Type Dropdown */}
      <div className="relative">
        <Button
          variant="default"
          className="bg-white/90 backdrop-blur-sm hover:bg-white flex items-center gap-2 min-w-[160px] justify-between"
          onClick={() => {
            setIsTypeOpen(!isTypeOpen);
            setIsPriceOpen(false);
          }}
        >
          <span>{getCurrentTypeLabel()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        
        {isTypeOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 w-[200px]">
            {propertyTypes.map(({ name, value }) => (
              <button
                key={value}
                className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-50 ${
                  filters.type === value 
                    ? "bg-blue-50 text-blue-600"
                    : ""
                }`}
                onClick={() => handleTypeChange(value)}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapFilters;
