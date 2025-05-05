"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Footer = () => {
  const pathname = usePathname();
  const isAlbertaPage = pathname.toLowerCase().includes("alberta");
  const [todaysutc, setTodaysutc] = useState("");
  const [year_now, setYearNow] = useState(new Date().getFullYear());

  useEffect(() => {
    setTodaysutc(new Date().toUTCString());
  }, []);

  const popularCities = [
    { name: "Ajax", link: "/ajax" },
    { name: "Aurora", link: "/aurora" },
    { name: "Barrie", link: "/barrie" },
    { name: "Brampton", link: "/brampton" },
    { name: "Burlington", link: "/burlington" },
    { name: "Calgary", link: "/calgary" },
    { name: "Cambridge", link: "/cambridge" },
    { name: "Georgetown", link: "/georgetown" },
    { name: "Grimsby", link: "/grimsby" },
    { name: "Hamilton", link: "/hamilton" },
    { name: "Innisfil", link: "/innisfil" },
    { name: "Kitchener", link: "/kitchener" },
    { name: "Markham", link: "/markham" },
    { name: "Milton", link: "/milton" },
    { name: "Mississauga", link: "/mississauga" },
    { name: "Niagara", link: "/niagara" },
    { name: "Oakville", link: "/oakville" },
    { name: "Oshawa", link: "/oshawa" },
    { name: "Ottawa", link: "/ottawa" },
    { name: "Thorold", link: "/thorold" },
    { name: "Toronto", link: "/toronto" },
    { name: "Vaughan", link: "/vaughan" },
    { name: "Waterloo", link: "/waterloo" },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const socialLinks = [
    {
      icon: "/icons/facebook.svg",
      link: "https://www.facebook.com/thehomebaba/",
    },
    {
      icon: "/icons/youtube.png",
      link: "https://www.youtube.com/channel/UCz0QC6Avx_Q_oTENvpp6PWg",
    },
    { icon: "/icons/instagram.svg", link: "https://instagram.com/dolphy" },
    {
      icon: "/icons/linkedin.svg",
      link: "https://linkedin.com/company/dolphy",
    },
    { icon: "/icons/twitter.png", link: "https://twitter.com/dolphy" },
    { icon: "/icons/tiktok.png", link: "https://tiktok.com/@dolphy" },
  ];

  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-4">
          {/* Column 1: Company Info */}
          <div className="my-3">
            <Link href="/" className="inline-flex items-center">
              <span className="text-4xl font-bold">dolphy</span>
              <Image
                src="/canadaleaf.svg"
                alt="canada maple leaf"
                width={24}
                height={24}
                className="ml-1"
              />
            </Link>
            <p className="mt-3 text-sm text-gray-600 text-justify">
              Dolphy is the online Database for new Pre construction detached,
              semi-detached, townhomes and condos in Canada. Dolphy does not
              represent any builder. The content of the pages of this website is
              for your general information, reference only. We are not liable
              for the use or misuse of the site's information. Prices, sizes,
              specifications, and promotions of the condos are subject to change
              by the builder without notice. E&OE
            </p>
            <p className="mt-3 text-sm">
              Contact : <Link href="tel:+16472395555">+1 647-239-5555</Link>
            </p>
            <div className="mt-3">
              <p className="font-bold text-gray-900 mb-3">Company</p>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/pre-construction-homes"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Pre Construction Homes
                </Link>
                <Link
                  href="/blogs"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Blogs
                </Link>
                <Link
                  href="contact-us"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact us
                </Link>
                <Link
                  href="/developers"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Developers
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="https://condomonk.ca"
                  target="_blank"
                  className="text-black"
                >
                  Condomonk
                </Link>
                <Link
                  href="https://homepapa.ca"
                  target="_blank"
                  className="text-black"
                >
                  Homepapa
                </Link>
                <Link
                  href="https://dolphy.ca"
                  target="_blank"
                  className="text-black"
                >
                  Dolphy
                </Link>
                <Link
                  href="https://lowrise.ca"
                  target="_blank"
                  className="text-black"
                >
                  Lowris
                </Link>
                <p>Address : 8300 Woodbine Ave Markham, ON L3R 9Y7, Canada</p>
              </div>
            </div>
          </div>

          {/* Column 2: Popular Cities */}
          <div className="my-3">
            <p className="font-bold text-gray-900 mb-3">Popular Cities</p>
            <div className="flex flex-col space-y-2">
              {popularCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.link}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Pre construction homes in {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Pre construction condos */}
          <div className="my-3">
            <h5 className="font-bold text-gray-900 mb-3">
              Pre construction condos
            </h5>
            <div className="flex flex-col space-y-2">
              {popularCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.link + "/condos"}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Pre construction condos in {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Pre construction Townhomes */}
          <div className="my-3">
            <h5 className="font-bold text-gray-900 mb-3">
              Pre construction Townhomes
            </h5>
            <div className="flex flex-col space-y-2">
              {popularCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.link + "/pre-construction/townhomes"}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Pre construction townhomes in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200 mb-16">
          {/* Dolphy/Dolphin Realty Section */}
          <div className="mb-8 text-center">
            <p className="text-xs text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dolphy refers potential buyers to real estate agents that are
              licensed in the province where the respective property is located.
              DOLPHIN REALTY INC. is licensed as a real estate brokerage in
              Ontario. Dolphin Realty is a boutique real estate firm that
              empowers clients and agents to achieve success in real estate.
              With state-of-the-art technology, professionalism, and strong
              culture, Dolphin Realty aims to become your most trusted real
              estate partner. Founded in January 1, 2022, Dolphin has completed
              over 500 million in transaction volume by 2023.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 items-center justify-center gap-8">
            {/* Conditional rendering for TREBB/Pillar 9 section */}
            {isAlbertaPage ? (
              // Pillar 9™️ Section for Alberta pages
              <div className="flex flex-col justify-center items-center space-y-4">
                <img
                  src="/pillar9.jpeg"
                  alt="Pillar 9 Logo"
                  className="w-28 mx-auto"
                />
                <p className="text-xs text-gray-500 max-w-2xl text-center leading-relaxed">
                  MLS listings provided by Pillar 9™️. Information Deemed
                  Reliable But Not Guaranteed. The information provided by this
                  website is for the personal, non-commercial use of consumers
                  and may not be used for any purpose other than to identify
                  prospective properties consumers may be interested in
                  purchasing.
                </p>
              </div>
            ) : (
              // TREBB Section for non-Alberta pages
              <div className="flex flex-col justify-center items-center space-y-4">
                <img
                  src="/trebb.png"
                  alt="TREBB Logo"
                  className="w-28 mx-auto"
                />
                <p className="text-xs text-gray-500 max-w-2xl text-center leading-relaxed">
                  The listing data is provided under copyright by the Toronto
                  Regional Real Estate Board (TRREB). The information provided
                  herein must only be used by consumers that have a bona fide
                  interest in the purchase, sale or lease of real estate and may
                  not be used for any commercial purpose or any other purpose.
                  The data is deemed reliable but is not guaranteed accurate by
                  the Toronto Regional Real Estate Board nor Dolphy INC. The
                  information provided on this page, including the
                  Affordability, Afford Score™️, and Affordability Coach, are
                  provided for informational purposes only and should not be
                  used or construed as financial or investment advice by any
                  individual. No representations or warranties, express or
                  implied, are made by Dolphy INC or its affiliates as to the
                  accuracy or completeness of the information on this page. Last
                  Updated: {todaysutc} UTC
                </p>
              </div>
            )}

            {/* CREA Section - Always shown */}
            <div className="flex flex-col justify-center items-center space-y-4">
              <img src="/crea.png" alt="CREA Logo" className="w-28 mx-auto" />
              <p className="text-xs text-gray-500 max-w-2xl text-center leading-relaxed">
                The REALTOR®️ trademark is controlled by The Canadian Real
                Estate Association (CREA) and identifies real estate
                professionals who are members of CREA. The trademarks MLS®️,
                Multiple Listing Service®️ and the associated logos identify
                professional services rendered by REALTOR®️ members of CREA to
                effect the purchase, sale and lease of real estate as part of a
                cooperative selling system. The listing data displayed is deemed
                reliable but is not guaranteed accurate by CREA®. Data last
                updated on {todaysutc} UTC
              </p>
            </div>
          </div>
        </div>
        <div>
          <h6 className="text-center mt-10 font-black  text-2xl md:text-4xl border-b border-gray-200 inline-block w-full pb-3">
            Our Trusted <span className="text-red-600">Platform Network</span>
          </h6>
          <div className="flex justify-center items-center gap-10 mb-10 mt-3">
            <Link href="https://condomonk.ca" target="_blank">
              <Image
                src="/condomonk.png"
                alt="condomonk"
                width={200}
                height={200}
              />
            </Link>
            <Link href="https://dolphy.ca" target="_blank">
              <Image src="/dolphy.png" alt="dolphy" width={200} height={200} />
            </Link>
            <Link href="https://homepapa.ca" target="_blank">
              <Image
                src="/homepapa.png"
                alt="homepapa"
                width={200}
                height={200}
              />
            </Link>
            <Link href="https://lowrise.ca" target="_blank">
              <Image
                src="/lowriselogo.svg"
                alt="lowris.ca for resale homes"
                width={200}
                height={200}
              />
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="py-5 flex flex-col items-center">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-4 w-full sm:w-[400px] md:w-[500px] max-w-[600px] px-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center hover:opacity-80 transition-opacity"
              >
                <Image
                  src={social.icon}
                  alt={`${social.link.split(".com/")[1]} social link`}
                  width={28}
                  height={28}
                  className="w-7 h-7 sm:w-6 sm:h-6"
                />
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-500 py-10">
            ©{year_now} Dolphy Technologies - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
