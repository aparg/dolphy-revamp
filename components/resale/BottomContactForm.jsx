"use client";
import { useState } from "react";
// import ContactFormSubmit from "./ContactFormSubmit";
import React from "react";
// import { useUser } from "@clerk/nextjs";
import { sendEmail } from "@/app/_resale-api/resend";

export default function BottomContactForm(props) {
  const [submitbtn, setSubmitbtn] = useState("Contact now");
  const contactType = "contact";
  // const { isLoaded, isSignedIn, user } = useUser();
  // const leadEmail = user?.emailAddresses[0].emailAddress;
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: props.defaultmessage,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const clearCredentials = () => {};
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await sendEmail({
      content: credentials,
      page: "Bottom Contact Form",
      title: "Inquiry from Contact Form",
    });
    setCredentials({
      name: "",
      phone: "",
      email: "",
      realtor: "No",
      message: props.defaultmessage,
    });
    // ContactFormSubmit(
    //   credentials,
    //   setSubmitbtn,
    //   setCredentials,
    //   contactType,
    //   leadEmail
    // );
  };
  return (
    <form
      method="POST"
      onSubmit={(e) => handleFormSubmit(e)}
      className="max-w-4xl mx-auto"
      id=""
    >
      <div className="row row-cols-2 g-4 me-0">
        <div className="col mb-2">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
            className="px-2 py-4 w-full border-2 rounded-md"
          />
        </div>
        <div className="col">
          <div className="mb-2">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
              required={true}
              className="px-2 py-4 w-full border-2 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-2">
            <input
              type="email"
              aria-describedby="emailHelp"
              placeholder="Your email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={(e) => handleChange(e)}
              className="px-2 py-4 w-full border-2 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1 ">
        <div className="col">
          <div className="mb-2 ">
            <div className="form-floating border-2 rounded-md">
              <label
                htmlFor="floatingSelect"
                className="text-xs mb-4 ml-4 text-gray-500"
              >
                Are you a first time home buyer??{" "}
              </label>
              <select
                className="form-select block w-full py-[0.375rem] px-[2.25rem] pr-[0.375rem] pl-[0.75rem] text-base font-normal text-[#212529] bg-white focus-visible:outline-none"
                id="realtor"
                aria-label="Floating label select example"
                value={credentials.realtor}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row me-0">
        <div className="mb-2">
          <textarea
            id="message"
            name="message"
            className="px-2 py-4 w-full border-2 rounded-md mess"
            rows="3"
            cols="50"
            placeholder="Enter your message here"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <input
        type="submit"
        value={submitbtn}
        className="py-3 rounded-lg bg-black w-full mb-2 text-white cursor-pointer"
        id="subbtn"
      />
    </form>
  );
}
