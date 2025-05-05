"use client";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import citiesWithProvinces from "@/constant/cities";

const PropertyLinksGrid = ({ currentCity = "Toronto" }) => {
  const cities = citiesWithProvinces;

  const propertyTypes = [
    { label: "Detached", slug: "detached-homes", suffix: "homes" },
    { label: "Semi-Detached", slug: "semi-detached-homes", suffix: "homes" },
    { label: "Townhomes", slug: "townhomes", suffix: "" },
    { label: "Condo Townhomes", slug: "condo-townhomes", suffix: "" },
    { label: "Condos", slug: "condos", suffix: "" },
  ];

  const priceRanges = [
    { label: "Under $500k", slug: "homes-under-500k" },
    { label: "Under $750k", slug: "homes-under-750k" },
    { label: "Under $1M", slug: "homes-under-1000k" },
    { label: "Under $1.5M", slug: "homes-under-1500k" },
    { label: "Over $1.5M", slug: "homes-over-1500k" },
  ];

  const bedBathOptions = [
    { label: "1+ Bed", slug: "1-plus-bed" },
    { label: "2+ Beds", slug: "2-plus-bed" },
    { label: "3+ Beds", slug: "3-plus-bed" },
    { label: "4+ Beds", slug: "4-plus-bed" },
    { label: "5+ Beds", slug: "5-plus-bed" },
    { label: "1+ Bath", slug: "1-plus-bath" },
    { label: "2+ Baths", slug: "2-plus-bath" },
    { label: "3+ Baths", slug: "3-plus-bath" },
  ];

  const [showAll, setShowAll] = useState(false);
  const displayedCities = showAll ? cities : cities.slice(0, 11);

  const generatePropertyTypeURL = (city, propertyType) => {
    return `/resale/ontario/${city.toLowerCase()}/${propertyType}-for-sale`;
  };

  const generatePriceRangeURL = (city, priceRange) => {
    return `/resale/ontario/${city.toLowerCase()}/${priceRange}-for-sale`;
  };

  const generateOpenHouseURL = (city) => {
    return `/resale/ontario/${city.toLowerCase()}/open-houses`;
  };

  const generatePriceDroppedURL = (city) => {
    return `/resale/ontario/${city.toLowerCase()}/price-dropped`;
  };

  const generateBedBathURL = (city, slug) => {
    return `/resale/ontario/${city.toLowerCase()}/homes-for-sale/${slug}`;
  };

  const CurrentCitySection = ({ city }) => (
    <div className="rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {city} Real Estate | Homes for Sale
        </h2>
        <p className="text-black">
          Explore detached, semi-detached, townhomes & condos for sale in{" "}
          {city || "Ontario"}. Open houses available. Price Dropped Homes
          Available.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
        {/* Property Types Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {city} Homes by Property Type
          </h3>
          <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
            {propertyTypes.map((type) => (
              <li
                key={type.slug}
                className="text-[13px] font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
              >
                <Link href={generatePropertyTypeURL(city, type.slug)}>
                  {type.label} {type.suffix} for sale in {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Ranges Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {city} Homes by Price Range
          </h3>
          <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
            {priceRanges.map((range) => (
              <li
                key={range.slug}
                className="text-[13px] font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
              >
                <Link href={generatePriceRangeURL(city, range.slug)}>
                  Homes {range.label} in {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Beds & Baths Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {city} Homes by Bedrooms & Bathrooms
          </h3>
          <div className="grid grid-cols-2 gap-x-8">
            <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
              {bedBathOptions.slice(0, 5).map((option) => (
                <li
                  key={option.slug}
                  className="text-[13px] font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                >
                  <Link href={generateBedBathURL(city, option.slug)}>
                    {option.label} homes in {city}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
              {bedBathOptions.slice(5).map((option) => (
                <li
                  key={option.slug}
                  className="text-[13px] font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                >
                  <Link href={generateBedBathURL(city, option.slug)}>
                    {option.label} homes in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Featured Links Section */}
        <div className="md:col-span-3 border-t pt-6 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Price Dropped and Open Houses in {city}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href={generateOpenHouseURL(city)}
              className="text-[13px] font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              Open houses in {city}
            </Link>
            <Link
              href={generatePriceDroppedURL(city)}
              className="text-[13px] font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              Price dropped homes in {city}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const OtherCityLinks = ({ city }) => (
    <div className="flex flex-col space-y-3">
      <h4 className="text-lg font-bold text-gray-800">
        <Link
          href={`/resale/ontario/${city.toLowerCase()}/homes-for-sale`}
          className="hover:text-black transition-colors"
        >
          Homes for Sale in {city}
        </Link>
      </h4>

      <div>
        <h4 className="text-[13px] font-semibold text-gray-700 mb-2">
          By Property Types
        </h4>
        <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
          {propertyTypes.map((type) => (
            <li
              key={type.slug}
              className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              <Link href={generatePropertyTypeURL(city, type.slug)}>
                {type.label} {type.suffix} for sale in {city}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[13px] font-semibold text-gray-700 mb-2">
          Featured
        </h4>
        <ul className="flex flex-col space-y-1.5 list-none p-0 m-0">
          <li className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors">
            <Link href={generateOpenHouseURL(city)}>Open houses in {city}</Link>
          </li>
          <li className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors">
            <Link href={generatePriceDroppedURL(city)}>
              Price dropped homes in {city}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Current City Section */}
      <CurrentCitySection city={currentCity} />

      {/* Other Cities Section */}
      <div>
        <h3 className="text-xl font-bold mb-6">
          Explore Homes for Sale Nearby {currentCity}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedCities.map((city, index) => (
            <OtherCityLinks key={`${city.city}-${index}`} city={city.city} />
          ))}
        </div>

        {/* View More Button */}
        {!showAll && cities.length > 11 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-8 text-black font-bold hover:underline text-sm"
          >
            View More Cities <MoveRight className="inline w-3 ml-0 font-bold" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyLinksGrid;
