"use client";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import { generateURL } from "@/helpers/generateURL";
import Image from "next/image";
import citiesWithProvinces from "@/constant/cities";
import { useRouter } from "next/navigation";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

const Navbar = (props) => {
  const [isSticky, setIsSticky] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();
  // const { comparisonFlag } = useComparisionFlag();
  if (pathname.startsWith("/admin")) {
    return <></>;
  }

  useEffect(() => {
    const handleScroll = async () => {
      const offset = window.scrollY;
      setIsSticky(offset > 0);
      if (offset > 0 && pathname.includes("/ontario")) {
        setShowNavbar(false);
      }
      if (offset === 0) {
        setShowNavbar(true);
      }
    };
    // Add event listener to scroll event
    window.addEventListener("scroll", handleScroll);
    if (pathname.includes("/listings")) {
      setIsSticky(false);
    }
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const isPropertyPage = useMemo(() => {
    return pathname.includes("/listings");
  }, [pathname]);

  const isCityPage = useMemo(() => {
    return;
  });

  const whiteLogoPath = "/lowriselogo.svg";
  const blackLogoPath = "/lowriselogo.svg";

  const cities = citiesWithProvinces.map((obj) => {
    return { name: obj.city, link: generateURL({ cityVal: obj.city }) };
  });

  function extractCityname(url) {
    const regex =
      /\/ontario\/([^/]+)\/(?:town-house|detached-homes|semi-detached-homes|duplex-homes|triplex-homes|homes)?-(?:for-sale|for-lease)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const cityName = extractCityname(pathname);
  const inCity = cityName
    ? cityName.toLowerCase() !== "homes"
      ? ` in ${decodeURIComponent(capitalizeFirstLetter(cityName))}`
      : " in Ontario"
    : "";
  const buyOpts = [
    /* {
      name: "Semi-detached Homes for Sale",
      link: generateURL({ houseTypeVal: "semiDetached" }),
    }, */
    {
      name: "Semi Detached Homes for Sale" + inCity,
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "sale",
        cityVal: cityName,
      }),
    },
    {
      name: "Detached Homes for Sale" + inCity,
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "sale",
        cityVal: cityName,
      }),
    },
    {
      name: "Townhomes for Sale" + inCity,
      link: generateURL({
        houseTypeVal: "town house",
        saleLeaseVal: "sale",
        cityVal: cityName,
      }),
    },
    {
      name: "Duplex  Homes for Sale" + inCity,
      link: generateURL({
        houseTypeVal: "duplex",
        saleLeaseVal: "sale",
        cityVal: cityName,
      }),
    },
    {
      name: "Triplex Homes for Sale" + inCity,
      link: generateURL({
        houseTypeVal: "triplex",
        saleLeaseVal: "sale",
        cityVal: cityName,
      }),
    },
  ];

  const rentOpts = [
    {
      name: "Semi Detached Homes for Lease" + inCity,
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "lease",
        cityVal: cityName,
      }),
    },
    {
      name: "Detached Homes for Lease" + inCity,
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "lease",
        cityVal: cityName,
      }),
    },
    {
      name: "Townhomes for Lease" + inCity,
      link: generateURL({
        houseTypeVal: "town house",
        saleLeaseVal: "lease",
        cityVal: cityName,
      }),
    },
    {
      name: "Duplex  Homes for Lease" + inCity,
      link: generateURL({
        houseTypeVal: "duplex",
        saleLeaseVal: "lease",
        cityVal: cityName,
      }),
    },
    {
      name: "Triplex Homes for Lease" + inCity,
      link: generateURL({
        houseTypeVal: "triplex",
        saleLeaseVal: "lease",
        cityVal: cityName,
      }),
    },
  ];

  const calculatorOpts = [
    { name: "Mortgage Calculator", link: "/calculator/mortgage" },
    { name: "Property Tax Calculator", link: "/calculator/property-tax" },
  ];

  return (
    <header
      className={`lg:pb-0 relative bg-white ${showNavbar ? "" : "hidden"} ${
        isSticky
          ? "bg-white sticky top-0 z-[999] "
          : "z-[1000] md:bg-transparent "
      } 
      ${isPropertyPage ? "min-[2000px]:max-w-[68%] mx-auto" : ""}
      container-fluid shadow-shuttle`}
    >
      <div className={`${isSticky && "sticky"}`}>
        <nav
          className={`flex items-center justify-between h-14 sm:h-[3.5rem] max-w-[90%] mx-auto`}
        >
          <div className="flex-shrink-0 flex h-full items-center mr-2">
            <Link href="/" className="logo d-flex items-center">
              <Image
                src={isSticky ? blackLogoPath : whiteLogoPath}
                alt="logo"
                width={100}
                height={5}
                className="w-20 sm:w-30"
              />
            </Link>
          </div>

          <div className="flex items-center rounded-md sm:w-[35%] ms-0 sm:ms-3 ">
            <div className="hidden sm:block w-full">
              <SearchBar numberOfSuggestions={4} small={true} />
            </div>
            <div className="block sm:hidden w-full">
              <SearchBar
                numberOfSuggestions={4}
                small={true}
                placeholder="Search"
              />
            </div>

            {/* <button
              className="bg-gray-100 px-2 py-[0.73rem] search-button rounded-md"
              type="button"
              aria-label="Search Button"
            >
              <svg
                aria-hidden="true"
                className="svg"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                width="22"
              >
                <path
                  d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
                  fill="#000000"
                ></path>
              </svg>
            </button> */}
          </div>

          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            onClick={() => setHidden(!hidden)}
          >
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                // strokeLinecap="round"
                // strokeLinejoin="round"
                // strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>

            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-5">
            {/* <Link
              href={generateURL({ saleLeaseVal: "sale" })}
              title=""
              className={`text-sm font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black hover:text-green-200 active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Buy{" "}
            </Link> */}
            <Dropdown
              name="Rent"
              text={isSticky || !isHomePage ? "black" : "white"}
              options={rentOpts}
              width="auto"
            />
            <Dropdown
              name="Buy"
              text={isSticky || !isHomePage ? "black" : "white"}
              options={buyOpts}
              width="auto"
            />
            <Dropdown
              name="Popular cities"
              text={isSticky || !isHomePage ? "black" : "white"}
              options={cities}
            />
            <Dropdown
              name="Calculator"
              text={isSticky || !isHomePage ? "black" : "white"}
              options={calculatorOpts}
            />
            <Link
              href="/blogs"
              title=""
              className={`text-sm font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Blog{" "}
            </Link>

            <Link
              href="/contact"
              title=""
              className={`text-sm font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Contact{" "}
            </Link>
            <Link
              href="tel:4168458996"
              title=""
              className={`text-sm font-normal transition-all flex duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
             ${!isHomePage && "text-black"}`}
            >
              <img src="/contact.png" className="w-12"></img>
              <div className="flex flex-col items-center justify-center">
                <div className="text-lg font-bold">249-201-6665</div>
                <div className="text-xs">Speak with Lowrise Team</div>
              </div>
            </Link>
          </div>
        </nav>

        {/* Mobile version */}
        <div
          className={`py-4 bg-white border border-gray-200 rounded-md ${
            hidden && "hidden"
          } lg:hidden`}
        >
          <div className="flow-root">
            <div className="flex flex-col px-6 space-y-3">
              <Dropdown
                name="Buy"
                text={isSticky || !isHomePage ? "black" : "white"}
                options={buyOpts}
                width="auto"
              />
              <Dropdown
                name="Calculator"
                text={isSticky || !isHomePage ? "black" : "white"}
                options={calculatorOpts}
              />
              <Dropdown
                name="Popular cities"
                text={isSticky || !isHomePage ? "black" : "white"}
                options={cities}
              />
              <Link
                href="/blogs"
                title=""
                className={`text-sm font-normal transition-all duration-200 ${
                  isHomePage &&
                  !isSticky &&
                  "lg:text-black active:text-primary-green focus:text-primary-green"
                } ${
                  (isSticky || !isHomePage) &&
                  "text-black hover:text-primary-green"
                }
               ${!isHomePage && "text-black"}`}
              >
                {" "}
                Blog{" "}
              </Link>
              <Link
                href="/contact"
                title=""
                className={`text-sm font-normal transition-all duration-200 ${
                  isHomePage &&
                  !isSticky &&
                  "lg:text-black active:text-primary-green focus:text-primary-green"
                } ${
                  (isSticky || !isHomePage) &&
                  "text-black hover:text-primary-green"
                }
               ${!isHomePage && "text-black"}`}
              >
                {" "}
                Contact{" "}
              </Link>
              <Link
                href="tel:4168458996"
                title=""
                className={`text-sm font-normal transition-all duration-200 ${
                  isHomePage &&
                  !isSticky &&
                  "lg:text-black active:text-primary-green focus:text-primary-green"
                } ${
                  (isSticky || !isHomePage) &&
                  "text-black hover:text-primary-green"
                }
             ${!isHomePage && "text-black"}`}
              >
                <div className="flex items-center">
                  <img src="/contact.png" className="w-12"></img>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-lg font-bold">(416) 845-8996</div>
                    <div className="text-xs">Speak with Lowrise team</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
