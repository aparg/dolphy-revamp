import React from "react";
import Heading from "./design/Heading";

const StatsSection = () => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 mb-16" id="whyus">
      <Heading
        align="center"
        subtitle="Selected Projects from New Construction Expert's at Dolphy"
      >
        The Dolphy Community
      </Heading>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 text-center">
          {/* Pre-Construction Projects */}
          <div className="flex flex-col items-center p-4 md:p-8 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-5 rounded-full bg-gray-50 transition-all duration-300 hover:bg-gray-100 hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 md:w-8 md:h-8 fill-gray-900"
              >
                <path d="M10.9042 2.1001L20.8037 3.51431L22.2179 13.4138L13.0255 22.6062C12.635 22.9967 12.0019 22.9967 11.6113 22.6062L1.71184 12.7067C1.32132 12.3162 1.32132 11.683 1.71184 11.2925L10.9042 2.1001ZM11.9578 3.65178L3.97919 11.6304L12.3184 19.9696L20.2969 11.991L19.1897 4.18914L11.9578 3.65178ZM13.7325 10.5872C12.9516 9.80636 12.9516 8.53871 13.7325 7.75783C14.5133 6.97695 15.781 6.97695 16.5619 7.75783C17.3428 8.53871 17.3428 9.80636 16.5619 10.5872C15.781 11.3681 14.5133 11.3681 13.7325 10.5872Z"></path>
              </svg>
            </div>
            <div className="text-[1.75rem] md:text-[2.5rem] font-extrabold text-gray-900 leading-tight mb-3">
              1500+
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-medium">
              Pre-Construction Projects
            </div>
          </div>

          {/* Years in Industry */}
          <div className="flex flex-col items-center p-4 md:p-8 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-5 rounded-full bg-gray-50 transition-all duration-300 hover:bg-gray-100 hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 md:w-8 md:h-8 fill-gray-900"
              >
                <path d="M2 3.993C2.00183 3.44645 2.44772 3.00183 3 3.003H21C21.5523 3.003 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V3.993ZM4 5.003V19H20V5.003H4ZM8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8C11 9.65685 9.65685 11 8 11ZM13 9H19V7H13V9ZM7 19C7 16.2386 9.23858 14 12 14C14.7614 14 17 16.2386 17 19H7Z"></path>
              </svg>
            </div>
            <div className="text-[1.75rem] md:text-[2.5rem] font-extrabold text-gray-900 leading-tight mb-3">
              5+
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-medium">
              Years in Industry
            </div>
          </div>

          {/* Currently Selling Projects */}
          <div className="flex flex-col items-center p-4 md:p-8 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-5 rounded-full bg-gray-50 transition-all duration-300 hover:bg-gray-100 hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 md:w-8 md:h-8 fill-gray-900"
              >
                <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
              </svg>
            </div>
            <div className="text-[1.75rem] md:text-[2.5rem] font-extrabold text-gray-900 leading-tight mb-3">
              100+
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-medium">
              Currently Selling Projects
            </div>
          </div>

          {/* Annual Website Visitors */}
          <div className="flex flex-col items-center p-4 md:p-8 transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-5 rounded-full bg-gray-50 transition-all duration-300 hover:bg-gray-100 hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 md:w-8 md:h-8 fill-gray-900"
              >
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            </div>
            <div className="text-[1.75rem] md:text-[2.5rem] font-extrabold text-gray-900 leading-tight mb-3">
              1M+
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-medium">
              Annual Website Visitors
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
