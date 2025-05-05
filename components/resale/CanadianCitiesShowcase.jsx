import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import React from "react";

const CityCard = ({ name, imageUrl }) => (
  <Link href={generateURL({ cityVal: name })}>
    <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
      <img
        src={imageUrl}
        alt={`${name} cityscape`}
        className="object-cover transition-transform duration-300 group-hover:scale-110 h-[350px] w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <h3 className="absolute flex justify-center w-full bottom-4 text-white text-2xl font-bold text-center">
        {name}
      </h3>
    </div>
  </Link>
);

const CanadianCitiesShowcase = () => {
  const cities = [
    { name: "Toronto", imageUrl: "/city-images/toronto.jpg" },
    { name: "Ottawa", imageUrl: "/city-images/ottawa.jpg" },
    // object for these cities
    { name: "Mississauga", imageUrl: "/city-images/mississauga.jpg" },
    { name: "Ajax", imageUrl: "/city-images/ajax.jpg" },
    { name: "Barrie", imageUrl: "/city-images/barrie.jpg" },
    { name: "Brampton", imageUrl: "/city-images/brampton.jpg" },
    { name: "Pickering", imageUrl: "/city-images/pickering.jpg" },
    { name: "Hamilton", imageUrl: "/city-images/hamilton.jpg" },
    // { name: "Oakville", imageUrl: "/images/oakville.jpg" },
    // Add more cities as needed
  ];

  return (
    <div className="my-[5rem] sm:my-[10rem]">
      <div className="mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2 mt-10">
          New Homes for sale in{" "}
          <span className="text-primary-green">your city </span>
          <span className="text-primary-green relative">
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-gretext-primary-green rounded"></span>
          </span>
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Explore top cities across Canada
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-8">
          {cities.map((city) => (
            <CityCard
              key={city.name}
              name={city.name}
              imageUrl={city.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanadianCitiesShowcase;
