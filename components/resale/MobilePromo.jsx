import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

const MobilePromo = () => {
  return (
    <div className="bg-gray-100 rounded-md p-8 md:py-12 lg:py-16 flex-col md:flex-row items-center justify-start relative mt-60 mb-80 hidden sm:block sm:px-56">
      <div className="mb-8 md:mb-0 md:mr-8 lg:mr-16">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">
          MOBILE VERSION
        </h2>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Expand your search
          <br />
          experience on your phone
        </h1>
        <p className="text-gray-600 mb-6">
          Easy search for homes for sale or lease across Ontario.
        </p>
      </div>
      <div className="absolute right-8 top-0 w-full max-w-sm md:max-w-md lg:max-w-lg h-full flex items-center">
        <Image
          src="/images/lowrise-sc.png"
          alt="Mobile app screenshot"
          width={300}
          height={600}
          className="rounded-3xl"
        />
      </div>
    </div>
  );
};

export default MobilePromo;
