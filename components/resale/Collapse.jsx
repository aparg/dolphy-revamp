"use client";
import Link from "next/link";
import { useState } from "react";

const Collapse = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      {collapse && (
        <Link
          data-bs-toggle="collapse"
          onClick={(e) => setCollapse(!collapse)}
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="font-bold"
        >
          See Less ↑
        </Link>
      )}
      {!collapse && (
        <Link
          data-bs-toggle="collapse"
          onClick={(e) => setCollapse(!collapse)}
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="mt-2 px-2 border-2 border-black py-[2px] text-black font-semibold rounded-lg hover:bg-gray-200 focus:outline-none transition-colors duration-200 sm:my-0 mt-2 mb-4"
        >
          See More ↓
        </Link>
      )}
    </>
  );
};

export default Collapse;
