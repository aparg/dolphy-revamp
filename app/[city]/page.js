import CityNav from "@/components/CityNav";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import getPageMetadata from "@/helpers/getPageMetadata";
import { notFound } from "next/navigation";
import CityLayout from "@/components/CityLayout";
import { preconCityList } from "@/data/preconCityList";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }) {
  let cityData;
  try {
    cityData = await getCityData(params.city);
  } catch (error) {
    console.error("Error fetching city data:", error);
  }

  // Provide fallback values if cityData is null or undefined
  const totalCount = "100";
  const cityName = capitalizeFirstLetter(params.city);

  return {
    title: `Top ${totalCount} Pre Construction Homes in ${cityName} | Dolphy`,
    keywords: `Pre Construction Homes, Condos & Townhomes, ${cityName}`,
    description: `${totalCount}+ Pre Construction homes in ${cityName}. View floor plans, pricing, map & availability. Find latest new construction homes on Dolphy.`,
    openGraph: {
      url: `https://dolphy.ca/${params.city}`,
      siteName: "Dolphy",
      title: `Top ${totalCount} Pre Construction Homes in ${cityName} | Dolphy`,
      description: `${totalCount}+ Pre Construction homes in ${cityName}. View floor plans, pricing, map & availability. Find latest new construction homes on Dolphy.`,
      images: [cityData?.data?.results[0]?.images[0] || "/noimage.webp"],
    },
    alternates: {
      canonical: `https://dolphy.ca/${params.city}`,
    },
  };
}

async function getCityData(cityName, filters = {}) {
  try {
    let url = `https://admin.dolphy.ca/api/pre-constructions-city/${cityName}/?perpage=100&page=1`;

    if (filters.project_type) {
      url += `&project_type=${encodeURIComponent(filters.project_type)}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch city data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching city data:", error);
    return null;
  }
}

async function getFeaturedListings(cityName) {
  try {
    const res = await fetch(
      `https://admin.dolphy.ca/api/pre-constructions-city/${cityName}/?is_featured=true&perpage=10`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch featured listings");
    return res.json();
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    return null;
  }
}

async function getSitemapData(cityName) {
  try {
    const res = await fetch(
      `https://admin.dolphy.ca/api/sitemap-directory/${cityName}/`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch sitemap data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    return null;
  }
}

export default async function CityPage({
  params,
  searchParams = {},
  pageType,
}) {
  const cityData = await getCityData(params.city, searchParams);
  if (!cityData) {
    notFound();
  }

  const featuredListings = await getFeaturedListings(params.city);
  const sitemapData = await getSitemapData(params.city);
  const metadata = getPageMetadata(
    pageType,
    params.city,
    cityData.data.totalCount
  );

  const filters = {
    project_type: searchParams?.project_type || "",
    price_range: searchParams?.price_range || "",
  };

  // Create pathname based on params and page type
  let pathname = `/${params.city}`;

  // Handle different page types
  if (pageType === "Condo") {
    pathname = `/${params.city}/condos`;
  } else if (pageType === "Townhomes") {
    pathname = `/${params.city}/pre-construction/townhomes`;
  } else if (pageType === "Detached") {
    pathname = `/${params.city}/pre-construction/detached`;
  } else if (pageType === "Semi-Detached") {
    pathname = `/${params.city}/pre-construction/semi-detached`;
  }

  // Handle price range
  if (searchParams?.price_range) {
    pathname = `/${params.city}/price-range/${searchParams.price_range}`;
  }

  return (
    <main className="min-h-screen bg-white font-montserrat">
      <CityNav />
      <CityLayout
        cityData={cityData}
        featuredListings={featuredListings}
        metadata={metadata}
        filters={filters}
        params={params}
        sitemapData={sitemapData}
        pathname={pathname}
      />
    </main>
  );
}

export async function generateStaticParams() {
  return preconCityList.map((city) => ({
    city: city.city_name,
  }));
}
