"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { preconCityList } from "@/data/preconCityList";

const CityNav = () => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollContainerRef = useRef(null);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check if scrolled from start
      setShowLeftButton(container.scrollLeft > 0);
      // Check if can scroll further right
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();
    }
    return () => container?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction * 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="z-20 block sticky top-0 bg-white">
      <div className="mx-auto relative">
        <div className="relative overflow-hidden">
          {showLeftButton && (
            <button
              className="absolute left-0 top-0 h-full z-10 px-3
                         bg-white/20 backdrop-blur-sm border-y border-r border-white/30 
                         hover:bg-white/30 transition-all duration-300
                         shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]
                         flex items-center"
              onClick={() => scroll(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex space-x-3 py-2 pb-3 px-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {preconCityList.map((city) => (
              <Link
                key={city.city_name}
                href={`/${city.city_name}`}
                className="whitespace-nowrap px-2 py-2 text-[0.8rem] font-medium 
                         text-black transition-all duration-300
                         bg-white hover:bg-[#f4f4f4] rounded-full shadow-sm hover:shadow-xl
                         hover:scale-105
                          hover:text-gray-900
                         border border-gray-200 hover:border-gray-700
                         active:scale-95"
              >
                {city.city_name_cap}
              </Link>
            ))}
          </div>

          {showRightButton && (
            <button
              className="absolute right-0 top-0 h-full z-10 px-3
                         bg-white/20 backdrop-blur-sm border-y border-l border-white/30 
                         hover:bg-white/30 transition-all duration-300
                         shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]
                         flex items-center"
              onClick={() => scroll(1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CityNav;
