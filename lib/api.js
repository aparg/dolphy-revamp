import { preconCityList } from "@/data/preconCityList";
import axios from "axios";

const API_BASE_URL = "https://admin.dolphy.ca/api";

// Clean text for XML
function cleanText(text) {
  if (!text) return "";
  return text
    .toString()
    .replace(/&/g, "and")
    .replace(/[<>"']/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-\/]/g, "")
    .trim();
}

// Clean slug for URL
function cleanSlug(slug) {
  if (!slug) return "";
  return slug
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

// Static pages configuration
export async function getAllStaticPages() {
  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "about-us", priority: 0.8 },
    { path: "contact-us", priority: 0.8 },
    { path: "privacy", priority: 0.6 },
    { path: "maldives-vacation-projects", priority: 0.7 },
    { path: "top-10-gta-projects", priority: 0.7 },
    { path: "pre-construction-homes", priority: 0.8 },
  ];

  return staticPages.map((page) => ({
    path: cleanSlug(page.path),
    priority: page.priority,
    changefreq: page.priority >= 0.8 ? "daily" : "weekly",
  }));
}

// Get all cities from the preconCityList
export async function getAllCities() {
  return preconCityList.map((city) => ({
    name: cleanText(city.city_name_cap),
    slug: cleanSlug(city.city_name),
    priority: 0.8,
    changefreq: "daily",
  }));
}

// Helper function for API calls with retry
async function fetchWithRetry(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        validateStatus: (status) => status === 200,
      });
      return response.data;
    } catch (error) {
      if (i === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
}

function generateListingUrl(citySlug, listingSlug, type, isSold = false) {
  const safeCity = cleanSlug(citySlug);
  const safeListing = cleanSlug(listingSlug);

  switch (type) {
    case "resale":
      return `/resale/ontario/${safeCity}/listings${
        isSold ? "/sold" : ""
      }/${safeListing}`;
    case "pre-construction":
      return `/${safeCity}/${safeListing}`;
    default:
      return `/${safeCity}/${safeListing}`;
  }
}

async function fetchListingsForCity(
  city,
  type = "pre-construction",
  includeSold = false
) {
  try {
    if (type === "resale") {
      // For resale, we'll get the listings from the AMPRE API
      const filterQuery = `$filter=contains(City,'${
        city.name
      }') and TransactionType eq '${includeSold ? "Sold" : "For Sale"}'`;
      const endpoint = `https://query.ampre.ca/odata/Property?${filterQuery}&$top=100&$select=ListingKey,UnparsedAddress,City,ListPrice,BedroomsTotal,BathroomsTotal,PropertySubType,ListingId,BuildingAreaTotal,StreetName,StreetNumber`;

      const options = {
        method: "GET",
        headers: {
          Authorization: process.env.BEARER_TOKEN_FOR_API,
        },
      };

      const response = await fetch(endpoint, options);
      const data = await response.json();

      if (!data?.value || !Array.isArray(data.value)) {
        console.warn(
          `No ${includeSold ? "sold" : ""} ${type} listings found for ${
            city.name
          }`
        );
        return [];
      }

      return data.value.map((listing) => {
        const address = `${listing.StreetNumber}-${listing.StreetName}`;
        return {
          slug: `${address}-${listing.ListingId}`,
          city: {
            name: cleanText(city.name),
            slug: cleanSlug(city.name),
          },
          url: generateListingUrl(
            cleanSlug(city.name),
            `${address}-${listing.ListingId}`,
            type,
            includeSold
          ),
          updatedAt: new Date().toISOString(),
          priority: 0.7,
          changefreq: "daily",
        };
      });
    } else {
      // Pre-construction listings remain the same
      const endpoint = `${API_BASE_URL}/pre-constructions-city/${cleanSlug(
        city.slug
      )}/?perpage=100&page=1`;
      const data = await fetchWithRetry(endpoint);

      if (!data?.data?.results || !Array.isArray(data.data.results)) {
        console.warn(`No ${type} listings found for ${city.name}`);
        return [];
      }

      return data.data.results
        .filter((listing) => listing && (listing.slug || listing.id))
        .map((listing) => {
          const listingSlug = cleanSlug(listing.slug || listing.id.toString());
          return {
            slug: listingSlug,
            city: {
              name: cleanText(city.name),
              slug: cleanSlug(city.slug),
            },
            url: generateListingUrl(cleanSlug(city.slug), listingSlug, type),
            updatedAt: listing.updated_at || new Date().toISOString(),
            priority: 0.7,
            changefreq: "daily",
          };
        });
    }
  } catch (error) {
    console.error(
      `Error fetching ${type} listings for ${city.name}:`,
      error.message
    );
    return [];
  }
}

// Get all listings including pre-construction and resale
export async function getAllListings() {
  try {
    const cities = await getAllCities();
    const listings = [];

    // Process pre-construction listings
    for (let i = 0; i < cities.length; i += 5) {
      const cityBatch = cities.slice(i, i + 5);
      const batchPromises = cityBatch.map((city) =>
        fetchListingsForCity(city, "pre-construction")
      );

      const batchResults = await Promise.all(batchPromises);
      listings.push(...batchResults.flat());

      if (i + 5 < cities.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Only fetch resale listings for Ontario
    const ontarioActiveListings = await fetchListingsForCity(
      { name: "Ontario", slug: "ontario" },
      "resale",
      false
    );
    const ontarioSoldListings = await fetchListingsForCity(
      { name: "Ontario", slug: "ontario" },
      "resale",
      true
    );

    listings.push(...ontarioActiveListings, ...ontarioSoldListings);

    return listings.filter((listing) => listing.slug);
  } catch (error) {
    console.error("Error fetching all listings:", error.message);
    return [];
  }
}

// Get additional routes including city-specific pages
export async function getAdditionalRoutes() {
  const resaleRoutes = [
    // Base resale route
    {
      path: "resale/ontario",
      priority: 0.8,
      changefreq: "daily",
      subpages: [],
    },
    // Property type routes
    {
      path: "",
      priority: 0.8,
      changefreq: "daily",
      subpages: [
        "resale/ontario/detached-homes-for-sale",
        "resale/ontario/semi-detached-homes-for-sale",
        "resale/ontario/townhomes-for-sale",
        "resale/ontario/condos-for-sale",
        "resale/ontario/detached-homes-for-lease",
        "resale/ontario/semi-detached-homes-for-lease",
        "resale/ontario/townhomes-for-lease",
        "resale/ontario/condos-for-lease",
        "resale/ontario/open-houses",
        "resale/ontario/price-dropped",
      ],
    },
    // Transaction type routes
    {
      path: "resale/ontario/homes-for-sale",
      priority: 0.8,
      changefreq: "daily",
      subpages: [],
    },
    {
      path: "resale/ontario/homes-for-lease",
      priority: 0.8,
      changefreq: "daily",
      subpages: [],
    },
    // City-specific routes for Ontario resale
    ...preconCityList.map((city) => ({
      path: ``,
      priority: 0.8,
      changefreq: "daily",
      subpages: [
        `resale/ontario/${cleanSlug(city.city_name)}/homes-for-sale`,
        `resale/ontario/${cleanSlug(city.city_name)}/homes-for-lease`,
        `resale/ontario/${cleanSlug(city.city_name)}/detached-homes-for-sale`,
        `resale/ontario/${cleanSlug(
          city.city_name
        )}/semi-detached-homes-for-sale`,
        `resale/ontario/${cleanSlug(city.city_name)}/townhomes-for-sale`,
        `resale/ontario/${cleanSlug(city.city_name)}/condos-for-sale`,
        `resale/ontario/${cleanSlug(city.city_name)}/detached-homes-for-lease`,
        `resale/ontario/${cleanSlug(
          city.city_name
        )}/semi-detached-homes-for-lease`,
        `resale/ontario/${cleanSlug(city.city_name)}/townhomes-for-lease`,
        `resale/ontario/${cleanSlug(city.city_name)}/condos-for-lease`,
        `resale/ontario/${cleanSlug(city.city_name)}/open-houses`,
        `resale/ontario/${cleanSlug(city.city_name)}/price-dropped`,
      ],
    })),
  ];

  return [...resaleRoutes];
}
