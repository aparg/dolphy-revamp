"use client";

import { useState } from "react";

export default function ApplicationForm() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-medium-black">
            Apply now
          </h2>
          <p className="mt-6 text-sm text-gray-600 max-w-2xl mx-auto">
            Join our team of hand-selected agents who are committed to fostering
            more meaningful connections with buyers and sellers.
          </p>
          <p className="mt-2 text-black text-xs italic max-w-xl mx-auto">
            Minimum requirement: 5 transactions in the last 12 months
          </p>
        </div>

        <form className="space-y-6 max-w-2xl mx-auto">
          <div>
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-transparent bg-white"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-transparent bg-white"
              required
            />
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-transparent bg-white"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="City"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-transparent bg-white"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Current brokerage name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-transparent bg-white"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Social media link (recommended)"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Upload copy of office generated All Written Deals Report for last
              3 years
            </label>
            <input
              type="file"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-transparent bg-white"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-12 py-4 bg-[#000000] text-white rounded-full font-semibold hover:bg-[#1a1a1a] transition-colors text-lg"
            >
              Apply now
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6 max-w-xl mx-auto">
            By submitting this information, I acknowledge I have read and agree
            to the Terms of use, including its Privacy section.
          </p>
        </form>
      </div>
    </section>
  );
}
