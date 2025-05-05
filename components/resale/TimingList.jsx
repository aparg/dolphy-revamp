"use client";
import React, { useState } from "react";
import TimingOption from "./TimingOption";

const timings = [
  {
    name: "Morning",
    time: "8am-12pm",
  },
  {
    name: "Afternoon",
    time: "12pm-4pm",
  },
  {
    name: "Evening",
    time: "4pm-8pm",
  },
];
const TimingList = ({ handleChange }) => {
  const [selected, setSelected] = useState();
  return (
    <div className="max-w-[90%] flex space-x-2 justify-between mt-4">
      {timings.map((timing) => (
        <TimingOption
          selected={selected == timing.name}
          setSelected={setSelected}
          handleChange={handleChange}
          timing={timing}
          key={timing}
        />
      ))}
    </div>
  );
};

export default TimingList;
