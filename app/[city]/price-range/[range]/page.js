import { notFound } from "next/navigation";
import CityNav from "@/components/CityNav";
import FilteredListings from "@/components/FilteredListings";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import getPageMetadata from "@/helpers/getPageMetadata";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function getCityData(cityName, range) {
  try {
    const res = await fetch(
      `https://admin.dolphy.ca/api/pre-constructions-city/${cityName}/?price_range=${range}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (error) {
    console.error("Error fetching price range data:", error);
    return null;
  }
}

export default async function PriceRangePage({ params }) {
  const validRanges = [
    "0-500k",
    "0-800k",
    "500k-600k",
    "600k-700k",
    "700k-800k",
    "800k-1mil",
    "1mil-1.5mil",
  ];

  if (!validRanges.includes(params.range)) {
    notFound();
  }

  const cityData = await getCityData(params.city, params.range);
  if (!cityData) {
    notFound();
  }

  const metadata = getPageMetadata(
    "price_range",
    params.city,
    cityData.data.totalCount,
    params.range
  );

  return (
    <main className="min-h-screen bg-white font-montserrat">
      <CityNav />

      <div className="mx-auto px-4 md:px-10 py-5 max-w-8xl">
        <div className="mb-3">
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center">
            <h1 className="text-xl md:text-[2rem] text-gray-900 mb-2 font-black text-center md:text-start">
              {metadata.title}
            </h1>
            <div className="flex-row items-center gap-2 text-sm text-gray-600 text-center md:text-start border border-gray-400 p-2 rounded-[5px] hidden md:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-map"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L8.707 8l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                ></path>
              </svg>
              Map View
            </div>
          </div>
          <h2 className="text-sm text-gray-600 text-center md:text-start">
            {metadata.subtitle}
          </h2>
        </div>
        <div className="mt-4"></div>

        <FilteredListings
          cityName={params.city}
          initialData={cityData.data}
          filters={{ price_range: params.range }}
        />
      </div>
    </main>
  );
}

function formatPriceRange(range) {
  switch (range) {
    case "0-500k":
      return "Under $500K";
    case "500k-600k":
      return "$500K-$600K";
    case "600k-700k":
      return "$600K-$700K";
    case "700k-800k":
      return "$700K-$800K";
    case "800k-1mil":
      return "$800K-$1M";
    case "1mil-1.5mil":
      return "$1M-$1.5M";
    default:
      return "";
  }
}

// Validate the price range and city combination
export async function generateMetadata({ params }) {
  const validRanges = [
    "0-500k",
    "0-800k",
    "500k-600k",
    "600k-700k",
    "700k-800k",
    "800k-1mil",
    "1mil-1.5mil",
  ];

  if (!validRanges.includes(params.range)) {
    return {
      title: "Invalid Price Range",
    };
  }

  return {
    title: `Pre Construction Homes ${formatPriceRange(
      params.range
    )} in ${capitalizeFirstLetter(params.city)}`,
    description: `Find pre construction homes and condos between ${formatPriceRange(
      params.range
    )} in ${capitalizeFirstLetter(
      params.city
    )}. Get early access to floor plans and pricing.`,
  };
}

export async function generateStaticParams() {
  // You might want to generate these based on your available cities
  const cities = ["mississauga", "toronto", "brampton"]; // Add all your cities
  const priceRanges = [
    "0-500k",
    "500k-600k",
    "600k-700k",
    "700k-800k",
    "800k-1mil",
    "1mil-1.5mil",
  ];

  const params = [];

  // Generate all valid city/price-range combinations
  for (const city of cities) {
    for (const range of priceRanges) {
      params.push({
        city,
        range,
      });
    }
  }

  return params;
}
