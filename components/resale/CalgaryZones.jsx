import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import React from "react";

const ZoneCard = ({ name, imageUrl, quadrant }) => (
  <Link
    href={generateURL({ cityVal: "calgary/" + quadrant, province: "alberta" })}
  >
    <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
      <img
        src={imageUrl}
        alt={`${name} cityscape`}
        className="object-cover transition-transform duration-300 group-hover:scale-110 h-[350px] w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <h3 className="absolute flex justify-center w-full bottom-4 text-white text-sm font-bold text-center text-shadow">
        {name}
      </h3>
    </div>
  </Link>
);

const CalgaryZones = () => {
  const zones = [
    {
      name: "North East Calgary",
      imageUrl: "/calgary-zone-images/northeast-calgary.jpeg",
      quadrant: "NE",
    },
    {
      name: "South East Calgary",
      imageUrl: "/calgary-zone-images/southeast-calgary.jpg",
      quadrant: "SE",
    },
    {
      name: "North West Calgary",
      imageUrl: "/calgary-zone-images/northwest-calgary.jpg",
      quadrant: "NW",
    },
    {
      name: "South West Calgary",
      imageUrl: "/calgary-zone-images/southwest-calgary.jpg",
      quadrant: "SW",
    },
    {
      name: "West Calgary",
      imageUrl: "/calgary-zone-images/west-calgary.jpg",
      quadrant: "W",
    },
    {
      name: "East Calgary",
      imageUrl: "/calgary-zone-images/east-calgary.jpg",
      quadrant: "E",
    },
    {
      name: "Calgary City Centre",
      imageUrl: "/calgary-zone-images/citycentre-calgary.jpg",
      quadrant: "CC",
    },
  ];

  return (
    <div className="my-5">
      <h2 className="text-xl text-gray-800 font-bold mb-2">
        Browse Calgary Homes by Zone
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-7 gap-x-2 gap-y-4 sm:gap-3">
        {zones.map((zone) => (
          <ZoneCard
            key={zone.name}
            name={zone.name}
            imageUrl={zone.imageUrl}
            quadrant={zone.quadrant}
          />
        ))}
      </div>
    </div>
  );
};

export default CalgaryZones;
