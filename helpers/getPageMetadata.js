import capitalizeFirstLetter from "./capitalizeFirstLetter";

// List of major BC cities
const bcCities = [
  "vancouver",
  "victoria",
  "surrey",
  "burnaby",
  "richmond",
  "coquitlam",
  "kelowna",
  "nanaimo",
  "kamloops",
  "abbotsford",
];

function isBritishColumbiaCity(cityName) {
  return bcCities.includes(cityName.toLowerCase());
}

function formatPriceRange(range) {
  switch (range) {
    case "0-500k":
      return "Under $500K";
    case "500k-600k":
      return "from $500K to $600K";
    case "600k-700k":
      return "from $600K to $700K";
    case "700k-800k":
      return "from $700K to $800K";
    case "800k-1mil":
      return "from $800K to $1M";
    case "1mil-1.5mil":
      return "from $1M to $1.5M";
    default:
      return "";
  }
}

function isDubaiCity(cityName) {
  return cityName.toLowerCase() === "dubai";
}

export default function getPageMetadata(
  type,
  cityName,
  totalCount,
  priceRange
) {
  const city = capitalizeFirstLetter(cityName);
  const isBC = isBritishColumbiaCity(cityName);
  const isDubai = isDubaiCity(cityName);
  const propertyTerm = isBC
    ? "Presale"
    : isDubai
    ? "Off Plan Properties"
    : "Pre Construction";
  const province = isBC ? "British Columbia" : "Ontario";

  switch (type) {
    case "Detached":
      return {
        title: `100+ ${propertyTerm} Detached ${
          isDubai ? "Properties" : "Homes"
        } in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} detached ${
          isDubai ? "properties" : "homes"
        } for sale in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability for detached ${
          isDubai ? "properties" : "homes"
        } in ${city}`,
      };
    case "Semi-Detached":
      return {
        title: `100+ ${propertyTerm} Semi-Detached Homes in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} semi-detached homes for sale in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability for semi-detached homes in ${city}`,
      };
    case "Townhomes":
      return {
        title: `100+ ${propertyTerm} Townhomes in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} townhomes for sale in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability for townhomes in ${city}`,
      };
    case "Condo":
      return {
        title: `100+ ${propertyTerm} Condos in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} condos for sale in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability for condos in ${city}`,
      };
    case "price_range":
      const formattedRange = formatPriceRange(priceRange);
      return {
        title: `100+ ${propertyTerm} Homes ${formattedRange} in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} homes ${formattedRange} in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability`,
      };
    default:
      return {
        title: `100+ ${propertyTerm} Homes in ${city} (2025)`,
        subtitle: `100+ ${propertyTerm} Homes for Sale in ${city}, ${province} | Browse Floor Plans, Pricing & Availability on Dolphy. Discover over 100 ${propertyTerm.toLowerCase()} homes in ${city}, ${province} on Dolphy.ca — your trusted source for new construction properties across the GTA. Explore a wide range of new build homes, including condos, townhouses, and detached houses, with flexible pricing options ideal for first-time buyers and investors. Our listings are updated daily, featuring the latest ${propertyTerm.toLowerCase()} and under-construction projects from top developers in ${city}. Easily filter homes by the number of bedrooms (1 to 4+), property type, and construction status to find the perfect fit. Whether you're searching for affordable ${propertyTerm.toLowerCase()} condos or premium new developments in ${city}, Dolphy.ca offers exclusive access to the city's most sought-after real estate. Start your journey today and secure your future home in one of ${province}'s fastest-growing markets.`,
      };
  }
}
