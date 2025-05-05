"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // Determine page type based on pathname
  const isBrokerage = pathname.includes("brokerage");
  const isListingPage =
    pathname.split("/").length === 3 &&
    !pathname.includes("condos") &&
    !pathname.includes("pre-construction");
  const isCityPage =
    pathname.split("/").length === 2 ||
    pathname.includes("condos") ||
    pathname.includes("pre-construction");

  const isResale = pathname.includes("resale");

  if (!isVisible) return null;

  // Brokerage page button
  if (isBrokerage) {
    return (
      <button
        onClick={() =>
          document
            .getElementById("apply-form")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden bg-[#ff6200] text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center space-x-3"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-bold text-center text-lg">Join Now</span>
          <span className="text-xs">Limited Spots Available</span>
        </div>
      </button>
    );
  }

  if (isResale) {
    return <></>;
  }

  // Listing detail page button
  if (isListingPage) {
    return (
      <button
        onClick={() =>
          document
            .getElementById("mycontact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden bg-[#ff6200] text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center space-x-3 w-[200px]"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-bold text-center text-md">
            Put me on Priority
          </span>
          <span className="text-xs">Send me details</span>
        </div>
      </button>
    );
  }

  // City page button
  if (isCityPage) {
    return (
      <button
        onClick={() =>
          document
            .getElementById("mycontact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden bg-[#ff6200] text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center space-x-3"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-bold text-center text-lg">Get VIP Access</span>
          <span className="text-xs">New Listings & Updates</span>
        </div>
      </button>
    );
  }

  // Default button for other pages
  return (
    <button
      onClick={() =>
        document
          .getElementById("mycontact")
          ?.scrollIntoView({ behavior: "smooth" })
      }
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden bg-[#ff6200] text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center space-x-3"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-bold text-center text-lg">Send Me Info</span>
        <span className="text-xs">Get Exclusive VIP Access</span>
      </div>
    </button>
  );
}
