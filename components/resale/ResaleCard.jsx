"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";
import { saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateResaleURL";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { getImageUrls } from "@/app/_resale-api/getSalesData";
import { Skeleton } from "../ui/skeleton";
import SignInVOW from "./SignInVOW";
import { cityRegions } from "@/constant/postalCodeCities";

const ResaleCard = ({
  curElem,
  small = false,
  showDecreasedPrice = false,
  isHotListing,
  soldData,
  openHouse = false,
}) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const price = Number(
    !soldData ? curElem.ListPrice : curElem.ClosePrice
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const originalPrice = curElem.OriginalListPrice
    ? Number(curElem.OriginalListPrice).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })
    : null;

  // Calculate price drop info
  const priceDropInfo = React.useMemo(() => {
    if (
      !curElem.OriginalListPrice ||
      curElem.ListPrice >= curElem.OriginalListPrice
    ) {
      return null;
    }

    const dropAmount = curElem.OriginalListPrice - curElem.ListPrice;
    const dropPercentage = (dropAmount / curElem.OriginalListPrice) * 100;

    return {
      amount: dropAmount,
      percentage: dropPercentage.toFixed(1),
    };
  }, [curElem.ListPrice, curElem.OriginalListPrice]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  const streetAndMLS = (() => {
    const parts = [];
    if (curElem.StreetNumber) {
      parts.push(curElem.StreetNumber.replace("/", "-"));
    }
    if (curElem.StreetName) {
      const streetName = curElem.StreetName.trim().replace(/ /g, "-");
      parts.push(streetName);
    }
    if (curElem.StreetSuffix) {
      parts.push(curElem.StreetSuffix);
    }
    if (curElem.ListingKey) {
      parts.push(curElem.ListingKey);
    }
    return parts.filter(Boolean).join("-");
  })();

  useEffect(() => {
    if (
      window.localStorage.getItem("favorites") &&
      JSON.parse(window.localStorage.getItem("favorites")).includes(
        curElem.ListingKey
      )
    ) {
      setIsFavorite(true);
    }
    setLoadingImage(true);
    getImageUrls({
      MLS: curElem.ListingKey,
      thumbnailOnly: true,
      soldData: true,
    }).then((urls) => {
      setImgUrl(urls[0]);
      setLoadingImage(false);
    });
  }, []);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const favoriteValue = window.localStorage.getItem("favorites");
    if (!isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      favorites.push(curElem.ListingKey);
      const value = JSON.stringify(favorites);
      window.localStorage.setItem("favorites", value);
    } else if (isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      const value = JSON.stringify(
        favorites.filter((val) => val !== curElem.ListingKey)
      );
      window.localStorage.setItem("favorites", value);
    }
    setIsFavorite(!isFavorite);
  };

  const region = cityRegions.find((cityRegion) =>
    cityRegion.regions.includes(curElem.City)
  );

  return (
    <section className="relative transition-all duration-200 transform bg-white group rounded-xl p-0 hover:shadow-lg hover:rounded-t-2xl hover:-translate-y-1 overflow-hidden">
      <Link
        href={generateURL({
          cityVal: region?.name || curElem.City,
          listingIDVal: streetAndMLS,
          soldData: soldData,
          openHouse: openHouse,
        })}
        className="text-black"
      >
        <div className="lg:px-0 h-full w-full">
          <div className="flex flex-col overflow-hidden relative">
            <div
              className={`${
                small ? "h-36" : "h-52"
              } sm:h-52 overflow-hidden relative`}
            >
              <div
                className={`${
                  small ? "h-36" : "h-52"
                } sm:h-52 relative z-10 rounded-t-2xl rounded-b-2xl overflow-hidden`}
              >
                {loadingImage ? (
                  <Skeleton className="object-cover w-full h-full rounded-t-2xl rounded-b-2xl bg-gray-200" />
                ) : imgUrl ? (
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-b-2xl hover:rounded-b-2xl rounded-t-2xl"
                    src={imgUrl}
                    alt="property image"
                    onError={handleImageError}
                  />
                ) : (
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-b-2xl hover:rounded-b-2xl rounded-t-2xl"
                    src="/noimage.webp"
                    alt="property image"
                    onError={handleImageError}
                  />
                )}
              </div>

              {/* Property Type Badge */}
              <div className="absolute bottom-3 left-2 flex sm:flex-row z-20">
                {curElem.PropertySubType?.trim() && (
                  <div className="text-black md:text-[0.7rem] text-[0.52rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                    {curElem.PropertySubType?.trim()}
                  </div>
                )}
                {isHotListing ? (
                  <div className="text-black md:text-[0.7rem] text-[0.52rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-[#f0fff4] items-center flex gap-1">
                    <span className="relative flex h-1 w-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1 w-1 bg-green-500"></span>
                    </span>
                    <span>Just Listed</span>
                  </div>
                ) : (
                  <div className="text-black md:text-[0.7rem] text-[0.52rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white items-center flex gap-1">
                    <TimeAgo
                      modificationTimestamp={curElem.ModificationTimestamp}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 sm:px-3 pt-2 px-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                {/* Price section with drop percentage */}
                <div className="flex flex-col">
                  {priceDropInfo && (
                    <div className="text-red-500 text-[13px] flex items-center">
                      <span className="text-red-500 font-extrabold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      ${priceDropInfo.amount.toLocaleString()}
                      <span className="text-black ps-1">
                        ({priceDropInfo.percentage}% reduced)
                      </span>
                    </div>
                  )}
                  <span className="font-bold text-2xl sm:text-2xl items-center justify-start mt-0">
                    {price}
                    {curElem.SaleLease === saleLease.lease.value && (
                      <span className="text-xs text-gray-600"> /mo</span>
                    )}
                  </span>
                </div>
              </div>

              <span className="text-black text-xs">
                <div className="flex flex-row justify-start">
                  {curElem.BedroomsTotal && (
                    <div className="flex items-center mr-1">
                      <img
                        src="/resale-card-img/bedrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="bedrooms"
                      />
                      <span>
                        {Math.floor(curElem.BedroomsTotal)}{" "}
                        <span className="hidden sm:inline">Bed</span>
                      </span>
                    </div>
                  )}
                  {curElem.BathroomsTotalInteger && (
                    <div className="flex items-center mr-1">
                      <img
                        src="/resale-card-img/bathrooms.svg"
                        className="w-4 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.BathroomsTotalInteger)}{" "}
                        <span className="hidden sm:inline">Bath</span>
                      </span>
                    </div>
                  )}
                  {curElem.LivingAreaRange && (
                    <div className="flex items-center">
                      <img
                        src="/resale-card-img/ruler.svg"
                        className="w-3 mr-[3px] inline"
                        alt="ruler"
                      />
                      <span className="hidden sm:inline">
                        {curElem.LivingAreaRange} Sqft.
                      </span>
                    </div>
                  )}
                </div>
              </span>

              <div className="text-dark text-xs mt-1 truncate leading-1">
                {curElem.StreetNumber} {curElem.StreetName}{" "}
                {curElem.StreetSuffix} {curElem.City}, {curElem.StateOrProvince}
              </div>
              <p className="text-[10px] text-gray-600 mt-1.5 whitespace-nowrap leading-none pb-2">
                Listed by: {curElem.ListOfficeName}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-[0.5rem] right-2 z-10 ${
          isFavorite ? "text-red-500" : "text-gray-500"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className="w-6 h-6"
          style={{
            fill: isFavorite ? "currentColor" : "rgba(0, 0, 0, 0.5)",
            stroke: "white",
            strokeWidth: "2",
            overflow: "visible",
          }}
        >
          <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
        </svg>
      </button>
    </section>
  );
};

export default ResaleCard;

export const LockedResaleCard = ({ curElem, setSignedIn }) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  const streetAndMLS = (() => {
    const parts = [];

    if (curElem.StreetNumber) {
      parts.push(curElem.StreetNumber.replace("/", "-"));
    }

    if (curElem.StreetName) {
      const streetName = curElem.StreetName.trim().replace(/ /g, "-");
      parts.push(streetName);
    }

    if (curElem.StreetSuffix) {
      parts.push(curElem.StreetSuffix);
    }

    if (curElem.ListingKey) {
      parts.push(curElem.ListingKey);
    }
    return parts.filter(Boolean).join("-");
  })();
  useEffect(() => {
    setLoadingImage(true);
    getImageUrls({ MLS: curElem.ListingKey, thumbnailOnly: true }).then(
      (urls) => {
        setImgUrl(urls[0]);
        setLoadingImage(false);
      }
    );
  }, []);
  return (
    <div className="lg:px-0 h-full w-full">
      <div className={`flex flex-col overflow-hidden relative`}>
        <div className={`${"h-52 sm:h-80"} overflow-hidden relative`}>
          <div
            className={`${"h-52 sm:h-80"} sm:h-80 relative z-10 rounded-t-2xl`}
          >
            {loadingImage ? (
              <Skeleton className="object-cover w-full h-full rounded-t-2xl" />
            ) : imgUrl ? (
              <img
                className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-t-2xl blur-[2px]"
                src={imgUrl}
                width="900"
                height="800"
                alt="property image"
                onError={(e) => {
                  console.log("Trigerring error");
                  handleImageError(e);
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <img src="/icons/no-photo.png" className="w-10 h-10" />
                <p>No Image Found</p>
              </div>
            )}
            <SignInVOW setSignedIn={setSignedIn} />
            <div className="bg-white text-black absolute bottom-2 mx-2 rounded-md p-1 border-2 border-black text-xs sm:text-md">
              Local MLS®️ rules require you to log in and accept their terms of
              use to view certain listing data.
            </div>
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
          </div>
        </div>
      </div>
      <Skeleton className={`w-36 h-4 mt-2 bg-gray-100`}></Skeleton>
      <Skeleton className={`sm:w-56 h-4 mt-2 bg-gray-100`}></Skeleton>
      <Skeleton className={`w-18 h-4 mt-2 bg-gray-100`}></Skeleton>
      <Skeleton className={`w-18 h-4 mt-2 bg-gray-100`}></Skeleton>
    </div>
  );
};
