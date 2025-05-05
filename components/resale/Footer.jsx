"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { allCities } from "@/constant/cities";
import { generateURL } from "@/helpers/generateURL";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import NewsletterSignup from "./NewsletterSignup";

const Footer = ({ cities }) => {
  const pathname = usePathname();

  let todaysutc = new Date().toUTCString();
  let year_now = new Date().getFullYear();

  if (pathname.startsWith("/admin")) {
    return null;
  }
  const showFooter = !pathname.includes("/notes-dashboard");
  return (
    showFooter && (
      <>
        <NewsletterSignup />
        <footer className="text-black mt-10">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {/* New homes section */}
              <div>
                <h3 className="text-2xl sm:text-5xl font-extrabold text-center mb-12 font-family2 ">
                  Explore Low rise Homes For Sale In Canada
                </h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 text-sm">
                  {allCities.map((val, idx) => (
                    <li key={idx} className="text-center">
                      <Link
                        href={generateURL({ cityVal: val.city })}
                        className="hover:text-primary-green transition-colors"
                      >
                        Homes for sale in {val.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main footer content */}
              <div className="flex flex-col items-center text-center">
                <div className="max-w-3xl">
                  <div className="flex justify-center">
                    <Link href="/">
                      <div className="flex justify-center mb-5">
                        <Image
                          src="/lowriselogo.svg"
                          alt="Lowrise Logo"
                          width={200}
                          height={200}
                        />
                      </div>
                    </Link>
                  </div>
                  <p className="text-sm leading-relaxed mb-8">
                    Lowrise (“Dolphy.ca”) is a real estate marketplace platform
                    -owned by Dolphy technologies Inc. Lowrise refers potential
                    buyers to real estate agents that are licensed in the
                    province where the respective property is located. Dolphin
                    Realty is licensed as a real estate brokerage in Ontario.
                    <br />
                    <br />
                    IDX information is provided exclusively for consumers’
                    personal, non-commercial use and that it may not be used for
                    any purpose other than to identify prospective properties
                    consumers may be interested in purchasing. The information
                    displayed herein is not intended to solicit a trade in real
                    estate. Information deemed reliable but not guaranteed to be
                    accurate. Listing information updated daily.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                      <address className="not-italic text-sm">
                        <p></p>
                        <p>8300 Woodbine Ave, Markham, ON L3R 9Y7</p>
                        <p>Phone: 289-302-6322</p>
                        <p>
                          Email:{" "}
                          <Link
                            href="mailto:info@dolphy.ca"
                            className="text-blue-600 hover:underline"
                          >
                            info@dolphy.ca
                          </Link>
                        </p>
                      </address>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                      <div className="flex justify-center space-x-4">
                        <Link
                          href="https://www.facebook.com/profile.php?id=100078509119684"
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <FaFacebook size={24} />
                        </Link>
                        <Link
                          href="https://www.instagram.com/dolphin_realty/"
                          className="text-gray-600 hover:text-pink-600 transition-colors"
                        >
                          <FaInstagram size={24} />
                        </Link>
                        <Link
                          href="https://www.youtube.com/watch?v=DOr8JTMaQG0&t=1s"
                          className="text-gray-600 hover:text-blue-800 transition-colors"
                        >
                          <FaYoutube size={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo and copyright */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center space-y-4 gap-4">
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src="/logo/trebb.png"
                    alt="TREBB Logo"
                    className="w-28"
                  />
                  <p className="text-xs text-gray-500 max-w-2xl text-center">
                    Toronto Real Estate Board (TRREB); All information deemed
                    reliable but not guaranteed. All properties are subject to
                    prior sale, change or withdrawal. Neither listing broker(s)
                    or information provider(s) shall be responsible for any
                    typographical errors, misinformation, misprints and shall be
                    held totally harmless. Listing(s) information is provided
                    for consumer's personal, non-commercial use and may not be
                    used for any purpose other than to identify prospective
                    properties consumers may be interested in purchasing. The
                    data relating to real estate for sale on this website comes
                    in part from the Internet Data Exchange program of the
                    Multiple Listing Service. Real estate listings held by
                    brokerage firms other than Dolphin Realty Inc. may be marked
                    with the Internet Data Exchange logo and detailed
                    information about those properties will include the name of
                    the listing broker(s) when required by the MLS. Copyright
                    ©2024 All rights reserved. Last Updated: {todaysutc} UTC
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <img src="/crea.png" alt="TREBB Logo" className="w-28" />
                  <p className="text-xs text-gray-500 max-w-2xl text-center">
                    The listing data displayed is deemed reliable but is not
                    guaranteed accurate by CREA®. Data last updated on{" "}
                    {todaysutc} UTC The trademarks REALTOR®, REALTORS®; and the
                    REALTOR® logo are controlled by The Canadian Real Estate
                    Association (CREA®) and identify real estate professionals
                    who are members of CREA®. Used under license. The trademarks
                    MLS®, Multiple Listing Service® and the associated logos are
                    owned by The Canadian Real Estate Association (CREA®) and
                    identify the quality of services provided by real estate
                    professionals who are members of CREA®. Used under license.
                  </p>
                </div>
              </div>
              <p className="text-sm text-center mt-10">
                ©{year_now} Copyright Dolphy.ca All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      </>
    )
  );
};

export default Footer;
