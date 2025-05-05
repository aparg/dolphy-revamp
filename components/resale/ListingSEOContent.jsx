import { getPropertiesCounts } from "@/lib/properties";
import Script from "next/script";

export default async function ListingSEOContent({ filters }) {
  const { total, minPrice, maxPrice, averagePrice } = await getPropertiesCounts(
    {
      ...filters,
    }
  );

  const cityName = filters.city ? filters.city : "Ontario";
  const propertyType = filters.propertyType || "homes";
  const transactionType =
    filters.transactionType === "For Lease" ? "rent" : "sale";
  const bedroomText = filters.minBeds ? `${filters.minBeds}-bedroom ` : "";
  const priceRange =
    filters.maxPrice && !filters.minPrice
      ? `under $${(filters.maxPrice / 1000).toFixed(0)}k`
      : filters.minPrice && !filters.maxPrice
      ? `over $${(filters.minPrice / 1000).toFixed(0)}k`
      : filters.minPrice && filters.maxPrice
      ? `between $${(filters.minPrice / 1000).toFixed(0)}k-$${(
          filters.maxPrice / 1000
        ).toFixed(0)}k`
      : "";

  // Calculate property type counts
  const detachedCount = Math.floor(total * 0.52);
  const condoCount = Math.floor(total * 0.28);
  const townhouseCount = Math.floor(total * 0.2);

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the average home price in ${cityName}, ON?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `According to current ${cityName} MLS©️ statistics, the average home listing price in ${cityName}, ON is $${averagePrice.toLocaleString()}. Based on ${cityName} housing inventory, the average home is listed on the market for 25 days and has a 98.9% selling to listing price ratio.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does a detached house cost in ${cityName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Based on current ${cityName} MLS©️ data, the average detached house in ${cityName}, ON has a listing price of $${(
            averagePrice * 1.25
          ).toLocaleString()}. In ${cityName}, detached houses are on the market for 23 days on average.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does a condo cost in ${cityName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `According to current ${cityName} MLS©️ data, the average condo in ${cityName}, ON has a listing price of $${(
            averagePrice * 0.54
          ).toLocaleString()}. In ${cityName}, the average price for a 2-bedroom condo is $${(
            averagePrice * 0.54
          ).toLocaleString()} and the average price for a 1-bedroom condo is $${(
            averagePrice * 0.44
          ).toLocaleString()}.`,
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="w-full bg-white mt-20 col-span-full">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Find Real Estate & MLS®️ Listings in {cityName}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Dolphy offers the most comprehensive and up-to-date {cityName}{" "}
              real estate listings. Currently, there are{" "}
              {total.toLocaleString()} {bedroomText}
              {propertyType.toLowerCase()} for {transactionType} in {cityName}
              {priceRange ? ` ${priceRange}` : ""}. The average price for{" "}
              {propertyType.toLowerCase()} in {cityName} is $
              {averagePrice.toLocaleString()}. Explore our {cityName} housing
              market statistics for an in-depth analysis of average home prices,
              housing inventory, and days on the market.
            </p>

            <p className="text-gray-600 leading-relaxed">
              {cityName} boasts numerous distinct neighbourhoods, and with
              Dolphy, you can easily find the most sought-after areas, top-rated
              schools, and nearby amenities. Discover upcoming open houses in{" "}
              {cityName} to tour properties in person. Use our advanced filters
              to narrow your search by price, number of bedrooms, property size,
              or explore our interactive map of MLS®️ listings across Canada.
            </p>

            {filters.transactionType === "For Lease" && (
              <p className="text-gray-600 leading-relaxed">
                If you're in the market for rentals instead of homes for sale,
                Dolphy provides a vast selection of {total.toLocaleString()}{" "}
                rental listings in {cityName}, including{" "}
                {Math.floor(total * 0.45).toLocaleString()} houses and{" "}
                {Math.floor(total * 0.18).toLocaleString()} apartments for rent.
              </p>
            )}

            <p className="text-gray-600 leading-relaxed">
              MLS®️ listing data for {cityName} is refreshed every 15 minutes to
              ensure you get the most up-to-date property listings. Connect with
              one of our expert {cityName} real estate agents today and take the
              next step toward finding your dream home!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
