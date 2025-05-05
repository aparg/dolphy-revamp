"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const PreConstructionDropdown = ({
  cities,
  className,
  mobile,
  onOptionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Calculate dropdown position to prevent overflow
  useEffect(() => {
    if (!mobile) {
      const dropdown = dropdownRef.current;
      if (dropdown) {
        const rect = dropdown.getBoundingClientRect();
        const spaceRight = window.innerWidth - rect.right;

        // If dropdown extends beyond right edge, adjust position
        if (spaceRight < 0) {
          const adjustment = Math.min(-spaceRight - 20, rect.left); // Keep 20px margin from right
          dropdown.style.transform = `translateX(-${adjustment}px)`;
        }
      }
    }
  }, [isOpen, mobile]);

  const buttonClasses = mobile
    ? "flex items-center gap-1 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
    : "flex items-center gap-1 text-xs text-gray-900";

  const dropdownClasses = mobile
    ? "relative mt-2 w-full bg-white rounded-xl shadow-sm border border-gray-100 p-2 z-50"
    : "absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[300px] md:w-[540px] bg-white rounded-xl shadow-large border border-gray-100 p-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left";

  return (
    <div className={`${mobile ? "" : "relative group"}`} ref={dropdownRef}>
      <button
        className={`${buttonClasses} ${className || ""}`}
        onClick={() => mobile && setIsOpen(!isOpen)}
      >
        Pre Construction
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            mobile ? (isOpen ? "rotate-180" : "") : "group-hover:rotate-180"
          }`}
        />
      </button>

      <div
        className={dropdownClasses}
        style={{ display: mobile && !isOpen ? "none" : "block" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-1">
          {cities.slice(0, 30).map((city) => (
            <Link
              key={city.city_name}
              href={`/pre-construction-homes/${city.city_name}`}
              className="px-3 py-1.5 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded transition-colors"
              onClick={() => {
                mobile && setIsOpen(false);
                onOptionClick?.();
              }}
            >
              {city.city_name_cap}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreConstructionDropdown;
