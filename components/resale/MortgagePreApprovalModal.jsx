"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactFormSubmit from "@/components/ContactFormSubmit";

const MortgagePreApprovalModal = ({ housePrice, handleCloseModal }) => {
  const [submitBtn, setSubmitBtn] = useState("Request Pre-Approval");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: `I'm interested in getting pre-approved for a mortgage for a property priced at ${
      housePrice ? `$${housePrice}` : "your listing"
    }. Please contact me with information about mortgage pre-approval options.`,
    realtor: "No",
    property_price: housePrice || "",
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
    ContactFormSubmit(credentials, setSubmitBtn, setCredentials);
    // Close modal after successful submission
    const timer = setTimeout(() => {
      handleCloseModal();
    }, 2000);
    return () => clearTimeout(timer);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn("Submitting...");
    await handleFormSubmit(e);
    setSubmitBtn("Request Pre-Approval");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[10px] shadow-large w-full max-w-sm relative m-4">
        <button
          onClick={handleCloseModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-center gap-4 sm:gap-4 mb-6">
            <div className="mt-5">
              <h2 className="text-sm sm:text-lg font-bold text-black leading-none text-center">
                Mortgage Pre-Approval
              </h2>
              <p className="text-[11px] sm:text-[11px] text-[#2C2C2C] flex items-center text-center justify-center">
                Check how much you will be approved for
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                value={credentials.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
                required
              />
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={credentials.phone}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Your email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
              required
            />

            <textarea
              name="message"
              id="message"
              value={credentials.message}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] h-[100px] sm:h-[120px] resize-none text-xs sm:text-xs placeholder:text-xs"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 sm:py-4 rounded-xl text-[15px] sm:text-[16px] font-medium hover:bg-gray-800 transition duration-200"
            >
              {submitBtn}
            </button>

            <p className="text-[10px] sm:text-[8px] text-[#6B7280] text-center leading-tight">
              I agree to receive marketing and customer service calls and text
              messages from Dolphy Technologies. Consent is not a condition of
              purchase. Msg/data rates may apply. Msg frequency varies. Reply
              STOP to unsubscribe. Privacy Policy & Terms of Service.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MortgagePreApprovalModal;
