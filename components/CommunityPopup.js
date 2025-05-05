"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CommunityPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Join Priority List");
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("communityFormSubmitted");
    const lastClosed = localStorage.getItem("communityPopupLastClosed");
    const today = new Date().toDateString();
    const resalePage = pathname.includes("/resale");

    // Only set up exit intent if conditions are met
    if (!hasSubmitted && (!lastClosed || lastClosed !== today) && !resalePage) {
      // Track mouse position for exit intent
      let mouseY = 0;

      const handleMouseMove = (e) => {
        // Only track if mouse is moving upward (toward top of page)
        if (e.clientY < mouseY) {
          // If mouse is in the top 20% of the page, show popup
          if (e.clientY < window.innerHeight * 0.2) {
            setIsOpen(true);
            // Remove event listener after showing popup
            document.removeEventListener("mousemove", handleMouseMove);
          }
        }
        mouseY = e.clientY;
      };

      // Add event listener for mouse movement
      document.addEventListener("mousemove", handleMouseMove);

      // Clean up event listener on component unmount
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [pathname]);

  const handleClose = () => {
    localStorage.setItem("communityPopupLastClosed", new Date().toDateString());
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn("Submitting...");

    try {
      const response = await fetch("https://admin.dolphy.ca/api/newsletter/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          page_url: pathname,
          city: pathname.split("/")[1] || "toronto",
          subscribed_at: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.email?.[0]?.includes("already exists")) {
          setSubmitBtn("Email already subscribed!");
          setTimeout(() => {
            setIsOpen(false);
            setFormData({ name: "", email: "", phone: "" });
            setSubmitBtn("Join Priority List");
          }, 2000);
          return;
        }
        throw new Error("Failed to subscribe");
      }

      setSubmitBtn("Successfully Subscribed!");
      localStorage.setItem("communityFormSubmitted", "true");
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ name: "", email: "", phone: "" });
        setSubmitBtn("Join Priority List");
      }, 2000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubmitBtn("Failed to subscribe. Try again");
      setTimeout(() => {
        setSubmitBtn("Join Priority List");
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;
  const isResalePage = pathname.includes("resale");

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 ${
        isResalePage ? "hidden" : ""
      }`}
    >
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Container with SVG Background */}
      <div className="relative bg-white shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="50%" cy="0" r="160" fill="url(#gradient1)" />
            <circle cx="10%" cy="90%" r="120" fill="url(#gradient2)" />
            <defs>
              <radialGradient
                id="gradient1"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="#FF3A3A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF3A3A" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="gradient2"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="#3A3AFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3A3AFF" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Close Button with Animation */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="Close popup"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-300 z-20 bg-white bg-opacity-80 rounded-full p-1 cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content Container */}
        <div className="relative z-10 p-4">
          {/* Header with Ribbon */}
          <div className="relative mb-8">
            {/* Profile Image with Border Animation */}
            <div className="flex justify-center mt-2">
              <div className="relative rounded-full p-1 ">
                <div className="bg-white p-1 rounded-full">
                  <Image
                    src="/angela.jpeg"
                    alt="Real Estate Agent"
                    width={200}
                    height={200}
                    className="rounded-full w-[140px] h-[140px] object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Title with Gradient */}
            <h2 className="text-2xl font-extrabold text-center mt-1 mb-1 ">
              JOIN HOMEBABA COMMUNITY
            </h2>
            <p className="text-gray-600 text-center text-sm italic">
              Be the First to Know About New Projects!
            </p>
          </div>

          {/* Form with Enhanced Design */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="group focus-within:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 h-14 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                />
              </div>
            </div>

            <div className="group focus-within:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 h-14 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                />
              </div>
            </div>

            <div className="group focus-within:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 h-14 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Animated Submit Button */}
            <button
              type="submit"
              disabled={submitBtn === "Submitting..."}
              className="w-full py-4 h-14 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 overflow-hidden relative"
            >
              <span className="relative z-10">{submitBtn}</span>
              <span className="absolute inset-0 bg-white opacity-20 transform -translate-x-full hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
            </button>

            {/* Privacy Note */}
            <p className="text-[0.5rem] text-center text-gray-500 mt-2 leading-[0.9rem]">
              By submitting this form, I consent to receive marketing emails,
              calls, and texts from Dolphy Technologies. Message and data rates
              may apply. Frequency may vary. See our{" "}
              <a href="/privacy" className="text-red-500">
                Privacy Policy
              </a>{" "}
              &{" "}
              <a href="/privacy" className="text-red-500">
                Terms of Service
              </a>
              . You can email us to unsubscribe.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
