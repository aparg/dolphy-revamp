import React from "react";
import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/design/Heading";

export default function MaldivesVacation() {
  const images = [
    "/maldives/Villa1.jpg",
    "/maldives/Villa2.jpg",
    "/maldives/Villa3.jpg",
    "/maldives/Villa4.jpg",
    "/maldives/caption.jpg",
    "/maldives/Villa6.jpg",
  ];

  return (
    <section className="container-fluid px-3 md:px-4 pb-24 md:pb-8 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-[2]">
        <Heading
          subtitle="Explore Maldives Vacation Homes"
          align="center"
          size="2.875em !important"
          mobileFontSize="clamp(1.4rem, 5vw, 1.8rem)"
          mobileLineHeight={1.3}
          mobileMaxWidth="320px"
          subtitleSize="1.1rem"
          mobileSubtitleSize="0.95rem"
          subtitleColor="#666"
          mobilePadding="0 15px"
          forceSingleLine={true}
          weight={800}
          marginBottom="0.6rem"
          preserveBreaks={true}
        >
          Looking For{" "}
          <span className="whitespace-nowrap inline-block text-red-600">
            Vacation Projects?
          </span>
        </Heading>

        <div className="mt-4 flex flex-col items-center">
          {/* Projects Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full my-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative h-[180px] rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                <Image
                  src={image}
                  alt={`Maldives Project ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Description Section */}
          <div className="text-center max-w-[1000px] mx-auto">
            <p className="text-black leading-[1.8] text-[1.1rem] text-center md:text-base max-w-[800px] md:text-[1.5rem] md:leading-[1.5]">
              The pace in the Maldives is relaxed, but there is plenty to do on
              both land and water. Clear waters and rich marine life make for
              exhilarating diving and deep-sea fishing, whilst water sports
              ranging from kayaking and catamaran sailing to wakeboarding and
              kite surfing are available in abundance.
            </p>
          </div>

          {/* Button Group */}
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center mt-4 md:flex-wrap md:gap-3">
            <Link href="/contact">
              <button className="p-3 px-4 bg-black text-white rounded-xl border border-black">
                Request Information
              </button>
            </Link>
            <Link href="/maldives-vacation-projects" target="_blank">
              <button className="p-3 px-4 bg-while border border-black text-black rounded-xl">
                Explore All Listings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
