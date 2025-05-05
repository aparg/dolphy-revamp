import Link from "next/link";

const cities = [
  "Toronto",
  "Brampton",
  "Mississauga",
  "Milton",
  "Hamilton",
  "Burlington",
  "Ajax",
  "Pickering",
  "Barrie",
].map((city) => ({
  name: city.toUpperCase(),
  links: [
    {
      label: `Detached Homes in ${city}`,
      slug: "detached-homes-for-sale",
    },
    {
      label: `Semi-Detached Homes in ${city}`,
      slug: "semi-detached-homes-for-sale",
    },
    {
      label: `Townhomes in ${city}`,
      slug: "town-homes-for-sale",
    },
    {
      label: `Condos in ${city}`,
      slug: "condo-for-sale",
    },
  ],
}));

export default function ResaleCityGrid() {
  return (
    <div className="max-w-6xl mx-auto py-6 px-3 md:px-4 bg-white mt-8">
      {/* <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Resale Homes in Ontario -{" "}
          <span className="text-red-600">Updated Daily on Dolphy</span>
        </h2>
        <p className="text-gray-600">1500+ home for sale in Ontario</p>
      </div> */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <div
              key={`${city.name}-${index}`}
              className="flex flex-col space-y-2"
            >
              <Link
                href={`/resale/ontario/${city.name.toLowerCase()}/homes-for-sale`}
                className="text-xl font-bold text-gray-800 mb-2 hover:text-black transition-colors"
              >
                {city.name}
              </Link>
              <div className="flex flex-col space-y-2">
                {city.links.map((link, linkIndex) => (
                  <Link
                    key={`${link.slug}-${linkIndex}`}
                    href={`/resale/ontario/${city.name.toLowerCase()}/${
                      link.slug
                    }`}
                    className="text-xs font-medium tracking-wide text-gray-600 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
