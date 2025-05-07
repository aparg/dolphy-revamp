"use client";
import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";
import { useRouter } from "next/navigation";

export default function BottomContactForm(props) {
  const [submitbtn, setSubmitbtn] = useState("Send a message");
  const router = useRouter();
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
    <div className="max-w-4xl mx-auto my-10">
      {(props?.immage || false) && (
        <>
          <div className="row justify-content-center">
            <img
              src="/contact-bottom-2.png"
              alt="dce"
              className="img-fluid w-36 mb-3 mx-auto"
            />
          </div>
          <h2 className="fw-mine text-center px-md-4 fs-4">
            Contact Dolphy Team Today
          </h2>
        </>
      )}
      <div className="row row-cols-1 row-cols-md-3 mt-3">
        <div className="col-md-3"></div>
        <div className="col-md-6"></div>
        <form
          method="POST"
          className="mb-2"
          onSubmit={(e) => handleFormSubmit(e)}
          id="contactForm"
        >
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 mb-2 px-2">
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                value={credentials.name}
                onChange={(e) => handleChange(e)}
                className="fields fff w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-1/2 px-2">
              <div className="mb-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={credentials.phone}
                  onChange={(e) => handleChange(e)}
                  required={true}
                  className="fields fff w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="mb-2">
                <input
                  type="email"
                  aria-describedby="emailHelp"
                  placeholder="Your email"
                  name="email"
                  id="email"
                  value={credentials.email}
                  onChange={(e) => handleChange(e)}
                  className="fields fff w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="mb-2">
                <div className="relative">
                  <select
                    className="form-select block w-full border border-gray-300 rounded h-14"
                    id="realtor"
                    aria-label="Floating label select example"
                    value={credentials.realtor}
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                  <label
                    htmlFor="floatingSelect"
                    className="absolute left-2 top-1 text-gray-500"
                  >
                    Are you a realtor or working with a realtor?{" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-2 w-full">
              <textarea
                id="message"
                name="message"
                className="fields fff mess w-full p-2 border border-gray-300 rounded"
                rows="3"
                placeholder="Enter your message here"
                value={credentials.message}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
          </div>
          <div className="flex">
            <p className="small-text2 mb-3 text-center">
              I agree to receive marketing and customer service calls and text
              messages from Homebaba Technologies. Consent is not a condition of
              purchase. Msg/data rates may apply. Msg frequency varies. Reply
              STOP to unsubscribe. Privacy Policy & Terms of Service.
            </p>
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              value={submitbtn}
              className="w-full btn btn-call btn-lg mb-2 bg-blue-500 text-white p-2 rounded"
              id="subbtn"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
