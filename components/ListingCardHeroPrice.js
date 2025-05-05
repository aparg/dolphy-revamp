"use client";

import Link from "next/link";
import nFormatter from "./nFormatter";
import { useEffect, useState } from "react";

export default function ListingCardHeroPrice(props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function checkPricing(prii) {
    if (!prii || prii === 0) {
      return `Pricing not available`;
    }
    return `Starting from $${nFormatter(prii, 2)}`;
  }

  return (
    <div
      className={`${
        props.is_featured ? "bb" : "border-0"
      } w-full md:w-[220px] flex flex-col shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-[5px] my-0 origin-top-center overflow-hidden bg-white hover:shadow-[0_3px_18px_-3px_rgba(0,0,0,0.1),0_12px_24px_-2px_rgba(0,0,0,0.06)] transition-shadow duration-300`}
    >
      <div className="relative w-full h-[160px]">
        <Link
          href={`/${props.city_name.toLowerCase()}/${props.url_slug}`}
          className="block w-full h-full"
        >
          <img
            src={
              props.img_url1 ? props.img_url1.split(",")[0] : "/noimage.webp"
            }
            alt={
              props.img_url1
                ? `${props.name} located at ${props.street} image`
                : "no image available for " + props.name
            }
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </Link>
        {props.is_featured && (
          <span className="absolute top-2 right-2 bg-blue-500 px-1.5 py-0.5 rounded-[3px] text-[9px] font-medium text-white flex items-center gap-0.5 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={8}
              height={8}
              fill="currentColor"
              className="bi bi-star"
              viewBox="0 0 22 22"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg>
            Featured
          </span>
        )}
        {!props.is_featured && (
          <span className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md text-[9px] font-medium shadow-sm">
            Pre
          </span>
        )}
      </div>
      <Link
        href={`/${props.city_name.toLowerCase()}/${props.url_slug}`}
        className="flex-1 p-3 no-underline hover:bg-gray-50/50 transition-colors duration-300"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold leading-tight line-clamp-2 text-gray-900">
            {props.num && props.num + ". "}
            {props.name}
          </h3>
          <h4 className="text-xs font-medium text-gray-700">
            {checkPricing(props.price_starting_from)}
          </h4>
        </div>
      </Link>
    </div>
  );
}
