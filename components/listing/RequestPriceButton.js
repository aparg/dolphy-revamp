"use client";

import { useState } from "react";
import RequestModal from "@/components/RequestModal";
import ContactFormSubmit from "@/components/ContactFormSubmit";

export default function RequestPriceButton({ projectName, city, text }) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
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
    ContactFormSubmit(credentials, setSubmitBtn, setCredentials);
    const timer = setTimeout(() => {
      setShowContactModal(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const handleClick = () => {
    setCredentials((prev) => ({
      ...prev,
      message: `Please send me the price list information about ${projectName}. Thank you`,
    }));
    setShowContactModal(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="text-xs flex items-center justify-center gap-0.5 text-green-700 hover:text-white hover:bg-green-700 border border-green-700 py-1 px-2 rounded-full font-normal transition-all duration-200"
      >
        {text ? text : "Request Price Lists"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </button>

      {showContactModal && (
        <RequestModal
          requestType="price-list"
          credentials={credentials}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          handleCloseModal={() => setShowContactModal(false)}
          projectName={projectName}
          submitBtn={submitBtn}
        />
      )}
    </>
  );
}
