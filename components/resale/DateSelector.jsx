import React, { useRef, useState } from "react";
import BookingType from "./BookingType";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import BookingDateOption from "./BookingDateOption";
import TimingList from "./TimingList";
import { sendEmail } from "@/app/_resale-api/resend";

const DateSelector = ({ showBookingType = true, address, city }) => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [maxScroll, setMaxScroll] = useState(0);
  const cardRef = useRef(null);

  //slide right and left code for cardref and containerref
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [timing, setTiming] = useState({
    type: "",
    date: "",
    email: "",
    time: "",
    phoneNumber: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    for (let i = 1; i <= 8; i++) {
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

  const submitData = async () => {
    setIsSubmitting(true);
    try {
      const sent = await sendEmail({
        content: { ...timing, city },
        page: address,
        title: `Inquiry for property ${address}`,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full">
      {showBookingType && (
        <div className="flex justify-center items-center">
          <span className="tour-type rounded-full bg-light-lime px-1 py-1 mt-2 mb-0">
            <BookingType handleChange={handleChange} />
          </span>
        </div>
      )}
      <div className="flex flex-col justify-center items-center w-full">
        {/* <div className="relative my-2">
          <div className="flex flex-col items-center">
            <div
              // className="flex z-0 scroll-container relative w-full overflow-x-scroll overscroll-x-none no-scrollbar"
              className="grid grid-rows-2 grid-cols-4 gap-x-2 gap-y-2 justify-center items-center"
              // style={{ transform: `translateX(${scrollPosition}px) z-0` }}
              id=""
              ref={scrollRef}
            >
              {daysArray.map((data) => (
                <BookingDateOption
                  ref={cardRef}
                  data={data}
                  key={data.day + data.dayName}
                  handleChange={(e) => {
                    selectOption(e, data);
                  }}
                  selected={data.selected}
                  year={year}
                />
              ))}
            </div>
          </div>
        </div> */}
        {/* <TimingList handleChange={handleChange} /> */}
        {/* <div className="text-md text-center my-2 text-gray-700">
              No obligation or purchase necessary, cancel at any time
            </div> */}
        <div className="relative mt-2 w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder=""
            value={timing.name}
            onChange={(e) => handleChange(e)}
            required={true}
            className="rounded-full bg-white mt-4 fff w-full px-4 pt-5 pb-1 border-b-2 focus:outline-none peer/bookshowingName placeholder:translate-y-1/2 placeholder:scale-100  border-2"
          />
          <label
            htmlFor="name"
            className="absolute left-0 top-5 px-4 text-gray-500 transition-all duration-300 peer-focus/bookshowingName:-translate-y-[0.85] peer-focus/bookshowingName:scale-30 peer-placeholder-shown/bookshowingName:translate-y-1/4 peer-placeholder-shown/bookshowingName:scale-100"
          >
            Name
          </label>
        </div>
        <div className="relative mb-1 mt-2 w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=""
            value={timing.email}
            onChange={(e) => handleChange(e)}
            required={true}
            className="rounded-full bg-white mt-4 fff w-full px-4 pt-5 pb-1 border-b-2 focus:outline-none peer/bookshowingName placeholder:translate-y-1/2 placeholder:scale-100  border-2"
          />
          <label
            htmlFor="name"
            className="absolute left-0 top-5 px-4 text-gray-500 transition-all duration-300 peer-focus/bookshowingName:-translate-y-[0.85] peer-focus/bookshowingName:scale-30 peer-placeholder-shown/bookshowingName:translate-y-1/4 peer-placeholder-shown/bookshowingName:scale-100"
          >
            Email
          </label>
        </div>
        <div className="relative mb-3 w-full border-gray-600">
          <input
            type="text"
            inputMode="numeric"
            name="phoneNumber"
            id="phoneNumber"
            placeholder=""
            value={timing.phoneNumber}
            onChange={(e) => handleChange(e)}
            required={true}
            className="rounded-full bg-white mt-4 fff w-full px-4 pt-5 pb-1 border-b-2 focus:outline-none peer/bookshowingPhone placeholder:translate-y-1/2 placeholder:scale-100 border-2"
          />
          <label
            htmlFor="phoneNumber"
            className="absolute left-0 top-5 px-4 text-gray-500 transition-all duration-300 peer-focus/bookshowingPhone:-translate-y-[0.85] peer-focus/bookshowingPhone:scale-30 peer-placeholder-shown/bookshowingPhone:translate-y-1/4 peer-placeholder-shown/bookshowingPhone:scale-100"
          >
            Phone
          </label>
        </div>

        <input
          type="submit"
          value={
            isSubmitting
              ? "Submitting..."
              : isSubmitted
              ? "Sent!"
              : "Schedule Tour"
          }
          disabled={isSubmitting}
          className={`px-4 py-2 ${
            isSubmitted ? "bg-green-600" : "bg-black"
          } text-white md:py-2 w-40 mb-3 rounded-full hover:cursor-pointer mx-auto text-lg ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          id="subbtn"
          onClick={submitData}
        />
      </div>
    </div>
  );
};

export default DateSelector;
