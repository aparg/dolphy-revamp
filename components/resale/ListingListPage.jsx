import FilterBar from "@/components/resale/FilterBar";
import PropertyList from "@/components/resale/PropertyList";
import PropertyLinksGrid from "@/components/resale/PropertyLinksGrid";
import citiesWithProvinces from "@/constant/cities";
import Link from "next/link";
import { getProperties } from "@/lib/properties";
import FilterStateManager from "./FilterStateManager";
import { parseSlug } from "@/helpers/parseResaleFilter";
import ListingSEOContent from "./ListingSEOContent";
import { MapProvider } from "@/components/resale-map/MapContext";
import MapDrawer from "@/components/resale-map/MapDrawer";
import MapToggleButtons from "./MapToggleButtons";

const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

function generateTitle(filters, actualTotal) {
  const parts = [];

  // Handle condo corporation case
  if (filters.condoCorpNumber) {
    return `Condo Corporation ${filters.condoCorp} - ${filters.condoCorpNumber}`;
  }

  if (filters.isOpenHouse) {
    parts.push("Open Houses");
    if (filters.city) {
      parts.push("in");
      parts.push(filters.city);
    } else {
      parts.push("in Ontario");
    }
    return parts.join(" ");
  }

  parts.push(`${actualTotal?.toLocaleString()}`);

  if (filters.mlsStatus === "Price Change") {
    parts.push("Price Dropped");
  }

  if (filters.minBeds) {
    parts.push(`${filters.minBeds} bedroom`);
  }

  if (filters.propertyType) {
    if (filters.propertyType === "Semi-Detached") {
      parts.push("Semi-Detached");
    } else if (filters.propertyType === "Detached") {
      parts.push("Detached");
    } else if (filters.propertyType === "Condo Townhome") {
      parts.push("Condo Townhomes");
    } else if (filters.propertyType === "Townhomes") {
      parts.push("Townhomes");
    } else {
      parts.push(filters.propertyType);
    }
  } else {
    parts.push("Homes");
  }

  parts.push(
    filters.transactionType === "For Lease" ? "for Lease or Rent" : "for Sale"
  );

  parts.push("in");
  parts.push(filters.city ? `${filters.city}, ON` : "Ontario");

  if (filters.maxPrice && !filters.minPrice) {
    parts.push(`under $${(filters.maxPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && !filters.maxPrice) {
    parts.push(`over $${(filters.minPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && filters.maxPrice) {
    parts.push(
      `between $${(filters.minPrice / 1000).toFixed(0)}k-$${(
        filters.maxPrice / 1000
      ).toFixed(0)}k`
    );
  }

  return parts.join(" ");
}

function generateSubtitle(filters, total) {
  const parts = [];

  // Handle condo corporation case
  if (filters.condoCorpNumber) {
    return `${filters.condoCorp} in ${
      filters.city || "Ontario"
    } - Get information including bylaws, management, and how to order a status certificate for ${
      filters.condoCorpNumber
    }`;
  }

  if (filters.isOpenHouse) {
    return `View Open Houses in ${
      filters.city || "Ontario"
    } | Find Open Houses Near You | Dolphy`;
  }

  parts.push(`${total.toLocaleString()}+ ${filters.city || "Ontario"}`);

  if (filters.minBeds) {
    parts.push(`${filters.minBeds} Bedroom`);
  }

  if (filters.propertyType) {
    parts.push(filters.propertyType.toLowerCase());
  } else {
    parts.push("homes");
  }

  parts.push(
    filters.transactionType === "For Lease" ? "for Rent or Lease" : "for sale"
  );

  if (filters.transactionType === "For Lease") {
    return `786+ Mississauga ${
      filters.propertyType ? filters.propertyType : "Homes"
    } for Rent or Lease | Book a showing for affordable ${
      filters.propertyType ? filters.propertyType : "Homes"
    } in ${
      filters.city ? filters.city : "Ontario"
    } with pools, walkouts. Prices from $1 to $5M. Open houses available. 100s of ${
      filters.propertyType ? filters.propertyType : "Homes"
    } for rent in ${
      filters.city ? filters.city : "Ontario"
    } with amenities such as pools, party rooms, gym & concierge. If you are a tenant looking for a condo to lease on ${
      filters.city ? filters.city : "Ontario"
    } check out the latest listings. `;
  }

  if (filters.maxPrice && !filters.minPrice) {
    parts.push(`under $${(filters.maxPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && !filters.maxPrice) {
    parts.push(`over $${(filters.minPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && filters.maxPrice) {
    parts.push(
      `between $${(filters.minPrice / 1000).toFixed(0)}k-$${(
        filters.maxPrice / 1000
      ).toFixed(0)}k`
    );
  } else {
    parts.push("");
  }

  parts.push("| Book a showing for affordable");

  if (filters.propertyType) {
    parts.push(filters.propertyType.toLowerCase());
  } else {
    parts.push("homes");
  }

  parts.push(
    `in ${
      filters.city || "Ontario"
    } with pools, walkouts. Prices from $1 to $5M. Open houses available.`
  );

  return parts.join(" ");
}

export default async function ListingListPage({ slug, searchParams }) {
  const filters = parseSlug(slug);

  if (!filters) {
    notFound();
  }

  const {
    properties: allProperties,
    total,
    currentPage,
  } = await getProperties({
    ...filters,
    ...searchParams,
  });

  // If this is a price drop page, filter out properties without a price drop
  const filteredProperties =
    filters.mlsStatus === "Price Change"
      ? allProperties.filter(
          (property) =>
            property.PreviousListPrice &&
            property.ListPrice < property.PreviousListPrice
        )
      : allProperties;

  const actualTotal =
    filters.mlsStatus === "Price Change" ? filteredProperties.length : total;

  const title = generateTitle(filters, actualTotal);
  const subtitle = generateSubtitle(filters, total);

  // Add coordinates for testing - remove this in production
  const propertiesWithCoordinates = filteredProperties.map((property) => ({
    ...property,
    coordinates: {
      lat: 43.6532 + (Math.random() - 0.5) * 0.1, // Random coordinates around Toronto
      lng: -79.3832 + (Math.random() - 0.5) * 0.1,
    },
  }));

  return (
    <MapProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white">
          <div className="max-w-9xl mx-auto px-2 md:px-3">
            <div className="block md:flex md:justify-between md:items-start md:gap-0">
              <div className="px-1 mt-0 flex-1">
                <h1 className="font-bold text-xl md:text-3xl text-left sm:text-left pt-2 sm:pt-0 text-gray-800">
                  {title}
                </h1>
                <h2 className="text-xs md:text-sm">{subtitle}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-0 bg-white z-20">
          <div className="max-w-9xl mx-auto px-2 md:px-3">
            <div className="py-2 md:py-1 flex justify-between items-center">
              <FilterBar currentFilters={filters} />
              <div className="bg-[#f2f4f5] p-1 rounded-full hidden md:flex">
                <MapToggleButtons />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <FilterStateManager filters={filters} />
          <div className="max-w-9xl mx-auto">
            <MapDrawer
              listings={propertiesWithCoordinates}
              city={filters.city || "Ontario"}
            >
              <div className="px-2 md:px-3">
                <PropertyList
                  properties={filteredProperties}
                  total={actualTotal}
                  priceReduced={filters.mlsStatus === "Price Change"}
                  currentPage={currentPage}
                  openHouse={filters.isOpenHouse}
                  totalPages={Math.ceil(actualTotal / 30)}
                />
                {!filters.isOpenHouse && (
                  <ListingSEOContent filters={filters} />
                )}
                {filters.mlsStatus === "Price Change" && (
                  <div className="w-full bg-white mt-20 col-span-full">
                    <div className="text-left mb-8">
                      <h2 className="text-xl sm:text-3xl font-bold w-[100%] sm:w-auto">
                        Explore Price Dropped Homes in Ontario
                      </h2>
                      <p className="text-black">
                        Explore homes that have seen a price reduction in the
                        last 24 hours
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-0 gap-x-2 gap-y-2 md:gap-x-2">
                      {citiesWithProvinces.map((city) => (
                        <div key={city.city}>
                          <h4 className="text-xs font-normal text-gray-800 hover:underline underline-offset-2">
                            <Link
                              href={`/resale/ontario/${slugify(
                                city.city
                              )}/price-dropped/`}
                            >
                              Price Dropped Homes in {city.city}
                            </Link>
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="w-full bg-white mt-20 col-span-full">
                  <PropertyLinksGrid currentCity={filters.city || "Ontario"} />
                </div>
              </div>
            </MapDrawer>
          </div>
        </div>
      </div>
    </MapProvider>
  );
}

ListingListPage.generateMetadata = async function ({ params, searchParams }) {
  const slug = params.slug1;
  const filters = parseSlug(slug);
  const { properties, total } = await getProperties({
    ...filters,
    ...searchParams,
  });
  if (filters.condoCorpNumber) {
    const location = filters.city || "Ontario";
    const title = `Condo corporation ${filters.condoCorp} - ${filters.condoCorpNumber} | Dolphy`;
    const description = `Looking for condos for sale from condo corporation ${filters.condoCorp}-${filters.condoCorpNumber} located in ${location}. Get condo corporation information, bylaws, and status certificates.`;
    return {
      title,
      description,
      alternates: {
        canonical: `https://dolphy.ca/resale/ontario/${params.slug1.join("/")}`,
      },
      openGraph: {
        title,
        description,
        url: `https://dolphy.ca/resale/ontario/${params.slug1.join("/")}`,
        siteName: "Dolphy",
        type: "website",
        images: [
          {
            url: "https://dolphy.ca/city-images/milton.jpeg",
            width: 1200,
            height: 630,
            alt: `${filters.condoCorpNumber} Condos in ${location}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://dolphy.ca/city-images/milton.jpeg"],
      },
      robots: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      other: {
        "og:locale": "en_CA",
        "og:type": "website",
      },
    };
  }

  const priceReducedProperties =
    filters.mlsStatus === "Price Change"
      ? properties.filter(
          (p) => p.PreviousListPrice && p.ListPrice < p.PreviousListPrice
        )
      : properties;

  const actualTotal =
    filters.mlsStatus === "Price Change"
      ? priceReducedProperties.length
      : total;

  const location = filters.city ? `${filters.city}, ON` : "Ontario";
  const canonicalPath = `/resale/ontario/${params.slug1.join("/")}`;
  let formattedPrice = "";
  if (filters.maxPrice) {
    formattedPrice = `under $${(filters.maxPrice / 1000).toFixed(0)}k`;
  } else if (filters.minPrice) {
    formattedPrice = `over $${(filters.minPrice / 1000).toFixed(0)}k`;
  }

  if (filters.isOpenHouse) {
    return {
      title: `Open Houses for sale in ${location} | Dolphy`,
      description: `View Open Houses in ${location}. Find upcoming open houses and schedule viewings. Browse through our collection of open houses in ${location}.`,
      alternates: {
        canonical: `https://dolphy.ca/resale/ontario/${params.slug1}`,
      },
      openGraph: {
        title: `Open Houses for sale in ${location} | Dolphy`,
        description: `View Open Houses in ${location}. Find upcoming open houses and schedule viewings. Browse through our collection of open houses in ${location}.`,
        url: `https://dolphy.ca/resale/ontario/${params.slug1}`,
        siteName: "Dolphy",
        type: "website",
        images: [
          {
            url: "https://dolphy.ca/city-images/milton.jpeg",
            width: 1200,
            height: 630,
            alt: `Open Houses in ${location}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `Open Houses for sale in ${location} | Dolphy`,
        description: `View Open Houses in ${location}. Find upcoming open houses and schedule viewings. Browse through our collection of open houses in ${location}.`,
        images: ["https://dolphy.ca/city-images/milton.jpeg"],
      },
      robots: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      other: {
        "og:locale": "en_CA",
        "og:type": "website",
      },
    };
  }

  const title =
    filters.mlsStatus === "Price Change"
      ? `Price Dropped Homes for Sale in ${location} | Dolphy`
      : `${filters.minBeds ? `${filters.minBeds} Bedroom` : ""} ${
          filters.propertyType || "Homes"
        } ${
          filters.transactionType === "For Lease"
            ? "For Lease or Rent"
            : "for Sale"
        } in ${location} ${
          formattedPrice ? `under ${formattedPrice}` : ""
        } | Dolphy`;

  function generateDescription() {
    if (filters.mlsStatus === "Price Change") {
      if (filters.transactionType === "For Lease") {
        return `${actualTotal}+ ${location} ${
          filters.propertyType || "Homes"
        } for Rent or Lease | Book a showing for affordable ${
          filters.propertyType || "Homes"
        } in ${location} with pools, walkouts. Prices from $500 to $5,000 per month. Updated daily.`;
      } else {
        return `${actualTotal}+ price-reduced homes in ${location}. Find price reduced homes - detached, semi-detached, townhomes & condos on Condomonk. Don't miss out.`;
      }
    }
    return generateSubtitle(filters, total);
  }

  const description = generateDescription();

  return {
    title,
    description,
    alternates: {
      canonical: `https://dolphy.ca${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `https://dolphy.ca${canonicalPath}`,
      siteName: "Dolphy",
      type: "website",
      images: [
        {
          url: "https://dolphy.ca/city-images/milton.jpeg",
          width: 1200,
          height: 630,
          alt: `Real Estate Listings in ${location}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://dolphy.ca/city-images/milton.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    other: {
      "og:locale": "en_CA",
      "og:type": "website",
    },
  };
};
