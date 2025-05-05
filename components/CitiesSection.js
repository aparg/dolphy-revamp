"use client";

import React from "react";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

const citiesData = [
  {
    city_name: "Toronto",
    city_name_small: "toronto",
    imgLink: "/toronto.jpg",
  },
  {
    city_name: "Brampton",
    city_name_small: "brampton",
    imgLink: "/brampton.jpg",
  },
  {
    city_name: "North York",
    city_name_small: "north-york",
    imgLink: "/northyork.jpg",
  },
  {
    city_name: "Mississauga",
    city_name_small: "mississauga",
    imgLink: "/mississauga.jpeg",
  },
  {
    city_name: "Milton",
    city_name_small: "milton",
    imgLink: "/milton.jpg",
  },
  {
    city_name: "Etobicoke",
    city_name_small: "etobicoke",
    imgLink: "/etobicoke.jpg",
  },
];

const CitiesSection = () => {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Pre-Construction projects in{" "}
            <span className="text-red-600">Ontario</span>
          </h2>
          <p className="text-gray-600">
            1500+ latest projects from across Ontario
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-[1200px] mx-auto">
          {citiesData.map((city, index) => (
            <Link
              href={`/${city.city_name_small}`}
              key={index}
              className="no-underline group"
            >
              <div className="relative h-[180px] md:h-[220px] rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${city.imgLink})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white text-lg md:text-xl font-bold mb-1 md:mb-2">
                    {city.city_name}
                  </h3>
                  <div className="flex items-center text-white text-sm font-medium">
                    <span>View all</span>
                    <AiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;
