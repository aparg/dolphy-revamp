import {
  houseType,
  pillar9HouseTypes,
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
  saleLease,
} from "@/constant";
import { isLocalStorageAvailable } from "./checkLocalStorageAvailable";
const houseTypeLinkObj = {};

export const generateURL = ({
  cityVal,
  houseTypeVal,
  saleLeaseVal,
  listingIDVal = null,
  embeddedSite = false,
  useLocalStorage = true,
  soldData = false,
  priceRange = null,
  openHouse = false,
  bedCount = null,
  condoCorp = null,
  priceDropped = false,
  condoCorpNumber = null,
  province = "ontario",
}) => {
  if (province == "alberta")
    Object.values(pillar9HouseTypes).forEach((elem) => {
      if (elem.value) houseTypeLinkObj[elem.name.toLowerCase()] = elem.slug;
    });
  else
    Object.values(houseType).forEach((elem) => {
      if (elem.value) houseTypeLinkObj[elem.name.toLowerCase()] = elem.slug;
    });

  const filterState =
    useLocalStorage &&
    isLocalStorageAvailable() &&
    JSON.parse(localStorage.getItem("filterState"));

  // Normalize and validate saleLeaseVal
  const normalizeSaleLeaseType = (value) => {
    if (!value) return null;
    // Check direct key match
    if (Object.keys(saleLease).includes(value.toLowerCase())) {
      return value.toLowerCase();
    }
    // Check name match
    const key = Object.keys(saleLease).find(
      (k) => saleLease[k].name.toLowerCase() === value.toLowerCase()
    );
    return key || null;
  };

  const saleLeaseType =
    normalizeSaleLeaseType(saleLeaseVal) ||
    normalizeSaleLeaseType(filterState?.saleLease) ||
    "sale"; // Default to 'sale' if no valid value

  // Handle city value - only process if provided
  let city = null;
  if (cityVal) {
    city = cityVal.split("/")[0]?.toLowerCase().replaceAll(" ", "-");
    if (cityVal.split("/").length > 1) {
      city = [city, cityVal.split("/")[1]].join("/");
    }
  }

  // Ensure province is always "ontario" when not provided
  const provinceValue = province || "ontario";

  let houseTypeName =
    houseTypeVal?.toLowerCase() ||
    filterState?.type?.toLowerCase() ||
    filterState?.houseTypeName?.toLowerCase() ||
    null;

  if (houseTypeName === "all properties") {
    houseTypeName = null;
  }

  // Special cases handling
  if (condoCorp && condoCorpNumber) {
    return city
      ? `/resale/${provinceValue}/${city}/condocorp-${condoCorp}-${condoCorpNumber}`
      : `/resale/${provinceValue}/condocorp-${condoCorp}-${condoCorpNumber}`;
  }

  if (openHouse) {
    if (city) {
      if (listingIDVal) {
        return `/resale/${provinceValue}/${city}/open-house/listings/${listingIDVal}`;
      }
      return `/resale/${provinceValue}/${city}/open-houses`;
    }
    return `/resale/${provinceValue}/open-houses`;
  }

  if (priceDropped) {
    return city
      ? `/resale/${provinceValue}/${city}/homes-for-sale/price-dropped`
      : `/resale/${provinceValue}/homes-for-sale/price-dropped`;
  }

  // Listing ID handling
  if (listingIDVal) {
    return city
      ? `/resale/${provinceValue}/${city}/listings/${
          soldData ? "sold/" : ""
        }${encodeURIComponent(listingIDVal)}`
      : `/resale/${provinceValue}/listings/${
          soldData ? "sold/" : ""
        }${encodeURIComponent(listingIDVal)}`;
  }

  const priceRangeObj =
    priceRangesSaleProperties[priceRange] ||
    priceRangesLeaseProperties[priceRange];

  // Build the URL
  let finalLink = `/resale/${provinceValue}`;
  if (city) {
    finalLink += `/${city}`;
  }

  // Base case - no filters
  if (!houseTypeName && !bedCount) {
    return `${finalLink}/homes-for-${saleLeaseType}`;
  }

  // Build URL with filters
  if (houseTypeName) {
    finalLink += `/${houseTypeLinkObj[houseTypeName] || "homes"}`;
  } else {
    finalLink += "/homes";
  }

  if (priceRange) {
    finalLink += `-${priceRangeObj.slug}`;
  }

  finalLink += `-for-${saleLeaseType}`;

  if (bedCount) {
    finalLink += `/${bedCount}-plus-bed`;
  }

  return encodeURI(finalLink);
};
