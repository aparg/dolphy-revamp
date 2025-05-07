"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import RequestModal from "@/components/RequestModal";
import ContactFormSubmit from "@/components/ContactFormSubmit";
import { FileText } from "lucide-react";

export default function FloorPlanSection({ projectName, floorPlans = [] }) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    realtor: "No",
    project_namee: projectName || "Pre construction Homes",
    cityy: "Ontario",
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

  const handleViewRequest = (planType) => {
    setCredentials((prev) => ({
      ...prev,
      message: `I would like to request floor plan information for ${planType} units at ${projectName}. Thank you`,
    }));
    setShowContactModal(true);
  };

  // Generic floor plan types
  const floorPlanTypes = [
    {
      type: "1 Bedroom + Den Units",
      description: "With home office space",
    },
    {
      type: "2 Bedroom Units",
      description: "Perfect for families",
    },
    {
      type: "2 Bedroom + Den Units",
      description: "Extra flex space",
    },
    {
      type: "3 Bedroom Units",
      description: "Spacious layout",
    },
  ];

  return (
    <div className="w-full bg-white py-16">
      <div>
        <h2 className="text-xl md:text-3xl font-extrabold mb-2">Floor Plans</h2>
        {/* Table Header */}
        <div className="bg-[#e3e3e3] text-black grid grid-cols-3 p-4 rounded-t-xl text-sm">
          <div>Unit Type</div>
          <div>Description</div>
          <div className="text-center">Floor Plans</div>
        </div>

        {/* Floor Plans List */}
        <div className="border-x border-b border-gray-200 rounded-b-xl">
          {floorPlanTypes.map((plan, index) => (
            <div
              key={index}
              className="grid grid-cols-3 p-4 border-b border-gray-200 hover:bg-gray-50 items-center group transition-colors duration-200"
            >
              <div className="text-sm font-medium">{plan.type}</div>
              <div className="text-gray-600 text-sm">{plan.description}</div>
              <div className="text-center">
                <Button
                  onClick={() => handleViewRequest(plan.type)}
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-colors flex items-center gap-2 mx-auto text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>View PDF</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Section */}
        <div className="mt-4 text-xs text-gray-500 italic">
          * Floor plans and availability may vary. Contact us for detailed
          information.
        </div>
      </div>

      {showContactModal && (
        <RequestModal
          requestType="floor-plans"
          credentials={credentials}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          handleCloseModal={() => setShowContactModal(false)}
          projectName={projectName}
          submitBtn={submitBtn}
        />
      )}
    </div>
  );
}
