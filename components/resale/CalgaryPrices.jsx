import { generateURL } from "@/helpers/generateResaleURL";
import { ArrowRight } from "lucide-react";
import React from "react";

const CalgaryPrices = ({}) => {
  const pricedHomes = [
    {
      label: "Homes under $500k",
      link: "/resale/alberta/calgary/homes-under-500k-for-sale",
      description:
        "Affordable homes for first-time buyers and budget-conscious families.",
    },
    {
      label: "Homes under $750k",
      link: "/resale/alberta/calgary/homes-under-750k-for-sale",
      description: "Great options for growing families looking for more space.",
    },
    {
      label: "Homes under $1M",
      link: "/resale/alberta/calgary/homes-under-1000k-for-sale",
      description:
        "Luxury homes with modern amenities in desirable neighborhoods.",
    },
    {
      label: "Homes under $1.5M",
      link: "/resale/alberta/calgary/homes-under-1500k-for-sale",
      description: "High-end properties with premium features and locations.",
    },
    {
      label: "Homes above $1.5M",
      link: "/resale/alberta/calgary/homes-above-1500k-for-sale",
      description: "Premium properties for discerning buyers seeking luxury.",
    },
    {
      label: "Explore All Properties",
      link: "/resale/alberta/calgary/explore-all-properties",
      description:
        "Browse a comprehensive list of all available properties in Calgary.",
    },
  ];
  return (
    <div className="mt-24 mb-36">
      <h2 className="text-center font-extrabold text-5xl mb-4 leading-[3.5rem]">
        Discover Your Perfect Home
        <br />
        <span className="text-red-600">Within Your Budget!</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 max-w-6xl justify-center mx-auto">
        {pricedHomes.map((home) => {
          return (
            <div className="border rounded-2xl overflow-hidden p-4 m-2 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold">{home.label}</h3>
              <p className="text-gray-600">{home.description}</p>
              <a
                href={home.link}
                className="text-red-600 hover:underline mt-2 inline-block"
              >
                View Listings
                <ArrowRight className="w-4 inline" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalgaryPrices;
