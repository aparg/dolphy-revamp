"use client";
import React from "react";
import Link from "next/link";
import { allCities } from "@/data/ontarioCities";
import { bedCount } from "@/constant";

const propertyTypes = [
  {
    label: "Detached",
    slug: "detached",
  },
  {
    label: "Semi-Detached",
    slug: "semi-detached",
  },
  {
    label: "Townhomes",
    slug: "townhomes",
  },
  {
    label: "Condo Townhomes",
    slug: "condo-townhomes",
  },
  {
    label: "Condos",
    slug: "condos",
  },
];

const priceRanges = [
  { label: "Under $500k", path: "under-500k", maxPrice: 500000 },
  {
    label: "$500k - $750k",
    path: "between-500k-750k",
    minPrice: 500000,
    maxPrice: 750000,
  },
  {
    label: "$750k - $1M",
    path: "between-750k-1000k",
    minPrice: 750000,
    maxPrice: 1000000,
  },
  {
    label: "$1M - $1.5M",
    path: "between-1000k-1500k",
    minPrice: 1000000,
    maxPrice: 1500000,
  },
  { label: "Over $1.5M", path: "over-1500k", minPrice: 1500000 },
];

export default function OntarioCitiesGrid() {
  // Sort cities alphabetically
  const sortedCities = [...allCities].sort((a, b) =>
    a.city.localeCompare(b.city)
  );

  const generatePropertyURL = ({
    city,
    propertyType,
    saleLease = "sale",
    priceRange = null,
    bedCount = null,
    isOpenHouse = false,
  }) => {
    const baseUrl = "/resale/ontario";
    const cityPath = city.toLowerCase().replace(/\s+/g, "-");

    if (isOpenHouse) {
      return `${baseUrl}/${cityPath}/open-houses`;
    }

    let urlPath = `${baseUrl}/${cityPath}/`;

    if (propertyType) {
      urlPath += propertyType === "condos" ? "condos" : `${propertyType}-homes`;
    } else {
      urlPath += "homes";
    }

    if (priceRange && saleLease === "sale") {
      urlPath += `-${priceRange}`;
    }

    urlPath += `-for-${saleLease}`;

    if (bedCount) {
      urlPath += `/${bedCount}-plus-bed`;
    }

    return urlPath;
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Ontario Real Estate | Homes & Condos for Sale & Rent
        </h1>
        <h2 className="text-sm text-gray-500">
          Homes, Condos, Townhomes for Sale & Lease | Open Houses | New Listings
          | MLS® Listings | 1-5 Bedroom Properties | Under $500K to Luxury Homes
          | Rental Properties from $1500-$5000+
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {sortedCities.map((cityData, index) => (
          <div key={index} className="">
            <Link
              href={generatePropertyURL({
                city: cityData.city,
                saleLease: "sale",
              })}
              className="text-xl font-bold text-gray-800 mb-2 hover:text-black transition-colors"
            >
              {cityData.city}
            </Link>
            <br />
            <Link
              href={generatePropertyURL({
                city: cityData.city,
                isOpenHouse: true,
              })}
              className="text-sm font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              Open Houses in {cityData.city}
            </Link>

            <div className="mt-4 text-sm bg-gray-100 p-2 rounded-md">
              <h2 className="font-semibold text-lg">
                Filtering by house type and sale/lease
              </h2>
              {propertyTypes.map((type) =>
                ["sale", "lease"].map((saleLease) => (
                  <React.Fragment key={`${type.slug}-${saleLease}`}>
                    <Link
                      href={generatePropertyURL({
                        city: cityData.city,
                        propertyType: type.slug,
                        saleLease: saleLease,
                      })}
                      className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                    >
                      {`${type.label} for ${saleLease} in ${cityData.city}`}
                    </Link>
                    <br />
                  </React.Fragment>
                ))
              )}
            </div>

            {/* for bed count & salelease */}
            <div className="mt-4 text-sm bg-gray-100 p-2 rounded-md">
              <h2 className="font-semibold text-lg">
                Filtering by number of bedrooms
              </h2>
              {["sale", "lease"].map((saleLease) =>
                Object.values(bedCount)
                  .filter((obj) => obj.value != 0)
                  .map((bedObj) => (
                    <React.Fragment
                      key={`${cityData.city}-${bedObj.value}-${saleLease}`}
                    >
                      <Link
                        href={generatePropertyURL({
                          city: cityData.city,
                          saleLease: saleLease,
                          bedCount: bedObj.value,
                        })}
                        className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                      >
                        {`${bedObj.value} bedroom homes for ${saleLease} in ${cityData.city}`}
                      </Link>
                      <br />
                    </React.Fragment>
                  ))
              )}
            </div>

            {/* for house type + price range (sale only) */}
            <div className="mt-4 text-sm bg-gray-100 p-2 rounded-md">
              <h2 className="font-semibold text-lg">
                Filtering by house type and price range
              </h2>
              {propertyTypes.map((type) =>
                priceRanges.map((priceRange) => (
                  <React.Fragment key={`${type.slug}-${priceRange.path}`}>
                    <Link
                      href={generatePropertyURL({
                        city: cityData.city,
                        propertyType: type.slug,
                        saleLease: "sale",
                        priceRange: priceRange.path,
                      })}
                      className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                    >
                      {`${type.label} for sale in ${cityData.city} ${priceRange.label}`}
                    </Link>
                    <br />
                  </React.Fragment>
                ))
              )}
            </div>

            {/* for house type + price range + bedcount (sale only) */}
            <div className="mt-4 text-sm bg-gray-100 p-2 rounded-md">
              <h2 className="font-semibold text-lg">
                Filtering by house type, price range and bedrooms
              </h2>
              {propertyTypes.map((type) =>
                priceRanges.map((priceRange) =>
                  Object.values(bedCount)
                    .filter((obj) => obj.value != 0)
                    .map((bedObj) => (
                      <React.Fragment
                        key={`${type.slug}-${priceRange.path}-${bedObj.value}`}
                      >
                        <Link
                          href={generatePropertyURL({
                            city: cityData.city,
                            propertyType: type.slug,
                            saleLease: "sale",
                            priceRange: priceRange.path,
                            bedCount: bedObj.value,
                          })}
                          className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                        >
                          {`${bedObj.value} bedroom ${type.label} for sale in ${cityData.city} ${priceRange.label}`}
                        </Link>
                        <br />
                      </React.Fragment>
                    ))
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
