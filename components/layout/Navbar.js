"use client";

import React, { useState } from "react";
import { Menu, User, LogOut } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Dropdown from "@/components/resale/Dropdown";
import PreConstructionDropdown from "@/components/PreConstructionDropdown";
import { usePathname } from "next/navigation";
import { generateURL } from "@/helpers/generateResaleURL";
import citiesWithProvinces from "@/constant/cities";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import UnifiedSearchBar from "@/components/UnifiedSearchBar";
import { preconCityList } from "@/data/preconCityList";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SmallSearchBar from "../SmallSearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const cities = citiesWithProvinces.map((obj) => obj);
  const cityNamepr = cities.find(
    (city) => !!pathname?.match(city.city.toLowerCase())
  );

  const cityName = cityNamepr?.city || null;
  const province = cityNamepr?.province.toLowerCase() || null;

  const buyOpts = [
    {
      name:
        "All homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "sale",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
    {
      name:
        "Semi Detached Homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
    {
      name:
        "Detached Homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
    {
      name:
        "Townhomes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "townhomes",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
    {
      name:
        "Condos for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "condo",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
    {
      name:
        "Price dropped homes" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "sale",
        cityVal: cityName || null,
        priceDropped: true,
        province: province || null,
      }),
    },
  ];

  const rentOpts = [
    {
      name:
        "All homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "lease",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
    {
      name:
        "Semi Detached Homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
    {
      name:
        "Detached Homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
    {
      name:
        "Townhomes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "Townhomes",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
    {
      name:
        "Condos for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "condo",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
        province: province || null,
      }),
    },
  ];

  // Function to get the pre-construction link based on current path
  const getPreConstructionLink = () => {
    // Check if we're in a resale page
    if (pathname.includes("/resale/ontario")) {
      // Extract city name from path if it exists
      const pathParts = pathname.split("/");
      const cityIndex = pathParts.indexOf("ontario") + 1;

      // If there's no path after "ontario" or if it's "homes-for-sale", return main pre-construction page
      if (
        cityIndex >= pathParts.length ||
        pathParts[cityIndex] === "homes-for-sale"
      ) {
        return "/pre-construction-homes";
      }

      // If it's a specific city page, redirect to that city's pre-construction
      const city = pathParts[cityIndex];
      if (city && city !== "homes") {
        return `/pre-construction-homes/${city}`;
      }
    }
    // Default to main pre-construction page
    return "/pre-construction-homes";
  };
  return (
    <>
      <nav className={`flex items-center justify-between px-4 py-3 bg-white`}>
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center md:me-2">
              <img src="/dolphy.svg" className="w-20" />
            </Link>
          </div>

          {/* Search Section - Desktop */}
          <div className="hidden sm:block ml-4">
            <SmallSearchBar width="w-full md:w-[450px]" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6">
          <Dropdown
            name={`Rent ${capitalizeFirstLetter(cityName) || ""}`}
            text={"red"}
            options={rentOpts}
            width="auto"
          />
          <Dropdown
            name={`Resale Homes ${capitalizeFirstLetter(cityName) || ""}`}
            text={"red"}
            options={buyOpts}
            width="auto"
          />
          {pathname.includes("/resale") ? (
            <Link
              href={getPreConstructionLink()}
              className="text-xs text-gray-900 hover:text-red-600 transition-colors whitespace-nowrap"
            >
              Pre Construction
            </Link>
          ) : (
            <PreConstructionDropdown cities={preconCityList} />
          )}
          <Link
            href="/assignment-sale"
            className="text-xs text-gray-900 hover:text-red-600 transition-colors whitespace-nowrap"
          >
            Assignment
          </Link>
          <Link
            href="/blog"
            className="text-xs text-gray-900 hover:text-red-600 transition-colors whitespace-nowrap"
          >
            Blogs
          </Link>
          <Link
            href="/contact-us"
            className="text-xs text-gray-900 hover:text-red-600 transition-colors whitespace-nowrap"
          >
            Contact
          </Link>

          {/* User Authentication Section */}
          {status === "loading" ? (
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || "User"}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{session.user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/saved-listings" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Saved Listings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="text-xs border border-gray-900 rounded-full px-2 py-1 text-gray-900 hover:text-black hover:bg-[#eee] transition-colors whitespace-nowrap"
            >
              Log in
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between gap-4">
          {/* Search Section - Mobile */}
          <div className="flex-1 max-w-xs mx-4 me-auto sm:hidden">
            <SmallSearchBar width="w-[230px] md:w-[450px]" />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full bg-white">
                <div className="flex flex-col py-3 mt-20">
                  <div className="px-6 py-4">
                    <Dropdown
                      name="For Lease"
                      text={"red"}
                      options={rentOpts}
                      width="w-full"
                      className="!justify-start text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors py-2"
                      onOptionClick={() => setIsOpen(false)}
                    />
                  </div>
                  <div className="px-6 py-4">
                    <Dropdown
                      name="For Sale"
                      text={"red"}
                      options={buyOpts}
                      width="w-full"
                      className="!justify-start text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors py-2"
                      onOptionClick={() => setIsOpen(false)}
                    />
                  </div>
                  {pathname.includes("/resale") ? (
                    <Link
                      href={getPreConstructionLink()}
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                    >
                      Pre Construction
                    </Link>
                  ) : (
                    <div className="px-6 py-4">
                      <PreConstructionDropdown
                        cities={preconCityList}
                        className="!justify-start text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                        mobile={true}
                        onOptionClick={() => setIsOpen(false)}
                      />
                    </div>
                  )}

                  <Link
                    href="/assignment-sale"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Assignment
                  </Link>
                  <Link
                    href="/contact-us"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Blog
                  </Link>

                  {/* User Authentication Section - Mobile Menu */}

                  {/* User Authentication Section - Mobile */}
                  {status === "loading" ? (
                    <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                  ) : session ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center focus:outline-none">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={session.user?.image || ""}
                              alt={session.user?.name || "User"}
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-800">
                              {session.user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5">
                          <p className="text-sm font-medium">
                            {session.user?.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {session.user?.email}
                          </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/saved-listings"
                            className="cursor-pointer"
                          >
                            <User className="mr-2 h-4 w-4" />
                            <span>Saved Listings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href="/login"
                      className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
