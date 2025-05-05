"use client";
import Image from "next/image";
import Map from "@/components/Map";
import { useEffect, useState } from "react";

const ProjectLocation = ({ projectName, address, latitude, longitude }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Validate coordinates
  const validLatitude = typeof latitude === "number" && !isNaN(latitude);
  const validLongitude = typeof longitude === "number" && !isNaN(longitude);

  if (!validLatitude || !validLongitude) {
    return null; // Don't render if coordinates are invalid
  }

  return (
    <div className="py-6">
      <div className="mt-5 flex items-center gap-2 mb-6">
        <Image
          src="/icons/home_address.png"
          alt="Location icon"
          height={44}
          width={44}
        />
        <h2 className="text-[1rem] font-[700]">
          Project Location - {projectName}
        </h2>
      </div>

      <div className="rounded-lg overflow-hidden h-[400px]">
        {isClient && (
          <Map
            latitudeval={latitude}
            longitudeval={longitude}
            title={projectName}
            address={address}
            heightt="400px"
          />
        )}
      </div>
      <p className="text-xs text-gray-500 mb-2 mt-1">
        Note: The exact location of the project may vary from the address shown
        here
      </p>
    </div>
  );
};

export default ProjectLocation;
