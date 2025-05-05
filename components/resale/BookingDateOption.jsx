"use client";
import React from "react";

const BookingDateOption = React.forwardRef(
  ({ data, handleChange, selected, year }, ref) => {
    return (
      <div className=" h-[75px] min-w-[75px]">
        <button
          className={`flex flex-col w-full h-full justify-center  items-center mr-1 rounded-md cursor-pointer overflow-clip ${
            selected
              ? `bg-light-lime border-black border-2 text-black`
              : `border-gray-400 border-2 text-gray-800 `
          }`}
          ref={ref}
          value={`${
            data.day === "Any"
              ? `any`
              : `${year}-${String(data.monthNumber).padStart(2, "0")}-${String(
                  data.day
                ).padStart(2, "0")}`
          }`}
          onClick={(e) => handleChange(e)}
          id="date"
        >
          <span className="font-thin uppercase text-sm leading-6">
            {data.dayName}
          </span>
          <span className="font-medium text-2xl leading-6">{data.day} </span>
          <span className="font-thin text-sm leading-6">{data.month} </span>
        </button>
      </div>
    );
  }
);

export default BookingDateOption;
