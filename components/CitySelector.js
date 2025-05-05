import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { preconCityList } from "@/data/preconCityList";

const CitySelector = () => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  // Get featured cities (showing first 5 cities as featured)
  const featuredCities = preconCityList.slice(0, 5);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set initial search term based on URL path
  useEffect(() => {
    if (!mounted) return;

    const cityFromPath = pathname?.split("/")[1];

    if (cityFromPath) {
      const matchingCity = preconCityList.find(
        (city) => city.city_name.toLowerCase() === cityFromPath.toLowerCase()
      );
      if (matchingCity) {
        setSearchTerm(matchingCity.city_name_cap);
      }
    }
  }, [pathname, mounted]);

  // Filter cities based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCities(featuredCities);
    } else {
      const filtered = preconCityList.filter((city) =>
        city.city_name_cap.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input focus
  const handleFocus = () => {
    setSearchTerm("");
    setFilteredCities(featuredCities);
    setIsDropdownOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-full border border-gray-300 outline-none focus:border-slate-900 shadow-sm placeholder:text-gray-400 placeholder:text-xs text-xs md:text-sm pr-10 transition-all duration-200 hover:border-gray-400 bg-white hover:bg-[#eee] focus:bg-[#eee] hover:placeholder:text-gray-800 focus:placeholder:text-gray-800"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-lg max-h-80 overflow-y-auto border border-gray-100 transform transition-all duration-200 ease-in-out">
            {searchTerm === "" && (
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-500 font-medium">
                  Popular Cities
                </p>
              </div>
            )}
            <ul className="py-2 list-none mx-0">
              {filteredCities.map((city) => (
                <li key={city.city_name} className="px-1">
                  <Link
                    href={`/${city.city_name}`}
                    className="block px-4 py-2.5 hover:bg-gray-100 text-gray-800 rounded-xl transition-all duration-200 ease-in-out text-xs md:text-sm group mx-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg
                            className="h-4 w-4 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform duration-200 font-medium">
                          {city.city_name_cap}
                        </span>
                      </div>
                      <svg
                        className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {filteredCities.length === 0 && (
              <div className="px-4 py-6 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="h-8 w-8 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  No cities found
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Try searching with a different term
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
