"use state";
import { ChevronLeft } from "lucide-react";
import React from "react";

const Thumbnails = () => {
  const [currentIndex, setCurrentIndex] = useState(currentIndex);
  const scrollRef = useRef();
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + urls.length) % urls.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const scrollThumbnails = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 100; // Adjust this value to control scroll distance
      scrollRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div>
      <div className="flex justify-center bg-white top-0 sticky z-[999]">
        <button
          onClick={() => scrollThumbnails("prev")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-gray-800" />
        </button>
        <div
          className="flex space-x-2 max-w-[22rem] overflow-x-auto scrollbar-hide py-2 px-1"
          ref={scrollRef}
        >
          {urls.map((url, index) => (
            <div
              key={index}
              className={`w-20 h-20 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden ${
                currentIndex === index ? "ring-4 ring-blue-500" : ""
              }`}
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
          <ChevronRight className="w-4 h-4 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default Thumbnails;
