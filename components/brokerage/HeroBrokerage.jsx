"use client";

import Image from "next/image";

export default function HeroBrokerage() {
  const handleScrollToForm = () => {
    document
      .getElementById("apply-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-very-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-[#f8f9fa] text-black rounded-full text-sm font-semibold mb-4">
              Limited Time Opportunity
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-medium-black mb-4">
              Join Dolphy's Elite Real Estate Network
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Take your real estate career to new heights with our exclusive
              platform
            </p>
            <div className="space-y-4 mb-8">
              <p className="flex items-center text-gray-600">
                <span className="mr-3 text-primary-red">→</span>
                Authentical referral
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-3 text-primary-red">→</span>
                Strong mentorship & transaction support
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-3 text-primary-red">→</span>
                Growth-oriented and collaborative culture
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-3 text-primary-red">→</span>
                Same day payout & competitive package
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleScrollToForm}
                className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-xl transition-all transform hover:scale-105 font-bold text-lg shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Join Our Network Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Only accepting agents with 5+ transactions in the last 12 months
              </p>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="/gallery/1.jpg"
              alt="Real estate success"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
