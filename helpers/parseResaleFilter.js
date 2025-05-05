// Helper to determine the type of page and parse filters
export function parseSlug(slug, province = "ontario") {
  const filters = {};
  const parts = Array.isArray(slug) ? slug : [slug];
  const path = parts.join("/");
  const allQuadrants = ["N", "NE", "NW", "SW", "SE", "S", "E", "W"];

  //Check for quadrant with city(eg. Calgary-NE)
  const quadrant = parts.find((part) => allQuadrants.includes(part));
  filters.quadrant = quadrant;

  // Check for condo corporation
  const condoCorpPart = parts.find((part) => part.startsWith("condocorp-"));
  if (condoCorpPart) {
    filters.condoCorp = condoCorpPart.split("-")[1];
    filters.condoCorpNumber = condoCorpPart.split("-")[2];
    // If city is present before condocorp part
    const cityIndex = parts.indexOf(condoCorpPart) - 1;
    if (cityIndex >= 0) {
      const cityName = parts[cityIndex]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      filters.city = cityName;
    }
    return filters;
  }

  // Check for open houses
  if (path.includes("open-houses")) {
    filters.isOpenHouse = true;
    if (parts.length > 1 && parts[0] !== "open-houses") {
      const cityName = parts[0]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      filters.city = cityName;
    }
    return filters;
  }

  // Set default transaction type
  filters.transactionType = "For Sale";

  const getPropertyTypes = () => {
    if (province == "alberta") {
      return {
        "semi-detached": {
          label: "Semi-Detached",
          subtypes: ["Semi Detached (Half Duplex)"],
          exactPath: "semi-detached",
        },
        detached: {
          label: "Detached",
          subtypes: ["Detached"],
          exactPath: "detached",
        },
        apartment: {
          label: "Apartment",
          subtypes: ["Apartment"],
          exactPath: "apartment",
        },
      };
    }
    return {
      "semi-detached": {
        label: "Semi-Detached",
        subtypes: ["Semi-Detached"],
        exactPath: "semi-detached",
      },
      detached: {
        label: "Detached",
        subtypes: ["Detached"],
        exactPath: "detached",
      },
      "condo-townhomes": {
        label: "Condo Townhome",
        subtypes: ["Condo Townhouse"],
        exactPath: "condo-townhomes",
      },
      townhomes: {
        label: "Townhomes",
        subtypes: ["Att/Row/Townhouse"],
        exactPath: "townhomes",
      },
      condos: {
        label: "Condo Apartment",
        subtypes: ["Condo Apartment"],
        exactPath: "condos",
      },
    };
  };

  // Define property types mapping with exact paths
  const propertyTypes = getPropertyTypes();

  // Handle price dropped URLs first
  if (parts.includes("price-dropped")) {
    filters.mlsStatus = "Price Change";
    const priceDropIndex = parts.indexOf("price-dropped");

    // Check if there's a city before price-dropped
    if (priceDropIndex > 0) {
      const cityName = parts[0]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      filters.city = cityName;
    }

    // For price dropped URLs, property type can be in any part after price-dropped
    for (let i = priceDropIndex + 1; i < parts.length; i++) {
      const part = parts[i];
      for (const [urlPath, propertyType] of Object.entries(propertyTypes)) {
        if (part === urlPath) {
          filters.propertyType = propertyType.label;
          filters.propertySubTypes = propertyType.subtypes;
          break;
        }
      }
    }
    return filters;
  }

  // Handle property types
  for (const [urlPath, propertyType] of Object.entries(propertyTypes)) {
    for (const part of parts) {
      if (part === urlPath || part.startsWith(`${urlPath}-`)) {
        filters.propertyType = propertyType.label;
        filters.propertySubTypes = propertyType.subtypes;
        break;
      }
    }
  }

  // Handle bed filters
  for (const part of parts) {
    if (part.match(/^\d-plus-bed$/)) {
      filters.minBeds = parseInt(part);
      break;
    }
  }

  // Handle price range filters
  for (const part of parts) {
    if (part.includes("under-")) {
      const price = parseInt(part.split("under-")[1].replace("k", "000"));
      filters.maxPrice = price;
      break;
    } else if (part.includes("over-")) {
      const price = parseInt(part.split("over-")[1].replace("k", "000"));
      filters.minPrice = price;
      break;
    } else if (part.includes("between-")) {
      const [min, max] = part
        .split("between-")[1]
        .split("-")
        .map((p) => parseInt(p.replace("k", "000")));
      filters.minPrice = min;
      filters.maxPrice = max;
      break;
    }
  }

  // Handle transaction type
  if (path.includes("for-lease")) {
    filters.transactionType = "For Lease";
  } else if (path.includes("for-sale")) {
    filters.transactionType = "For Sale";
  } else {
    // Default to For Sale if no transaction type is specified
    filters.transactionType = "For Sale";
  }

  const firstPart = parts[0] || "";
  const isTransactionPath =
    firstPart.includes("for-sale") || firstPart.includes("for-lease");

  if (!isTransactionPath && parts[0] && !parts[0].includes("price-reduced")) {
    const cityName = parts[0]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    filters.city = cityName;
  }

  // Parse beds and baths
  parts.forEach((part) => {
    const bathMatch = part.match(/(\d+)-plus-bath/);
    if (bathMatch) {
      filters.minBaths = parseInt(bathMatch[1]);
    }
  });

  return filters;
}
