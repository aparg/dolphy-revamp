import Link from "next/link";
import React from "react";

const PropertyDisplaySection = ({
  title,
  subtitle,
  exploreAllLink,
  children,
}) => {
  return (
    <div className="mt-10 sm:mt-20 max-w-[96%] mx-auto sm:max-w-full">
      <div className="my-2 sm:my-4">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-lg sm:text-3xl font-bold w-[100%] sm:w-auto">
            {title}
          </h3>
          {exploreAllLink && (
            <Link href={exploreAllLink || "#"} className="hidden sm:inline">
              <button className="border-black font-bold border-2 inline px-1 sm:px-3 py-2 rounded-md text-sm sm:text-md">
                Explore All
              </button>
            </Link>
          )}
        </div>
        {subtitle && (
          <h5 className="font-md text-xs sm:text-md sm:mt-1">{subtitle}</h5>
        )}
      </div>
      {children}
      {exploreAllLink && (
        <div className="flex justify-center">
          <Link href={exploreAllLink || "#"} className="sm:hidden">
            <button className="border-black font-bold border-2 inline px-1 sm:px-3 py-2 rounded-md text-sm mt-1 sm:text-md">
              Explore All
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PropertyDisplaySection;
