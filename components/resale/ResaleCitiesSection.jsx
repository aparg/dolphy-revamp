"use client";

import React from "react";
import Link from "next/link";
import { generateURL } from "@/helpers/generateResaleURL";
import { homeText, houseType } from "@/constant";

const citiesData = [
  {
    city_name: "Toronto",
    city_name_small: "toronto",
    imgLink: "/city-images/toronto.jpg",
  },
  {
    city_name: "Ottawa",
    city_name_small: "ottawa",
    imgLink: "/city-images/ottawa.jpg",
  },
  {
    city_name: "Mississauga",
    city_name_small: "mississauga",
    imgLink: "/city-images/mississauga.jpg",
  },
  {
    city_name: "Ajax",
    city_name_small: "ajax",
    imgLink: "/city-images/ajax.jpg",
  },
  {
    city_name: "Barrie",
    city_name_small: "barrie",
    imgLink: "/city-images/barrie.jpg",
  },
  {
    city_name: "Brampton",
    city_name_small: "brampton",
    imgLink: "/city-images/brampton.jpg",
  },
  {
    city_name: "Pickering",
    city_name_small: "pickering",
    imgLink: "/city-images/pickering.jpg",
  },
  {
    city_name: "Hamilton",
    city_name_small: "hamilton",
    imgLink: "/city-images/hamilton.jpg",
  },
  {
    city_name: "Milton",
    city_name_small: "milton",
    imgLink: "/city-images/milton.jpeg",
  },
  {
    city_name: "Oakville",
    city_name_small: "oakville",
    imgLink: "/city-images/oakville.jpg",
  },
  {
    city_name: "Waterloo",
    city_name_small: "waterloo",
    imgLink: "/city-images/waterloo.jpeg",
  },
  {
    city_name: "Cambridge",
    city_name_small: "cambridge",
    imgLink: "/city-images/cambridge.jpeg",
  },
  {
    city_name: "London",
    city_name_small: "london",
    imgLink: "/city-images/london.webp",
  },
  {
    city_name: "Whitby",
    city_name_small: "whitby",
    imgLink: "/city-images/whitby.jpg",
  },
  {
    city_name: "Niagara Falls",
    city_name_small: "niagara-falls",
    imgLink: "/city-images/niagara-falls.jpg",
  },
];

const ResaleCitiesSection = ({ saleLease = "for sale" }) => {
  return (
    <section className="bg-white pt-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/resale/ontario">
            <h2 className="text-xl md:text-5xl font-extrabold mb-2">
              Resale Homes for sale in{" "}
              <span className="text-red-600">Ontario</span>
            </h2>
          </Link>
          <p className="text-gray-600">
            1000+ homes for sale on Ontario. Check out affordable homes in
            Dolphy.{" "}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {citiesData.map((city, index) => (
            <Link
              href={`${generateURL({ cityVal: city.city_name })}`}
              key={index}
              className="no-underline group mb-10"
            >
              <div className="relative h-[180px] md:h-[220px] rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${city.imgLink})` }}
                ></div>
              </div>
              <h3 className="text-black text-lg md:text-xl font-bold mt-2 hover:underline hover:underline-offset-1 transition-all duration-3000">
                {city.city_name}, ON
              </h3>
              <div
                key={`${city.city_name_small}-${index}`}
                className="flex flex-col space-y-2"
              >
                <div className="flex flex-col space-y-1 mt-2">
                  {Object.values(houseType)
                    .filter((val) => val.value != null)
                    .map((type, linkIndex) => (
                      <Link
                        key={`${type}-${linkIndex}`}
                        href={generateURL({
                          cityVal: city.city_name,
                          houseTypeVal: type.name,
                          saleLeaseVal: saleLease,
                        })}
                        className="text-[12px] font-normal tracking-normal text-gray-500 hover:text-black transition-colors"
                      >
                        {homeText[type.name]} in {city.city_name}
                      </Link>
                    ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResaleCitiesSection;
