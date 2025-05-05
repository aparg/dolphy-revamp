import { notFound } from "next/navigation";
import CityPage from "../../page";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

export const revalidate = 3600;

async function getCityData(cityName) {
  try {
    const res = await fetch(
      `https://admin.dolphy.ca/api/pre-constructions-city/${cityName}/?project_type=Detached&perpage=100&page=1`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch city data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching city data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const cityData = await getCityData(params.city);
  const cityName = capitalizeFirstLetter(params.city);

  return {
    title: `20+ Pre Construction Detached Homes in ${cityName}`,
    description: `Looking for a pre construction detached homes in ${cityName}. Discover ${cityData.data.totalCount}+ Pre Construction Single Family Home Developments in ${cityName}. Get early access to details and floor plans now.`,
    keywords: `${cityName} pre construction detached homes, ${cityName} pre construction detached developments, ${cityName} pre construction detached homes, ${cityName} detached developments, ${cityName} upcoming detached homes`,
    openGraph: {
      url: `https://dolphy.ca/${params.city}/pre-construction/detached`,
      siteName: "Dolphy",
      title: `20+ Pre Construction Detached Homes in ${cityName}`,
      description: `Looking for a pre construction detached homes in ${cityName}. Discover ${cityData.data.totalCount}+ Pre Construction Single Family Home Developments in ${cityName}. Get early access to details and floor plans now.`,
      images: [cityData.data.results[0]?.images[0] || "/noimage.webp"],
    },
    alternates: {
      canonical: `https://dolphy.ca/${params.city}/pre-construction/detached`,
    },
  };
}

export default async function DetachedPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Detached" },
      pageType: "Detached",
    });
  } catch (error) {
    notFound();
  }
}
