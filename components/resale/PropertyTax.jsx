"use client";
import React, { useState, useEffect } from "react";
import { taxRates } from "@/constant/taxes";

const FloatingLabelInput = ({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  disabled,
  type = "text",
}) => (
  <div className="relative mt-4">
    <input
      type={type}
      id={id}
      className={`
        peer w-full h-[60px] px-4 pt-4 pb-1 rounded-md
        bg-white border border-gray-300 text-gray-900 text-base
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        ${prefix ? "pl-8" : ""}
        ${suffix ? "pr-8" : ""}
      `}
      placeholder=" "
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    <label
      htmlFor={id}
      className={`
        absolute top-1 left-4 text-gray-500 text-xs transition-all duration-200
        peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5
        peer-focus:top-1 peer-focus:text-xs 
        ${prefix ? "left-8" : ""}
      `}
    >
      {label}
    </label>
    {prefix && (
      <span className="absolute left-3 top-3.5 text-gray-500">{prefix}</span>
    )}
    {suffix && (
      <span className="absolute right-3 top-3.5 text-gray-500">{suffix}</span>
    )}
  </div>
);

const PropertyTax = () => {
  const [calculatorData, setCalculatorData] = useState({
    propertyValue: "100000",
    propertyType: "residential",
    taxes: {
      cityTax: "",
      educationTax: "",
      cityBuildingFund: "",
      totalTax: "",
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCalculatorData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function calcTax() {
    let calculatedTax = {};
    Object.keys(calculatorData.taxes).forEach((key) => {
      calculatedTax[key] = (
        (parseFloat(calculatorData.propertyValue) *
          taxRates[calculatorData.propertyType][key].rate) /
        100
      ).toFixed(2);
    });
    return calculatedTax;
  }

  useEffect(() => {
    setCalculatorData((prevState) => ({ ...prevState, taxes: calcTax() }));
  }, [calculatorData.propertyValue, calculatorData.propertyType]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden p-8">
      <h2 className="text-5xl font-extrabold text-center">
        Property Tax <span className="text-primary-green">Calculator</span>
      </h2>
      <p className="text-center text-gray-500 mt-1">
        Calculate your monthly mortgage payments based on the home value,
      </p>
      <div className="mb-10"></div>
      <div className="space-y-6">
        <FloatingLabelInput
          id="propertyValue"
          label="Property Value"
          value={calculatorData.propertyValue}
          onChange={handleChange}
          prefix="$"
          type="number"
        />

        <div className="relative">
          <select
            id="propertyType"
            value={calculatorData.propertyType}
            onChange={handleChange}
            className="w-full h-[60px] px-4 pt-2 pb-1 rounded-md border border-gray-300 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
          <label className="absolute top-1 left-4 text-gray-500 text-xs">
            Property Type
          </label>
        </div>

        {Object.entries(calculatorData.taxes).map(([key, value]) => (
          <FloatingLabelInput
            key={key}
            id={key}
            label={`${key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())} (${
              taxRates[calculatorData.propertyType][key].rate
            }%)`}
            value={value}
            onChange={() => {}}
            prefix="$"
            disabled={true}
          />
        ))}
      </div>

      <div className="mt-8 bg-gray-100 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          ${calculatorData.taxes.totalTax}
        </h3>
        <p className="text-gray-600">Estimated Annual Property Tax</p>
      </div>
    </div>
  );
};

export default PropertyTax;
