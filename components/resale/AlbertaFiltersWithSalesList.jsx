"use client";
import React, { useEffect, useMemo, useState } from "react";

// import SalesList from "./SalesList";

//HELPERS
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

//CONSTANT
import {
  bedCount,
  saleLease,
  houseType,
  washroomCount,
  pillar9HouseTypes,
} from "@/constant";
import { getFilteredAlbertaData } from "@/app/_resale-api/getPillar9Data";
import useDeviceView from "@/helpers/useDeviceView";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { ImSpinner } from "react-icons/im";
import HotListings from "./HotListings";
import Image from "next/image";
import Pagination from "./Pagination";
import PropertyList from "./PropertyList";
import FilterBar from "./FilterBar";
import { parseSlug } from "@/helpers/parseResaleFilter";
// import formatCurrency from "@/helpers/formatCurrency";
// import FilterSubmit from "../FilterSubmit";

const AlbertaFiltersWithSalesList = ({
  salesListData = [],
  INITIAL_LIMIT,
  city = undefined,
  requiredType = undefined,
  saleLeaseVal = undefined,
  slug,
}) => {
  // const leadEmail = user?.emailAddresses[0].emailAddress;
  const saleLeaseFilterVal =
    saleLease[
      Object.keys(saleLease).find((val) => val === saleLeaseVal) || "sale"
    ]?.name || saleLease.sale.name;

  const houseTypeFilterVal =
    Object.values(pillar9HouseTypes).find((val) => val.name === requiredType)
      ?.name || pillar9HouseTypes.all.name;

  const initialState = {
    saleLease: saleLeaseFilterVal,
    bed: bedCount.any.name,
    priceRange: {
      min: 0,
      max: 0,
    },
    type: houseTypeFilterVal,
    hasBasement: null,
    sepEntrance: null,
    washroom: washroomCount.any.value,
    priceDecreased: null,
    city: city,
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
  const [filterState, setFilterState] = useState(storedState || initialState);
  const [salesData, setSalesData] = useState(salesListData);
  const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [selected, setSelected] = useState(1); //the page that is selected

  const { hotSales, remainingSales } = useMemo(() => {
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
        if (is24HoursAgo(data.TimestampSql) && hotSales.length < 5) {
          hotSales.push(data);
        } else {
          remainingSales.push(data);
        }
      });
      return { hotSales, remainingSales };
    } else {
      return { hotSales: [], remainingSales: salesData };
    }
  }, [salesData]);

  const _getMergedHouseType = (state) => {
    let mergedHouseType = [];
    const selectedHouseType = Object.values(pillar9HouseTypes).filter((type) =>
      state.type.includes(type.name)
    );
    for (const type of selectedHouseType) {
      if (type.value === null) {
        mergedHouseType = null;
        break;
      } else {
        mergedHouseType.pop();
        mergedHouseType.push(type.value);
      }
      return mergedHouseType;
    }
  };

  const fetchFilteredData = async (
    params,
    limit = INITIAL_LIMIT,
    offset = 0
  ) => {
    const payload = {
      saleLease: Object.values(saleLease).find(
        (saleLeaseObj) => saleLeaseObj.name === params.saleLease
      )?.value,
      bed: Object.values(bedCount).find((bedObj) => bedObj.name === params.bed)
        ?.value,
      minListPrice: Number(params.priceRange?.min ?? 0),
      maxListPrice: Number(params.priceRange?.max ?? 0),
      houseType: _getMergedHouseType(params),
      hasBasement: params.hasBasement,
      sepEntrance: params.sepEntrance,
      washroom: params.washroom,
      priceDecreased: params.priceDecreased,
    };
    const queryParams = {
      limit: limit,
      offset: offset,
      city: capitalizeFirstLetter(city),
      ...payload,
    };
    setLoading(true);
    // console.log(payload);
    const filteredSalesData = await getFilteredAlbertaData(queryParams);
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

    fetchFilteredData(initialState, 20, selected * 20 - 20);
  }, [selected]);

  // useEffect(() => {
  //   console.log("executed");
  //   async function getUpdatedData() {
  //     await fetchFilteredData(
  //       {
  //         ...initialState,
  //       },
  //       20,
  //       selected * 20 - 20
  //     );
  //   }
  //   getUpdatedData();
  // }, [selected]);

  const formattedCityName = capitalizeFirstLetter(decodeURIComponent(city));
  const homeText = !requiredType
    ? "Homes"
    : !requiredType?.toLowerCase().includes("house")
    ? "Homes"
    : "";
  const filters = parseSlug(slug);

  return (
    <>
      <div className="max-w-[98%] mx-auto mt-2 font-lausanne">
        <h1
          className={`font-extrabold text-2xl text-center sm:text-left ${
            isMobileView ? "pt-2" : "pt-2"
          }`}
        >
          500+{" "}
          {[
            capitalizeFirstLetter(requiredType),
            homeText,
            "for " + capitalizeFirstLetter(saleLeaseVal),
          ].join(" ") + " "}{" "}
          {city ? ` in ${capitalizeFirstLetter(city)}` : ""}
        </h1>
        <h2
          className="text-xs mb-5 mt-1 text-center sm:text-left"
          style={isMobileView ? { fontSize: "0.9rem" } : {}}
        >
          500+ {capitalizeFirstLetter(city)}{" "}
          {capitalizeFirstLetter(requiredType) || ""} homes for{" "}
          {saleLeaseVal?.toLowerCase() == "lease" ? "Rent or Lease" : "sale"}.
          Book a showing for affordable homes with pools, finished basements,
          walkouts. Prices from $1 to $5,000,000. Open houses available.
        </h2>

        {loading ? (
          <div className="w-[20px] mx-auto">
            <ImSpinner size="sm" />
          </div>
        ) : salesData.length > 0 ? (
          <>
            <FilterBar currentFilters={filters} />
            {selected === 1 && <HotListings salesData={hotSales} />}
            <PropertyList
              properties={salesData}
              currentPage={selected}
              province="alberta"
            />
          </>
        ) : (
          <div className="fs-4 text-center flex w-100 flex-col items-center">
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
    </>
  );
};

export default AlbertaFiltersWithSalesList;
