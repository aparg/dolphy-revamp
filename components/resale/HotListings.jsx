"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
//CONSTANT
import useDeviceView from "@/helpers/useDeviceView";
import ResaleCard from "./ResaleCard";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

const plural = {
  Retail: " Businesses",
  Industrial: " Businesses",
  Office: "",
  Land: "s",
  Business: "es",
};
const HotListings = ({ salesData, city = null }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  // const formattedCity = city ? city.toLowerCase() : undefined;
  // const [salesData, setSalesData] = useState([]);
  // const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const scrollAmt = () => {
    if (isMobileView) {
      return 1;
    }
    return 3;
  };
  // useEffect(() => {
  //   fetchFilteredData();
  // }, []);

  return salesData?.length > 0 ? (
    <>
      {salesData?.map((curElem, index) => {
        // if (curElem.PhotoCount > 0) {
        return (
          <ResaleCard
            // city={formattedCity}
            key={index}
            curElem={curElem}
            isHotListing={true}
          />
        );
        // }
        // return null
      })}
    </>
  ) : (
    <></>
  );
};

export default HotListings;
