import OntarioCitiesGrid from "@/components/resale/OntarioCitiesGrid";

export const metadata = {
  title: "Ontario Real Estate - Browse Properties by City | Dolphy",
  description:
    "Explore real estate listings across Ontario cities. Find detached homes, semi-detached homes, townhouses, and condos for sale in Ontario's major cities.",
  keywords:
    "Ontario real estate, Ontario cities, homes for sale, property listings, Ontario housing market",
};

const page = async () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <OntarioCitiesGrid />
      </div>
    </div>
  );
};

export default page;
