import { notFound } from "next/navigation";
import CityPage from "../page";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

export const revalidate = 3600;

async function getCityData(cityName) {
  try {
    const res = await fetch(
      `https://admin.dolphy.ca/api/pre-constructions-city/${cityName}/?project_type=Condo&perpage=100&page=1`,
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
    title: `20+ Pre Construction Condos in ${cityName}`,
    description: `Looking for a pre construction condos in ${cityName}. Discover ${cityData.data.totalCount}+ Pre Construction Condo Developments in ${cityName}. Get early access to details and floor plans now.`,
    keywords: `${cityName} pre construction condos, ${cityName} pre construction condo developments, ${cityName} pre construction condos, ${cityName} condo developments, ${cityName} upcoming condos`,
    openGraph: {
      url: `https://dolphy.ca/${params.city}/condos`,
      siteName: "Dolphy",
      title: `20+ Pre Construction Condos in ${cityName}`,
      description: `Looking for a pre construction condos in ${cityName}. Discover ${cityData.data.totalCount}+ Pre Construction Condo Developments in ${cityName}. Get early access to details and floor plans now.`,
      images: [cityData.data.results[0]?.images[0] || "/noimage.webp"],
    },
    alternates: {
      canonical: `https://dolphy.ca/${params.city}/condos`,
    },
  };
}

export default async function CondosPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Condo" },
      pageType: "Condo",
    });
  } catch (error) {
    notFound();
  }
}
