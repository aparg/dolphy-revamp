"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBuilding } from "react-icons/fa";

const AssignmentCard = ({ assignment, index }) => {
  const formatPrice = (price) =>
    price
      ? `${numberWithCommas(price.replace(/\$|,/g, ""))}`
      : "Price on request";

  function numberWithCommas(x) {
    if (!x) return "0";
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <Link
        href={`/assignment-sale/${assignment.region
          .replace(/-/g, "-")
          .replace(/\s+/g, "-")
          .toLowerCase()}/${assignment.project_name
          .replace(/\s+/g, "-")
          .toLowerCase()}-${assignment.id}`}
        className="block"
      >
        <div className="relative h-56 w-full overflow-hidden">
          {assignment.image1 ? (
            <img
              src={assignment.image1}
              alt={`${assignment.project_name} - ${assignment.unit_type}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
              <FaBuilding className="text-gray-300 text-5xl" />
            </div>
          )}
        </div>
      </Link>
      <Link
        href={`/assignment-sale/${assignment.region
          .replace(/-/g, "-")
          .replace(/\s+/g, "-")
          .toLowerCase()}/${assignment.project_name
          .replace(/\s+/g, "-")
          .toLowerCase()}-${assignment.id}`}
        className={`block p-4 bg-white rounded-b-xl no-underline`}
      >
        <div className="mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-black text-black md:text-2xl">
              ${formatPrice(assignment.price.replace(/\$|,/g, ""))}
            </h1>
            <span className="ml-2 px-2 py-1 bg-gray-100 text-[9px] font-semibold rounded-md">
              Assignment
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mt-1">
            <span>{assignment.unit_type || "N/A"}</span>
            <span className="mx-2">•</span>
            <span>{assignment.bathrooms || "N/A"} Baths</span>
            <span className="mx-2">•</span>
            <span>
              {assignment.property_status === "T"
                ? "Townhouse"
                : assignment.property_status || "N/A"}
            </span>
          </div>

          <div className="flex items-center text-sm mt-1">
            <span className="text-gray-600">{assignment.address || "N/A"}</span>
          </div>

          <div className="flex items-center text-sm mt-1">
            <span className="text-gray-600">
              Occupancy - {assignment.occupancy_date || "N/A"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AssignmentCard;
