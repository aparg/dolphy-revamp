import { PILLAR9_BASEURL } from "@/app/_resale-api";
import { getFilteredAlbertaData } from "@/app/_resale-api/getPillar9Data";
import { generateImageURLs } from "@/helpers/generateImageURLs";

export async function getAlbertaProperties({
  city,
  propertyType,
  propertySubTypes,
  minBeds,
  minBaths,
  minPrice,
  condoCorp,
  condoCorpNumber,
  maxPrice,
  transactionType,
  mlsStatus,
  isOpenHouse,
  quadrant,
  ...searchParams
}) {
  const pageSize = 60;
  const page = Number(searchParams.page) || 1;
  const skip = (page - 1) * pageSize;

  // If this is an open house request, use the open house endpoint
  // if (isOpenHouse) {
  //   const openHouses = await fetchOpenHouse({ city });
  //   return {
  //     properties: openHouses,
  //     total: openHouses.length,
  //     currentPage: page,
  //     totalPages: Math.ceil(openHouses.length / pageSize),
  //   };
  // }
  try {
    const data = await getFilteredAlbertaData({
      city,
      offset: skip,
      limit: pageSize,
      propertyType,
      propertySubTypes,
      minBeds,
      minBaths,
      minPrice,
      maxPrice,
      saleLease: transactionType,
      mlsStatus,
      quadrant,
      minPrice: 0,
      maxPrice,
    });
    const propertiesWithImages = data.map((data) => {
      return {
        data,
        imageUrl: generateImageURLs(data.ListingId),
      };
    });
    // Fetch images for all properties in parallel
    // const propertiesWithImages = await Promise.all(
    //   data.value.map(async (property) => {
    //     const imageUrl = await getImageUrl(property.ListingKey);
    //     return {
    //       ...property,
    //       imageUrl,
    //     };
    //   })
    // );

    return {
      properties: propertiesWithImages,
      total: data["@odata.count"],
      currentPage: page,
      totalPages: Math.ceil(data["@odata.count"] / pageSize),
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}
