"use client";
import CitySelector from "./CitySelector";

export default function CityFilters({ filters, cityName }) {
  const createFilterUrl = (type, value) => {
    if (!value) return `/${cityName}`;

    switch (type) {
      case "project_type":
        switch (value) {
          case "Detached":
            return `/${cityName}/pre-construction/detached`;
          case "Semi-Detached":
            return `/${cityName}/pre-construction/semi-detached`;
          case "Townhome":
            return `/${cityName}/pre-construction/townhomes`;
          case "Condo":
            return `/${cityName}/condos`;
          default:
            return `/${cityName}`;
        }
      case "price_range":
        const formattedRange = value.toLowerCase();
        return `/${cityName}/price-range/${formattedRange}`;
      default:
        return `/${cityName}`;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 justify-start md:justify-start">
      <div className="relative w-[35%] md:w-[100%]">
        <div className="relative">
          <CitySelector />
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
      </div>

      {/* Property Type Filter */}
      <div className="relative w-[30%] md:w-auto block md:hidden">
        <select
          className="w-full md:w-auto appearance-none bg-white border text-xs border-gray-300 rounded-full px-3 md:px-4 py-2 pr-8 hover:border-gray-400 focus:outline-none"
          defaultValue={filters.project_type}
          onChange={(e) => {
            const url = createFilterUrl("project_type", e.target.value);
            window.location.href = url;
          }}
        >
          <option value="">Project Type</option>
          <option value="Detached">Detached</option>
          <option value="Semi-Detached">Semi-Detached</option>
          <option value="Townhome">Townhome</option>
          <option value="Condo">Condo</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="relative w-[30%] md:w-auto block md:hidden">
        <select
          className="w-full md:w-auto appearance-none bg-white border border-gray-300 rounded-full px-3 md:px-4 py-2 text-xs hover:border-gray-400 focus:outline-none"
          defaultValue={filters.price_range}
          onChange={(e) => {
            const url = createFilterUrl("price_range", e.target.value);
            window.location.href = url;
          }}
        >
          <option value="">Price Range</option>
          <option value="0-500k">$0 - 500K</option>
          <option value="500k-600k">$500K - 600K</option>
          <option value="600k-700k">$600K - 700K</option>
          <option value="700k-800k">$700K - 800K</option>
          <option value="800k-1mil">$800K - 1M</option>
          <option value="1mil-1.5mil">$1M - 1.5M</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(filters.project_type || filters.price_range) && (
        <a
          href={`/${cityName}`}
          className="w-full md:w-auto mt-2 md:mt-0 text-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          Clear Filters
        </a>
      )}
    </div>
  );
}
