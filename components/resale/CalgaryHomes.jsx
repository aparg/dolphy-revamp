import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import React from "react";

const citiesData = [
  {
    city_name: "NW Calgary",
    city_name_small: "nw-calgary",
    imgLink: "/calgary-zone-images/northwest-calgary.jpg",
    url: "/resale/alberta/calgary/NW/homes-for-sale",
    description:
      "Northwest Calgary offers established neighborhoods with mature trees, excellent schools, and close proximity to the University of Calgary and Foothills Medical Centre. This area features beautiful views of the Rockies, convenient access to Nose Hill Park, and diverse housing options from family homes to luxury properties.",
  },
  {
    city_name: "SW Calgary",
    city_name_small: "sw-calgary",
    imgLink: "/calgary-zone-images/southwest-calgary.jpg",
    url: "/resale/alberta/calgary/SW/homes-for-sale",
    description:
      "Southwest Calgary is known for its upscale communities, proximity to downtown, and scenic river valleys. This desirable area features excellent shopping at Chinook Centre, outdoor recreation along the Elbow River, and a mix of established neighborhoods and new developments with stunning mountain views.",
  },
  {
    city_name: "NE Calgary",
    city_name_small: "ne-calgary",
    imgLink: "/calgary-zone-images/northeast-calgary.jpeg",
    url: "/resale/alberta/calgary/NE/homes-for-sale",
    description:
      "Northeast Calgary offers diverse, multicultural communities with affordable housing options and excellent connectivity. Home to the Calgary International Airport and several industrial areas, this rapidly developing quadrant features newer subdivisions, convenient shopping centers, and easy access to major transportation routes.",
  },
  {
    city_name: "SE Calgary",
    city_name_small: "se-calgary",
    imgLink: "/calgary-zone-images/southeast-calgary.jpg",
    url: "/resale/alberta/calgary/SE/homes-for-sale",
    description:
      "Southeast Calgary combines established neighborhoods with rapidly growing new communities. This family-friendly area features abundant green spaces, the popular Fish Creek Provincial Park, Southcentre Mall, and diverse housing options ranging from affordable starter homes to luxury riverside properties.",
  },
];

export default function CalgaryHomes({ withDescription }) {
  return (
    <section className="py-10 bg-white sm:py-16 lg:pb-10 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto text-center">
          <div className="text-center mb-8">
            <Link href="/resale/alberta/calgary-homes">
              <h2 className="text-xl md:text-5xl font-extrabold mb-2">
                Homes for sale in <span className="text-red-600">Calgary</span>
              </h2>
            </Link>
            <p className="text-gray-600">
              Find your perfect property in Calgary with our extensive
              collection of semi-detached, detached homes, and condos.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
            {citiesData.map((city, index) => (
              <Link
                href={city.url}
                key={index}
                className="no-underline group mb-6 hover:scale-105 duration-1000"
              >
                <div className="relative h-[180px] md:h-[220px] rounded-xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${city.imgLink})` }}
                  ></div>
                </div>
                <h3 className="text-black text-lg md:text-xl font-bold mt-2 hover:underline hover:underline-offset-1 transition-all duration-3000 text-center">
                  {city.city_name}, ON
                </h3>
                {withDescription && (
                  <h4 className="text-[0.65rem] text-gray-400 text-justify">
                    {city.description}
                  </h4>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-base text-gray-600">
            Looking for more properties?
            <Link
              href="/resale/alberta/homes-for-sale"
              className="ml-2 font-medium text-slate-900 transition-all duration-200 hover:underline"
            >
              View all Alberta listings
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
