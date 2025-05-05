import { houseType } from "@/constant";
import { allCities } from "@/constant/cities";
import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";
import React from "react";

const houseTypesArray = Object.values(houseType)
  .filter((obj) => obj.value)
  .map((obj) => obj.name);
const cities = allCities.map((obj) => obj.city);
const SiteLinks = ({ type }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 max-w-[90%] mx-auto">
      {cities.map((city, index) => (
        <div key={city}>
          <b>Properties in {city}</b>
          <ul>
            {houseTypesArray.map((value) => {
              return (
                <li key={value}>
                  <Link
                    href={generateURL({
                      houseTypeVal: value,
                      saleLeaseVal: type,
                      cityVal: city,
                    })}
                    className="hover:text-primary-green"
                  >
                    {value} Homes in {city} for {type}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SiteLinks;
