import React from "react";
import { homeText, houseType, pillar9HouseTypes, saleLease } from "@/constant";
import CanadianCitiesShowcase from "@/components/resale/CanadianCitiesShowcase";
import AlbertaFiltersWithSalesList from "@/components/resale/AlbertaFiltersWithSalesList";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;
  const splitData = params.slug1.split("-");
  splitData.forEach((data) => {
    if (Object.keys(saleLease).includes(data)) {
      saleLeaseValue = data;
    } else if (Object.keys(pillar9HouseTypes).includes(data) && !type) {
      type = pillar9HouseTypes[data].name;
    }
    if (saleLeaseValue && type) return;
  });
  const isValidSlug = saleLeaseValue || type;
  const INITIAL_LIMIT = 30;
  if (isValidSlug)
    return (
      <div className="">
        <AlbertaFiltersWithSalesList
          {...{
            INITIAL_LIMIT,
            saleLeaseVal: saleLeaseValue,
            requiredType: type,
            filter: type || "",
            city: capitalizeFirstLetter(params?.city),
            slug: [params.city, params.slug1],
          }}
        />
        <div className="max-w-[98%] mx-auto">
          <CanadianCitiesShowcase />
        </div>
      </div>
    );
  return <></>;
};

export async function generateMetadata({ params }, parent) {
  let saleLeaseValue;
  let type;
  const splitData = params.slug1.split("-");
  splitData.forEach((data) => {
    if (Object.keys(saleLease).includes(data)) {
      saleLeaseValue = data;
    } else if (Object.keys(pillar9HouseTypes).includes(data) && !type) {
      type = pillar9HouseTypes[data].name;
    }
    if (saleLeaseValue && type) return;
  });
  const city = capitalizeFirstLetter(params?.city.replaceAll("-", ""));
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy.ca/alberta/${params.city}/${params.slug1}`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: `500+ ${homeText[type] || "homes"} for Sale in  ${
      city || "Alberta"
    }`,
    description: `500+ ${city || "Alberta"} ${
      homeText[type] || "homes"
    } for sale. Book a showing for affordable homes with pools, finished basements, walkouts. Prices from $1 to $5,000,000. Open houses available.`,
  };
}

export default page;
