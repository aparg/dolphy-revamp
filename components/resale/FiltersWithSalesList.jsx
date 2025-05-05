"use client";
import React, { useEffect, useMemo, useState, useContext } from "react";

// import SalesList from "./SalesList";
import Filters from "./Filters";

//HELPERS
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

//CONSTANT
import {
  bedCount,
  saleLease,
  houseType,
  washroomCount,
  homeText,
} from "@/constant";
import { getFilteredRetsData } from "@/app/_resale-api/getSalesData";
import useDeviceView from "@/helpers/useDeviceView";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import HotListings from "./HotListings";
import PageSelector from "./PageSelector";
import Image from "next/image";
import { FadeLoader } from "react-spinners";
import { useClientFilter } from "@/hooks/use-client-filter";
import { usePropertyCount } from "@/hooks/use-property-count";
import { FilterOpenContext } from "../context/FilterOpenContext";
import BedroomLinks from "./BedroomLinks";
import MapContent from "../resale-map/MapContent";
import { MapProvider, useMap } from "../resale-map/MapContext";
import citiesWithProvinces from "@/constant/cities";
import Link from "next/link";

const generateSEOContent = (city, filterState, totalPropertyCount) => {
  const cityName = city ? capitalizeFirstLetter(city) : "Ontario";
  const citySpecificText = city ? `in ${cityName}` : "across Ontario";

  // Handle property type
  const propertyType =
    filterState?.houseType === "all"
      ? "homes"
      : filterState?.houseType || "homes";

  // Handle bedroom text
  const bedroomText =
    filterState?.bed && filterState.bed !== "any"
      ? `${filterState.bed}-bedroom `
      : "";

  // Handle price range
  const priceText =
    filterState?.priceRange?.max > 0
      ? `under $${(filterState.priceRange.max / 1000000).toFixed(1)}M`
      : "at various price points";

  // Handle sale/lease text
  const saleLeaseText = filterState?.saleLease || "sale";

  // Handle bathroom text
  const bathroomText =
    filterState?.washroom && filterState.washroom !== "any"
      ? `homes with ${filterState.washroom} bathrooms to `
      : "";

  const propertyCount = totalPropertyCount || "numerous";

  return {
    firstParagraph: `Discover an exceptional selection of ${bedroomText}${propertyType} for ${saleLeaseText} ${citySpecificText}. Our comprehensive real estate listings showcase ${propertyCount} properties ${priceText}, each offering unique features and amenities that cater to diverse lifestyle preferences. Whether you're seeking a cozy family residence or an investment opportunity, our real estate market provides compelling options in highly sought-after neighborhoods.`,

    secondParagraph: `The real estate landscape ${citySpecificText} continues to evolve, offering buyers and investors the perfect opportunity to enter one of Ontario's most dynamic markets. From ${bathroomText}properties with modern amenities and strategic locations, our listings represent the best of what the market has to offer. Explore our carefully curated selection of properties and find your ideal home in this thriving community.`,

    buyerGuide: `Are you a first-time homebuyer? Understanding the real estate market can be overwhelming, but we're here to help. Consider key factors such as location, property size, future growth potential, and your long-term financial goals. Our listings provide detailed information about each property, including floor plans, recent upgrades, and neighborhood amenities, helping you make an informed decision.`,

    investmentInsights: `For investors and seasoned buyers, ${citySpecificText} presents diverse opportunities in both established and emerging neighborhoods. Whether you're interested in rental properties, renovation projects, or long-term appreciation potential, our platform offers valuable insights into market trends, property values, and investment opportunities.`,

    marketTrends: `The Ontario real estate market remains dynamic, with properties ranging from modern condos to spacious family homes. Current market trends show strong demand for ${propertyType}, particularly in well-connected neighborhoods with access to amenities, schools, and transportation. Stay informed about market conditions and property values through our regularly updated listings and detailed property information.`,

    communityHighlight: `${
      city ? `${cityName} offers` : "Communities across Ontario offer"
    } a blend of urban convenience and comfortable living. From local shopping and dining to parks and recreational facilities, each neighborhood provides unique advantages for residents. Consider factors like commute times, school districts, and community development plans when exploring our listings.`,
  };
};

const FiltersWithSalesList = ({
  province = "ontario",
  salesListData = [],
  INITIAL_LIMIT,
  city = undefined,
  requiredType = undefined,
  saleLeaseVal = undefined,
  priceRange,
  openHouse,
  priceDropped,
  bedroomCount,
  condoCorp = undefined,
  condoCorpNumber = undefined,
}) => {
  // const leadEmail = user?.emailAddresses[0].emailAddress;
  const saleLeaseFilterVal =
    saleLease[
      Object.keys(saleLease).find((val) => val === saleLeaseVal) || "sale"
    ]?.name || saleLease.sale.name;

  const houseTypeFilterVal =
    Object.values(houseType).find((val) => val.name === requiredType)?.value ||
    houseType.all.value;
  const { isFilterOpen } = useContext(FilterOpenContext);
  const { isMapOpen } = useMap();
  const initialState = {
    saleLease: saleLeaseFilterVal,
    priceDropped: priceDropped || false,
    bed: bedCount.any.value,
    priceRange: {
      min: priceRange?.min || 0,
      max: priceRange?.max || 0,
    },
    houseType: houseTypeFilterVal,
    Basement: [],
    Roads: [],
    washroom: washroomCount.any.value,
    priceDecreased: null,
    city: city,
    openHouse: openHouse || false,
    bed: bedroomCount,
    condoCorp: condoCorp,
    condoCorpNumber: condoCorpNumber,
  };
  const storedState = isLocalStorageAvailable()
    ? JSON.parse(window.localStorage.getItem("filterState"))
    : null;
  //if parameters are passed for house type or sale/lease rewrite property values for storedState
  if (storedState) {
    if (houseTypeFilterVal) storedState.type = houseTypeFilterVal;
    if (saleLeaseFilterVal) storedState.saleLease = saleLeaseFilterVal;
    if (city) storedState.city = city;
  }
  const [filterState, setFilterState] = useState(initialState);
  const totalPropertyCount = usePropertyCount(city, requiredType);
  const [salesData, setSalesData] = useState(salesListData);
  const [clientFilteredData, isClientFiltered] = useClientFilter(
    salesData,
    filterState
  );
  const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(1); //the page that is selected
  const [showMap, setShowMap] = useState(false);

  const slugify = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const separateSalesData = (salesData) => {
    if (selected == 1) {
      // Get the current date and time
      const currentDate = new Date();

      // Calculate the date and time 24 hours ago
      const twentyFourHoursAgo = new Date(
        currentDate.getTime() - 24 * 60 * 60 * 1000
      );

      // Function to check if the data is from 24 hours ago
      const is24HoursAgo = (timestampSql) => {
        const timestampDate = new Date(timestampSql);
        return (
          timestampDate > twentyFourHoursAgo && timestampDate <= currentDate
        );
      };

      // Separate sales data for 24 hours ago and remaining days
      const hotSales = [];
      const remainingSales = [];

      salesData?.forEach((data) => {
        if (is24HoursAgo(data.OriginalEntryTimestamp) && hotSales.length < 5) {
          hotSales.push(data);
        } else {
          remainingSales.push(data);
        }
      });
      return { hotSales, remainingSales };
    } else {
      return { hotSales: [], remainingSales: salesData };
    }
  };

  const { hotSales, remainingSales } = useMemo(() => {
    if (isClientFiltered) {
      return separateSalesData(clientFilteredData);
    } else return separateSalesData(salesData);
  }, [salesData, clientFilteredData]);

  //temporary solution for basement filtering

  const _getMergedHouseType = (state) => {
    const selectedHouseType = [state.type];
    return selectedHouseType;
  };

  const fetchFilteredData = async (
    params,
    limit = INITIAL_LIMIT,
    offset = 0
  ) => {
    const payload = {
      saleLease: Object.values(saleLease).find(
        (saleLeaseObj) => saleLeaseObj.name === params.saleLease
      )?.name,
      bed: params.bed,
      minListPrice: Number(params.priceRange?.min ?? 0),
      maxListPrice: Number(params.priceRange?.max ?? 0),
      houseType: params.houseType,
      Basement: params.Basement,
      washroom: params.washroom,
      priceDropped: params.priceDropped,
    };
    const queryParams = {
      limit: limit,
      offset: offset,
      city: capitalizeFirstLetter(city),
      condoCorp: condoCorp,
      condoCorpNumber: condoCorpNumber,
      ...payload,
    };
    setLoading(true);
    const filteredSalesData = await getFilteredRetsData(queryParams);

    setSalesData(filteredSalesData);
    if (!filteredSalesData?.length == 0) {
      setOffset(offset);
    }
    setLoading(false);
  };

  useEffect(() => {
    // store data in session storage whenever it changes
    if (isLocalStorageAvailable() && filterState) {
      window.localStorage.setItem("filterState", JSON.stringify(filterState));
      window.localStorage.setItem("selectedCity", capitalizeFirstLetter(city));
    }

    if (window !== undefined) {
      window.scrollY = 0;
    }
  }, [filterState]);

  useEffect(() => {
    //component can be loaded in three ways, either it is provided a pre-defined filter, have a stored state or

    fetchFilteredData(initialState, 30, selected * 30 - 30);
  }, [selected]);
  const propertyTypeName = Object.values(houseType).find(
    (obj) => obj?.value?.toLowerCase() == filterState?.houseType?.toLowerCase()
  )?.name;
  return (
    <MapProvider>
      <div className="relative">
        <div className="sticky w-full top-0 py-2 md:py-0 sm:top-0 h-22 sm:h-12 z-20 bg-white">
          <div
            className={`relative w-full ${
              isFilterOpen ? "max-h-[80px] sm:h-12" : "h-22 sm:h-12"
            } overflow-visible`}
            id="filter"
          >
            <div className="flex flex-row bg-white items-center w-full">
              <Filters
                {...{ filterState, setFilterState, fetchFilteredData }}
              />
              <div className="hidden sm:block z-20 mr-10">
                <MapContent
                  listings={isClientFiltered ? clientFilteredData : salesData}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mb-4">
          <div className="fixed bottom-[10px] left-1/2 transform -translate-x-1/2 sm:hidden z-20 bg-white rounded-full">
            <MapContent
              listings={isClientFiltered ? clientFilteredData : salesData}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            isMapOpen ? "mr-[40vw]" : ""
          }`}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[80vh] mx-auto">
              <FadeLoader color="black" />
              <p className="mt-4 text-gray-600 text-center max-w-xs">
                Finding your perfect home...
                <br />
                <span className="text-sm text-gray-500">
                  We're searching through the best properties just for you
                </span>
              </p>
            </div>
          ) : salesData?.length > 0 || hotSales?.length > 0 ? (
            <>
              <div
                className={`${
                  isMobileView ? "pt-1" : "pt-1"
                } grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-0 gap-x-2 gap-y-3 md:gap-x-2 ${
                  isMapOpen
                    ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                    : ""
                }`}
              >
                {selected === 1 && (
                  <HotListings salesData={hotSales} city={city} />
                )}
                {/* <SalesList
                  {...{
                    city,
                    INITIAL_LIMIT,
                    salesData: remainingSales,
                    setSalesData,
                    offset,
                    setOffset,
                    filterState,
                  }}
                /> */}
              </div>
              <div className="flex justify-center mt-10">
                <PageSelector
                  numberOfPages={40}
                  batchSize={6}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
              {priceDropped && (
                <div className="w-full bg-white mt-20 col-span-full">
                  <div className="text-left mb-8">
                    <h2 className="text-xl sm:text-3xl font-bold w-[100%] sm:w-auto">
                      Explore Price Dropped Homes in Ontario
                    </h2>
                    <p className="text-black">
                      Explore homes that have seen a price reduction in the last
                      24 hours
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-0 gap-x-2 gap-y-2 md:gap-x-2">
                    {citiesWithProvinces.map((city) => (
                      <div key={city.city}>
                        <h4 className="text-xs font-normal text-gray-800 hover:underline underline-offset-2">
                          <Link
                            href={`/resale/ontario/${slugify(
                              city.city
                            )}/price-dropped/`}
                          >
                            Price Dropped Homes in {city.city}
                          </Link>
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="w-full bg-white mt-20 col-span-full">
                <div className="text-left mb-8">
                  <h2 className="text-xl sm:text-3xl font-bold w-[100%] sm:w-auto">
                    See the Latest {homeText[propertyTypeName] || "listings"}{" "}
                    sorted by Bedrooms
                  </h2>
                  <p className="text-black">
                    Explore 1 to 5 bedroom homes for sale in Ontario
                  </p>
                </div>
                <BedroomLinks
                  propertyType={filterState.houseType}
                  saleLease={filterState.saleLease}
                />
              </div>
              {!loading && (
                <div className="mt-16 px-4 py-8">
                  <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-sm leading-relaxed">
                    <div className="space-y-4">
                      <p>
                        {
                          generateSEOContent(
                            city,
                            filterState,
                            totalPropertyCount
                          ).firstParagraph
                        }
                      </p>
                      <p>
                        {
                          generateSEOContent(
                            city,
                            filterState,
                            totalPropertyCount
                          ).secondParagraph
                        }
                      </p>
                    </div>

                    <div className="mt-8 space-y-6">
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          First-Time Buyer's Guide
                        </h3>
                        <p>
                          {
                            generateSEOContent(
                              city,
                              filterState,
                              totalPropertyCount
                            ).buyerGuide
                          }
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Investment Opportunities
                        </h3>
                        <p>
                          {
                            generateSEOContent(
                              city,
                              filterState,
                              totalPropertyCount
                            ).investmentInsights
                          }
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Market Insights
                        </h3>
                        <p>
                          {
                            generateSEOContent(
                              city,
                              filterState,
                              totalPropertyCount
                            ).marketTrends
                          }
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Community Overview
                        </h3>
                        <p>
                          {
                            generateSEOContent(
                              city,
                              filterState,
                              totalPropertyCount
                            ).communityHighlight
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full fs-4 text-center flex w-100 flex-col items-center">
              <Image
                src="/no-record-found.jpg"
                width="500"
                height="500"
                alt="no record found"
              />
              <p>No Records Found</p>
            </div>
          )}
        </div>
      </div>
    </MapProvider>
  );
};

export default FiltersWithSalesList;
