import { residential } from "@/api/routes/fetchRoutes";
import { generateURL } from "@/helpers/generateURL";
import Link from "next/link";
import React from "react";

const PropertiesDisplayer = ({
  data,
  topic,
  subtitle,
  bg = "#1f2937",
  imageGradient = "#2b4366",
  textColor = "white",
}) => {
  return (
    <section
      className={`py-6 sm:py-12 sm:py-16 rounded-xl mt-10 sm:mt-20`}
      style={{ backgroundColor: bg }}
    >
      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-5 xl:grid-cols-3 xl:gap-x-12">
          <div className="xl:order-2 xl:pb-0 pb-4 sm:pb-12 lg:col-span-2 xl:col-span-1 bg-dark-gray rounded-lg">
            <div className="xl:px-8 xl:py-12">
              <h2 className={`tracking-tighter text-${textColor}`}>
                <span className="font-sans text-4xl font-normal sm:text-5xl md:text-6xl">
                  {" "}
                  Homes with
                </span>
                <span className="font-serif text-5xl italic sm:text-6xl md:text-7xl">
                  {" "}
                  {topic}
                </span>
              </h2>
              <p
                className={`mt-6 font-sans text-lg font-normal leading-8 text-opacity-50 text-${textColor}`}
              >
                {subtitle}
              </p>
            </div>
          </div>
          <div className="xl:order-1 grid grid-cols-2 gap-5">
            {data.map((property, idx) => {
              if (idx < 2) {
                return (
                  <DisplayerCard
                    MLS={property.ListingKey}
                    city={property.City}
                    address={property.Address}
                    type={propertyPropertySubType}
                    key={idx}
                    imageGradient={imageGradient}
                  />
                );
              }
            })}
          </div>

          <div className="xl:order-3 grid grid-cols-2 gap-5">
            {data.map((property, idx) => {
              if (idx >= 2) {
                return (
                  <DisplayerCard
                    MLS={property.ListingKey}
                    city={property.City}
                    address={property.Address}
                    type={propertyPropertySubType}
                    key={idx}
                    imageGradient={imageGradient}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const DisplayerCard = ({ MLS, city, address, type, imageGradient }) => {
  const mapObj = {
    MLS: MLS,
    index: 1,
  };
  const imgSrc = residential.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched];
  });
  return (
    <Link href={generateURL({ listingIDVal: MLS, cityVal: city })} key={MLS}>
      <div className="relative overflow-hidden rounded-lg">
        <div className="h-[15rem] sm:h-[30rem]">
          <img src={imgSrc} className="object-cover w-full h-full" alt="" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top,${imageGradient}, transparent, transparent)`,
          }}
        ></div>
        <div className="absolute inset-x-0 bottom-0 w-full">
          <div className="px-2 sm:px-4 py-2 sm:py-6">
            <p className="font-sans text-base font-medium text-white">
              {address}
            </p>
            <p className="mt-1 font-serif text-sm italic text-white test-wrap">
              {type}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PropertiesDisplayer;
