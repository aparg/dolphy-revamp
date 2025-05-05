"use client";
import React, { useState } from "react";
import Link from "next/link";
import { generateURL } from "@/helpers/generateURL";
import { usePathname } from "next/navigation";
import TimeAgo from "@/helpers/TimeAgo";
import { saleLease } from "@/constant";
const MobileCityResoCard = React.forwardRef(
  (
    {
      curElem,
      streetAndMLS,
      small,
      handleImageError,
      imgSrc,
      price,
      // showFallbackImage,
    },
    ref
  ) => {
    const pathname = usePathname();
    return (
      <section className="mb-2" ref={ref}>
        <Link
          href={generateURL({
            cityVal: curElem.Municipality,
            listingIDVal: streetAndMLS,
            embeddedSite: pathname.includes("embedded-site"),
          })}
          className="text-black"
        >
          <div className="lg:px-0 h-36 w-full">
            <div
              className={`flex h-full items-center sm:flex-col flex-row overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1 relative`}
            >
              <div
                className={`flex flex-col items-center h-full min-w-28 max-w-24 overflow-hidden relative`}
              >
                <div className="relative h-full w-full">
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-l-md"
                    src={imgSrc}
                    alt="property image"
                    onError={handleImageError}
                  />
                  {/* {showFallbackImage ? (
                    <Image
                      fill={true}
                      className="object-cover rounded-md w-full h-full transition-all duration-200 transform group-hover:scale-110 "
                      src="/noimage.webp"
                      alt="property image"
                      sizes="30vw"
                    />
                  ) : (
                    <Image
                      fill={true}
                      className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-md"
                      src={imgSrc}
                      alt="property image"
                      onError={handleImageError}
                      loading="lazy"
                      sizes="30vw"
                    />
                  )} */}
                  {/* <div className="absolute inset-0  rounded-md bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
                </div>
              </div>
              <div className="mx-2 w-full py-2 my-auto text-ellipsis overflow-hidden">
                {/* <div className="text-xs">{`For ${
                  curElem.saleLease || "Sale"
                }`}</div> */}
                <div className="flex flex-col w-full justify-between">
                  <h2 className="price font-bold mb-1 text-xl font-bold flex items-center justify-start">
                    {price}
                    {""}
                    {curElem.SaleLease === saleLease.lease.value && (
                      <span> /mo</span>
                    )}
                    {/* <span
                      className={`shadow-lg p-1 ms-1 text-black text-xs card-data`}
                    >
                      {curElem.ApproxSquareFootage} ft<sup>2</sup>
                    </span> */}
                  </h2>
                  <div className="text-xs my-1">
                    <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                  </div>
                </div>
                <div className="text-sm">
                  {curElem.Washrooms || "N/A"} Bath |{" "}
                  {curElem.Bedrooms || "N/A"} Bed
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-black truncate text-ellipsis">
                    <div className="text-dark bva text-ellipsis text-sm">
                      {curElem.StreetName ? (
                        `${curElem.Street} ${curElem.StreetName}${" "}
                    ${curElem.StreetAbbreviation} ${
                          curElem.Municipality
                        }, Ontario`
                      ) : (
                        <span className="p-4"></span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-black text-sm rounded-md">
                    {curElem.TypeOwn1Out}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    );
  }
);

export default MobileCityResoCard;
