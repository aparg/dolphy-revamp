import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2 z-[200] bg-white px-2 sm:px-0">
      <div>
        <ol className="flex items-center space-x-0 sm:space-x-0 text-xs sm:text-sm overflow-x-scroll">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-black mx-0" />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-black text-nowrap"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-black font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
