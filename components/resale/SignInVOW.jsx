"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";

const SignInVOW = ({ setSignedIn }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);

  // Validate form inputs
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    setFormValid(emailRegex.test(email) && phoneRegex.test(phone));
  }, [email, phone]);

  const submitCredentials = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (isLocalStorageAvailable()) {
        localStorage.setItem("sign-in-vow", JSON.stringify({ email, phone }));
      }
      setIsSubmitting(false);
      setOpen(false);
      setSignedIn(true);
    }, 800);
  };

  const handlePhoneInput = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, "");
    // Limit to 10 digits
    setPhone(value.substring(0, 10));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-black text-white border-2 border-black rounded-full 
                  px-4 py-2 hover:scale-105 transition-all duration-300 
                  text-xs sm:text-sm font-medium shadow-md"
      >
        Sign in to view
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-md rounded-xl p-6 shadow-xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center font-semibold text-2xl sm:text-3xl">
            Sign in to view details
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 mt-2">
            Enter your information to access exclusive content
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col space-y-4" onSubmit={submitCredentials}>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email-vow-signin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 
                        focus:border-black focus:ring-1 focus:ring-black focus:outline-none
                        transition-all duration-200 peer placeholder-transparent"
              placeholder="Email"
            />
            <label
              htmlFor="email-vow-signin"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600
                        transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              id="phone-vow-signin"
              value={phone}
              onChange={handlePhoneInput}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 
                        focus:border-black focus:ring-1 focus:ring-black focus:outline-none
                        transition-all duration-200 peer placeholder-transparent"
              placeholder="Phone Number"
            />
            <label
              htmlFor="phone-vow-signin"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600
                        transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                        peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black"
            >
              Phone Number (10 digits)
            </label>
            {phone && phone.length !== 10 && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a 10-digit phone number
              </p>
            )}
          </div>

          <DialogFooter className="mt-6 sm:mt-8">
            <button
              type="submit"
              disabled={!formValid || isSubmitting}
              className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300
                        ${
                          formValid && !isSubmitting
                            ? "bg-black hover:bg-gray-800 cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </DialogFooter>

          <p className="text-xs text-center text-gray-500 mt-4">
            We respect your privacy and will never share your information.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInVOW;
