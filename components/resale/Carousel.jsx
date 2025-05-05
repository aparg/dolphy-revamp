"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ urls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const scrollRef = useRef();
  const stickyRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 40);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const thumbnail = scrollRef.current.children[currentIndex];
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + urls.length) % urls.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (window && window.scrollY > 10) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollThumbnails = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 100;
      scrollRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="w-full mx-auto block sm:hidden" id="carousel">
        <div className="relative aspect-16/14 mb-2 rounded-lg overflow-hidden">
          <img
            src={urls[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
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
        </div>
      </div>
      <div
        ref={stickyRef}
        className={`w-full flex justify-start top-[2rem] bg-white sticky z-50 sm:hidden scroll-smooth transition-all duration-300 ${
          isSticky ? "py-1" : "py-2"
        }`}
      >
        {/* <button
          onClick={() => scrollThumbnails("prev")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft
            className={`${isSticky ? "w-3 h-3" : "w-4 h-4"} text-gray-800`}
          />
        </button> */}
        <div
          className="flex space-x-2 max-w-[97vw] overflow-x-auto scrollbar-hide px-1 py-2"
          ref={scrollRef}
        >
          {urls.map((url, index) => (
            <div
              key={index}
              className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                currentIndex === index ? "ring-2 ring-blue-500" : ""
              } ${isSticky ? "w-14 h-14" : "w-16 h-16"}`}
              onClick={() => goToSlide(index)}
            >
              <img
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollThumbnails("next")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-all"
        >
          <ChevronRight
            className={`${isSticky ? "w-3 h-3" : "w-4 h-4"} text-gray-800`}
          />
        </button>
      </div>
    </>
  );
};

export default Carousel;
