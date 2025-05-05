import Link from "next/link";
import { ArrowRight, TrendingDown, MapPin, ChevronRight } from "lucide-react";

const PriceDroppedHomes = () => {
  const cities = [
    {
      name: "Brampton",
      count: 332,
      slug: "/resale/ontario/brampton/price-dropped",
    },
    {
      name: "Mississauga",
      count: 100,
      slug: "/resale/ontario/mississauga/price-dropped",
    },
    {
      name: "Hamilton",
      count: 44,
      slug: "/resale/ontario/hamilton/price-dropped",
    },
    {
      name: "Barrie",
      count: 56,
      slug: "/resale/ontario/barrie/price-dropped",
    },
  ];

  return (
    <section
      id="price-dropped-section"
      className="w-full py-16 md:pb-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center mb-10 md:mb-16">
          <div>
            <div className="flex items-center mb-0 md:mb-1 justify-center">
              <TrendingDown className="w-8 h-8 text-emerald-500 mr-3" />
              <h2 className="text-xl md:text-5xl font-bold text-emerald-500">
                You buy when the price is low.
              </h2>
            </div>
            <p className="text-xs md:text-xl text-center text-gray-700">
              Don't miss out and check out properties that have price dropped
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10">
            {cities.map((city, index) => (
              <div key={city.name}>
                <Link
                  href={city.slug}
                  className="block hover:underline underline-offset-2 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-xl md:text-3xl font-bold text-gray-800 flex items-center">
                      <TrendingDown className="h-5 w-5 text-red-600 mr-1" />
                      {city.count}
                    </h3>
                    <span className="ml-2 text-gray-600 flex items-center">
                      Price dropped homes {city.name}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/resale/ontario/price-dropped"
            className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-colors"
          >
            100+ Price dropped homes in Ontario
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PriceDroppedHomes;
