import { getFilteredAlbertaData } from "@/app/_resale-api/getPillar9Data";
import CalgaryZones from "@/components/resale/CalgaryZones";
import PropertyDisplaySection from "@/components/resale/PropertyDisplaySection";
import Slider from "@/components/resale/Slider";
import React from "react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import UnifiedSearchBar from "@/components/UnifiedSearchBar";
import { Building2, Home, Hotel, House, School } from "lucide-react";
import CalgaryHomes from "@/components/resale/CalgaryHomes";
import Link from "next/link";
import ResaleMap from "@/components/resale-map/ResaleMap";
import CalgaryPrices from "@/components/resale/CalgaryPrices";

const page = async () => {
  const condoSalesData = await getFilteredAlbertaData({
    propertySubTypes: ["Apartment"],
    city: "Calgary",
    offset: 0,
    limit: 10,
  });
  const semiDetachedHomes = await getFilteredAlbertaData({
    propertySubTypes: ["Semi Detached (Half Duplex)"],
    city: "Calgary",
    offset: 0,
    limit: 10,
  });
  const detachedHomes = await getFilteredAlbertaData({
    propertySubTypes: ["Detached"],
    city: "Calgary",
    offset: 0,
    limit: 10,
  });
  const under500k = await getFilteredAlbertaData({
    city: "Calgary",
    maxPrice: 500000,
    minPrice: 0,
  });
  const under1m = await getFilteredAlbertaData({
    city: "Calgary",
    maxPrice: 1000000,
    minPrice: 500000,
  });
  const under1andHalfM = await getFilteredAlbertaData({
    city: "Calgary",
    maxPrice: 1500000,
    minPrice: 1000000,
  });

  const filterObjects = [
    {
      name: "Detached ",
      icon: <Home strokeWidth={1.5} />,
      link: "/resale/alberta/calgary/detached-homes-for-sale",
    },
    {
      name: "Semi Detached ",
      icon: <Hotel strokeWidth={1.5} />,
      link: "/resale/alberta/calgary/semi-detached-homes-for-sale",
    },
    {
      name: "Condos",
      icon: <Building2 strokeWidth={1.5} />,
      link: "/resale/alberta/calgary/apartment-for-sale",
    },
    {
      name: "Townhomes",
      icon: <School strokeWidth={1.5} />,
      link: "/resale/alberta/calgary/town-homes-for-sale",
    },
  ];

  return (
    <div className="">
      <div className="relative w-full h-[30rem] flex justify-center">
        <img
          src="/calgary-zone-images/calgary.jpg"
          className="w-full h-full object-cover z-0 opacity-90"
        />
        <div className="w-full absolute h-full top-20 z-10 flex justify-center items-center -mx-4">
          <div className="w-full absolute h-full z-10 flex items-center flex-col jutify-center">
            <h1 className="text-3xl sm:text-5xl font-md mb-1 text-center text-white">
              <span className="">Calgary</span> homes for sale
            </h1>
            <div
              className="my-2  flex space-x-3 py-4 pb-8 px-2 sm:px-8 bg-transparent backdrop-blur-[18px] text-white p-20 mt-8 flex-col rounded-2xl"
              style={{ background: "rgba(255,255,255,.2)" }}
            >
              <div className="flex justify-center py-0 sm:py-4 space-x-2 sm:space-x-4 font-medium text-sm mb-3 sm:mb-0">
                {filterObjects.map((item) => {
                  return (
                    <div
                      asChild
                      className="bg-opacity-40 flex flex-col items-center justify-center py-4 px-2 rounded-md hover:scale-110 hover:cursor-pointer duration-300 hover:bg-white hover:bg-opacity-15"
                    >
                      <Link
                        href={item.link}
                        className="flex items-center flex-col text-center"
                      >
                        <span className="mb-1">{item.icon}</span>

                        {item.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <UnifiedSearchBar
                width="w-[90%] md:w-[500px] text-black"
                className="!rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-fit px-4 sm:px-8 md:px-16 py-8">
        <CalgaryHomes withDescription={true} />
        <CalgaryPrices />
        {/* <p className="text-gray-700 text-sm mb-5">
          Calgary homes for sale | Book a showing for affordable homes in
          Calgary with pools, walkouts. Prices from $1 to $5M. Open houses
          available. Explore Calgary's diverse real estate market featuring
          detached homes, apartments, and townhouses. Calgary offers modern and
          historic properties perfect for homebuyers and investors alike.
          Calgary has strong ownership rate and a low vacancy rate.Looking to
          explore Calgary's real estate opportunities? Contact our team today to
          discover available properties matching your needs and budget in this
          thriving city.
        </p>

        <h2 className="text-xl text-gray-800 font-bold mb-2">
          Browse Calgary Homes by Property Type
        </h2>

        <div className="flex flex-wrap gap-2 text-sm mb-12">
          <a
            href="/resale/alberta/calgary/homes-for-sale"
            className="px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-[#eee] transition-all"
          >
            Calgary New Listings
          </a>
          <a
            href="/resale/alberta/calgary/homes-for-sale"
            className="px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-[#eee] transition-all"
          >
            Calgary Homes
          </a>
          <a
            href="/resale/alberta/calgary/apartment-for-sale"
            className="px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-[#eee] transition-all"
          >
            Calgary Apartments
          </a>
          <a
            href="/resale/alberta/calgary/semi-detached-homes-for-sale"
            className="px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-[#eee] transition-all"
          >
            Calgary Semi-Detached
          </a>
          <a
            href="/resale/alberta/calgary/town-homes-for-sale"
            className="px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-[#eee] transition-all"
          >
            Calgary Townhomes
          </a>
          <a
            href="/resale/alberta/calgary/detached-homes-for-sale"
            className="px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-[#eee] transition-all"
          >
            Calgary Detached
          </a>
          <a
            href="/resale/alberta/calgary/detached-homes-for-sale-under-500k"
            className="px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-[#eee] transition-all"
          >
            Calgary Homes under $500k
          </a>
          <a
            href="/resale/alberta/calgary/detached-homes-for-sale-under-1000k"
            className="px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-[#eee] transition-all"
          >
            Calgary Homes under $1M
          </a>
          <a
            href="/resale/alberta/calgary/homes-for-sale-under-1500k"
            className="px-2 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-[#eee] transition-all"
          >
            Calgary Homes under $1.5M
          </a>
        </div> */}

        <div>
          {/* <CalgaryZones /> */}
          <div>
            <PropertyDisplaySection
              title={`Newly Listed Condos for sale in Calgary`}
              subtitle={`Check out 100+ listings near this property. Listings updated daily`}
            >
              <Slider data={condoSalesData} type="resale" province="alberta" />
            </PropertyDisplaySection>
            <PropertyDisplaySection
              title={`Newly Listed Detached Homes for sale in Calgary`}
              subtitle={`Check out 100+ listings near this property. Listings updated daily`}
            >
              <Slider data={detachedHomes} type="resale" province="alberta" />
            </PropertyDisplaySection>
            <PropertyDisplaySection
              title={`Newly Listed Semi Detached Homes for sale in Calgary`}
              subtitle={`Check out 100+ listings near this property. Listings updated daily`}
            >
              <Slider
                data={semiDetachedHomes}
                type="resale"
                province="alberta"
              />
            </PropertyDisplaySection>
            <PropertyDisplaySection
              title={`Newly Listed Homes for sale in Calgary Under $1.5M`}
              subtitle={`Check out 100+ listings near this property. Listings updated daily`}
            >
              <Slider data={under1andHalfM} type="resale" province="alberta" />
            </PropertyDisplaySection>
            <PropertyDisplaySection
              title={`Newly Listed Homes for sale in Calgary under $1M`}
              subtitle={`Check out 100+ listings near this property. Listings updated daily`}
            >
              <Slider data={under1m} type="resale" province="alberta" />
            </PropertyDisplaySection>
            <PropertyDisplaySection
              title={`Newly Listed Homes for sale in Calgary under $500K`}
              subtitle={`Check out 100+ listings near this property. Listings updated daily`}
            >
              <Slider data={under500k} type="resale" province="alberta" />
            </PropertyDisplaySection>
          </div>

          <div>
            <ResaleMap listings={condoSalesData} />
          </div>

          {/* About Living Section */}
          <div className="mt-20 mb-16">
            <h2 className="text-4xl text-gray-800 font-extrabold text-center mb-12">
              About Living in Calgary, Alberta
            </h2>

            <div className="space-y-12 max-w-4xl mx-auto">
              <div>
                <p className="text-gray-700 leading-relaxed">
                  The Calgary real estate market in the early part of 2025 shows
                  a mixed image of adjustment and resilience. Reports indicate
                  that sales, year-over-year, have fallen, but they are still
                  above the longer-term historical averages of February and
                  March. Inventory levels, however, increased substantially
                  compared to last year, which provides more choice to buyers.
                  This increase in the supply of available properties, though,
                  did not sharply hit benchmark values, which exhibit modest
                  year-over-year appreciation in general, though some areas saw
                  more rapid growth compared to others. The Calgary total
                  residential benchmark price in February of 2025 hovered at
                  approximately $587,600 and had increased slightly by March of
                  that year to approximately $592,500.
                </p>
              </div>

              <div>
                <p className="text-gray-700 leading-relaxed">
                  Segments of the market are experiencing diverse trends. The
                  average selling price of the detached home sector in February
                  of this year was around $680,900, a year-over-year rise.
                  Townhouses and multiplexes averaged a selling price of around
                  $455,200, also a year-over-year rise. Condominiums averaged a
                  selling price of around $338,300, also a year-over-year
                  increase. Of particular interest, the Calgary rental market
                  experienced a rise in vacancy rate due to a big influx of
                  purpose-built rentals, one that will persist through 2025 and
                  possibly cause rent growth to slow. February average rent was
                  at around $1,925, a year-over-year decline. This indicates a
                  dynamic where the sales market is stabilizing in pricing
                  despite greater supply, while the rent market is becoming
                  increasingly competitive for tenants due to growing supply.
                  Calgary is a city of a young and rapidly growing population.
                  According to the 2021 Census, Calgary had a population of
                  around 1.31 million, and it is the largest city in Alberta and
                  the third-largest in Canada. Around 1.48 million people
                  inhabit the Calgary Metropolitan Area. Calgary's population
                  has grown steadily, at a rate of more than 1% per year in the
                  last few years, due mainly to international migration. Calgary
                  is multicultural in character, with more than 25% of the
                  population being in a visible minority group, and in the top
                  Canadian cities in diversity, and the chief ethnic groups
                  being South Asians, Chinese, and Filipinos.
                </p>
              </div>

              <div>
                <p className="text-gray-700 leading-relaxed">
                  The population of Calgary has a relatively young demographic,
                  and the median is approximately 38 years of age, younger
                  compared to some of the larger Canadian cities. It also boasts
                  a high percent of residents who were born outside of Canada,
                  helping to create its diverse cultural landscape. Religiously,
                  the majority of the population is Christian, followed by a
                  large percent of no religious affiliation, and smaller
                  percentages of Islam, Sikh, Buddhist, Hindu, and Jewish
                  identification. English is the primary spoken language, and a
                  high percent of the population also uses languages other than
                  English and French. Calgary is also famous for its
                  volunteerism and sense of community.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Calgary Real Estate Market Statistics
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-200">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border border-gray-200">
                          Details (February/March 2025)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Total Residential Benchmark Price
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          $587,600 - $592,500
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Avg. Selling Price (Detached)
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          $680,900 - $839,232
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Avg. Selling Price (Townhouse)
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          $455,200 - $471,953
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Avg. Selling Price (Condo)
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          $338,300 - $354,989
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Rental Vacancy Rate (2024)
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          4.6%
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Average Rent (February 2025)
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          $1,925
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Total Population (2021)
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          ~1,306,784
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Visible Minorities
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          &gt;25%
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Median Age
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          ~38 years
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          Non-English/French Speakers
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                          ~25%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Disclaimer: The information contained in this table is
                  provided for informational purposes only. While we strive to
                  ensure the accuracy and timeliness of the data presented, we
                  make no representations or warranties of any kind, express or
                  implied, about the completeness, accuracy, reliability,
                  suitability, or availability of the information contained
                  herein. Any reliance you place on such information is strictly
                  at your own risk. In no event will we be liable for any loss
                  or damage including without limitation, indirect or
                  consequential loss or damage, or any loss or damage whatsoever
                  arising from use of this data.
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mb-4 md:mb-5">
            <Image
              src="/contact-bottom-2.png"
              alt="Real Estate Agent"
              width={300}
              height={300}
              className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
              priority
            />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
              Looking to buy a New Home?
            </h2>
            <p className="text-gray-600 text-center text-sm md:text-base">
              Don't know where to start? Contact us today!
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export async function generateMetadata() {
  return {
    title: `Homes for sale in Calgary | Find affordable condos, detached and semi-detached homes.`,
    description: `View Homes in Calgary. Find affordable condos, detached and semi-detached homes.`,
    alternates: {
      canonical: `https://dolphy.ca/resale/alberta/calgary-homes`,
    },
    openGraph: {
      title: `Calgary Homes for sale | Tour with Dolphy Agents`,
      description: `View Houses in Calgary. Find affordable condos, detached and semi-detached homes.`,
      url: `https://dolphy.ca/resale/alberta/calgary-homes`,
      siteName: "Dolphy",
      type: "website",
      images: [
        {
          url: "https://dolphy.ca/city-images/milton.jpeg",
          width: 1200,
          height: 630,
          alt: `Homes in Calgary`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Calgary Homes for sale | Tour with Dolphy Agents`,
      description: `View Houses in Calgary. Find affordable condos, detached and semi-detached homes.`,
      images: ["https://dolphy.ca/city-images/milton.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    other: {
      "og:locale": "en_CA",
      "og:type": "website",
    },
  };
}

export default page;
