import Gallery from "@/components/resale/Gallery";
import Breadcrumbs from "@/components/resale/Breadcrumbs";
import CreateSchema from "@/helpers/CreateSchema";
import PropertyPage from "@/components/resale/PropertyPage";
import FAQ from "@/components/resale/FAQ";
import Carousel from "@/components/resale/Carousel";
import PropertyDisplaySection from "@/components/resale/PropertyDisplaySection";
import UnlockableCards from "@/components/resale/UnlockableCards";
import Slider from "@/components/resale/Slider";
import SideContactForm from "@/components/resale/SideContactForm";
import PropertyPageLinks from "@/components/resale/PropertyPageLinks";
import FloatingResaleButton from "@/components/resale/FloatingResaleButton";
import { generateURL } from "@/helpers/generateResaleURL";
import { homeText, houseType } from "@/constant";
import { slugGenerator } from "@/helpers/slugGenerator";
import Link from "next/link";
import {
  getListingAnalytics,
  getCommercialAnalytics,
  getLeaseAnalytics,
} from "@/lib/analytics";
import {
  fetchDataFromMLS,
  fetchRoomInfo,
  getImageUrls,
  getSalesData,
  getOpenHouseData,
} from "@/app/_resale-api/getSalesData";
import { cityRegions } from "@/constant/postalCodeCities";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import NotFound from "@/app/[city]/not-found";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 4;

export default async function ListingDetailPage({ slug }) {
  const city = slug[0];
  const listingID = slug[slug.length - 1];
  const cityValue = city.split("-").join(" ");
  const formattedSlug = capitalizeFirstLetter(cityValue);

  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;

  const isOpenHouse = slug.includes("open-house");

  // Fetch all required data in parallel
  const [
    main_data,
    newSalesData,
    oldSoldData,
    roomData,
    imageURLs,
    openHouseData,
  ] = await Promise.all([
    fetchDataFromMLS(listingIDValue),
    getSalesData(INITIAL_OFFSET, INITIAL_LIMIT, formattedSlug),
    getSalesData(INITIAL_OFFSET, 8, formattedSlug, null, true),
    fetchRoomInfo(listingIDValue),
    getImageUrls({ MLS: listingIDValue }),
    isOpenHouse ? getOpenHouseData(listingIDValue) : Promise.resolve([]),
  ]);
  // not found page if no main_data
  if (!main_data?.ListingKey) {
    return <NotFound name="Listing" city={city} province="ontario" />;
  }
  main_data.City = capitalizeFirstLetter(cityValue);
  const region = cityRegions.find((cityRegion) =>
    cityRegion.regions.includes(main_data?.City)
  );

  const propertyTypeName = Object.values(houseType).find(
    (obj) =>
      obj?.value?.toLowerCase() == main_data?.PropertySubType?.toLowerCase()
  )?.name;

  const transactionType = main_data?.TransactionType;
  const isClosedListing = main_data?.StandardStatus === "Closed";

  const breadcrumbItems = [
    { label: "Ontario", href: "/resale/ontario/homes-for-sale" },
    { label: formattedSlug, href: generateURL({ cityVal: city }) },
    {
      label: `${
        homeText[propertyTypeName] || propertyTypeName || ""
      } ${transactionType} `,
      href: generateURL({
        cityVal: city,
        saleLeaseVal: transactionType?.toLowerCase(),
        houseTypeVal: propertyTypeName?.toLowerCase() || null,
      }),
    },
    {
      label: `${main_data?.StreetNumber} ${main_data?.StreetName}${" "}
      ${main_data?.StreetSuffix}`,
      href: "#",
    },
  ];

  const address = [
    main_data?.StreetNumber,
    main_data?.StreetName,
    main_data?.StreetSuffix,
  ]
    .filter(Boolean)
    .join(" ");

  // Get analytics data based on property type
  let analyticsData = null;
  if (!isClosedListing) {
    if (main_data?.PropertyType === "Commercial") {
      analyticsData = await getCommercialAnalytics({
        listing: main_data,
        city: main_data?.City,
      });
    } else if (main_data?.TransactionType === "For Lease") {
      analyticsData = await getLeaseAnalytics({
        listing: main_data,
        city: main_data?.City,
      });
    } else {
      analyticsData = await getListingAnalytics({
        listing: main_data,
        city: main_data?.City,
      });
    }
  }

  // Format close date if available
  const formatCloseDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const closeDate = formatCloseDate(main_data?.CloseDate);

  return (
    <div className="flex justify-center sm:max-w-[90%] min-[2000px]:max-w-[65%] mx-auto">
      <div>
        <script
          key={main_data?.ListingKey}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(CreateSchema(main_data)),
          }}
        />
        <div className="pt-md-3 pt-0 ">
          <div className="sticky top-[0rem] z-20 max-w-[100vw] no-scrollbar scrollable-indicator">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <section className="padding-top w-full text-sm flex flex-col items-center justify-center gy-2 relative">
            {isClosedListing ? (
              <div className="w-full py-20 flex flex-col items-center justify-center bg-gray-50 rounded-lg my-6">
                <div className="text-center max-w-3xl mx-auto px-4">
                  <h1 className="text-3xl md:text-4xl font-bold mb-6">
                    {address}, {main_data?.City}, Ontario
                  </h1>
                  <div className="text-xl md:text-2xl font-medium mb-8 text-red-600">
                    {transactionType === "For Lease"
                      ? `Leased on ${closeDate}`
                      : `Sold on ${closeDate}`}
                  </div>
                  <p className="text-gray-600 mb-10">
                    This property is no longer available on the market.
                  </p>
                  <Link
                    href={generateURL({ cityVal: city })}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-900 hover:bg-slate-700 md:text-lg shadow-sm hover:scale-105 transition-all duration-200"
                  >
                    Explore More Listings
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="hidden sm:block relative w-full">
                  <Gallery data={imageURLs} />
                </div>
                <Carousel urls={imageURLs} />
                <div className="w-full flex justify-start md:justify-center ps-3 md:ps-0 pt-0 sm:pt-4 relative">
                  <div className="grid sm:grid-cols-9 grid-cols-1 justify-between sm:justify-between w-full sm:gap-x-8 gap-y-12 sm:gap-y-0 relative max-w-[97%] sm:max-w-[75%]">
                    <div className={`sm:col-span-6 col-span-9`}>
                      <PropertyPage
                        {...{
                          main_data,
                          room_data: roomData,
                          nearbyHomes: newSalesData,
                          analyticsData,
                          openHouseData: isOpenHouse
                            ? openHouseData
                            : undefined,
                        }}
                      />
                    </div>

                    <div
                      className="sm:col-span-3 col-span-9 relative"
                      id="mycontact"
                    >
                      <SideContactForm
                        address={
                          address +
                          `, ${region?.name || main_data?.City}, Ontario`
                        }
                        city={main_data?.City}
                        openHouseData={openHouseData}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-24 mb-10 col-span-7 px-3 flex flex-col gap-20 items-center justify-center">
                  <FAQ main_data={main_data} />
                </div>
              </>
            )}

            {
              <section className="additonal__listing w-full mx-auto mt-10 md:mt-24">
                <PropertyDisplaySection
                  title={`Recently Sold Homes in ${
                    region?.name || main_data?.City || "Ontario"
                  }`}
                  subtitle={`Check out recently sold properties. Listings updated daily`}
                  exploreAllLink={null}
                >
                  <UnlockableCards data={oldSoldData} />
                </PropertyDisplaySection>
              </section>
            }
            {formattedSlug && newSalesData?.length > 0 && (
              <section className="additonal__listing w-full mx-auto mt-10 md:mt-24">
                <PropertyDisplaySection
                  title={`Similar ${
                    homeText[
                      Object.values(houseType).find(
                        (data) => data.value == main_data.PropertySubType
                      )?.name
                    ]
                  } nearby in ${region?.name || main_data?.City || "Ontario"}`}
                  subtitle={`Check out 100+ listings near this property. Listings updated daily`}
                  exploreAllLink={generateURL({
                    houseTypeVal: Object.values(houseType).find(
                      (obj) => obj.value == main_data?.PropertySubType
                    )?.name,
                    saleLeaseVal: main_data?.TransactionType,
                    cityVal: city,
                  })}
                >
                  <Slider data={newSalesData} type="resale" />
                </PropertyDisplaySection>
              </section>
            )}

            <div className="w-full bg-white mt-20 max-w-[90%] mx-auto sm:max-w-full">
              <div className="text-left mb-8">
                <h2 className="text-xl sm:text-3xl font-bold w-[100%] sm:w-auto">
                  See the Latest Listings by Cities
                </h2>
                <p className="text-black">1500+ home for sale in Ontario</p>
              </div>
              <PropertyPageLinks saleLease={main_data?.TransactionType} />
            </div>
            <FloatingResaleButton />
          </section>
        </div>
      </div>
    </div>
  );
}

ListingDetailPage.generateMetadata = async function ({ params }) {
  const slug = params.slug1;
  const listingID = slug[slug.length - 1];
  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;

  const [main_data, imageURLs] = await Promise.all([
    fetchDataFromMLS(listingIDValue),
    getImageUrls({ MLS: listingIDValue }),
  ]);
  if (!main_data) {
    return { title: "Dolphy.ca | Not Found" };
  }

  const isClosed = main_data?.StandardStatus === "Closed";
  const closeDate = main_data?.CloseDate
    ? new Date(main_data.CloseDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const title = isClosed
    ? `${main_data?.StreetNumber} ${main_data?.StreetName} ${
        main_data?.StreetSuffix
      } - ${
        main_data?.TransactionType === "For Lease" ? "Leased" : "Sold"
      } on ${closeDate} - Dolphy`
    : `${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix} in ${main_data?.City} MLS # ${main_data?.ListingKey} - Dolphy`;

  const description = isClosed
    ? `${main_data?.StreetNumber} ${main_data?.StreetName} ${
        main_data?.StreetSuffix
      } in ${main_data?.City} was ${
        main_data?.TransactionType === "For Lease" ? "leased" : "sold"
      } on ${closeDate}. View similar properties in the area - Dolphy`
    : `Book a showing for ${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix} with MLS # ${main_data?.ListingKey} in ${main_data?.City} with us - Dolphy`;

  return {
    alternates: {
      canonical: `https://dolphy.ca/resale/ontario/${
        params.slug1[0]
      }/listings/${slugGenerator(main_data)}`,
    },
    openGraph: {
      images: imageURLs?.length > 0 ? imageURLs[0] : null,
    },
    title,
    description,
  };
};
