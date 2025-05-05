"use client";

import React from "react";
import Image from "next/image";

const Testimonial = ({
  testimonialText,
  authorName,
  authorPosition,
  authorRole,
  companyLogo,
}) => {
  return (
    <div className="my-20 md:my-[80px] md:mb-[150px] max-w-[1200px] mx-auto px-4 md:px-4 flex justify-center w-full">
      <div className="max-w-[800px] md:max-w-[800px] mx-auto text-center">
        <p className="text-[15px] md:text-[32px] leading-2 md:leading-10 text-[#1a202c] font-medium mb-6 md:mb-10 text-center px-4 md:px-0">
          "{testimonialText}"
        </p>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={companyLogo}
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-base font-semibold text-[#1a202c] m-0">
              {authorName}
            </h4>
          </div>

          <p className="text-sm text-[#4a5568] m-0 mt-1 text-center">
            {authorPosition}, {authorRole}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
