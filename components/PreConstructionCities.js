import Link from "next/link";
import Image from "next/image";
import Heading from "./design/Heading";

const cities = [
  {
    name: "Toronto",
    image: "/city-images/toronto.jpg",
    count: "200+ Projects",
  },
  {
    name: "Ottawa",
    image: "/city-images/ottawa.jpg",
    count: "120+ Projects",
  },
  {
    name: "Mississauga",
    image: "/city-images/mississauga.jpg",
    count: "100+ Projects",
  },
  {
    name: "Calgary",
    image: "/city-images/calgary.jpg",
    count: "50+ Projects",
  },
  {
    name: "Barrie",
    image: "/city-images/barrie.jpg",
    count: "40+ Projects",
  },
  {
    name: "Brampton",
    image: "/city-images/brampton.jpg",
    count: "80+ Projects",
  },
  {
    name: "Pickering",
    image: "/city-images/pickering.jpg",
    count: "30+ Projects",
  },
  {
    name: "Hamilton",
    image: "/city-images/hamilton.jpg",
    count: "70+ Projects",
  },
  {
    name: "Milton",
    image: "/city-images/milton.jpeg",
    count: "40+ Projects",
  },
  {
    name: "Oakville",
    image: "/city-images/oakville.jpg",
    count: "60+ Projects",
  },
  {
    name: "Waterloo",
    image: "/city-images/waterloo.jpeg",
    count: "50+ Projects",
  },
  {
    name: "Cambridge",
    image: "/city-images/cambridge.jpeg",
    count: "30+ Projects",
  },
];

const PreConstructionCities = () => {
  return (
    <section className="py-16 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-[1.2rem] md:text-[2.1em] font-extrabold leading-tight md:leading-normal w-full m-0 p-0 text-center">
          <Link href="/pre-construction-homes">
            Pre Construction Homes across Canada
          </Link>
        </h2>
        <p className="text-[0.9rem] md:text-[0.95rem] font-normal leading-relaxed md:leading-normal mt-[0.2rem] m-0 p-0 text-center mb-5 md:mb-10">
          Over 1,000 Pre Construction Homes Available Nationwide on the Dolphy
          Platform
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {cities.map((city) => (
            <Link
              href={`/pre-construction-homes/${city.name.toLowerCase()}`}
              key={city.name}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-square relative">
                <Image
                  src={city.image}
                  alt={`Pre-construction homes in ${city.name}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  priority={city.name === "Toronto"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-6">
                  <h4 className="text-xl font-bold mb-2 text-center">
                    {city.name}
                  </h4>
                  <p className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {city.count}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/pre-construction-homes"
            className="bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-600 transition-colors duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PreConstructionCities;
