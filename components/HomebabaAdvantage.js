"use client";
import Heading from "@/components/design/Heading";
import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";

const HomebabaAdvantage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit Registration");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "Builder Registration Request",
    realtor: "No",
    project_namee: "",
    cityy: "",
  });

  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    ContactFormSubmit(formData, setSubmitBtn, setFormData);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-12 md:py-16 px-6 md:px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <Heading
          subtitle="Working hand in hand with leading Pre construction Homes, Condos
          Developers & Industry Partners"
          align="center"
          maxWidth="100%"
          maxWidthsubtitle="238px"
        >
          Join Dolphy's Exclusive Network of
          <span className="text-red-600"> Trusted Builders</span>
        </Heading>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[9/16] overflow-hidden rounded-xl"
          >
            <img
              src={image}
              alt={`Partner ${index + 1}`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 rounded-xl"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 rounded-full text-white px-10 text-lg py-6 transition-colors duration-300 flex items-center gap-2"
        >
          Builder Registration
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] w-full max-w-md relative animate-fadeIn shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
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

            {/* Form */}
            <div className="bg-white rounded-[10px] shadow-large p-6 w-full">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="mt-2">
                  <h2 className="text-2xl font-bold text-gray-900 leading-none">
                    Builder Registration
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Join our network of trusted builders
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none text-[14px]"
                    placeholder="Corporation Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none text-[14px]"
                    placeholder="Email Address"
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none text-[14px]"
                    placeholder="Phone Number"
                  />
                </div>

                <textarea
                  name="message"
                  id="message"
                  placeholder="Tell us about your company and projects..."
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none h-[100px] resize-none text-[14px]"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

                <button
                  type="submit"
                  disabled={submitBtn === "Submitting..."}
                  className={`w-full py-4 rounded-xl text-[16px] font-bold transition-all duration-300 shadow-large ${
                    submitBtn === "Submitting..."
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {submitBtn}
                </button>

                <p className="text-[10px] text-[#6B7280] text-center leading-tight mt-4">
                  By submitting this form, you agree to receive communications
                  from Dolphy Technologies regarding your registration and other
                  services. You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HomebabaAdvantage;
