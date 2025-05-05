"use client";
import React, { useState } from "react";
const BookingType = ({ handleChange }) => {
  const [selected, setSelected] = useState();
  return ["In Person", "Video Tour"].map((opt, idx) => (
    <BookingTypeOption
      selected={selected == opt}
      opt={opt}
      handleChange={handleChange}
      setSelected={setSelected}
      key={idx}
    />
  ));
};

const BookingTypeOption = ({ selected, opt, handleChange, setSelected }) => {
  return (
    <button
      className={`rounded-full py-1 px-4 ${
        selected && `bg-light-lime-50 border-2 border-black`
      }`}
      onClick={(e) => {
        handleChange(e);
        setSelected(opt);
      }}
      id="type"
      value={opt}
    >
      {opt}
    </button>
  );
};

export default BookingType;
