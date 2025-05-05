import ResaleCityGrid from "@/components/resale/ResaleCityGrid";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import { ArrowRight } from "lucide-react";
export default function NotFound({ name = null, city, province }) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center mx-4 sm:mx-0">
        <div className="text-center -mt-16">
          <img src="/monkey-confused.png" className="w-60 mx-auto -mb-2" />
          <p className="text-red-600 font-bold text-7xl mb-0">Oops! </p>{" "}
          <p className="text-3xl mb-6 font-semibold leading-[2rem] sm:leading-[1.5rem]">
            <br />
            The {name.toLowerCase() || "city"} you're looking for is not
            available.
          </p>
          <a
            href={province && city ? `/resale/${province}/${city}` : "/"}
            className="inline-block text-black px-6 py-3 rounded-md hover:text-red-600 transition-colors text-2xl sm:text-3xl underline hover:"
          >
            Click to View Other Listings in{" "}
            {capitalizeFirstLetter(city.replaceAll("-", " "))}{" "}
          </a>
        </div>
      </div>
      <ResaleCityGrid />
    </>
  );
}
