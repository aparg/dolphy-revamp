"use client";
import { homeText, houseType } from "@/constant";
import { generateURL } from "@/helpers/generateResaleURL";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const PropertyPageLinks = ({ saleLease = "for sale" }) => {
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
                {city}
              </Link>
              <div className="flex flex-col space-y-2">
                {Object.values(houseType)
                  .filter((val) => val.value != null)
                  .map((type, linkIndex) => (
                    <Link
                      key={`${type}-${linkIndex}`}
                      href={generateURL({
                        cityVal: city,
                        houseTypeVal: type.name,
                        saleLeaseVal: saleLease,
                      })}
                      className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                    >
                      {homeText[type.name]} in {city}
                    </Link>
                  ))}
              </div>
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

export default PropertyPageLinks;
