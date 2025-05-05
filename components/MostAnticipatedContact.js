"use client";

import { useState } from "react";
import Image from "next/image";
import ContactFormSubmit from "@/components/ContactFormSubmit";

export default function MostAnticipatedContact({ projectName, city }) {
  const [submitbtn, setSubmitbtn] = useState("Get VIP Access");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message:
      "I'm interested in receiving VIP access to Most Anticipated Projects. Please send me additional information.",
    realtor: "No",
    project_namee: projectName || "Most Anticipated Projects",
    cityy: city || "Ontario",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
  };

  return (
    <div className="w-full" id="vip-access">
      <div className="bg-white rounded-[10px] shadow-large p-3 sm:p-4 w-full">
        <div className="flex items-center justify-center gap-20 sm:gap-4 mb-3 sm:mb-3">
          <div className="w-[90px] h-[90px] sm:w-[80px] sm:h-[80px] relative">
            <div className="w-full h-full rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] overflow-hidden">
              <Image
                src="/milan-2.png"
                alt="VIP Access Badge"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-[16px] sm:text-2xl font-bold text-black leading-none text-center">
              Get VIP Access
            </h2>
            <p className="text-[9px] sm:text-[9px] text-[#2C2C2C] flex items-center text-center justify-center">
              Exclusive Pre-Launch Access
              <Image
                src="/canadaleaf.svg"
                alt="Canadian Maple Leaf"
                width={16}
                height={16}
                className="ml-1"
              />
            </p>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
              value={credentials.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              id="phone"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
              value={credentials.phone}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Your email"
            name="email"
            id="email"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
            value={credentials.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <select
              id="realtor"
              className="w-full px-3 sm:px-4 py-4 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-xs sm:text-xs placeholder:text-xs"
              value={credentials.realtor}
              onChange={handleChange}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <div className="absolute top-0 left-4 -translate-y-2 px-1 bg-white">
              <span className="text-[11px] sm:text-xs text-[#6B7280]">
                Are you a realtor or working with a realtor?
              </span>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B7280]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 sm:py-4 rounded-xl text-[15px] sm:text-[16px] font-medium hover:bg-gray-800 transition duration-200"
          >
            {submitbtn}
          </button>

          <p className="text-[10px] sm:text-[8px] text-[#6B7280] text-center leading-tight mt-4">
            By registering, you'll receive exclusive VIP access and updates
            about Most Anticipated Projects. I agree to receive marketing
            communications from Dolphy Technologies. Consent is not a condition
            of purchase. Msg/data rates may apply. Reply STOP to unsubscribe.
            Privacy Policy & Terms of Service.
          </p>
        </form>
      </div>
    </div>
  );
}
