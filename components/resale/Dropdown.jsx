import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaChevronDown } from "react-icons/fa";

const Dropdown = ({ name, options, width = "25rem", text, onOptionClick }) => {
  const [shown, setShown] = useState(false);
  const dropdownRef = useRef(null);
  let timeoutId = useRef(null);

  const handleMouseEnter = () => {
    setShown(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setShown(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center gap-1 text-xs font-medium  hover:text-red-600 rounded-full ${
          shown ? "text-red-600" : "text-gray-700"
        }`}
        onClick={() => setShown(!shown)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>{name}</span>
        <FaChevronDown
          size={10}
          className={`transition-transform duration-200 ${
            shown ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-0 mt-2 bg-white rounded-xl shadow-large border border-gray-100 z-30 min-w-[200px] transform origin-top transition-all duration-200 ${
          options.length > 6
            ? "grid grid-cols-1 sm:grid-cols-3 sm:min-w-[600px]"
            : "w-fit"
        } ${
          shown
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {options.map((option) => (
          <Link
            href={option.link}
            key={option.name}
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#eee] hover:text-gray-900 whitespace-nowrap transition-colors first:rounded-t-lg last:rounded-b-lg cursor-pointer"
            onClick={() => {
              setShown(false);
              onOptionClick?.();
            }}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
