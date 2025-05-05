import { residential } from "@/app/_resale-api/routes/fetchRoutes";
import { generateURL } from "./generateResaleURL";
import { slugGenerator } from "./slugGenerator";

export default function CreateSchema(listing) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name:
      listing.StreetNumber +
      " " +
      listing?.StreetName +
      " " +
      listing?.City +
      " " +
      listing?.PostalCode,
    image:
      (listing?.PhotoLink && residential.photos + listing?.PhotoLink[0]) ||
      "/noimage.webp",
    description:
      listing?.StreetName +
      " is a brand new Home located at  " +
      listing?.CountyOrParish +
      " , " +
      listing?.PostalCode +
      " with great features " +
      " and in high demand all over canada.",
    brand: listing?.ListOfficeName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "20",
    },
    offers: {
      "@type": "AggregateOffer",
      url:
        "https://dolphy.ca/" +
        generateURL({
          cityVal: listing?.CountyOrParish,
          listingIDVal: slugGenerator(listing),
        }),
      priceCurrency: "CAD",
      price: listing?.ListPrice,
    },
  };
}
