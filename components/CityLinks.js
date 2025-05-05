import Link from "next/link";
import Heading from "@/components/design/Heading";
import { preconCityList } from "@/data/preconCityList";

const CityLinks = () => {
  // Sort cities alphabetically
  const sortedCities = [...preconCityList].sort((a, b) =>
    a.city_name_cap.localeCompare(b.city_name_cap)
  );

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <Heading
          align="center"
          color="#1a1a1a"
          highlightColor="#FF0000"
          subtitle="Explore new construction homes across Canada"
          maxWidth="800px"
          className="mb-8"
        >
          Pre Construction Homes in <span className="text-red-600">Canada</span>
        </Heading>

        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedCities.map((city) => (
              <div
                key={city.city_name}
                className={`
                  bg-white p-5 rounded-xl transition-all`}
              >
                <div className="flex items-center mb-3">
                  <Link
                    href={`/${city.city_name}`}
                    className="block text-base font-semibold text-gray-900 hover:underline underline-offset-2 transition-colors"
                  >
                    Pre Construction Homes in {city.city_name_cap}
                  </Link>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/pre-construction-homes/${city.city_name}/townhomes`}
                    className="block text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Pre Construction Townhomes in {city.city_name_cap}
                  </Link>
                  <Link
                    href={`/pre-construction-homes/${city.city_name}/condos`}
                    className="block text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Pre Construction Condos in {city.city_name_cap}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityLinks;
