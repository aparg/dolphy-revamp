import React from "react";
import Heading from "@/components/design/Heading";

const properties = [
  {
    logo: "/clover.svg",
    name: "Clover",
    description:
      "Discover Clover Condos, a pre-construction haven where natural elegance meets modern luxury, in a vibrant community.",
    image: "/3.png",
  },
  {
    logo: "/clover.svg",
    name: "Arabella",
    description:
      "Arabella Towns, a new townhome project by Truman Homes, is currently in pre-construction at 100 Street SouthEast & Township Road 244 in Calgary.",
    image: "/3.png",
  },
  {
    logo: "/clover.svg",
    name: "Lincoln",
    description:
      "Lincoln Tower, a visionary condo project by Truman that is currently in the pre-construction phase.",
    image: "/3.png",
  },
  {
    logo: "/clover.svg",
    name: "Truman",
    description:
      "Marc and Maria Condos, a striking architectural duo in the heart of a bustling Canadian city, redefine urban living with their modern elegance.",
    image: "/3.png",
  },
];

const PropertyCard = ({ property }) => (
  <div className="group relative h-[400px] md:h-[500px] overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-bottom"
      style={{ backgroundImage: `url(${property.image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-800/10" />
    </div>

    <div className="relative h-full p-8 space-y-4 text-black">
      <img
        src={property.logo}
        alt={`${property.name} logo`}
        className="h-8 object-contain"
      />
      <p className="text-sm leading-relaxed">{property.description}</p>
      <button className="border border-black bg-transparent px-6 py-2 text-sm hover:bg-white hover:text-black transition-colors">
        Learn More
      </button>
    </div>
  </div>
);

const TopProjects = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <Heading
        subtitle="Selected by homes expert at dolphy."
        align="center"
        className="mb-3"
      >
        Most Anticipated Projects
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {properties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </div>
  );
};

export default TopProjects;
