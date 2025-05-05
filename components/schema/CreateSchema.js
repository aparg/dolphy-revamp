export default function CreateSchema(listing) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: listing.project_name,
    image:
      (listing.images &&
        listing.images[0] &&
        listing.images[0].split(",")[0]) ||
      ((!listing.images || !listing.images[0]) && "/noimage.webp"),
    description:
      listing.project_name +
      " is a brand new Pre-construction located at  " +
      listing.project_address +
      " , " +
      listing.postalcode +
      " with great features " +
      " and in high demand all over canada.",
    brand: listing.developer.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "20",
    },
    offers: {
      "@type": "AggregateOffer",
      url: "https://dolphy.ca/" + listing.city.name + "/" + listing.slug,
      priceCurrency: "CAD",
      lowPrice: listing.price_starting_from || "0",
      highPrice: listing.price_to || "0",
    },
  };
}
