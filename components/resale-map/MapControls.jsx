"use client";
import { useState } from "react";

const MapControls = ({ onControlChange }) => {
  const [controls, setControls] = useState({
    schools: false,
    restaurants: false,
    hospitals: false,
    transit: false,
  });

  const handleControlChange = (type) => {
    const newControls = { ...controls, [type]: !controls[type] };
    setControls(newControls);
    onControlChange(type, !controls[type]);
  };

  // SVG icons for each type
  const icons = {
    schools: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#84CC16" stroke="#FFFFFF" strokeWidth="1">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      </svg>
    ),
    restaurants: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FB923C" stroke="#FFFFFF" strokeWidth="1">
        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
      </svg>
    ),
    hospitals: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#EC4899" stroke="#FFFFFF" strokeWidth="1">
        <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
      </svg>
    ),
    transit: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1">
        <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20v1h12v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4z" />
      </svg>
    ),
  };

  return (
    <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 space-y-3">
      <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1 rounded-md">
        <input
          type="checkbox"
          checked={controls.schools}
          onChange={() => handleControlChange("schools")}
          className="form-checkbox h-4 w-4 text-blue-600 rounded"
        />
        <div className="flex items-center space-x-2">
          {icons.schools}
          <span className="text-sm font-medium">Schools</span>
        </div>
      </label>
      <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1 rounded-md">
        <input
          type="checkbox"
          checked={controls.restaurants}
          onChange={() => handleControlChange("restaurants")}
          className="form-checkbox h-4 w-4 text-blue-600 rounded"
        />
        <div className="flex items-center space-x-2">
          {icons.restaurants}
          <span className="text-sm font-medium">Restaurants</span>
        </div>
      </label>
      <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1 rounded-md">
        <input
          type="checkbox"
          checked={controls.hospitals}
          onChange={() => handleControlChange("hospitals")}
          className="form-checkbox h-4 w-4 text-blue-600 rounded"
        />
        <div className="flex items-center space-x-2">
          {icons.hospitals}
          <span className="text-sm font-medium">Hospitals</span>
        </div>
      </label>
      <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1 rounded-md">
        <input
          type="checkbox"
          checked={controls.transit}
          onChange={() => handleControlChange("transit")}
          className="form-checkbox h-4 w-4 text-blue-600 rounded"
        />
        <div className="flex items-center space-x-2">
          {icons.transit}
          <span className="text-sm font-medium">Transit</span>
        </div>
      </label>
    </div>
  );
};

export default MapControls;
