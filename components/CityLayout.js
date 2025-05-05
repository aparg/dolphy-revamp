import ListingCard from "./ListingCard";
import Image from "next/image";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import ContactForm from "./ContactForm";
import CityDirectory from "./CityDirectory";
import Link from "next/link";
import { preconCityList } from "@/data/preconCityList";
import CityFilters from "./CityFilters";
import NearbyPlacesGoogle from "./resale/StreetViewGoogle";

export default function CityLayout({
  cityData,
  featuredListings,
  metadata,
  filters,
  params,
  sitemapData,
  pathname,
}) {
  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const filteredprojects = (value) => {
    return cityData.data.results.filter((item) => item.status == value);
  };

  const city = capitalizeFirstLetter(params.city);

  return (
    <div className="mx-auto px-3 md:px-0 py-0 max-w-8xl">
      <div className="mb-3 md:mb-5 mt-1 md:mt-0">
        <div className="relative">
          {/* Main Content */}
          <div className="flex gap-6">
            {/* Navigation Links Section - 1 column (Desktop Only) */}
            <div className="hidden lg:block relative lg:w-[390px] pt-4 pe-1 rounded-lg bg-white border-e ps-4 pb-4">
              {/* Desktop Navigation */}
              <div className="sticky top-24 space-y-0">
                {/* City Search */}
                <div className="relative mt-6">
                  {/* Grass Decorations */}
                  <div className="absolute -top-14 left-0 w-full h-32 pointer-events-none">
                    <img
                      src="/grass.png"
                      alt="Grass Decorations"
                      width={400}
                      height={100}
                      className="w-[97%] me-auto"
                    />
                  </div>

                  {/* Filters */}
                  <div className="pb-3 pe-2 relative rounded-lg">
                    <CityFilters filters={filters} cityName={params.city} />
                  </div>
                </div>
                <div className="pb-7 pt-2 px-2">
                  <NearbyPlacesGoogle
                    location={params.city}
                    zoom={9}
                    height={200}
                  />
                </div>

                {/* Quick Navigation */}
                <div className="py-2 pb-3 ps-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    By Project Status
                  </h3>
                  <nav>
                    <a
                      href="#selling"
                      className={`flex items-center hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100`}
                    >
                      Selling Projects in {capitalizeFirstLetter(params.city)}
                    </a>
                    <a
                      href="#upcoming"
                      className={`flex items-center hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100`}
                    >
                      Upcoming Projects in {capitalizeFirstLetter(params.city)}
                    </a>
                    <a
                      href="#sold-out"
                      className={`flex items-center hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100`}
                    >
                      Sold Out Projects in {capitalizeFirstLetter(params.city)}
                    </a>
                  </nav>
                </div>

                {/* Project Types */}
                <div className="py-3  ps-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    By Home Type
                  </h3>
                  <nav>
                    <Link
                      href={`/${params.city}`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100`}
                    >
                      All Property Types
                    </Link>
                    <Link
                      href={`/${params.city}/condos`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(`/${params.city}/condos`)
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction condos
                    </Link>
                    <Link
                      href={`/${params.city}/pre-construction/townhomes`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(
                          `/${params.city}/pre-construction/townhomes`
                        )
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction townhomes
                    </Link>
                    <Link
                      href={`/${params.city}/pre-construction/detached`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(
                          `/${params.city}/pre-construction/detached`
                        )
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction detached homes
                    </Link>
                    <Link
                      href={`/${params.city}/pre-construction/semi-detached`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(
                          `/${params.city}/pre-construction/semi-detached`
                        )
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction semi-detached homes
                    </Link>
                  </nav>
                </div>

                {/* Price Ranges */}
                <div className="py-3  ps-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    By Price Ranges
                  </h3>
                  <nav>
                    <Link
                      href={`/${params.city}/price-range/0-500k`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(`/${params.city}/price-range/0-500k`)
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction homes under $500,000
                    </Link>
                    <Link
                      href={`/${params.city}/price-range/500k-600k`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(`/${params.city}/price-range/500k-600k`)
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction homes under $600,000
                    </Link>
                    <Link
                      href={`/${params.city}/price-range/600k-700k`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(`/${params.city}/price-range/600k-700k`)
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction homes under $700,000
                    </Link>
                    <Link
                      href={`/${params.city}/price-range/700k-800k`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(`/${params.city}/price-range/700k-800k`)
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction homes under $800,000
                    </Link>
                    <Link
                      href={`/${params.city}/price-range/800k-1mil`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(`/${params.city}/price-range/800k-1mil`)
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction homes under $1M
                    </Link>
                    <Link
                      href={`/${params.city}/price-range/1mil-1.5mil`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(`/${params.city}/price-range/1mil-1.5mil`)
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Pre construction homes under $1.5M
                    </Link>
                  </nav>
                </div>

                {/* Nearby Cities */}
                <div className="py-3  ps-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    Nearby Cities
                  </h3>
                  <nav>
                    {preconCityList && preconCityList.length > 0 ? (
                      preconCityList
                        .filter((city) => city.city_name !== params.city)
                        .slice(0, 5)
                        .map((city) => (
                          <Link
                            key={city.city_name}
                            href={`/${city.city_name}`}
                            className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                              isLinkActive(`/${city.city_name}`)
                                ? "bg-gray-100 text-black"
                                : "text-gray-600"
                            }`}
                          >
                            Pre construction homes in {city.city_name_cap}
                          </Link>
                        ))
                    ) : (
                      <div className="text-sm text-gray-500">
                        No nearby cities available
                      </div>
                    )}
                  </nav>
                </div>
                {/* Resale homes in {capitalizeFirstLetter(params.city)} */}

                <div className=" ps-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    Resale MLS Lisings in {capitalizeFirstLetter(params.city)}
                  </h3>
                  <nav>
                    <Link
                      href={`/resale/ontario/${params.city}/homes-for-sale`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(
                          `/resale/ontario/${params.city}/homes-for-sale`
                        )
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Homes for sale in {capitalizeFirstLetter(params.city)}
                    </Link>
                    <Link
                      href={`/resale/ontario/${params.city}/detached-homes-for-sale`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(
                          `/resale/ontario/${params.city}/detached-homes-for-sale`
                        )
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Detached homes for sale in{" "}
                      {capitalizeFirstLetter(params.city)}
                    </Link>
                    <Link
                      href={`/resale/ontario/${params.city}/semi-detached-homes-for-sale`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(
                          `/resale/ontario/${params.city}/semi-detached-homes-for-sale`
                        )
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Semi-detached homes for sale in{" "}
                      {capitalizeFirstLetter(params.city)}
                    </Link>
                    <Link
                      href={`/resale/ontario/${params.city}/condo-apartments-for-sale`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(
                          `/resale/ontario/${params.city}/condos-for-sale`
                        )
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Condos for sale in {capitalizeFirstLetter(params.city)}
                    </Link>
                    <Link
                      href={`/resale/ontario/${params.city}/townhomes-for-sale`}
                      className={`block hover:px-2 py-1.5 rounded-md text-gray-500 text-xs transition-all hover:bg-gray-100 ${
                        isLinkActive(
                          `/resale/ontario/${params.city}/townhomes-for-sale`
                        )
                          ? "bg-gray-100 text-black"
                          : "text-gray-600"
                      }`}
                    >
                      Townhomes for sale in {capitalizeFirstLetter(params.city)}
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            {/* Listings Section - full width on mobile, 4 columns on desktop */}
            <div className="w-full pe-0 md:pe-4">
              {/* Header Section - Responsive */}
              <div className="mb-4 md:mb-6 mt- md:mt-5">
                <h1 className="text-xl md:text-[2rem] text-gray-900 mb-1 md:mb-2 font-black">
                  {metadata.title}
                </h1>
                <h2 className="text-[0.6rem] md:text-sm leading-4 text-gray-700">
                  Explore 100+ <b>pre construction homes in {city}</b>. Dolphy
                  has updated list of 100+ New developments from reputable{" "}
                  <Link
                    href={`/developers`}
                    target="_blank"
                    className="font-bold underline underline-offset-4"
                  >
                    home builders across {city}
                  </Link>
                  . Browse upcoming pre construction projects as well as check
                  out{" "}
                  <Link
                    href="#sold-out"
                    className="underline underline-offset-4 font-bold"
                  >
                    sold-out projects
                  </Link>{" "}
                  out for price reference. Whether you are a first time home
                  buyer looking to purchase{" "}
                  <Link
                    href={`/${params.city}/pre-construction/townhomes`}
                    className="underline underline-offset-4 font-bold"
                  >
                    pre construction townhomes
                  </Link>{" "}
                  in {city} or new{" "}
                  <Link
                    href={`/${params.city}/pre-construction/detached`}
                    className="underline underline-offset-4 font-bold"
                  >
                    Detached homes
                  </Link>
                  , your first pre construction home or a experienced investor
                  looking to buy pre construction homes in {city},{" "}
                  <Link href="/" className="text-blue-700">
                    Dolphy.ca
                  </Link>{" "}
                  has the updated list of all new homes on Dolphy. Showing total
                  of 100+ new development listings which contains{" "}
                  <b>
                    30 upcoming projects, 20 Sold out projects & 10 Currently
                    selling projects in {city}
                  </b>{" "}
                  .
                  <b>
                    <a
                      href={`https://www.condomonk.ca/${city
                        ?.toLowerCase()
                        .replace(/\s+/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline"
                    >
                      Check out pre construction homes in {city} on Condomonk
                    </a>
                  </b>
                  .
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Mobile Filters */}
              <div className="block lg:hidden mb-1">
                <div className="bg-white">
                  <CityFilters filters={filters} cityName={params.city} />
                </div>
              </div>

              {/* Listings Content */}
              <div className="mb-8" id="selling">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 md:gap-x-3 gap-y-2 md:gap-y-3">
                  {featuredListings.data.results.map((listing) => (
                    <ListingCard
                      key={listing.slug}
                      listing={listing}
                      isFeatured={true}
                      city={params.city}
                    />
                  ))}
                  {filteredprojects("Selling").map((listing, index) => (
                    <ListingCard
                      key={listing.slug}
                      listing={listing}
                      index={index + 1}
                      city={params.city}
                    />
                  ))}
                </div>
              </div>

              {/* Upcoming Projects Section */}
              {filteredprojects("Upcoming").length > 0 && (
                <div className="mt-20" id="upcoming">
                  <h2 className="text-2xl font-bold mb-4">
                    Launching Soon - Pre Construction Projects in{" "}
                    {capitalizeFirstLetter(params.city)}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
                    {filteredprojects("Upcoming").map((listing, index) => (
                      <ListingCard
                        key={listing.slug}
                        listing={listing}
                        index={index + 1}
                        city={params.city}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sold Out Projects Section */}
              {filteredprojects("Sold out").length > 0 && (
                <div className="mt-20" id="sold-out">
                  <h2 className="text-2xl font-bold mb-4">
                    Sold Out Projects in {capitalizeFirstLetter(params.city)}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
                    {filteredprojects("Sold out").map((listing, index) => (
                      <ListingCard
                        key={listing.slug}
                        listing={listing}
                        index={index + 1}
                        city={params.city}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="block lg:hidden mt-8">
                <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
                  {/* Quick Navigation */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      By Project Status
                    </h3>
                    <nav className="space-y-2">
                      <a
                        href="#selling"
                        className="flex items-center px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100"
                      >
                        Selling Projects in {capitalizeFirstLetter(params.city)}
                      </a>
                      <a
                        href="#upcoming"
                        className="flex items-center px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100"
                      >
                        Upcoming Projects in{" "}
                        {capitalizeFirstLetter(params.city)}
                      </a>
                      <a
                        href="#sold-out"
                        className="flex items-center px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100"
                      >
                        Sold Out Projects in{" "}
                        {capitalizeFirstLetter(params.city)}
                      </a>
                    </nav>
                  </div>

                  {/* Project Types */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      By Home Type
                    </h3>
                    <nav className="space-y-2">
                      <Link
                        href={`/${params.city}`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(`/${params.city}`)
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        All Pre construction homes in{" "}
                        {capitalizeFirstLetter(params.city)}
                      </Link>
                      <Link
                        href={`/${params.city}/condos`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(`/${params.city}/condos`)
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction condos
                      </Link>
                      <Link
                        href={`/${params.city}/pre-construction/townhomes`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(
                            `/${params.city}/pre-construction/townhomes`
                          )
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction townhomes
                      </Link>
                      <Link
                        href={`/${params.city}/pre-construction/detached`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(
                            `/${params.city}/pre-construction/detached`
                          )
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction detached homes
                      </Link>
                      <Link
                        href={`/${params.city}/pre-construction/semi-detached`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(
                            `/${params.city}/pre-construction/semi-detached`
                          )
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction semi-detached homes
                      </Link>
                    </nav>
                  </div>

                  {/* Price Ranges */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      By Price Ranges
                    </h3>
                    <nav className="space-y-2">
                      <Link
                        href={`/${params.city}/price-range/0-500k`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(`/${params.city}/price-range/0-500k`)
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction homes under $500,000
                      </Link>
                      <Link
                        href={`/${params.city}/price-range/500k-600k`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(`/${params.city}/price-range/500k-600k`)
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction homes under $600,000
                      </Link>
                      <Link
                        href={`/${params.city}/price-range/600k-700k`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(`/${params.city}/price-range/600k-700k`)
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction homes under $700,000
                      </Link>
                      <Link
                        href={`/${params.city}/price-range/700k-800k`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(`/${params.city}/price-range/700k-800k`)
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction homes under $800,000
                      </Link>
                      <Link
                        href={`/${params.city}/price-range/800k-1mil`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(`/${params.city}/price-range/800k-1mil`)
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction homes under $1M
                      </Link>
                      <Link
                        href={`/${params.city}/price-range/1mil-1.5mil`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(
                            `/${params.city}/price-range/1mil-1.5mil`
                          )
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Pre construction homes under $1.5M
                      </Link>
                    </nav>
                  </div>

                  {/* Nearby Cities */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      Nearby Cities
                    </h3>
                    <nav className="space-y-2">
                      {preconCityList && preconCityList.length > 0 ? (
                        preconCityList
                          .filter((city) => city.city_name !== params.city)
                          .slice(0, 5)
                          .map((city) => (
                            <Link
                              key={city.city_name}
                              href={`/${city.city_name}`}
                              className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                                isLinkActive(`/${city.city_name}`)
                                  ? "bg-gray-100 text-black"
                                  : "text-gray-600"
                              }`}
                            >
                              Pre construction homes in {city.city_name_cap}
                            </Link>
                          ))
                      ) : (
                        <div className="text-sm text-gray-500">
                          No nearby cities available
                        </div>
                      )}
                    </nav>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      Resale homes in {capitalizeFirstLetter(params.city)}
                    </h3>
                    <nav>
                      <Link
                        href={`/resale/ontario/${params.city}/homes-for-sale`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(
                            `/resale/ontario/${params.city}/homes-for-sale`
                          )
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Homes for sale in {capitalizeFirstLetter(params.city)}
                      </Link>
                      <Link
                        href={`/resale/ontario/${params.city}/detached-homes-for-sale`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(
                            `/resale/ontario/${params.city}/detached-homes-for-sale`
                          )
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Detached homes for sale in{" "}
                        {capitalizeFirstLetter(params.city)}
                      </Link>
                      <Link
                        href={`/resale/ontario/${params.city}/semi-detached-homes-for-sale`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(
                            `/resale/ontario/${params.city}/semi-detached-homes-for-sale`
                          )
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Semi-detached homes for sale in{" "}
                        {capitalizeFirstLetter(params.city)}
                      </Link>
                      <Link
                        href={`/resale/ontario/${params.city}/condo-apartments-for-sale`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(
                            `/resale/ontario/${params.city}/condos-for-sale`
                          )
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Condos for sale in {capitalizeFirstLetter(params.city)}
                      </Link>
                      <Link
                        href={`/resale/ontario/${params.city}/townhomes-for-sale`}
                        className={`block px-3 py-1.5 rounded-md text-gray-500 text-xs transition-colors hover:bg-gray-100 ${
                          isLinkActive(
                            `/resale/ontario/${params.city}/townhomes-for-sale`
                          )
                            ? "bg-gray-100 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        Townhomes for sale in{" "}
                        {capitalizeFirstLetter(params.city)}
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* City Directory Section */}
        <div className="mt-3 px-0 md:px-1">
          <div className="flex justify-center items-center max-w-7xl mx-auto px-4 md:px-6 mt-10 mb-16">
            <div className="max-w-none mt-14">
              <h2 className="text-sm md:text-2xl text-left font-extrabold leading-normal mb-4">
                Pre Construction Homes for Sale in{" "}
                {capitalizeFirstLetter(params.city)} - Explore New Projects,
                Prices & Floor Plans
              </h2>

              <p className="mb-4">
                Looking to invest in pre construction homes for sale in{" "}
                {capitalizeFirstLetter(params.city)}?{" "}
                {capitalizeFirstLetter(params.city)}'s real estate market is
                booming with exciting new projects offering everything from
                stylish 1-bedroom condos to spacious 3+ bedroom detached homes
                in top communities like Seton, Belmont, and Downtown. There are{" "}
                {cityData.data.totalCount}+ projects on dolphy for first time
                home buyers to savvy investors.
              </p>

              <p className="mb-4">
                Whether you're a first-time buyer or a seasoned investor,{" "}
                {capitalizeFirstLetter(params.city)}'s pre construction homes
                provide excellent value, flexible pricing, and modern living
                spaces starting from competitive price ranges. With developments
                by leading builders and a variety of home types including
                condos, townhouses, and single-family homes, you can find a
                property that suits your needs and budget.
              </p>

              <p className="mb-4">
                Explore the latest pre construction homes in{" "}
                {capitalizeFirstLetter(params.city)}, discover estimated
                handover dates, compare price ranges, and get matched with
                trusted real estate partners. Ready to make your move? Enquire
                now and be the first to access exclusive new listings in{" "}
                {capitalizeFirstLetter(params.city)}'s most desirable
                neighbourhoods.
              </p>
            </div>
          </div>

          <CityDirectory
            cityData={sitemapData}
            cityName={capitalizeFirstLetter(params.city)}
            citySlug={params.city}
          />
        </div>
      </div>

      <div className="my-32"></div>
      <h3 className="text-center text-4xl md:text-[3rem] font-bold">
        <span className="text-[red]">Be</span> Smart.{" "}
        <span className="text-[red]">Be</span> Quick
      </h3>
      <h4 className="text-center text-sm md:text-xl">
        Get in the line before someone else does
      </h4>

      <div className="p-2 md:p-8" id="contact">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center">
            <Image
              src="/reg.webp"
              width={300}
              height={300}
              alt="Contact Me Design"
              className="rounded-lg"
            />
          </div>
          <div className="rounded-[10px] bg-white md:p-4 mt-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="w-full">
                <ContactForm
                  cityName={params.city}
                  partnerdata={cityData.data.partnerdata}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
