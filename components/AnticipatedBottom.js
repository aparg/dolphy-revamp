"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactFormSubmit from "./ContactFormSubmit";

const AnticipatedBottom = ({ isOpen, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [submitbtn, setSubmitbtn] = useState("Get VIP Access");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "noreply@dolphy.ca",
    message: "Interested in Most Anticipated Projects",
    cityy: "Ontario",
    project_namee: "Most Anticipated Projects",
    realtor: "No",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://admin.dolphy.ca/api/anticipated-preconstructions/"
        );
        const data = await response.json();
        setProjects(data.results || []);
      } catch (error) {
        console.error("Error fetching anticipated projects:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProjects();
    }
  }, [isOpen]);

  const formatPrice = (price) => {
    if (!price) return "Pricing not available";
    return `From $${price.toLocaleString("en-CA")}`;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
    setShowRegisterModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white z-50 transform transition-transform duration-300 ease-in-out rounded-t-[20px] shadow-lg max-h-[90vh] overflow-hidden">
        <div className="relative h-full">
          <div className="p-6">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-all duration-200 hover:scale-110"
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

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Most <span className="text-red-600">Anticipated</span> Projects
              </h2>
              <p className="text-gray-600 mt-2 max-w-xl mx-auto">
                Discover the hottest upcoming pre-construction projects
              </p>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="px-4 sm:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                      <div
                        key={project.id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative">
                          <span className="absolute top-3 left-3 bg-white text-red-600 font-bold px-3 py-1 rounded-lg z-10">
                            {index + 1}
                          </span>
                          <span className="absolute top-3 right-3 bg-white text-gray-800 px-3 py-1 rounded-lg z-10">
                            Selling
                          </span>
                          <Link
                            href={`/${project.city?.name?.toLowerCase()}/${
                              project.slug
                            }`}
                          >
                            <div className="aspect-[16/9] relative">
                              <Image
                                src={
                                  project.images?.[0]?.split(",")[0] ||
                                  "/noimage.webp"
                                }
                                alt={project.project_name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                {project.project_name}
                              </h3>
                              <p className="font-semibold text-gray-900 mb-1">
                                {formatPrice(project.price_starting_from)}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {project.project_address}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center py-8">
                    <button
                      onClick={() => setShowRegisterModal(true)}
                      className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Register Now for VIP Access
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute right-4 top-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-all duration-200 hover:scale-110"
            >
              <svg
                className="w-5 h-5"
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

            <div className="text-center mb-6">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900">
                VIP Registration
              </h2>
              <p className="text-gray-600 mt-2">
                Get exclusive access to the most anticipated pre-construction
                projects
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                id="name"
                value={credentials.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-center focus:ring-1 focus:ring-black focus:bg-white transition-colors"
              />

              <input
                type="tel"
                id="phone"
                value={credentials.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-center focus:ring-1 focus:ring-black focus:bg-white transition-colors"
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                {submitbtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AnticipatedBottom;
