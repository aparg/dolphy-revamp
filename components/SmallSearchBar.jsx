"use client";

import * as React from "react";
import { cn, slugify } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import citiesWithProvinces from "@/constant/cities";
import { searchProperties } from "@/app/_resale-api/getSalesData";
import { preconCityList } from "@/data/preconCityList";
import { Search, MapPin, Calendar, TrendingDown, X } from "lucide-react";
import { popularCities } from "@/data/popularCities";
import Image from "next/image";
import { preconPopularCities } from "@/data/preconPopularCities";

const MAX_RECENT_SEARCHES = 5;

const SmallSearchBar = ({
  width = "w-full md:w-[350px]",
  height = "h-11",
  className,
  center = false,
  small = false,
  herosection = false,
}) => {
  const [showResults, setShowResults] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("resale");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState({
    precon: { cities: [], projects: [], developers: [] },
    resale: [],
  });
  const searchRef = React.useRef(null);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [recentSearches, setRecentSearches] = React.useState([]);

  // Get top cities for default suggestions
  const getDefaultCities = React.useCallback(() => {
    return citiesWithProvinces.slice(0, 5).map((city) => ({
      city: city.city,
      province: city.province,
      quadrant: city.quadrant,
    }));
  }, []);

  // Popular suggestions
  const popularSuggestions = {
    resale: [
      { name: "Toronto", url: "/resale/ontario/toronto/homes-for-sale" },
      {
        name: "Mississauga",
        url: "/resale/ontario/mississauga/homes-for-sale",
      },
      { name: "Brampton", url: "/resale/ontario/brampton/homes-for-sale" },
      { name: "Markham", url: "/resale/ontario/markham/homes-for-sale" },
      { name: "Oakville", url: "/resale/ontario/oakville/homes-for-sale" },
    ],
    precon: [
      { name: "New Condos in Toronto", url: "/toronto/condos" },
      { name: "Brampton", url: "/brampton" },
      { name: "Mississauga", url: "/mississauga" },
      { name: "Vaughan", url: "/vaughan" },
    ],
  };

  // Load recent searches on component mount
  React.useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Add search to recent searches
  const addToRecentSearches = (query, type, item) => {
    const search = {
      query,
      type,
      item,
      timestamp: new Date().getTime(),
    };

    const updated = [
      search,
      ...recentSearches
        .filter((s) => s.query !== query)
        .slice(0, MAX_RECENT_SEARCHES - 1),
    ];

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    // Submit search query to backend
    fetch("https://admin.homebaba.ca/api/search-query-submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        visitor_id: localStorage.getItem("visitorId") || "",
        page: typeof window !== "undefined" ? window.location.href : "",
      }),
    }).catch((error) => {
      console.error("Error submitting search query:", error);
    });
  };

  // City search functions
  const getCityResults = React.useCallback((query) => {
    if (!query) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return citiesWithProvinces.filter((data) =>
      data.city.toLowerCase().includes(normalizedQuery)
    );
  }, []);

  // Instant city search function for precon cities
  const getPreconCityResults = React.useCallback((query) => {
    if (!query) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return preconCityList
      .filter(
        (city) =>
          city.city_name.toLowerCase().includes(normalizedQuery) ||
          city.city_name_cap.toLowerCase().includes(normalizedQuery)
      )
      .map((city) => ({
        ...city,
        city_name: city.city_name || city.city_name_cap,
        slug: city.slug || city.city_name.toLowerCase().replace(/\s+/g, "-"),
      }));
  }, []);

  // Debounced effect for non-city searches
  React.useEffect(() => {
    const fetchAdditionalResults = async () => {
      if (!showResults) return;

      // Show default cities when search is blank
      if (!debouncedSearch) {
        setResults({
          precon: { cities: [], projects: [], developers: [] },
          resale: getDefaultCities(),
        });
        return;
      }

      // Only show loading for non-city content
      setLoading(true);

      try {
        const cityResults = getCityResults(debouncedSearch);
        const preconCityResults = getPreconCityResults(debouncedSearch);

        // Set immediate city results
        setResults((prev) => ({
          ...prev,
          precon: {
            ...prev.precon,
            cities: preconCityResults,
          },
        }));

        // Fetch additional data in background
        const [preconResponse, resaleProperties] = await Promise.all([
          fetch(
            `https://admin.homebaba.ca/api/search/?q=${encodeURIComponent(
              debouncedSearch
            )}`
          ),
          searchProperties(debouncedSearch),
        ]);

        const preconData = await preconResponse.json();

        // Process pre-construction results
        const processedProjects =
          preconData.projects?.map((project) => ({
            ...project,
            city_name: project.city || project.city_name || "toronto",
            slug:
              project.slug ||
              (project.name || "").toLowerCase().replace(/\s+/g, "-") ||
              "project",
          })) || [];

        const processedDevelopers =
          preconData.developers?.map((developer) => ({
            ...developer,
            slug:
              developer.slug ||
              (developer.name || "").toLowerCase().replace(/\s+/g, "-") ||
              "developer",
          })) || [];

        // Update with project results
        setResults((prev) => ({
          ...prev,
          precon: {
            ...prev.precon,
            projects: processedProjects,
            developers: processedDevelopers,
          },
          resale: [
            ...cityResults,
            ...resaleProperties.filter(
              (item) => !item.city && (item.UnparsedAddress || item.ListingKey)
            ),
          ],
        }));
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalResults();
  }, [
    debouncedSearch,
    showResults,
    getCityResults,
    getPreconCityResults,
    getDefaultCities,
  ]);

  // Handle search click
  const handleSearchClick = (item, type) => {
    if (!item) return;

    let searchData = {
      query: "",
      url: "",
      item: item,
    };

    if (type === "city") {
      searchData.query = item.city || item.name || item.city_name;
      if (item.city) {
        searchData.url = `/resale/ontario/${slugify(item.city)}/homes-for-sale`;
      } else if (item.city_name) {
        searchData.url = `/${item.city_name.toLowerCase()}`;
      } else if (item.name) {
        searchData.url = `/${item.name.split(",")[0].toLowerCase()}`;
      }
    } else if (type === "precon") {
      searchData.query = item.name;
      const cityName = item.city || item.city_name || "toronto";
      const slug =
        item.slug ||
        (item.name || "").toLowerCase().replace(/\s+/g, "-") ||
        "project";
      searchData.url = `/${cityName.toLowerCase()}/${slug}`;
    } else if (type === "resale") {
      searchData.query = item.UnparsedAddress?.split(",")[0] || item.city;
      searchData.url = getListingUrl(item);
    } else if (type === "project") {
      searchData.query = item.name;
      searchData.url = `/precon/projects`;
    }

    if (!searchData.query || !searchData.url) return;
    addToRecentSearches(searchData.query, type, item);
    setShowResults(false);
  };

  const handleCancel = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getListingUrl = (item) => {
    const quadrantSlug = item.quadrant ? `/${item.quadrant}` : "";

    if (item.city) {
      const citySlug = slugify(item.city);
      return `/resale/${
        item.province.toLowerCase() || "ontario"
      }/${citySlug}${quadrantSlug}/homes-for-sale`;
    } else {
      const citySlug = slugify(item.City || "");
      const address =
        item.UnparsedAddress?.split(",")[0] || item.StreetName || "";
      const listingSlug = `${slugify(address)}-${item.ListingKey}`;
      return `/resale/ontario/${citySlug}/listings/${listingSlug}`;
    }
  };

  // Determine how many cities to show based on screen size
  const getCityCount = () => {
    // For small screens and empty search, show fewer items
    if (window?.innerWidth < 640) return 4;
    // For medium screens or empty search
    return 8;
  };

  // Add new handleLinkClick wrapper function
  const handleLinkClick = (item, type) => {
    setShowResults(false);
    if (item) {
      handleSearchClick(item, type);
    }
  };

  return (
    <div className={cn("relative", width, className)} ref={searchRef}>
      {/* Backdrop Overlay */}
      {showResults && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 transition-all duration-300 ease-in-out"
          onClick={() => setShowResults(false)}
        />
      )}

      {/* Search Input */}
      <div className="relative group z-50">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors duration-200" />
        </div>
        <input
          type="text"
          autoComplete="off"
          aria-autocomplete="none"
          role="presentation"
          spellCheck="false"
          className={cn(
            "w-full pl-9 ml-1",
            showResults ? "pr-9" : "pr-4",
            "py-2.5",
            height,
            "bg-white",
            "border border-gray-100 bg-[#f5f5f5]",
            "transition-all rounded-full duration-200 ease-out",
            "placeholder:text-gray-400 text-gray-900 text-sm",
            "hover:border-gray-600 hover:bg-[#eee]",
            "focus:border-gray-600 focus:bg-[#eee] outline-none placeholder:text-[12px] hover:placeholder:text-gray-800 focus:placeholder:text-gray-800"
          )}
          placeholder={
            small
              ? "Search properties..."
              : "Search for City, Neighborhood, Zip, County..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        {showResults && (
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={handleCancel}
          >
            <X className="h-4 w-4 text-gray-400 hover:text-black transition-colors duration-200" />
          </div>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div
          className={cn(
            "md:absolute z-50 bg-white shadow-large transition-all duration-200 ease-out rounded-xl md:w-full md:left-auto md:right-auto md:mt-2 md:border md:border-gray-200 md:border-t-0 overflow-hidden",
            herosection ? "absolute w-full" : "fixed left-5 right-5"
          )}
        >
          {/* Tabs */}
          <div className="bg-[#f2f4f5] p-2 border-b border-gray-100">
            <div className="flex items-center gap-1 p-0.5 bg-white/60 backdrop-blur-sm rounded-xl max-w-md mx-auto">
              <button
                className={cn(
                  "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300",
                  activeTab === "resale"
                    ? "bg-slate-900 text-white shadow-md hover:bg-slate-900"
                    : "text-gray-600 hover:text-white hover:bg-slate-900"
                )}
                onClick={() => setActiveTab("resale")}
              >
                Resale Homes
              </button>
              <button
                className={cn(
                  "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300",
                  activeTab === "precon"
                    ? "bg-slate-900 text-white shadow-md hover:bg-slate-900"
                    : "text-gray-600 hover:text-white hover:bg-slate-900"
                )}
                onClick={() => setActiveTab("precon")}
              >
                Pre Construction
              </button>
            </div>
          </div>

          {/* Results content */}
          <div className="max-h-[calc(100vh-200px)] md:max-h-[420px] overflow-y-auto w-full">
            {activeTab === "precon" ? (
              // Precon results
              <>
                <div className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {debouncedSearch ? "Search Results" : "Popular Cities"}
                    </h3>
                    <Link
                      href="/pre-construction-homes"
                      className="text-xs text-slate-900 hover:text-slate-900 transition-colors"
                      onClick={() => setShowResults(false)}
                    >
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
                    {!debouncedSearch ? (
                      // Show popular precon cities with images when not searching
                      preconPopularCities
                        .slice(0, getCityCount())
                        .map((city, index) => (
                          <Link
                            key={city.name}
                            href={city.url}
                            onClick={() => handleLinkClick(city, "city")}
                            className="flex items-center gap-2 p-2 hover:bg-[#f8f9fa] rounded-xl group transition-all duration-200"
                          >
                            <div className="w-8 h-8 relative overflow-hidden rounded-md">
                              <Image
                                src={city.image}
                                alt={city.name}
                                fill
                                className="object-cover"
                                sizes="32px"
                              />
                            </div>
                            <div className="min-w-0">
                              {console.log(city)}
                              <div className="font-medium text-sm text-start truncate group-hover:text-black transition-colors duration-200">
                                {city.name}
                              </div>
                              <div className="text-xs text-start text-gray-500 truncate">
                                {city.province}
                              </div>
                            </div>
                          </Link>
                        ))
                    ) : (
                      // Show search results
                      <>
                        {results.precon.cities?.map((item) => (
                          <Link
                            key={item.city_name}
                            href={`/${item.city_name.toLowerCase()}`}
                            onClick={() => handleLinkClick(item, "city")}
                            className="flex items-center gap-2 p-2 hover:bg-[#f8f9fa] rounded-xl group transition-all duration-200"
                          >
                            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center group-hover:bg-black transition-all duration-200 ring-1 ring-gray-100">
                              <MapPin className="h-3.5 w-3.5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm text-start truncate group-hover:text-black transition-colors duration-200">
                                {item.city_name_cap}
                              </div>
                              <div className="text-xs text-start text-gray-500 truncate">
                                {item.province.charAt(0).toUpperCase() +
                                  item.province.slice(1)}
                              </div>
                            </div>
                          </Link>
                        ))}
                        {results.precon.projects?.map((item) => (
                          <Link
                            key={item.id}
                            href={`/${(
                              item.city ||
                              item.city_name ||
                              "toronto"
                            ).toLowerCase()}/${item.slug || "project"}`}
                            onClick={() => handleLinkClick(item, "precon")}
                            className="flex items-center gap-2 p-2 hover:bg-[#f8f9fa] rounded-xl group transition-all duration-200"
                          >
                            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center group-hover:bg-black transition-all duration-200 ring-1 ring-gray-100">
                              <MapPin className="h-3.5 w-3.5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm text-start truncate group-hover:text-black transition-colors duration-200">
                                {item.name || "Unnamed Project"}
                              </div>
                              <div className="text-xs text-start text-gray-500 truncate">
                                {item.city_name || "Toronto"} •{" "}
                                {item.developer || "New Development"}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* Quick Links - Compact View */}
                <div className="p-2 border-t border-gray-100 bg-[#f8f9fa]/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      New Launches
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 xs:grid-cols-2 gap-1">
                    <Link
                      href="/toronto"
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-2 p-2 hover:bg-white rounded-xl group transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center group-hover:bg-black transition-all duration-200 ring-1 ring-gray-100">
                        <Calendar className="h-3.5 w-3.5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate text-start">
                          Toronto
                        </div>
                        <div className="text-xs text-gray-500 truncate text-start">
                          15 New Launches
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/mississauga"
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-2 p-2 hover:bg-white rounded-xl group transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center group-hover:bg-black transition-all duration-200 ring-1 ring-gray-100">
                        <Calendar className="h-3.5 w-3.5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate text-start">
                          Mississauga
                        </div>
                        <div className="text-xs text-gray-500 truncate text-start">
                          8 New Launches
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              // Resale results
              <>
                {/* Popular Cities */}
                <div className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {debouncedSearch ? "Search Results" : "Popular Cities"}
                    </h3>
                    <Link
                      href="/resale/ontario"
                      className="text-xs text-slate-900 hover:text-slate-900 transition-colors"
                      onClick={() => setShowResults(false)}
                    >
                      View All
                    </Link>
                  </div>

                  {/* Grid with responsive column layout */}
                  <div
                    className={cn(
                      "grid grid-cols-2 sm:grid-cols-2 gap-1",
                      debouncedSearch ? "grid-cols-1 sm:grid-cols-2" : ""
                    )}
                  >
                    {!debouncedSearch
                      ? // Show popular cities with images when not searching
                        popularCities
                          .slice(0, getCityCount())
                          .map((city, index) => (
                            <Link
                              key={index}
                              href={city.url}
                              onClick={() => handleLinkClick(city, "resale")}
                              className="flex items-center gap-2 p-2 hover:bg-[#f8f9fa] rounded-xl group transition-all duration-200"
                            >
                              <div className="w-8 h-8 relative overflow-hidden rounded-md">
                                <Image
                                  src={city.image}
                                  alt={city.name}
                                  fill
                                  className="object-cover"
                                  sizes="32px"
                                />
                              </div>
                              <div className="min-w-0">
                                {console.log(city)}
                                <div className="font-medium text-sm text-start truncate group-hover:text-black transition-colors duration-200">
                                  {city.name}
                                </div>
                                <div className="text-xs text-start text-gray-500 truncate">
                                  {city.province}
                                </div>
                              </div>
                            </Link>
                          ))
                      : // Show search results with location icon
                        results.resale
                          .slice(0, getCityCount())
                          .map((item, index) => (
                            <Link
                              key={index}
                              href={getListingUrl(item)}
                              onClick={() => handleLinkClick(item, "resale")}
                              className="flex items-center gap-2 p-2 hover:bg-[#f8f9fa] rounded-xl group transition-all duration-200"
                            >
                              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center group-hover:bg-black transition-all duration-200 ring-1 ring-gray-100">
                                <MapPin className="h-3.5 w-3.5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-sm text-start truncate group-hover:text-black transition-colors duration-200">
                                  {[item.city, item.quadrant]
                                    .filter(Boolean)
                                    .join(" ") ||
                                    item.UnparsedAddress?.split(",")[0]}
                                </div>
                                <div className="text-xs text-start text-gray-500 truncate">
                                  {item.ListPrice
                                    ? `$${item.ListPrice.toLocaleString()}`
                                    : "Ontario"}
                                </div>
                              </div>
                            </Link>
                          ))}
                  </div>
                </div>

                {/* Quick Links - Compact View */}
                <div className="p-2 border-t border-gray-100 bg-[#f8f9fa]/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center">
                      Price Dropped Homes
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 xs:grid-cols-2 gap-1">
                    <Link
                      href="/resale/ontario/toronto/price-dropped"
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-2 p-2 hover:bg-white rounded-xl group transition-all duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate text-start">
                          Toronto
                        </div>
                        <div className="text-xs text-gray-500 truncate text-start">
                          20 Price Dropped Homes
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/resale/ontario/mississauga/price-dropped"
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-2 p-2 hover:bg-white rounded-xl group transition-all duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate text-start">
                          Mississauga
                        </div>
                        <div className="text-xs text-gray-500 truncate text-start">
                          20 Price Dropped Homes
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/resale/ontario/brampton/price-dropped"
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-2 p-2 hover:bg-white rounded-xl group transition-all duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate text-start">
                          Mississauga
                        </div>
                        <div className="text-xs text-gray-500 truncate text-start">
                          18 Price Dropped Homes
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/resale/ontario/burlington/price-dropped"
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-2 p-2 hover:bg-white rounded-xl group transition-all duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate text-start">
                          Burlington
                        </div>
                        <div className="text-xs text-gray-500 truncate text-start">
                          18 Price Dropped Homes
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallSearchBar;
