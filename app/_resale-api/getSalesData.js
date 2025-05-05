"use server";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import { albertaListings, commercial, residential } from "./routes/fetchRoutes";
import { cityRegions, postalCodeCities } from "@/constant/postalCodeCities";
// import { houseType, saleLease } from "@/constant";

export const getPropertiesCount = async ({
  propertyType,
  city,
  saleLease,
  condoCorp,
  condoCorpNumber,
  priceDropped,
}) => {
  const queryArray = [];
  const citiesFromCityRegions = cityRegions.map((val) =>
    val.name.toLowerCase()
  );
  queryArray.push(
    "ContractStatus eq 'Available' and StandardStatus eq 'Active'"
  );
  if (propertyType) {
    queryArray.push(`PropertySubType eq '${propertyType}'`);
  }
  if (priceDropped) {
    queryArray.push(`MlsStatus eq 'Price Change'`);
  }
  if (city) {
    if (city && citiesFromCityRegions.includes(city.toLowerCase())) {
      const regions = cityRegions.find(
        (obj) => obj.name.toLowerCase() == city.toLowerCase()
      )?.regions;
      let regionsQuery = "(";
      regions.forEach((region, idx) => {
        if (idx < regions.length - 1) {
          regionsQuery += `contains(City,'${region}') or `;
        } else {
          regionsQuery += `contains(City, '${region}'))`;
        }
      });
      queryArray.push(regionsQuery);
    } else queryArray.push(`contains(City,'${capitalizeFirstLetter(city)}')`);
  }
  if (saleLease) {
    queryArray.push(`TransactionType eq '${saleLease}'`);
  }
  if (condoCorp) {
    queryArray.push(`AssociationName eq '${condoCorp.toUpperCase()}'`);
    if (condoCorpNumber) {
      queryArray.push(`CondoCorpNumber eq ${condoCorpNumber}`);
    }
  }

  const url = residential.count.replace(
    "$query",
    "$filter=" + queryArray.join(" and ")
  );
  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.BEARER_TOKEN_FOR_API,
    },
    // cache: "no-store",
  };
  const response = await fetch(url, options);
  const jsonResponse = await response.json();
  return jsonResponse;
};
export const getSalesData = async (
  offset,
  limit,
  city,
  listingType,
  soldData = false
) => {
  try {
    let filterQuery = "";
    const citiesFromCityRegions = cityRegions.map((val) =>
      val.name.toLowerCase()
    );
    if (city == "Etobicoke") {
      filterQuery = `contains(CityRegion,'Etobicoke') or `;
    }
    if (city && citiesFromCityRegions.includes(city.toLowerCase())) {
      const regions = cityRegions.find(
        (obj) => obj.name.toLowerCase() == city.toLowerCase()
      )?.regions;
      filterQuery += "(";
      regions.forEach((region, idx) => {
        if (idx < regions.length - 1) {
          filterQuery += `contains(City,'${region}') or `;
        } else {
          filterQuery += `contains(City, '${region}'))`;
        }
      });
    } else
      filterQuery += `${
        city && `contains(City,'${city || ""}') and `
      }TransactionType eq 'For Sale'`;
    // const lowriseOnly = `TypeOwnSrch='.S.',TypeOwnSrch='.D.',TypeOwnSrch='.A.',TypeOwnSrch='.J.',TypeOwnSrch='.K.'`;
    if (soldData) filterQuery += " and MlsStatus eq 'Sold'";
    else {
      filterQuery += "  and MlsStatus ne 'Expired' and MlsStatus ne 'Sold'";
    }
    if (listingType) {
      filterQuery += ` and PropertySubType eq '${listingType}'`;
    }
    filterQuery +=
      " and InternetEntireListingDisplayYN eq 'true' and MlsStatus ne 'Expired'";
    const queriesArray = [
      `$filter=${filterQuery}`,
      `$skip=${offset}`,
      `$top=${limit}`,
    ];

    if (soldData) {
      queriesArray.push(`$orderby=SoldEntryTimestamp desc`);
    } else {
      queriesArray.push(`$orderby=OriginalEntryTimestamp desc`);
    }

    const url = residential.properties.replace(
      "$query",
      `?${queriesArray.join("&")}`
    );
    const options = {
      method: "GET",
      headers: {
        Authorization: !soldData
          ? process.env.BEARER_TOKEN_FOR_API
          : process.env.BEARER_TOKEN_FOR_VOW,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();
    return data.value;
  } catch (error) {
    console.error(error);
    throw new Error(`An error happened in getSalesData: ${error}`);
  }
};

export const getFilteredRetsData = async (queryParams, soldData = false) => {
  // const lowriseOnly = `TypeOwnSrch='.S.',TypeOwnSrch='.D.',TypeOwnSrch='.A.',TypeOwnSrch='.J.',TypeOwnSrch='.K.'`;
  try {
    let selectQueryArray = [];
    const citiesFromCityRegions = cityRegions.map((val) =>
      val.name.toLowerCase()
    );
    if (
      queryParams.city &&
      citiesFromCityRegions.includes(queryParams.city.toLowerCase())
    ) {
      const regions = cityRegions.find(
        (obj) => obj.name.toLowerCase() == queryParams.city.toLowerCase()
      )?.regions;
      let cityQuery = "(";
      regions.forEach((region, idx) => {
        if (idx < regions.length - 1) {
          cityQuery += `contains(City,'${region}') or `;
        } else {
          cityQuery += `contains(City, '${region}')`;
        }
      });
      cityQuery += ")";
      selectQueryArray.push(cityQuery);
    } else
      queryParams.city &&
        selectQueryArray.push(`contains(City,'${queryParams.city}')`);

    queryParams.saleLease &&
      selectQueryArray.push(`TransactionType eq '${queryParams.saleLease}'`);
    queryParams.bed &&
      selectQueryArray.push(
        `BedroomsTotal eq ${Number(queryParams.bed).toFixed(3)}`
      );

    if (queryParams.condoCorp) {
      selectQueryArray.push(
        `AssociationName eq '${queryParams.condoCorp.toUpperCase()}'`
      );
      if (queryParams.condoCorpNumber) {
        selectQueryArray.push(
          `CondoCorpNumber eq ${queryParams.condoCorpNumber}`
        );
      }
    }

    let selectQuery = selectQueryArray.join(" and ");
    const skipQuery = `${queryParams.offset}`;
    const limitQuery = `${queryParams.limit}`;
    let rangeQuery =
      queryParams.minListPrice || queryParams.washroom
        ? `and ListPrice ge ${
            queryParams.minListPrice
          } and BathroomsTotalInteger ge ${
            queryParams.washroom?.toFixed(3) || Number(0).toFixed(3)
          }`
        : "";

    // if (queryParams.houseType) {
    //   const houseTypeQuery = ` and PropertySubType eq {'value'}`;
    //   queryParams.houseType.forEach((param, index) => {
    //     if (param) {
    //       selectQuery += houseTypeQuery.replace("value", param);
    //       if (index !== queryParams.houseType.length - 1) {
    //         selectQuery += "";
    //       }
    //     }
    //   });
    // }
    if (queryParams.houseType)
      selectQuery += ` and PropertySubType eq '${queryParams.houseType}'`;

    // console.log(queryParams.Basement);
    // if (queryParams.Basement?.includes("Walkout")) {
    //   selectQuery += `& Basement has Walkout`;
    // }

    // if (queryParams.Basement?.includes("Separate Entrance")) {
    //   selectQuery += `& Basement has Separate Entrance`;
    // }
    // if (queryParams.Basement?.includes("Finished Basement")) {
    //   selectQuery += `& Basement has Finished Basement`;
    // }

    if (queryParams.maxListPrice > queryParams.minListPrice) {
      rangeQuery += `and ListPrice le ${queryParams.maxListPrice}`;
    }

    if (queryParams.priceDropped) {
      selectQuery += ` and MlsStatus eq 'Price Change'`;
    }

    let url = "";

    if (queryParams.propertyType == "commercial") {
      url = commercial.properties.replace(
        "$query",
        `?$filter=ContractStatus eq 'Available' and MlsStatus ne 'Expired' and ${selectQuery}${rangeQuery}&$skip=${skipQuery}&$top=${limitQuery}&$orderby=ModificationTimestamp desc,ListingKey desc`
      );
    } else {
      url = residential.properties.replace(
        "$query",
        `?$filter=ContractStatus eq 'Available' and InternetEntireListingDisplayYN eq true and StandardStatus eq 'Active' and MlsStatus ne 'Expired' ${selectQuery} ${rangeQuery}&$skip=${skipQuery}&$top=${limitQuery}&$orderby=ModificationTimestamp desc,ListingKey desc`
      );
    }

    const options = {
      method: "GET",
      headers: {
        Authorization: !soldData
          ? process.env.BEARER_TOKEN_FOR_API
          : process.env.BEARER_TOKEN_FOR_VOW,
      },
      // cache: "no-store",
    };
    const res = await fetch(url, options);

    const data = await res.json();
    if (!res.ok) {
      // Check if the response is OK (status in the range 200-299)
      throw new Error(
        `HTTP error! status: ${res.status}. Error:${data.message}`
      );
    }

    return data.value;
  } catch (error) {
    console.log(`An error happened in getFilteredRetsData: ${error}`);
  }
};

export const getImageUrls = async ({
  MLS,
  thumbnailOnly = false,
  soldData = false,
}) => {
  if (MLS) {
    const options = {
      method: "GET",
      headers: {
        Authorization: !soldData
          ? process.env.BEARER_TOKEN_FOR_API
          : process.env.BEARER_TOKEN_FOR_VOW,
      },
      // cache: "no-store",
    };

    let imageLink = residential.photos;

    if (thumbnailOnly)
      imageLink +=
        " and ImageSizeDescription eq 'Medium' and PreferredPhotoYN eq true";
    else imageLink += " and ImageSizeDescription eq 'Largest'";
    // imageLink += "& $top=1";
    let response = await fetch(imageLink.replace("MLS", MLS), options);
    let jsonResponse = await response.json();
    if (jsonResponse.value.length == 0 && thumbnailOnly) {
      response = await fetch(
        residential.photos.replace("MLS", MLS) +
          " and ImageSizeDescription eq 'Medium'",
        options
      );
      jsonResponse = await response.json();
    }
    const urls = jsonResponse.value
      .sort(
        (a, b) => (b.PreferredPhotoYN === true) - (a.PreferredPhotoYN === true)
      )
      .map((data) => data.MediaURL);
    return urls;
  }
};

export const fetchDataFromMLS = async (listingID, soldData = false) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: process.env.BEARER_TOKEN_FOR_API,
      },
    };
    const queriesArray = [
      `$filter=ListingKey eq '${listingID}' and InternetEntireListingDisplayYN eq true and MlsStatus ne 'Expired'`,
    ];

    const urlToFetchMLSDetail = residential.properties.replace(
      "$query",
      `?${queriesArray.join("&")}`
    );
    const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
    const data = await resMLSDetail.json();
    return data.value[0];
  } catch (err) {
    console.log(err);
  }
};

export const fetchRoomInfo = async (listingID, soldData = false) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: !soldData
          ? process.env.BEARER_TOKEN_FOR_API
          : process.env.BEARER_TOKEN_FOR_VOW,
      },
    };
    const queriesArray = [
      `$filter=ListingKey eq '${listingID}' and (contains(RoomType,'Bedroom') or contains(RoomType,'Kitchen') or contains(RoomType,'Dining') or contains(RoomType,'Living') or contains(RoomType,'Games'))`,
    ];
    const urlToFetchMLSDetail = residential.propertyRooms.replace(
      "$query",
      `?${queriesArray.join("&")}`
    );
    const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
    const data = await resMLSDetail.json();
    // console.log(data.value);
    return data.value;
  } catch (err) {
    console.log(err);
  }
};

export const fetchStatsFromMLS = async ({
  listingType,
  municipality,
  saleLease,
}) => {
  const options = {
    method: "GET",
  };
  const queriesArray = [
    `$select=Municipality=${municipality},TypeOwnSrch=${listingType},SaleLease=${saleLease
      .split(" ")[1]
      .toLowerCase()}`,
    `$metrics=avg,median,sd`,
  ];
  const urlToFetchMLSDetail = residential.statistics.replace(
    "$query",
    `?${queriesArray.join("&")}`
  );
  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  return data.results;
};

const cache = {}; // In-memory cache

export const fetchOpenHouseFromMls = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.BEARER_TOKEN_FOR_VOW,
    },
  };

  const response = await fetch(residential.openHouse, options);
  const responseJson = await response.json();
  return responseJson.value[0];
};
export const fetchOpenHouse = async ({ city = null }) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.BEARER_TOKEN_FOR_VOW,
    },
  };

  // Check if we have cached data and it's still valid

  const response = await fetch(residential.openHouse, options);
  const responseJson = await response.json();
  const value = responseJson.value;
  const allValues = []; // To store all fetched values
  // Number of elements to fetch at a time

  const batchSize = 10;
  const currentTime = Date.now();
  const cacheKey = city?.toLowerCase() || "ontario"; // Use city as cache key
  if (cache[cacheKey] && currentTime - cache[cacheKey].timestamp < 3600000) {
    console.log("Returning cached data for city:", city);
    return cache[cacheKey].data; // Return cached data
  }
  for (let i = 0; i < value.length; i += batchSize) {
    const batchValues = value.slice(i, i + batchSize);
    const modifiedString = batchValues.map(
      (obj) => `ListingKey eq '${obj.ListingKey}'`
    );
    const orString = modifiedString.join(" or ");
    let propertyFetchString;
    if (city) {
      propertyFetchString = residential.properties.replace(
        "$query",
        `?$filter=contains(City,'${capitalizeFirstLetter(
          city
        )}') and (${orString})`
      );
    } else {
      propertyFetchString = residential.properties.replace(
        "$query",
        `?$filter=(${orString})`
      );
    }
    const res = await fetch(propertyFetchString, options);
    const resJson = await res.json();

    const compoundObject = resJson.value.map((obj) => {
      return {
        ...obj,
        ...batchValues.find((ohObj) => ohObj.ListingKey == obj.ListingKey),
      };
    });
    allValues.push(...compoundObject); // Add fetched values to the allValues array
    // Break the loop if we have collected enough values
    if (allValues.length >= 20) {
      break;
    }

    cache[cacheKey] = {
      data: allValues,
      timestamp: currentTime,
    };
  }

  // Store the fetched data in cache with a timestamp

  return allValues; // Return the fetched data
};

export const searchProperties = async (inputValue) => {
  const response = await fetch(
    residential.search.replaceAll("$value", capitalizeFirstLetter(inputValue)),
    {
      method: "GET",
      headers: {
        Authorization: process.env.BEARER_TOKEN_FOR_API,
      },
    }
  );
  const searchedProperties = await response.json();
  return searchedProperties.value;
};

export async function getOpenHouseData(listingKey) {
  const url = residential.openHouse + `&$filter=ListingKey eq '${listingKey}'`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.BEARER_TOKEN_FOR_API,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch open house data");
    }

    const data = await response.json();
    return data.value || [];
  } catch (error) {
    console.error("Error fetching open house data:", error);
    return [];
  }
}
