"use client";
import Image from "next/image";

const FloatingResaleButton = () => {
  const scrollToContact = () => {
    const element = document.getElementById("mycontact");
    if (element) {
      const elementPosition = element.getBoundingClientRect().top - 80;
      const offsetPosition = elementPosition + window.scrollY;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={scrollToContact}
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        md:hidden
        bg-gradient-to-r from-orange-400 to-orange-500
        text-white px-2 py-2 rounded-2xl
        transform transition-all duration-500 ease-in-out
        hover:scale-105 active:scale-95
        flex items-center justify-center
        shadow-lg hover:shadow-2xl
        w-[61%] max-w-md translate-y-0 opacity-100
      `}
    >
      <div className="relative flex items-center gap-4">
        <div className="relative">
          <div className="absolute -top-1 -left-1 w-[50px] h-[50px] bg-orange-300 rounded-full opacity-20"></div>
          <Image
            src="/angela.jpeg"
            alt="Sales Representative, ANCHOR NEW HOMES INC."
            width={48}
            height={48}
            className="rounded-full object-cover ring-2 ring-white/80 relative z-10"
          />
        </div>

        <div className="flex flex-col items-start justify-center">
          <span className="font-semibold text-lg leading-snug">
            Book a Showing
          </span>
          <span className="text-xs text-white/90 flex items-center gap-2">
            Tour this home with Angela
          </span>
        </div>
      </div>
    </button>
  );
};

export default FloatingResaleButton;
