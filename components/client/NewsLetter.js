"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const pathname = usePathname();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://admin.dolphy.ca/api/newsletter/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          page_url: pathname,
          city: pathname.split("/")[1] || "toronto", // Default to toronto if no city in URL
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
    }
  };

  const isResalePage = pathname.includes("/resale");

  return (
    !isResalePage && (
      <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-pink-50 to-white mt-40 pb-80">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern
                id="home-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                {/* Simple house pattern */}
                <path
                  d="M50 20 L80 50 L80 80 L20 80 L20 50 Z M40 60 H60 V80 H40 V60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                {/* Curved line pattern */}
                <path
                  d="M0 90 Q 25 70, 50 90 T 100 90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-pattern)" />
          </svg>
        </div>
        {/* Content Container */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-5xl  font-extrabold leading-[1.2] md:leading-[1.2] text-black pb-2">
              Notify Me of New Projects
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-700">
              Send me information about new projects that are launching or
              selling
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Join Dolphy community of{" "}
              <span className="font-semibold">500,000+ Buyers & Investors</span>{" "}
              today!
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="mt-12">
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-4 py-3.5 text-base text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-2xl text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Notify me
              </button>
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <p className="mt-4 text-sm text-green-600 text-center font-medium">
                ✨ Thank you for subscribing! We'll keep you updated.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-600 text-center font-medium">
                Something went wrong. Please try again.
              </p>
            )}
          </form>

          {/* Optional: Add social proof or additional info */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              No spam, ever
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Unsubscribe anytime
            </span>
          </div>
        </div>
      </section>
    )
  );
};

export default NewsLetter;
