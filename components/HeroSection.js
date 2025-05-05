"use client";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { useState } from "react";
import UnifiedSearchBar from "@/components/UnifiedSearchBar";
import { generateURL } from "@/helpers/generateResaleURL";

const popularCities = [
  "Toronto",
  "Milton",
  "Mississauga",
  "Milton",
  "Etobicoke",
  "Brampton",
  "Markham",
  "Vaughan",
  "Edmonton",
];

const HeroSection = () => {
  const [isResale, setIsResale] = useState(true);
  return (
    <>
      <div className="h-[70vh] mx-8 rounded-2xl relative bg-hero flex justify-center items-center">
        {/* Mobile padding */}
        <div className="block md:hidden pt-4"></div>
        {/* Desktop padding */}
        <div className="hidden md:block pt-5"></div>

        <div className="container h-[70vh] min-w-full backdrop-blur-sm flex justify-center items-center text-white rounded-2xl border-2 border-transparent rounded-2xl">
          <div className="mx-auto text-center px-0 mt-0">
            <div className="flex gap-x-3 justify-center md:mb-3">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold pb-0 text-white flex items-center justify-center gap-3 mb-0">
                Discover your dream home.
              </h2>
            </div>
            <p className="text-xl md:text-xl lg:text-xl mb-2 py-0 leading-3">
              Latest properties. Updated daily.
            </p>

            <div className="mx-auto mb-4">
              <div className="w-[330px] md:w-[670px] mx-auto">
                <UnifiedSearchBar
                  width="w-full"
                  height="h-16"
                  herosection={true}
                />
              </div>
            </div>
          </div>
          {/* {!isResale ? <PropertyTypes /> : <ResalePropertyTypes />} */}

          {!isResale && (
            <div className="flex justify-center">
              <div className="inline-block mx-auto p-4 rounded-2xl mt-0 md:mt-8 text-center">
                <h3 className="text-[0.8rem] md:text-lg mb-4 font-normal text-gray-700">
                  Homes from trusted builders across the country
                </h3>
                <Image
                  src="/builde.png"
                  alt="Builders"
                  width={400}
                  height={200}
                  className="img-fluid"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
