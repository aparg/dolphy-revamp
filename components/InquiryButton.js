"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import RequestModal from "@/components/RequestModal";
import ContactFormSubmit from "@/components/ContactFormSubmit";

export default function InquiryButton({ minimal, city, listing }) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: `I am interested in ${listing.project_name}. Please send me more information.`,
    realtor: "No",
    project_namee: listing.project_name || "Pre construction Homes",
    cityy: city || "Ontario",
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (showContactModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showContactModal]);

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
      setShowContactModal(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const modalContent =
    showContactModal && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setShowContactModal(false)}
            />
            <div className="relative z-[10000] w-full max-w-lg mx-4 zoom-in duration-300">
              <RequestModal
                requestType="general"
                credentials={credentials}
                handleChange={handleChange}
                handleFormSubmit={handleFormSubmit}
                handleCloseModal={() => setShowContactModal(false)}
                projectName={listing.project_name}
                submitBtn={submitBtn}
              />
            </div>
          </div>,
          document.body
        )
      : null;

  if (minimal) {
    return (
      <>
        <button
          onClick={() => setShowContactModal(true)}
          className="mt-3 w-full text-white py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg border border-gray-500 hover:border-gray-200 hover:brightness-110 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          Inquire Now
        </button>
        {modalContent}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowContactModal(true)}
        className="mt-3 bg-white text-black py-1.5 px-4 rounded-full border border-gray-100 font-medium text-sm transition-all duration-300 hover:bg-[#f8f9fa] hover:shadow-lg flex items-center justify-center gap-3 relative overflow-hidden group"
      >
        <div className="flex items-center gap-3 relative z-10">
          <img
            src="/angela.jpeg"
            alt="Agent"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white/90"
          />
          <span className="flex items-center gap-2">Inquire Now</span>
        </div>
      </button>
      {modalContent}
    </>
  );
}
