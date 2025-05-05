"use client";

import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";
import { useRouter } from "next/navigation";

export default function SideContactForm(props) {
  const router = useRouter();
  const [submitbtn, setSubmitbtn] = useState("Contact now");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    realtor: "No",
    message: props.defaultmessage,
    proj_name: props.proj_name,
    city: props.city,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    gtag_report_conversion();
    console.log(credentials);
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials)
      .then((res) => router.push("/thank-you"))
      .catch((err) => console.log(err));
  };
  return (
    <form
      method="POST"
      className="mb-3 col-span-1"
      onSubmit={(e) => handleFormSubmit(e)}
      id="contactForm"
    >
      <div className="grid grid-cols-2 gap-1">
        <div className="col mb-3">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
            className="fields fff"
          />
        </div>
        <div className="col">
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
              required={true}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-3">
            <input
              type="email"
              aria-describedby="emailHelp"
              placeholder="Your email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={(e) => handleChange(e)}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="grid me-0 grid-cols-1">
        <div className="col">
          <div className="mb-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="realtor"
                aria-label="Floating label select example"
                value={credentials.realtor}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <label htmlFor="floatingSelect">
                Are you a realtor or working with a realtor?{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="grid me-0">
        <div className="mb-3">
          <textarea
            id="message"
            name="message"
            className="fields fff mess"
            rows="3"
            cols="40"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <input
        type="submit"
        value={submitbtn}
        className="btn bg-dark text-white btn-lg w-full mb-3"
        id="subbtn"
      />
      <div className="flex">
        <p className="text-xs mb-3">
          I agree to receive marketing and customer service calls and text
          messages from Homebaba Technologies. Consent is not a condition of
          purchase. Msg/data rates may apply. Msg frequency varies. Reply STOP
          to unsubscribe. Privacy Policy & Terms of Service.
        </p>
      </div>
    </form>
  );
}
