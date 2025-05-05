import Gallery from "@/components/resale/Gallery";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import {
  fetchDataFromMLS,
  fetchRoomInfo,
  getImageUrls,
  // fetchStatsFromMLS,
  getSalesData,
} from "@/app/_resale-api/getSalesData";
import {
  getListingAnalytics,
  getCommercialAnalytics,
  getLeaseAnalytics,
} from "@/lib/analytics";

import PropertyPage from "@/components/resale/PropertyPage";
import FAQ from "@/components/resale/FAQ";
import Slider from "@/components/resale/Slider";
import Breadcrumbs from "@/components/resale/Breadcrumbs";
import CreateSchema from "@/helpers/CreateSchema";
import { slugGenerator } from "@/helpers/slugGenerator";
import PropertyDisplaySection from "@/components/resale/PropertyDisplaySection";
import Carousel from "@/components/resale/Carousel";
import { generateURL } from "@/helpers/generateResaleURL";
import { homeText, houseType, pillar9HouseTypes } from "@/constant";
import UnlockableCards from "@/components/resale/UnlockableCards";
import SideContactForm from "@/components/resale/SideContactForm";
import PropertyPageLinks from "@/components/resale/PropertyPageLinks";
import FloatingResaleButton from "@/components/resale/FloatingResaleButton";
import { cityRegions } from "@/constant/postalCodeCities";
import {
  fetchAlbertaDataFromMLS,
  getFilteredAlbertaData,
} from "@/app/_resale-api/getPillar9Data";
import { generateImageURLs } from "@/helpers/generateImageURLs";
// import { getNotes } from "@/helpers/getNotes";
// import { Button } from "@nextui-org/react";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 4;

const page = async ({ params }) => {
  const { city, listingID } = await params;
  const cityValue = city.split("-").join(" ");

  const formattedSlug = capitalizeFirstLetter(cityValue);
  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;
  let main_data = await fetchAlbertaDataFromMLS(listingIDValue); //always a single object inside the array
  main_data.City = capitalizeFirstLetter(cityValue);
  // const newSalesData = await getSalesData(
  //   INITIAL_OFFSET,
  //   INITIAL_LIMIT,
  //   formattedSlug,
  //   main_data?.PropertySubType
  // );
  const newSalesData = await getFilteredAlbertaData({
    offset: INITIAL_OFFSET,
    limit: INITIAL_LIMIT,
    city: formattedSlug,
    houseType: main_data?.PropertySubType,
  });
  const oldSoldData = await getSalesData(
    INITIAL_OFFSET,
    8,
    formattedSlug,
    main_data?.PropertySubType,
    true
  );
  const roomData = await fetchRoomInfo(listingIDValue);
  const propertyTypeName = Object.values(houseType).find(
    (obj) =>
      obj?.value?.toLowerCase() == main_data?.PropertySubType?.toLowerCase()
  )?.name;
  const breadcrumbItems = [
    { label: "Alberta", href: "/resale/ontario/homes-for-sale" },
    { label: formattedSlug, href: generateURL({ cityVal: cityValue }) },
    {
      label: `${homeText[propertyTypeName] || propertyTypeName || ""} ${
        main_data?.TransactionType
      } `,
      href: generateURL({
        cityVal: cityValue,
        saleLeaseVal: main_data?.TransactionType?.toLowerCase(),
        houseTypeVal: propertyTypeName?.toLowerCase() || null,
      }),
    },
    {
      label: `${main_data?.StreetNumber} ${main_data?.StreetName}${" "}
    ${main_data?.StreetSuffix}`,
      href: "#",
    },
  ];

  // const address = `${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix}`;
  const address = [
    main_data?.StreetNumber,
    main_data?.StreetName,
    main_data?.StreetSuffix,
  ]
    .filter(Boolean)
    .join(" ");

  const imageURLs = generateImageURLs(
    main_data.ListingKeyNumeric,
    parseInt(main_data?.PhotoCount)
  );
  const region = cityRegions.find((cityRegion) =>
    cityRegion.regions.includes(main_data?.City)
  );

  let analyticsData = null;

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

  return (
    <>
      <div className="flex justify-center sm:max-w-[90%] min-[2000px]:max-w-[65%] mx-auto open-sans">
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
              {/* <Thumbnails setCurrentImageIndex={setCurrentImageIndex} /> */}
            </div>
            <section className="padding-top w-full text-sm flex flex-col items-center justify-center gy-2 relative">
              <div className="hidden sm:block relative w-full">
                <Gallery data={imageURLs} />
              </div>
              {/* Carousel is only for mobile. */}
              <Carousel urls={imageURLs} />
              <div className=" w-full flex justify-start md:justify-center ps-3 md:ps-0 pt-0 sm:pt-4 relative">
                <div className="grid sm:grid-cols-9 grid-cols-1 justify-between sm:justify-between w-full sm:gap-x-8 gap-y-12 sm:gap-y-0 relative max-w-[97%] sm:max-w-[75%]">
                  <div className={`sm:col-span-6 col-span-9`}>
                    <PropertyPage
                      {...{
                        main_data,
                        room_data: roomData,
                        nearbyHomes: newSalesData,
                        analyticsData,
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
                        `, ${region?.name || main_data?.City}, Alberta`
                      }
                      city={main_data?.City}
                    ></SideContactForm>
                  </div>
                </div>
              </div>

              <div className="mt-24 mb-10 col-span-7 px-3 flex flex-col gap-20 items-center justify-center">
                <FAQ main_data={main_data} />
              </div>
              {formattedSlug && newSalesData?.length > 0 && (
                <section className="additonal__listing w-full mx-auto mt-10 md:mt-24">
                  <PropertyDisplaySection
                    title={`Similar ${
                      homeText[
                        Object.values(pillar9HouseTypes).find(
                          (data) => data.value == main_data.PropertySubType
                        )?.name
                      ]
                    } nearby in ${
                      region?.name || main_data?.City || "Alberta"
                    }`}
                    subtitle={`Check out 100+ listings near this property. Listings updated daily`}
                    exploreAllLink={generateURL({
                      houseTypeVal: Object.values(houseType).find(
                        (obj) => obj.value == main_data?.PropertySubType
                      )?.name,
                      saleLeaseVal: main_data?.TransactionType,
                      cityVal: city,
                    })}
                  >
                    <Slider
                      data={newSalesData}
                      type="resale"
                      province="alberta"
                    />
                  </PropertyDisplaySection>
                </section>
              )}

              <div className="w-full bg-white mt-20 max-w-[90%] mx-auto sm:max-w-full">
                <div className="text-left mb-8">
                  <h2 className="text-xl sm:text-3xl font-bold w-[100%] sm:w-auto">
                    See the Latest Listings by Cities
                  </h2>
                  <p className="text-black">1500+ home for sale in Alberta</p>
                </div>
                <PropertyPageLinks saleLease={main_data?.TransactionType} />
              </div>
              <FloatingResaleButton />
              {/* <PriceButton price={formatCurrency(main_data?.ListPrice)} /> */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  const { listingID } = await params;
  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;
  const main_data = await fetchAlbertaDataFromMLS(listingIDValue);
  const imageURLs = await getImageUrls({ MLS: main_data?.ListingKey });
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy.ca/resale/alberta/${
        params.city
      }/listings/${slugGenerator(main_data)}`,
    },
    openGraph: {
      images: imageURLs?.length > 0 ? imageURLs[0] : null,
    },
    title: `${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix} in ${main_data?.City} MLS # ${main_data?.ListingKey} - Dolphy`,
    description: `Book a showing for ${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix} with MLS # ${main_data?.ListingKey} in ${main_data?.City} with us - Dolphy`,
  };
}
