"use client";
import { bedCount, homeText, propertyTypes } from "@/constant";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const BedroomLinks = ({ propertyType, saleLease }) => {
  const cities = [
    "Toronto",
    "Brampton",
    "Mississauga",
    "Milton",
    "Hamilton",
    "Burlington",
    "Ajax",
    "Pickering",
    "Barrie",
    "Cambridge",
    "Kitchener",
    "Waterloo",
    "Niagara",
    "Oshawa",
    "Whitby",
    "Richmond Hill",
    "Aurora",
    "New Market",
    "Oakville",
  ];

  const generateBedroomURL = ({ cityVal, propertyType, bedCount }) => {
    if (propertyType == "Homes") {
      return `/resale/ontario/${cityVal.toLowerCase()}/homes-for-sale/${bedCount}-plus-bed`;
    } else {
      return `/resale/ontario/${cityVal.toLowerCase()}/${propertyType.toLowerCase()}-homes-for-sale/${bedCount}-plus-bed`;
    }
  };

  // New state to manage the visibility of cities
  const [showAll, setShowAll] = useState(false);

  // Calculate the number of cities to display
  const displayedCities = showAll ? cities : cities.slice(0, 12); // 3 rows of 4 cities each

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedCities.map((city, index) => (
            <div key={`${city}-${index}`} className="flex flex-col space-y-2">
              <Link
                href={`/resale/ontario/${city.toLowerCase()}/homes-for-sale`}
                className="text-xl font-bold text-gray-800 mb-2 hover:text-black transition-colors"
              >
                <h3>{city}</h3>
              </Link>
              <ul className="flex flex-col space-y-2 list-none p-0 m-0">
                {Object.values(bedCount)
                  .map((obj) => obj.value)
                  .filter((val) => val != 0)
                  .map((bedCount, linkIndex) => (
                    <li
                      key={`${bedCount}-${linkIndex}`}
                      className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                    >
                      <Link
                        href={generateBedroomURL({
                          cityVal: city,
                          propertyType: propertyType,
                          bedCount: bedCount,
                        })}
                      >
                        {bedCount} bedroom {homeText[propertyType] || "homes"}{" "}
                        {saleLease?.toLowerCase()} in {city}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        {/* View More Button */}
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-4 text-black font-bold hover:underline"
          >
            View More <MoveRight className="inline w-3 ml-0 font-bold" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BedroomLinks;
