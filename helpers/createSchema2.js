import { slugGenerator } from "./slugGenerator";

export function createListingSchema(property) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${property.ListingKey}`,
    name: `${property.StreetNumber} ${property.StreetName} ${property.StreetSuffix}`,
    description: property.PublicRemarks,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.4,
      reviewCount: 89,
    },
    offers: {
      "@type": "Offer",
      price: property.ListPrice,
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
    },
    image: property.images?.[0] ? property.images : "/noimage.webp",
    url: `${slugGenerator(property)}`,
  };
}
