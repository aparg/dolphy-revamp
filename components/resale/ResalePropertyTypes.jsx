"use client";

import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import { useRouter } from "next/navigation";

const propertyTypes = [
  {
    title: "Townhomes",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    filter: "Townhomes",
    url: "/resale/ontario/homes/town-homes-for-sale",
    color: "text-gray-900",
    bgColor: "bg-gray-100",
  },
  {
    title: "Condos",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 2v20M18 2v20M6 12h12M6 7h12M6 17h12" />
        <rect x="2" y="2" width="20" height="20" rx="2" />
      </svg>
    ),
    filter: "Condos",
    url: "/resale/ontario/homes/condo-for-sale",
    color: "text-gray-900",
    bgColor: "bg-gray-100",
  },
  {
    title: "Detached",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    filter: "Detached",
    url: "/resale/ontario/homes/detached-homes-for-sale",
    color: "text-gray-900",
    bgColor: "bg-gray-100",
  },
  {
    title: "Semi-Detached",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M1 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 3v18" />
      </svg>
    ),
    filter: "Detached",
    url: "/resale/ontario/homes/semi-detached-homes-for-sale",
    color: "text-gray-900",
    bgColor: "bg-gray-100",
  },
];

const ResalePropertyTypes = () => {
  const router = useRouter();

  return (
    <section className="py-6 px-4">
      <div className="max-w-xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {propertyTypes.map((property) => (
            <Link
              key={property.title}
              className="group relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
              href={property.url}
            >
              <div
                className={`p-2.5 rounded-full ${property.bgColor} mb-2 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className={`w-5 h-5 sm:w-6 sm:h-6 ${property.color}`}>
                  {property.icon}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 text-center">
                {property.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResalePropertyTypes;
