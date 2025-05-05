"use client";

import { useState, useEffect } from "react";
import { priceFormatter } from "@/helpers/priceFormatter";
import { LineChart, Bell, User, Mail, Phone } from "lucide-react";
import ContactFormSubmit from "@/components/ContactFormSubmit";

export default function AveragePriceCard({ averagePrice }) {
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Start Price Tracking");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "Price tracking subscription",
    realtor: "No",
  });

  // Check localStorage on component mount
  useEffect(() => {
    const trackingStatus = localStorage.getItem("priceTracking");
    if (trackingStatus === "true") {
      setIsTracking(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    ContactFormSubmit(formData, setSubmitBtn, setFormData);
    localStorage.setItem("priceTracking", "true");
    setIsTracking(true);
    setTimeout(() => {
      setIsTrackingModalOpen(false);
    }, 2000);
  };

  const handleToggleTracking = () => {
    if (!isTracking) {
      setIsTrackingModalOpen(true);
    } else {
      // If already tracking, show confirmation before stopping
      if (window.confirm("Are you sure you want to stop tracking prices?")) {
        localStorage.removeItem("priceTracking");
        setIsTracking(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 bg-white rounded-full py-1 px-4 shadow-lg border border-gray-200 md:rounded-xl md:py-1.5">
        <div className="flex items-center gap-2 md:gap-3">
          <div>
            <div className="hidden md:block text-[11px] font-medium text-gray-600 uppercase tracking-wide">
              Average Price
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-bold text-gray-900">
                ${priceFormatter(averagePrice.toFixed(0))}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3 md:border-l md:pl-4 border-gray-200">
          <Bell className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
          <span className="text-xs md:text-sm text-gray-600 hidden md:inline">
            Track prices
          </span>
          <button
            onClick={handleToggleTracking}
            className={`relative w-8 md:w-10 h-4 md:h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isTracking
                ? "bg-green-500 focus:ring-green-500"
                : "bg-gray-200 focus:ring-gray-400"
            }`}
          >
            <div
              className={`absolute top-0.5 w-3 md:w-4 h-3 md:h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
                isTracking ? "left-4 md:left-5" : "left-0.5"
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Price Tracking Modal */}
      {isTrackingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
          <div className="absolute md:relative bottom-0 left-1/2 -translate-x-1/2 md:transform-none md:translate-x-0 md:left-auto md:bottom-auto bg-white rounded-xl md:rounded-xl p-4 sm:p-6 w-[400px] md:max-w-md md:w-full md:mx-4 shadow-large md:mt-0 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 md:mb-6 sticky top-0 bg-white py-2">
              <div className="flex items-center gap-3">
                <LineChart className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Track Price Changes
                </h3>
              </div>
              <button
                onClick={() => setIsTrackingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 -m-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors peer placeholder-transparent text-base"
                  required
                  placeholder="Name"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <label
                  htmlFor="name"
                  className="absolute left-12 -top-2.5 bg-gray-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-12 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  Name
                </label>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-12 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors peer placeholder-transparent text-base"
                  required
                  placeholder="Email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <label
                  htmlFor="email"
                  className="absolute left-12 -top-2.5 bg-gray-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-12 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  className="block w-full pl-12 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors peer placeholder-transparent text-base"
                  placeholder="Phone"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <label
                  htmlFor="phone"
                  className="absolute left-12 -top-2.5 bg-gray-50 px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-12 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  Phone (optional)
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3.5 px-4 rounded-xl hover:bg-gray-800 transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex items-center justify-center gap-2 mt-2"
              >
                {submitBtn === "Submitting..." ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Bell className="w-5 h-5" />
                )}
                {submitBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
