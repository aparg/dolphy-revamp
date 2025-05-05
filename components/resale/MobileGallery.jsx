"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  loading: () => <p>Loading gallery...</p>,
});
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MobileGallery = ({ data }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToImage = (index) => {
    scrollContainerRef.current.scrollTo({
      left: index * scrollContainerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const index = Math.round(
      scrollContainerRef.current.scrollLeft /
        scrollContainerRef.current.offsetWidth
    );
    setCurrentIndex(index);
  };

  //   useEffect(() => {
  //     const scrollContainer = scrollContainerRef.current;
  //     scrollContainer.addEventListener("scroll", handleScroll);
  //     return () => scrollContainer.removeEventListener("scroll", handleScroll);
  //   }, []);

  const nextSlide = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % urls.length;
    scrollToImage(newIndex);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + urls.length) % urls.length;
    scrollToImage(newIndex);
  };

  return (
    <>
      {LightGallery ? (
        <div className="relative">
          <LightGallery
            onInit={onInit}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="grid grid-rows-3 sm:grid-rows-2 grid-cols-4 gap-2"
          >
            <>
              {data?.length > 0 ? (
                data.map((url, index) => (
                  <Link
                    href={`${url}`}
                    key={index}
                    className={`MobileGallery-item ${
                      index === currentIndex
                        ? "row-span-2 col-span-4 sm:col-span-2"
                        : ""
                    } ${index >= 5 ? "hidden" : ""}`}
                  >
                    <Image
                      src={url}
                      width={500}
                      height={index === 0 ? 800 : 207}
                      className={`w-full ${
                        index === 0
                          ? "h-[240px] sm:h-[520px]"
                          : "h-[100px] sm:h-[255px]"
                      } object-cover object-center rounded-[10px]`}
                      alt={`Image ${index + 1}`}
                    />
                  </Link>
                ))
              ) : (
                <p>NO Image</p>
              )}
            </>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </LightGallery>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MobileGallery;
