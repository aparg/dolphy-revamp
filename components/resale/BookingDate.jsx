"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import BookingDateOption from "./BookingDateOption";
import TimingList from "./TimingList";
import BookingType from "./BookingType";
import DateSelector from "./DateSelector";

const BookingDate = ({ bannerImage, address, city }) => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [maxScroll, setMaxScroll] = useState(0);
  const cardRef = useRef(null);

  //slide right and left code for cardref and containerref
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [phone, setPhone] = useState("");
  const [timing, setTiming] = useState({
    type: "",
    date: "",
    time: "",
    phone: "",
  });
  const slideLeft = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = 300; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = 300; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };
  function getDaysInMonth(year, month) {
    // Get the number of days in a month
    return new Date(year, month + 1, 0).getDate();
  }

  function getSevenDaysStartingTomorrow() {
    const today = new Date();
    const daysArray = [];

    for (let i = 1; i <= 7; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );
      const day = date.getDate();
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 3);
      const monthName = date
        .toLocaleDateString("default", { month: "long" })
        .slice(0, 3);
      const month = date.getMonth() + 1; // Month is 0-indexed, so we add 1 to get the correct month
      const year = date.getFullYear();

      daysArray.push({
        day,
        dayName,
        month: monthName,
        monthNumber: month,
        year,
        selected: false,
      });
    }

    // select option for any date
    // daysArray.unshift({
    //   day: "Any",
    //   month: "",
    //   dayName: "",
    //   selected: false,
    //   time: "",
    // });

    return daysArray;
  }
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const [daysArray, setDaysArray] = useState(
    getSevenDaysStartingTomorrow(year, month)
  );
  const selectOption = (e, data) => {
    const updatedDaysArray = daysArray.map((day) => {
      if (day.day === data.day) {
        return { ...day, selected: true };
      } else {
        return { ...day, selected: false };
      }
    });
    setDaysArray(updatedDaysArray);
    handleChange(e);
  };

  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    setTiming((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitData = () => {
    /* console.log(timing); */
  };

  return (
    <div
      id="bookTour"
      className="relative z-0 w-full rounded-md bg-very-light-gray flex items-center mt-12 sm:mt-24"
    >
      <div className="flex sm:flex-row flex-col w-full overflow-hidden">
        <div className="w-full sm:w-1/2">
          <img
            src={bannerImage}
            alt="property-img"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full sm:w-1/2 sm:mx-2 p-4 flex flex-col justify-center items-center">
          {/**Schedule a viewing form */}
          <h1 className="font-semibold text-3xl my-2 text-center">
            Schedule a viewing
          </h1>

          <DateSelector address={address} city={city} />
        </div>
      </div>
    </div>
  );
};

export default BookingDate;
