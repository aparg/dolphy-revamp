import {
  houseType,
  priceRangesLeaseProperties,
  priceRangesSaleProperties,
} from "@/constant";
import citiesWithProvinces from "@/constant/cities";
import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";

// const cities = [
//   "Toronto",
//   "Brampton",
//   "Mississauga",
//   "Milton",
//   "Hamilton",
//   "Burlington",
//   "Ajax",
//   "Pickering",
//   "Barrie",
// ].map((city) => ({
//   name: city.toUpperCase(),
//   links: [
//     {
//       label: `Homes in ${city}`,
//       slug: "detached-homes-for-sale",
//     },
//     {
//       label: `Homes in ${city}`,
//       slug: "semi-detached-homes-for-sale",
//     },
//     {
//       label: `Homes in ${city}`,
//       slug: "town-homes-for-sale",
//     },
//     {
//       label: `Homes in ${city}`,
//       slug: "condo-for-sale",
//     },
//   ],
// }));

export default function ResaleLinks() {
  const allPriceRanges = {
    ...priceRangesLeaseProperties,
    ...priceRangesSaleProperties,
  };
  return (
    <div className="max-w-6xl mx-auto px-3 md:px-4 mt-20 bg-gray-100 bg-opacity-50 rounded-xl py-16 my-20">
      <div className="text-center mb-8">
        <p className="uppercase text-gray-500 font-semibold tracking-wider">
          Dolphy resale listings
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Find Resale Homes in Dolphy
        </h2>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 space-x-3 space-y-10 sm:space-y-0 text-black font-semibold text-center">
          <div>
            <p className="font-semibold text-black text-lg mb-4">
              Find by cities
            </p>
            {citiesWithProvinces.map((city, index) => (
              <Link
                key={`${city.name}-${index}`}
                href={generateURL({ cityVal: city.city })}
                className="flex flex-col space-y-2 text-xs hover:underline my-2"
              >
                Homes in {city.city}
              </Link>
            ))}
          </div>
          <div>
            <p className="font-semibold text-black text-lg mb-4">
              Find by price range
            </p>
            {Object.keys(priceRangesLeaseProperties).map((range, index) => (
              <Link
                key={`${range}-${index}`}
                href={generateURL({ priceRange: range, saleLeaseVal: "lease" })}
                className="flex flex-col space-y-2 text-xs hover:underline my-2"
              >
                Homes for lease priced {range.toLowerCase()}
              </Link>
            ))}
            {Object.keys(priceRangesSaleProperties).map((range, index) => (
              <Link
                key={`${range}-${index}`}
                href={generateURL({ priceRange: range, saleLeaseVal: "sale" })}
                className="flex flex-col space-y-2 text-xs hover:underline my-2"
              >
                Homes for sale priced {range.toLowerCase()}
              </Link>
            ))}
          </div>
          <div>
            <p className="font-semibold text-black text-lg mb-4">
              Find by house type
            </p>
            {Object.values(houseType)
              .filter((val) => val.value !== null)
              .map((type, index) => (
                <Link
                  key={`${type.name}-${index}`}
                  href={generateURL({ houseTypeVal: type.name })}
                  className="flex flex-col space-y-2 text-xs hover:underline my-2"
                >
                  {type.name} Homes in Ontario
                </Link>
              ))}
          </div>

          <div>
            <p className="font-semibold text-black text-lg mb-4">
              Find by Transaction Type
            </p>

            <Link
              href={generateURL({ saleLeaseVal: "sale" })}
              className="flex flex-col space-y-2 text-xs hover:underline my-2"
            >
              Homes for sale
            </Link>
            <Link
              href={generateURL({ saleLeaseVal: "lease" })}
              className="flex flex-col space-y-2 text-xs hover:underline my-2"
            >
              Homes for lease
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
