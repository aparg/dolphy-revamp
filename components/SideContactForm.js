"use client";

import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";
import { useRouter } from "next/navigation";

export default function SideContactForm({
  projectName,
  city,
  partnerdata,
  message,
  image = true,
}) {
  const [submitbtn, setSubmitbtn] = useState("Send Me Latest Info");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message:
      message ||
      `Please send me additional information about ${projectName}. Thank you`,
    realtor: "No",
    project_namee: projectName || "Pre construction Homes",
    cityy: city || "Ontario",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    gtag_report_conversion();
    console.log(credentials);
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials)
      .then((res) => router.push("/thank-you"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full">
      <div className="bg-white rounded-[10px] shadow-large p-3 sm:p-4 w-full">
        <div className="flex items-center justify-center gap-20 sm:gap-4 mb-3 sm:mb-3">
          <div className="w-[90px] h-[90px] sm:w-[80px] sm:h-[80px] relative">
            {partnerdata?.[0] ? (
              <div className="w-full h-full bg-[#FFA62B] rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px]">
                <img
                  src={partnerdata[0].image}
                  alt={partnerdata[0].name}
                  className="w-full h-full object-cover rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px]"
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] overflow-hidden">
                <img
                  src="/milan-2.png"
                  alt="Default Agent"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="mt-2">
            <h2 className="text-[16px] sm:text-2xl font-bold text-black leading-none text-center">
              Priority List
            </h2>
            <p className="text-[9px] sm:text-[14px] text-[#2C2C2C] flex items-center text-center justify-center">
              Be the first one to know
              {/* <img
              src="/cc.png"
              alt="verified"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1"
            /> */}
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

          <textarea
            name="message"
            id="message"
            placeholder={`Please send me additional information about ${projectName}. Thank you`}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] h-[100px] sm:h-[120px] resize-none text-[14px] sm:text-base placeholder:text-xs"
            value={credentials.message}
            onChange={handleChange}
          ></textarea>

          <p className="text-[10px] sm:text-[8px] text-[#6B7280] text-center leading-tight mt-0 pt-0">
            I agree to receive marketing and customer service calls and text
            messages from Homebaba Technologies. Consent is not a condition of
            purchase. Msg/data rates may apply. Msg frequency varies. Reply STOP
            to unsubscribe. Privacy Policy & Terms of Service.
          </p>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit px-4 bg-red-600 text-white py-3 sm:py-4 rounded-full text-[15px] sm:text-[16px] font-medium hover:bg-red-700 transition duration-200"
            >
              {submitbtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
