"use client";
import Pagination from "@/components/resale/Pagination";
import ResaleCard from "./ResaleCard";
import AlbertaResaleCard from "./AlbertaResaleCard";
import { useMap } from "@/components/resale-map/MapContext";

export default function PropertyList({
  properties,
  total,
  currentPage,
  totalPages = 5,
  openHouse,
  priceReduced,
  province = "ontario",
}) {
  const { isMapOpen } = useMap();

  return (
    <div>
      <div className={`grid gap-2 md:gap-y-3 ${
        isMapOpen 
          ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2' 
          : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      }`}>
        {province == "ontario" &&
          properties.map((property) => (
            <ResaleCard
              openHouse={openHouse}
              key={property.ListingKey}
              curElem={property}
              showDecreasedPrice={priceReduced}
            />
          ))}
        {province == "alberta" &&
          properties.map((property) => (
            <AlbertaResaleCard key={property.ListingId} curElem={property} />
          ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
