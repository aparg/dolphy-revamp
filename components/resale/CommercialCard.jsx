"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "@/helpers/TimeAgo";
import { commercial } from "../api/routes/fetchRoutes";
import { saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateURL";
import { usePathname } from "next/navigation";
import useDeviceView from "@/helpers/useDeviceView";
import MobileCityResoCard from "./MobileCityResoCard";

const CommercialCard = ({ curElem, small = false }) => {
  const { isMobileView } = useDeviceView();
  const pathname = usePathname();
  const price = Number(curElem.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const mapObj = {
    MLS: curElem.MLS,
    index: 1,
  };
  const imgSrc = commercial.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched];
  });
  /* console.log(imgSrc); */
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };
  const streetAndMLS = (() => {
    const parts = [];

    if (curElem.Street) {
      parts.push(curElem.Street);
    }

    if (curElem.StreetName) {
      const streetName = curElem.StreetName.trim().replace(/ /g, "-");
      parts.push(streetName);
    }

    if (curElem.StreetAbbreviation) {
      parts.push(curElem.StreetAbbreviation);
    }

    if (curElem.MLS) {
      parts.push(curElem.MLS);
    }

    return parts.filter(Boolean).join("-");
  })();
  return isMobileView ? (
    <MobileCityResoCard
      streetAndMLS={streetAndMLS}
      small={small}
      handleImageError={handleImageError}
      imgSrc={imgSrc}
      curElem={curElem}
      price={price}
    />
  ) : (
    <section className="">
      <Link
        href={generateURL({
          cityVal: curElem.Municipality,
          listingIDVal: streetAndMLS,
          embeddedSite: pathname.includes("embedded-site"),
        })}
        className="text-black"
      >
        <div className="lg:px-0 h-full w-full">
          <div
            className={`flex sm:flex-col flex-row overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl p-0 hover:shadow-lg hover:-translate-y-1 relative`}
          >
            <div
              className={`${small ? "h-44" : "h-52"} overflow-hidden relative`}
            >
              <div className="h-full relative">
                <img
                  className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-t-md"
                  src={imgSrc}
                  alt="property image"
                  onError={handleImageError}
                />
              </div>
              <div className="absolute bottom-3 left-2">
                <div className="flex flex-row items-center">
                  {curElem.Use && (
                    <div
                      className="text-black text-xs p-[2px] flex items-center rounded-md mx-1"
                      style={{
                        background: "white",
                      }}
                    >
                      {curElem.Use}
                    </div>
                  )}

                  <div className="text-black text-xs p-[2px] rounded-md mx-1 bg-white flex items-center">
                    <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 sm:px-3 py-2 px-2">
              <h2 className="font-extrabold text-3xl items-center justify-start mw">
                {price}
                {""}

                {curElem.SaleLease === saleLease.lease.value && (
                  <span> /mo</span>
                )}

                <span
                  className={`shadow-lg p-1 ms-1 text-black text-xs ${
                    small && "hidden"
                  }`}
                >
                  {Math.floor(curElem.TotalArea)} ft<sup>2</sup>
                </span>
              </h2>
              <p className="mb-0 fs-mine text-limit text-sm pb-0">
                {" "}
                MLS® #{curElem.MLS}
              </p>
              <div className="flex flex-row justify-between py-1">
                <div className="text-black truncate text-ellipsis">
                  <div className="text-dark bva">
                    {curElem.StreetName ? (
                      `${curElem.Street} ${curElem.StreetName}${" "}
                    ${curElem.StreetAbbreviation || ""} ${
                        curElem.Municipality
                      }, Ontario`
                    ) : (
                      <span className="p-4"></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="inline-flex justify-center items-center my-2">
                <div
                  className={`min-w-[50px] inline-flex item-center justify-center bg-[#3a88ef]/[0.08] hover:bg-[#3a88ef]/[0.2] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                >
                  <img
                    className="pr-1 w-5"
                    src="/commercial-card-img/mailOutline.svg"
                    alt="Email"
                  />
                  Email
                </div>
                <div
                  className={`min-w-[70px] inline-flex item-center justify-center bg-[#ffedea]/[0.5] hover:bg-[#ffdad4]/[0.8] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                >
                  <img
                    className="pr-1 w-5"
                    src="/commercial-card-img/phone.svg"
                    alt="Phone"
                  />
                  Phone
                </div>
                <div
                  className={`min-w-[70px] inline-flex item-center justify-center bg-[#43bb3f]/[0.1] hover:bg-[#43bb3f]/[0.2] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                >
                  <img
                    className="pr-1 w-5"
                    src="/commercial-card-img/whatsapp.svg"
                    alt="whatsapp"
                  />
                  Whatsapp
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default CommercialCard;
