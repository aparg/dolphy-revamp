"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import swal from "sweetalert";

export default function SidebarContact({
  projectName,
  city,
  partnerdata,
  message,
}) {
  const [submitbtn, setSubmitbtn] = useState("Contact now");
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("=== SidebarContact Form Submission STARTED ===");
    setSubmitbtn("Submitting...");
    try {
      // Log window object availability
      console.log("Window object available:", typeof window !== "undefined");

      // Get the complete URL with multiple methods for debugging
      let fullUrl = "no-url-captured";

      if (typeof window !== "undefined") {
        try {
          // Method 1: Direct href
          fullUrl = window.location.href;
          console.log("Method 1 - window.location.href:", fullUrl);

          // Method 2: Constructing manually
          const protocol = window.location.protocol;
          const host = window.location.host;
          const pathname = window.location.pathname;
          const search = window.location.search;
          const hash = window.location.hash;

          const constructedUrl = `${protocol}//${host}${pathname}${search}${hash}`;
          console.log("Method 2 - Constructed URL:", constructedUrl);

          // Log individual components
          console.log("URL Components:", {
            protocol,
            host,
            hostname: window.location.hostname,
            pathname,
            search,
            hash,
            origin: window.location.origin,
          });

          // Method 3: Using document.URL
          if (typeof document !== "undefined") {
            console.log("Method 3 - document.URL:", document.URL);
          }
        } catch (error) {
          console.error("Error capturing URL:", error);
          fullUrl = "error-capturing-url";
        }
      }

      console.log("Final URL to be used as source:", fullUrl);

      // Log form data being prepared
      console.log("Form data preparation started");
      let form_data = new FormData();
      form_data.append("name", credentials.name);
      form_data.append("email", credentials.email);
      form_data.append("phone", credentials.phone);
      form_data.append("message", credentials.message);
      form_data.append("realtor", credentials.realtor);
      form_data.append("proj_name", credentials.project_namee);
      form_data.append("cityy", credentials.cityy);
      form_data.append("source", fullUrl);
      console.log("Source value appended to form:", fullUrl);

      // Log form data entries if possible
      try {
        console.log("Form data entries:");
        for (let pair of form_data.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
      } catch (e) {
        console.log("Could not log form data entries:", e);
      }

      let url = "https://admin.dolphy.ca/api/contact-form-submit/";
      console.log("Submitting form to:", url);
      const response = await axios.post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        mode: "no-cors",
      });

      console.log("Form submission successful:", response.status);

      setSubmitbtn("Successfully Submitted");
      setTimeout(() => {
        setSubmitbtn("Contact now");
      }, 2000);

      await swal(
        `Thank You, ${credentials.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );

      setCredentials({
        ...credentials,
        name: "",
        phone: "",
        email: "",
        message: "",
      });

      console.log("=== SidebarContact Form Submission COMPLETED ===");
    } catch (error) {
      console.error("Detailed error information:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
      setSubmitbtn("Contact now");
      await swal("Message Failed", "Cannot send your message", "error");
      console.log("=== SidebarContact Form Submission FAILED ===");
    }
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
              Receive a Call
            </h2>
            <p className="text-[9px] sm:text-[9px] text-[#2C2C2C] flex items-center text-center justify-center">
              Dolphy Verified Partner
              <img
                src="/cc.png"
                alt="verified"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1"
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

          <textarea
            name="message"
            id="message"
            placeholder={`Please send me additional information about ${projectName}. Thank you`}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] h-[100px] sm:h-[120px] resize-none text-[14px] sm:text-base placeholder:text-xs"
            value={credentials.message}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 sm:py-4 rounded-xl text-[15px] sm:text-[16px] font-medium hover:bg-gray-800 transition duration-200"
          >
            {submitbtn}
          </button>

          <p className="text-[10px] sm:text-[8px] text-[#6B7280] text-center leading-tight mt-4">
            I agree to receive marketing and customer service calls and text
            messages from Dolphy Technologies. Consent is not a condition of
            purchase. Msg/data rates may apply. Msg frequency varies. Reply STOP
            to unsubscribe. Privacy Policy & Terms of Service.
          </p>
        </form>
      </div>
    </div>
  );
}
