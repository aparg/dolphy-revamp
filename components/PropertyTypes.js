"use client";

import { useRouter } from "next/navigation";

const propertyTypes = [
  {
    title: "Townhomes",
    icon: "🏘️",
    filter: "Townhomes",
    quantity: 300,
  },
  {
    title: "Condos",
    icon: "🏬",
    filter: "Condos",
    quantity: 600,
  },
  {
    title: "Detached",
    icon: "🏠",
    filter: "Detached",
    quantity: 200,
  },
  {
    title: "Featured",
    icon: "⭐",
    filter: "Featured",
    quantity: 50,
  },
];

const PropertyTypes = () => {
  const router = useRouter();

  const handlePropertyClick = (filter) => {
    // Scroll to the featured listings section
    const listingsSection = document.getElementById("featured-listings");
    if (listingsSection) {
      const headerOffset = 80;
      const elementPosition = listingsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Set the active tab in the URL
      if (filter !== "Featured") {
        router.push(`/?tab=${filter}`, undefined, { shallow: true });
      }

      // Dispatch a custom event to notify FeaturedProjects
      const event = new CustomEvent("propertyTypeSelected", {
        detail: { filter },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <section className="overflow-x-hidden">
      <div className="container">
        <div className="grid grid-cols-4 gap-0 max-w-[450px] mx-auto px-0">
          {propertyTypes.map((property) => (
            <div
              key={property.title}
              className="rounded-2xl py-2 px-0 text-center flex flex-col items-center justify-center transition-all duration-300 cursor-pointer min-h-[140px] sm:min-h-0 sm:p-4 sm:px-2"
              onClick={() => handlePropertyClick(property.filter)}
            >
              <div className="text-[2.5rem] sm:text-[2rem] transition-transform duration-300 flex items-center justify-center w-full h-[60px] sm:h-[50px] mb-0 hover:scale-110">
                <span>{property.icon}</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <h3 className="text-[0.775rem] sm:text-[0.7rem] font-semibold text-[#212529] m-0 text-center w-full">
                  {property.title}
                </h3>
                <p className="text-[0.75rem] sm:text-[0.5rem] text-gray-600 m-0 text-center w-full">
                  {property.quantity} projects
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;
