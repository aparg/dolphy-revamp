"use client";
import React, { useRef, useState, useMemo } from "react";
import axios from "axios";
import swal from "sweetalert";

const SideContactForm = ({
  showBookingType = true,
  address,
  city,
  openHouseData,
}) => {
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
    message: `I want to book a showing for ${address}. Thank you!`,
    isOpenHouse: false,
    selectedOpenHouse: null,
  });
  const [submitbtn, setSubmitbtn] = useState("Book a showing");
  const [loading, setLoading] = useState(false);
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

  // Sort open houses by date if available
  const sortedOpenHouses = useMemo(() => {
    if (!openHouseData) return [];
    return [...openHouseData].sort(
      (a, b) => new Date(a.OpenHouseDate) - new Date(b.OpenHouseDate)
    );
  }, [openHouseData]);

  // Function to format date and time more compactly
  const formatOpenHouseDateTime = (date, startTime, endTime) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const formattedStartTime = new Date(startTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const formattedEndTime = new Date(endTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return {
      date: formattedDate,
      time: `${formattedStartTime} - ${formattedEndTime}`,
    };
  };

  const handleOpenHouseSelect = (openHouse) => {
    const { date, time } = formatOpenHouseDateTime(
      openHouse.OpenHouseDate,
      openHouse.OpenHouseStartTime,
      openHouse.OpenHouseEndTime
    );

    setTiming((prev) => ({
      ...prev,
      isOpenHouse: true,
      selectedOpenHouse: openHouse,
      date: date,
      time: time,
      message: `I would like to attend the open house at ${address} on ${date}, ${time}. Thank you!`,
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitbtn("Submitting...");

    try {
      // Get the full URL for source
      const fullUrl = window.location.href;

      let form_data = new FormData();
      form_data.append("full_name", timing.name);
      form_data.append("email", timing.email);
      form_data.append("phone", timing.phoneNumber);
      form_data.append(
        "message",
        timing.message || `Showing request for ${address}`
      );
      form_data.append("realtor", "No");
      form_data.append("proj_name", address || "");
      form_data.append("cityy", city || "");
      form_data.append("source", fullUrl);

      if (timing.date) {
        form_data.append("preferred_date", timing.date);
      }
      if (timing.time) {
        form_data.append("preferred_time", timing.time);
      }

      const url = "https://admin.dolphy.ca/api/contact-form-resale-submit/";
      const response = await axios.post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        mode: "no-cors",
      });

      setLoading(false);
      setSubmitbtn("Successfully Submitted");
      await swal(
        `Thank You, ${timing.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );

      // Reset form
      setTiming({
        type: "",
        date: "",
        email: "",
        time: "",
        phoneNumber: "",
        name: "",
        message: "",
        isOpenHouse: false,
        selectedOpenHouse: null,
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
      setLoading(false);
      setSubmitbtn("Book a showing");
      await swal(
        "Message Failed",
        "Cannot send your message. Please try again.",
        "error"
      );
    }
  };
  return (
    <div className="sticky top-10 z-0 w-full max-w-[1100px] mx-auto rounded-md bg-very-light-gray flex items-center sm:pt-2 sm:mt-0 shadow-2xl">
      <div className="bg-white rounded-[10px] shadow-large p-3 sm:p-4 w-full max-w-[1100px] mx-auto">
        <div className="flex flex-row items-center justify-center gap-x-2 mb-3 sm:mb-3">
          <div className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] relative flex-shrink-0">
            <div className="w-full h-full overflow-hidden">
              <img
                src="/angelablob.png"
                alt="Default Agent"
                className="w-full h-full object-cover rounded-full border border-gray-200 shadow-sm"
              />
            </div>
          </div>
          <div className="min-w-fit flex-1 text-left">
            <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-black leading-none text-left whitespace-nowrap">
              Book a Showing
            </h2>
            <p className="text-[8px] sm:text-xs md:text-sm text-[#2C2C2C] flex items-center text-left whitespace-nowrap">
              Tour this home with Angela
            </p>
          </div>
        </div>

        {sortedOpenHouses.length > 0 && (
          <div className="mb-0 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">
                🏠 Open House Times
              </span>
              <button
                type="button"
                onClick={() =>
                  setTiming((prev) => ({
                    ...prev,
                    isOpenHouse: false,
                    selectedOpenHouse: null,
                    message: `I would like to request a showing for ${address}. Thank you!`,
                  }))
                }
                className={`text-xs ${
                  timing.isOpenHouse
                    ? "text-slate-400 hover:text-slate-900"
                    : "text-gray-400"
                }`}
              >
                Clear
              </button>
            </div>
            <div className="relative">
              <div className="overflow-x-auto pb-2 hide-scrollbar">
                <div className="flex space-x-2 min-w-max">
                  {sortedOpenHouses.map((openHouse) => {
                    const { date, time } = formatOpenHouseDateTime(
                      openHouse.OpenHouseDate,
                      openHouse.OpenHouseStartTime,
                      openHouse.OpenHouseEndTime
                    );
                    return (
                      <button
                        key={openHouse.OpenHouseKey}
                        onClick={() => handleOpenHouseSelect(openHouse)}
                        className={`flex-shrink-0 rounded-xl p-1 border transition-all ${
                          timing.selectedOpenHouse?.OpenHouseKey ===
                          openHouse.OpenHouseKey
                            ? "border-black bg-[#f2f4f5] text-black"
                            : "border-[#f2f4f5] hover:border-black hover:bg-[#f2f4f5]"
                        }`}
                      >
                        <div className="text-xs font-semibold">{date}</div>
                        <div className="text-[11px] text-gray-600">{time}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={submitData} className="space-y-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-2">
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
              value={timing.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone"
              id="phoneNumber"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
              value={timing.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Your email"
            name="email"
            id="email"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px] sm:text-base placeholder:text-xs"
            value={timing.email}
            onChange={handleChange}
            required
          />

          {/* <div className="relative">
            <select
              id="realtor"
              className="w-full px-3 sm:px-4 py-4 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-xs sm:text-xs placeholder:text-xs"
              value={timing.realtor}
              onChange={handleChange}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <div className="absolute top-0 left-4 -translate-y-2 px-1 bg-white">
              <span className="text-[11px] sm:text-xs text-[#6B7280]">
                Are you a realtor or working with a realtor?
              </span>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B7280]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div> */}

          <textarea
            name="message"
            id="message"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E5E7EB] rounded-xl text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] h-[100px] sm:h-[120px] resize-none text-[14px] sm:text-base placeholder:text-xs"
            value={timing.message}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 sm:py-4 rounded-xl text-[15px] sm:text-[20px] font-bold hover:bg-[#e74f36] transition duration-200 shadow-large"
          >
            {loading ? "Sending..." : submitbtn}
          </button>

          <p className="text-[10px] sm:text-[8px] text-[#6B7280] text-center leading-tight mt-4">
            I agree to receive marketing and customer service calls and text
            messages from Dolphy Technologies. Consent is not a condition of
            purchase. Msg/data rates may apply. Msg frequency varies. Reply STOP
            to unsubscribe. Privacy Policy & Terms of Service.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SideContactForm;
