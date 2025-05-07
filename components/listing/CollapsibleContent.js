"use client";

import { useState, useRef, useEffect } from "react";
import RequestModal from "@/components/RequestModal";
import ContactFormSubmit from "@/components/ContactFormSubmit";

export default function CollapsibleContent({
  title,
  subtitle,
  content,
  maxHeight = 300,
  ctaText,
  ctaType,
  houseDetail,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    realtor: "No",
    project_namee: houseDetail?.project_name || "Pre construction Homes",
    cityy: houseDetail?.city?.name || "Ontario",
  });
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content]);

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

  const handleCtaClick = () => {
    const messageMap = {
      "floor-plans": `Please send me additional floor plans information about ${houseDetail?.project_name}. Thank you`,
      "parking-price": `Please send me additional parking price information about ${houseDetail?.project_name}. Thank you`,
      "locker-price": `Please send me additional locker price information about ${houseDetail?.project_name}. Thank you`,
      "maintenance-fee": `Please send me additional maintenance fee information about ${houseDetail?.project_name}. Thank you`,
    };

    setCredentials((prev) => ({
      ...prev,
      message:
        messageMap[ctaType] ||
        `Please send me additional information about ${houseDetail?.project_name}. Thank you`,
    }));
    setShowContactModal(true);
  };

  return (
    <div className="bg-white overflow-hidden">
      <div>
        <div className="flex flex-row items-end justify-start gap-1 mb-3">
          <h2 className="text-xl md:text-3xl font-extrabold">{title}</h2>
          {ctaText && (
            <button
              onClick={handleCtaClick}
              className="text-xs flex items-center justify-center gap-1 text-green-700 hover:text-white hover:bg-green-700 border border-green-700 py-1 px-2 rounded-full font-normal transition-all duration-200"
            >
              {ctaText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          )}
        </div>
        {/* <div className="bg-[#fcffd9] w-fit p-2 text-black rounded-lg text-sm mb-4">
          {subtitle}
        </div> */}
        <div className="relative">
          <div
            className={`overflow-hidden transition-all duration-300 relative ${
              isExpanded ? "max-h-none" : `max-h-[${maxHeight}px]`
            }`}
          >
            <div
              ref={contentRef}
              className="prose max-w-none text-sm md:text-base text-gray-600"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {!isExpanded && contentHeight > maxHeight && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
          {contentHeight > maxHeight && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 w-full py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isExpanded ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  See Less
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  See More
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {showContactModal && (
        <RequestModal
          requestType={ctaType}
          credentials={credentials}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          handleCloseModal={() => setShowContactModal(false)}
          projectName={houseDetail?.project_name}
          submitBtn={submitBtn}
        />
      )}
    </div>
  );
}
