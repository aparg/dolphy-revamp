"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "@/helpers/TimeAgo";
import {
  albertaListings,
  calgaryListings,
} from "@/app/_resale-api/routes/fetchRoutes";
import { houseType, saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateResaleURL";

// import Favorite from "./Favorite";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { Skeleton } from "../ui/skeleton";
import Favorite from "./Favorite";

const AlbertaResaleCard = ({
  curElem,
  small = false,
  showDecreasedPrice = false,
  isHotListing = false,
}) => {
  // const [address, setAddress] = useState("");
  const curElemData = curElem.data || curElem;
  const price = Number(curElemData.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const mapObj = {
    MLS: curElemData.ListingKeyNumeric,
    index: 1,
  };
  const imgSrc = albertaListings.photos.replace(
    /MLS|index/gi,
    function (matched) {
      return mapObj[matched];
    }
  );
  console.log(imgSrc);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  // const streetAndMLS = curElem.StreetName
  //   ? `${curElem.Street}-${curElem.StreetName?.replace(" ", "-")}-${
  //       curElem.StreetAbbreviation
  //     }-${curElem.ListingId}`
  //   : curElem.ListingId;
  const quadrantIndex = curElemData?.District?.split(" ").indexOf("Zone") + 1;
  const quadrant = curElemData?.District?.split(" ")[quadrantIndex];
  const streetAndMLS = (() => {
    const parts = [];

    if (curElemData.Street) {
      parts.push(curElemData.Street);
    }

    if (curElemData.StreetName) {
      const streetName = curElemData.StreetName.trim().replace(/ /g, "-");
      parts.push(streetName);
    }

    if (curElemData.StreetAbbreviation) {
      parts.push(curElemData.StreetAbbreviation);
    }

    if (curElemData.ListingId) {
      parts.push(curElemData.ListingId);
    }

    return parts.filter(Boolean).join("-");
  })();

  // Favoriting
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (
      window.localStorage.getItem("favorites") &&
      JSON.parse(window.localStorage.getItem("favorites")).includes(curElem.MLS)
    ) {
      setIsFavorite(true);
    }
  });
  const toggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const favoriteValue = window.localStorage.getItem("favorites");
    if (!isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      favorites.push(curElem.ListingId);
      const value = JSON.stringify(favorites);
      window.localStorage.setItem("favorites", value);
    } else if (isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      const value = JSON.stringify(
        favorites.filter((val) => val !== curElem.ListingId)
      );
      window.localStorage.setItem("favorites", value);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <section className="relative transition-all duration-200 transform bg-white group rounded-2xl p-0 hover:shadow-lg hover:rounded-t-2xl  hover:-translate-y-1 overflow-hidden">
      <Link
        href={generateURL({
          cityVal: curElemData.City,
          listingIDVal: streetAndMLS,
          province: "alberta",
        })}
        className="text-black"
      >
        <div className="lg:px-0 h-full w-full">
          <div className={`flex flex-col overflow-hidden relative`}>
            <div
              className={`${
                small ? "h-32 sm:h-52" : "h-52 sm:h-52"
              } overflow-hidden relative`}
            >
              <div
                className={`${
                  small ? "h-32 sm:h-52" : "h-52 sm:h-52"
                } sm:h-52 relative z-10 rounded-t-2xl rounded-b-2xl overflow-hidden`}
              >
                {imgSrc ? (
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-b-2xl hover:rounded-b-2xl rounded-t-2xl"
                    src={imgSrc}
                    alt="property image"
                    onError={(e) => {
                      console.log("Trigerring error");
                      handleImageError(e);
                    }}
                  />
                ) : (
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-b-2xl hover:rounded-b-2xl rounded-t-2xl"
                    src="/noimage.webp"
                    alt="property image"
                    onError={(e) => {
                      console.log("Trigerring error");
                      handleImageError(e);
                    }}
                  />
                )}

                {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
              </div>
              {isHotListing && (
                <div className="text-white text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-slate-800 items-center absolute top-3 left-2 z-20">
                  <span>🔥 New Listing</span>
                </div>
              )}

              <div className="absolute bottom-3 left-2 flex sm:flex-row z-20">
                <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                  {curElemData.PropertySubType}{" "}
                </div>
              </div>
            </div>
            <div className="flex-1 sm:px-3 pt-2 pb-4 px-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="font-bold text-2xl sm:text-2xl items-center justify-start mt-2 sm:my-2">
                  {curElemData.OriginalListPrice > curElemData.ListPrice &&
                    curElemData.PriceChangeTimestamp && (
                      <div className="flex items-center gap-1 mb-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-green-500 font-medium">
                          {Math.round(
                            ((curElemData.OriginalListPrice -
                              curElemData.ListPrice) /
                              curElemData.OriginalListPrice) *
                              100
                          )}
                          % reduced
                        </span>
                      </div>
                    )}
                  {curElemData.OriginalListPrice > curElemData.ListPrice &&
                  curElemData.PriceChangeTimestamp ? (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base text-gray-400 line-through font-normal">
                          {originalPrice}
                        </span>
                      </div>
                      <span className="font-bold text-black text-2xl mt-0.5">
                        {price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-black">{price}</span>
                  )}
                  {curElemData.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}
                </h2>
                <div className="text-xs font-medium text-black mb-1 sm:mb-0 flex items-center">
                  {
                    <>
                      <TimeAgo
                        modificationTimestamp={
                          curElemData.ModificationTimestamp
                        }
                      />
                    </>
                  }
                </div>
              </div>
              {/* {openHouse && (
                <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-[#ffffff] items-center absolute top-3 left-2 z-20 font-bold">
                  OPEN HOUSE
                </div>
              )}
              {openHouse && (
                <div className="text-white text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-[#2b2a2a] items-center absolute top-10 left-2 sm:top-3 sm:left-28 z-20 font-bold">
                  {`${new Date(curElemData.OpenHouseStartTime)
                    .toLocaleString("en-US", {
                      weekday: "short",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    .replace(/:\d{2} /, " ")} - ${new Date(
                    curElemData.OpenHouseEndTime
                  )
                    .toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    .replace(/:\d{2} /, " ")}`}
                </div>
              )} */}

              <span className={`text-black text-xs`}>
                <div className="flex flex-row justify-start">
                  {curElemData.BedroomsTotal && (
                    <div className="flex items-center mr-1">
                      <img
                        src="/resale-card-img/bedrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="bedrooms"
                      />
                      <span>
                        {Math.floor(curElemData.BedroomsTotal)}{" "}
                        <span className="hidden sm:inline">Bed</span>
                      </span>
                    </div>
                  )}
                  {curElemData.BathroomsTotalInteger && (
                    <div className="flex items-center mr-1">
                      <img
                        src="/resale-card-img/bathrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElemData.BathroomsTotalInteger)}{" "}
                        <span className="hidden sm:inline">Bath</span>
                      </span>
                    </div>
                  )}

                  {((curElemData.LotSizeArea &&
                    Number(curElemData.LotSizeArea) > 0) ||
                    curElemData.LivingAreaRange) && (
                    <div>
                      <img
                        src="/resale-card-img/ruler.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />

                      <br />
                      <span>
                        {Math.floor(curElemData.LotSizeArea) ||
                          Math.floor(
                            Number(curElemData.LotWidth) *
                              Number(curElemData.LotDepth)
                          ) ||
                          curElemData.LivingAreaRange ||
                          ""}{" "}
                        <span className="hidden sm:inline">Sq. Ft.</span>
                      </span>
                    </div>
                  )}
                </div>
              </span>
              <div className="flex flex-row justify-between my-1">
                <div className="text-black">
                  <div className="text-gray-500 text-xs truncate">
                    {curElemData.StreetName ? (
                      `${curElemData.StreetNumber} ${curElemData.StreetName} ${
                        curElemData.StreetSuffix
                      } ${curElemData.City} ${quadrant || ""}, Alberta`
                    ) : (
                      <span className="p-4"></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-gray-500 text-[9px] truncate">
                Listed by {curElemData.ListOfficeName}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div
        className={`absolute ${
          small
            ? "top-[0.5rem] sm:top-[0.5rem]"
            : "sm:top-[0.5rem] top-[0.5rem]"
        } right-2 z-10`}
      >
        <Favorite
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          MLS={curElemData.ListingKey}
          size={6}
        />
      </div>
    </section>
  );
};

export default AlbertaResaleCard;
