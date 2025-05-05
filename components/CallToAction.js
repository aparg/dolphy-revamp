"use client";

import Image from "next/image";

export default function CallToAction() {
  return (
    <div className="py-3 md:py-5">
      <div className="my-5 py-5">
        <div className="w-full bg-[#EBF5FF]">
          <div className="container max-w-4xl mx-auto relative px-4">
            <div className="flex flex-row items-center">
              {/* Left Side - Image */}
              <div className="w-[40%] md:w-1/2 relative">
                <div className="relative h-[180px] md:h-[400px]">
                  <Image
                    src="/tower.png"
                    alt="condo in calgary"
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="w-[60%] md:w-1/2 py-6 md:py-12 pl-4 md:pl-8">
                <div className="flex items-center gap-2 mb-2 md:mb-4">
                  <span className="text-xl md:text-4xl font-bold text-gray-900">
                    dolphy
                  </span>
                  <Image
                    src="/canadaleaf.svg"
                    alt="canada maple leaf"
                    width={16}
                    height={16}
                    className="mt-1 md:w-[20px] md:h-[20px]"
                  />
                </div>

                <p className="text-gray-700 text-xs md:text-lg mb-3 md:mb-6">
                  Dolphy has one of the largest, most updated database of new
                  construction homes, backed by industry-leading technology and
                  partners.
                </p>

                <div className="mt-1 md:mt-2">
                  <p className="text-gray-900 font-semibold text-xs md:text-base mb-0.5 md:mb-1">
                    Trusted by 50k+ Canadians
                  </p>
                  <div className="flex gap-0.5 md:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 md:w-5 md:h-5 text-amber-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
