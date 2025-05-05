"use client";
import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { format } from "date-fns";

import TimeAgo from "./TimeAgo";

//CUSTOM HOOKS
import useDeviceView from "@/helpers/useDeviceView";

//CONSTANT
import Image from "next/image";
//ICONS

import WalkScore from "./WalkScore";
import formatCurrency from "@/helpers/formatCurrency";
import CompactMortgageCalculator from "./CompactMortgageCalculator";
import { houseType } from "@/constant";
import HomeOverview from "./HomeOverview";
import PropertyDescription from "./PropertyDescription";
import MapGoogle from "./MapGoogle";
import {
  Bed,
  Bath,
  Home,
  Car,
  House,
  Languages,
  Building2,
  Scan,
  Grid2X2,
} from "lucide-react";
import OtherAmentities from "./OtherAmentities";
import MaintenanceItem from "./MaintenanceItem";
import NearbyPlacesGoogle from "./StreetViewGoogle";
import RoomInfo from "./RoomData";
import GetStatusReport from "./GetStatusReport";
import Link from "next/link";
import { generateURL } from "@/helpers/generateResaleURL";
import MarketComparisonChart from "./MarketComparisonChart";

const PropertyPage = ({
  main_data,
  room_data,
  analyticsData,
  openHouseData,
}) => {
  const [navbar, setNavbar] = useState(false);
  const { isMobileView } = useDeviceView();

  const price = formatCurrency(main_data?.ListPrice);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 870) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
      });
    }
  }, []);
  const typeOwnSrchToName = {};
  Object.values(houseType).forEach(
    (item) => (typeOwnSrchToName[item.value] = item.name)
  );

  const fullAddress = [
    [main_data.StreetNumber, main_data.StreetName, main_data.StreetSuffix]
      .filter(Boolean)
      .join(" "),
    main_data.City,
    main_data.Province,
    main_data.PostalCode,
  ]
    .filter((data) => !!data)
    .join(", ");

  const fullAddressGooglSearch = [
    [main_data.StreetNumber, main_data.StreetName, main_data.StreetSuffix]
      .filter(Boolean)
      .join(" "),
    main_data.City,
    main_data.Province,
    "CA",
  ]
    .filter((data) => !!data)
    .join(" ");

  return (
    <>
      <div className="col-12 mt-2">
        <div
          className={`border-0  rounded-md ${
            isMobileView ? "sm:p-4 pt-3 mt-3" : "mt-5"
          }`}
        >
          <div
            className={`flex flex-row sm:gap-x-28 flex-wrap items-center rounded-md ${
              isMobileView ? "gap-3" : "gap-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 md:space-x-20 sm:space-x-28 items-start w-full">
              <section className="flex justify-between items-start w-full">
                <div className="w-full">
                  {openHouseData && (
                    <div className="text-black w-fit text-[0.7rem] p-[3px] px-2 shadow-xl rounded-md mx-1 bg-white border border-black items-center left-2 sm:top-3 sm:left-28 z-20 font-normal mb-2">
                      Open House{" "}
                      {format(
                        openHouseData[openHouseData.length - 1]
                          .OpenHouseStartTime,
                        "MMM d, yyyy"
                      )}
                    </div>
                  )}
                  <h3 className="text-2xl md:text-5xl font-extrabold">
                    List Price: {price}{" "}
                    {main_data.TransactionType === "For Lease" && (
                      <span className="text-lg"> /mo</span>
                    )}
                    {Number(main_data.AssociationFee) ? (
                      <span className="font-normal pb-0 text-xs sm:text-sm my-2">
                        + {formatCurrency(main_data.AssociationFee)} maint. fee
                      </span>
                    ) : (
                      ""
                    )}
                    {main_data.OriginalListPrice > main_data.ListPrice &&
                      main_data.PriceChangeTimestamp && (
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
                          <span className="text-sm text-black font-medium">
                            {Math.round(
                              ((main_data.OriginalListPrice -
                                main_data.ListPrice) /
                                main_data.OriginalListPrice) *
                                100
                            )}
                            % reduced
                          </span>
                        </div>
                      )}
                  </h3>
                  {main_data?.PropertySubType.includes("Condo") && (
                    <GetStatusReport />
                  )}
                  {main_data?.PropertySubType.includes("Condo") && (
                    <div className="flex flex-grid text-xs sm:text-xs font-medium py-1 text-gray-700">
                      <Link
                        href={generateURL({
                          condoCorp: main_data.AssociationName,
                          cityVal: main_data.City,
                          condoCorpNumber: main_data.CondoCorpNumber,
                        })}
                        className="hover:text-blue-500"
                      >
                        Condo Corporation - {main_data.AssociationName} #
                        {main_data.CondoCorpNumber}
                      </Link>
                    </div>
                  )}

                  <h1 className="text-[0.9rem] mt-1 sm:text-xl">
                    {[
                      main_data.StreetNumber,
                      main_data.StreetName,
                      main_data.StreetSuffix,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    {", "}
                    <Link
                      href={generateURL({ cityVal: main_data.City })}
                      className="hover:text-blue-500"
                    >
                      {main_data?.City}
                      {", "}
                    </Link>
                    {[main_data.Province, main_data.PostalCode]
                      .filter((data) => !!data)
                      .join(", ")}
                  </h1>
                  <div className="flex gap-2 items-center">
                    {main_data.ListOfficeName &&
                      main_data?.MlsStatus !== "Sold" && (
                        <div className="flex flex-grid text-xs sm:text-xs font-medium py-1 text-gray-700">
                          <TimeAgo
                            modificationTimestamp={
                              main_data.ModificationTimestamp
                            }
                          />{" "}
                          - By {main_data?.ListOfficeName}
                        </div>
                      )}
                  </div>

                  <div className="flex gap-2 relative">
                    <div className="flex items-center gap-2 min-w-max pr-12">
                      <span className="flex items-center gap-1 text-[0.85rem] sm:text-xs text-black w-fit py-1 tracking-wide rounded-md whitespace-nowrap">
                        <House className="w-3" strokeWidth={2} />
                        {main_data.PropertySubType}
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1 text-[0.85rem] sm:text-xs text-black w-fit py-1 tracking-wide rounded-md whitespace-nowrap">
                        MLS - #{main_data.ListingKey}
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1 text-[0.85rem] sm:text-xs text-black w-fit py-1 tracking-wide rounded-md whitespace-nowrap">
                        {main_data.MlsStatus}
                      </span>
                    </div>

                    {/* Fade effect for mobile */}
                    {isMobileView && (
                      <div
                        className="absolute right-0 top-0 h-full pointer-events-none"
                        style={{
                          width: "60px",
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,1) 100%)",
                        }}
                      />
                    )}
                  </div>

                  <div className="flex space-x-6 items-center justify-start mt-2">
                    <div className="flex justify-center items-center gap-1.5 text-sm text-gray-700 flex-col text-center">
                      <Bed
                        className="w-6 h-6 text-gray-700"
                        strokeWidth={1.5}
                      />
                      {main_data.BedroomsTotal} Bed
                    </div>
                    <div className="flex justify-center items-center gap-1.5 text-sm text-gray-700 flex-col text-center">
                      <Bath
                        className="w-6 h-6 text-gray-700"
                        strokeWidth={1.5}
                      />
                      {main_data.BathroomsTotalInteger} Bath
                    </div>
                    {(main_data.BuildingAreaTotal ||
                      main_data.LivingAreaRange) && (
                      <div className="flex justify-center items-center gap-1.5 text-sm text-gray-700 flex-col text-center">
                        <Scan
                          className="w-6 h-6 text-gray-700"
                          strokeWidth={1.5}
                        />
                        {main_data.BuildingAreaTotal ||
                          main_data.LivingAreaRange}{" "}
                        Sqft.
                      </div>
                    )}
                    {main_data.LotWidth &&
                      main_data.LotDepth &&
                      Number(main_data.LotWidth) > 0 &&
                      Number(main_data.LotDepth) > 0 && (
                        <div className="flex justify-center items-center gap-1.5 text-sm text-gray-700 flex-col  text-center">
                          <Grid2X2 className="w-6 h-6 text-gray-700" />
                          <span>
                            Lot Size: {main_data.LotWidth} x{" "}
                            {main_data.LotDepth} {main_data.LotSizeUnits}
                          </span>
                        </div>
                      )}
                    {main_data.GarageType && (
                      <div className="flex justify-center items-center gap-1.5 text-sm text-gray-700 flex-col text-center">
                        <Car
                          className="w-6 h-6 text-gray-700"
                          strokeWidth={1.5}
                        />
                        {main_data.GarageType} Garage
                      </div>
                    )}
                  </div>
                  {main_data.AssociationFeeIncludes.length > 0 && (
                    <div className="mt-5">
                      <MaintenanceItem
                        data={
                          Array.isArray(main_data?.AssociationFeeIncludes)
                            ? main_data?.AssociationFeeIncludes?.map((data) =>
                                data.replace("Included", "").trim()
                              )
                            : main_data?.AssociationFeeIncludes.split(",") ||
                              "N/A"
                        }
                        fee={main_data.AssociationFee}
                      />
                    </div>
                  )}

                  {analyticsData?.totalSimilar > 0 && (
                    <div className="mt-14">
                      <h2 className="font-extrabold text-sm sm:text-xl leading-0 mb-4">
                        Price comparison with similar homes in{" "}
                        <Link
                          href={generateURL({
                            cityVal: main_data.City,
                            houseTypeVal: main_data.PropertySubType,
                            saleLeaseVal: main_data.TransactionType,
                          })}
                          className="hover:underline underline-offset-4"
                        >
                          {main_data.City}
                        </Link>
                      </h2>

                      <div className="p-2 bg-white shadow rounded-xl border border-gray-100">
                        <div className="grid grid-cols-2 items-center gap-6">
                          <div>
                            <span className="text-sm text-gray-500">
                              Compared to {analyticsData?.totalSimilar}
                              {analyticsData?.totalSimilar > 1
                                ? " similar homes"
                                : " similar home"}
                            </span>
                            <div
                              className={`text-xl font-bold mt-1 ${
                                main_data.ListPrice >
                                (analyticsData?.avgPrice || 0)
                                  ? "text-red-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {(
                                ((main_data.ListPrice -
                                  (analyticsData?.avgPrice || 0)) /
                                  (analyticsData?.avgPrice || 1)) *
                                100
                              ).toFixed(1)}
                              %
                              {main_data.ListPrice >
                              (analyticsData?.avgPrice || 0)
                                ? " Higher"
                                : " Lower"}
                              {main_data.ListPrice >
                              (analyticsData?.avgPrice || 0)
                                ? "↑"
                                : "↓"}
                            </div>
                          </div>

                          <div>
                            <span className="text-sm text-gray-500">
                              Market Avg. of ({analyticsData?.totalSimilar || 0}{" "}
                              similar homes)
                            </span>
                            <div className="text-2xl font-bold text-gray-900">
                              $
                              {analyticsData?.avgPrice.toLocaleString(
                                "en-CA"
                              ) || 0}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg">
                        <MarketComparisonChart
                          currentPrice={main_data.ListPrice}
                          comparisons={[
                            {
                              name: `Similar Homes in ${main_data.City}`,
                              description: `${
                                analyticsData?.totalSimilar
                              } homes with ${main_data.BedroomsTotal} beds, ${
                                (main_data.WashroomsType1Pcs || 0) +
                                (main_data.WashroomsType2Pcs || 0)
                              } baths`,
                              price: analyticsData?.avgPrice || 0,
                            },
                            {
                              name: `${main_data.BedroomsTotal} Bed Homes`,
                              description: `Average of ${
                                analyticsData?.bedroomCount || 0
                              } homes`,
                              price: analyticsData?.avgPriceBedrooms || 0,
                            },
                            {
                              name: main_data.PropertySubType,
                              description: `Average of ${
                                analyticsData?.propertyTypeCount || 0
                              } ${main_data.PropertySubType} homes in ${
                                main_data.City
                              }`,
                              price: analyticsData?.avgPriceType || 0,
                            },
                          ]}
                        />
                        <p className="text-sm text-gray-500">
                          Note <span className="text-red-600">*</span> Price
                          comparison is based on the similar properties listed
                          in the area and may not be accurate. Consult licences
                          real estate agent for accurate comparison
                        </p>
                      </div>
                    </div>
                  )}

                  <RoomInfo data={room_data} />
                </div>
              </section>
            </div>
          </div>
        </div>
        {/* Description */}

        <div className="mt-6 sm:mt-8 pt-4">
          <h2 className="font-extrabold text-2xl sm:text-3xl leading-0 mb-2">
            Client Remarks{" "}
          </h2>
          <div className="text-justify text-gray-600 font-normal">
            {main_data.PublicRemarks}
          </div>
        </div>

        {/* <ListingInformation main_data={main_data} fullAddress={fullAddress} /> */}
        <PropertyDescription main_data={main_data} fullAddress={fullAddress} />

        {/* Extras */}
        {main_data?.Extras && (
          <div className={`${isMobileView ? "pt-4 pb-4" : "pt-4 pb-4"}`}>
            <div className="col-md-12 px-0">
              <div className="container rounded-md p-4 border-0">
                <h2 className="font-bold text-xl sm:text-xl">Extras</h2>
                <div className="flex flex-grid text-lg py-1 leading-8">
                  {main_data.Extras}
                </div>
              </div>
            </div>
          </div>
        )}
        {/*Home Overview  */}
        <HomeOverview main_data={main_data} />
        {main_data.AssociationAmenities.length > 0 && (
          <OtherAmentities amenities={main_data.AssociationAmenities} />
        )}
      </div>
      {main_data.UnparsedAddress && (
        <div className={isMobileView ? `mt-12 col-12` : `mt-12 col-12`}>
          <div className="sm:text-2xl py-3 flex items-start">
            <div>
              <Image
                width={50}
                height={50}
                alt="satellite view"
                className="w-8 sm:w-10 inline mr-2"
                src="/icons/home_address.png"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-extrabold pb-0 text-2xl sm:text-3xl">
                Walk around the neighborhood
              </div>
              <span className="text-sm font-medium leading-2">
                {fullAddress}
              </span>
            </div>
          </div>
          <MapGoogle location={main_data.UnparsedAddress} zoom={14} />
        </div>
      )}
      <div className={isMobileView ? `mt-12 col-12` : `mt-12 col-12`}>
        <div className="font-extrabold text-2xl sm:text-3xl pb-3">
          Nearby Places
        </div>
        <NearbyPlacesGoogle
          location={main_data.UnparsedAddress || null}
          zoom={13}
        />
      </div>
      <div className="col-12 mt-6">
        <div className="bg-white rounded-xl border p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <Image
                src="/angelablob.png"
                alt="Sales Representative"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold leading-0">
                    Angela Yang
                  </h3>
                  <p className="text-gray-600 leading-0">
                    Sales Representative, ANCHOR NEW HOMES INC.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Languages className="w-5 h-5" />
                <span className="text-sm leading-0">English, Mandarin</span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1 rounded-full">
                    <Home className="w-4 h-4" />
                    Residential Resale
                  </span>
                  <span className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1 rounded-full">
                    <Building2 className="w-4 h-4" />
                    Property Management
                  </span>
                  <span className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1 rounded-full">
                    <Building2 className="w-4 h-4" />
                    Pre Construction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {main_data.TransactionType == "For Sale" && (
        <div className={isMobileView ? `mt-12 col-12` : `mt-24 col-12`}>
          <CompactMortgageCalculator
            price={main_data?.ListPrice}
            showDetails={false}
            align="left"
          />
        </div>
      )}

      <div className={isMobileView ? `mt-14 col-12` : `mt-24 col-12`}>
        <h2 className="font-bold pb-3 text-lg sm:text-2xl pt-3">
          <Image
            width={50}
            height={50}
            alt="walking  "
            className="w-8 sm:w-10 inline mr-2"
            src="/property-page-img/walking.svg"
          />
          Walk Score for {main_data.StreetNumber} {main_data.StreetName}{" "}
          {main_data.StreetSuffix}
        </h2>

        <div>
          <WalkScore
            address={`${main_data.StreetNumber} ${main_data.StreetName} ${
              main_data.StreetSuffix
            }, ${main_data.City.split(" ")[0]}, ON`}
            width={isMobileView ? 350 : 600}
          />
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
