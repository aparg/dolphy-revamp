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
import { homeText, pillar9HouseTypes } from "@/constant";
import { slugGenerator } from "@/helpers/slugGenerator";
import {
  getListingAnalytics,
  getCommercialAnalytics,
  getLeaseAnalytics,
} from "@/lib/analytics";
// import {
//   fetchAlbertaDataFromMLS,
//   fetchRoomInfo,
//   getImageU,
//   getSalesData,
//   getOpenHouseData,
// } from "@/app/_resale-api/getSalesData";
import { cityRegions } from "@/constant/postalCodeCities";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import {
  fetchAlbertaDataFromMLS,
  getFilteredAlbertaData,
} from "@/app/_resale-api/getPillar9Data";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import { getSalesData } from "@/app/_resale-api/getSalesData";
import AlbertaPropertyPage from "./AlbertaPropertyPage";
import { getAlbertaProperties } from "@/lib/albertaProperties";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 4;

export default async function AlbertaListingDetailPage({ slug }) {
  const city = slug[0];
  const listingID = slug[slug.length - 1];
  const cityValue = city.split("-").join(" ");
  const formattedSlug = capitalizeFirstLetter(cityValue);

  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;

  // Fetch required data
  console.log(listingIDValue);
  const main_data = await fetchAlbertaDataFromMLS(listingIDValue);
  const newSalesData = getFilteredAlbertaData(
    await getFilteredAlbertaData({
      offset: INITIAL_OFFSET,
      limit: INITIAL_LIMIT,
      city: formattedSlug,
      pillar9HouseTypes: main_data?.PropertySubType,
    })
  );

  const imageURLs = generateImageURLs(
    main_data.ListingKeyNumeric,
    parseInt(main_data?.PhotoCount)
  );
  main_data.City = capitalizeFirstLetter(cityValue);
  const region = cityRegions.find((cityRegion) =>
    cityRegion.regions.includes(main_data?.City)
  );

  const propertyTypeName = Object.values(pillar9HouseTypes).find(
    (obj) =>
      obj?.value?.toLowerCase() == main_data?.PropertySubType?.toLowerCase()
  )?.name;

  const transactionType = main_data?.TransactionType;

  const breadcrumbItems = [
    { label: "Ontario", href: "/resale/alberta/homes-for-sale" },
    {
      label: formattedSlug,
      href: generateURL({ cityVal: city, province: "alberta" }),
    },
    {
      label: `${
        homeText[propertyTypeName] || propertyTypeName || ""
      } ${transactionType} `,
      href: generateURL({
        cityVal: city,
        saleLeaseVal: transactionType?.toLowerCase(),
        houseTypeVal: propertyTypeName?.toLowerCase() || null,
        province: "alberta",
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
  //   let analyticsData = null;
  //   if (main_data?.PropertyType === "Commercial") {
  //     analyticsData = await getCommercialAnalytics({
  //       listing: main_data,
  //       city: main_data?.City,
  //     });
  //   } else if (main_data?.TransactionType === "For Lease") {
  //     analyticsData = await getLeaseAnalytics({
  //       listing: main_data,
  //       city: main_data?.City,
  //     });
  //   } else {
  //     analyticsData = await getListingAnalytics({
  //       listing: main_data,
  //       city: main_data?.City,
  //     });
  //   }
  main_data.Province = "Alberta";
  return (
    <div className="flex justify-center sm:max-w-[90%] min-[2000px]:max-w-[65%] mx-auto open-sans">
      <div>
        <script
          key={main_data?.ListingId}
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
            <div className="hidden sm:block relative w-full">
              <Gallery data={imageURLs} />
            </div>
            <Carousel urls={imageURLs} />
            <div className="w-full flex justify-start md:justify-center ps-3 md:ps-0 pt-0 sm:pt-4 relative">
              <div className="grid sm:grid-cols-9 grid-cols-1 justify-between sm:justify-between w-full sm:gap-x-8 gap-y-12 sm:gap-y-0 relative max-w-[97%] sm:max-w-[75%]">
                <div className={`sm:col-span-6 col-span-9`}>
                  <AlbertaPropertyPage
                    {...{
                      main_data,
                      nearbyHomes: newSalesData,
                      //   analyticsData,
                    }}
                  />
                </div>

                <div
                  className="sm:col-span-3 col-span-9 relative"
                  id="mycontact"
                >
                  <SideContactForm
                    address={
                      address + `, ${region?.name || main_data?.City}, Ontario`
                    }
                    city={main_data?.City}
                    // openHouseData={openHouseData}
                  />
                </div>
              </div>
            </div>

            <div className="mt-24 mb-10 col-span-7 px-3 flex flex-col gap-20 items-center justify-center">
              <FAQ main_data={main_data} />
            </div>
            {
              //   <section className="additonal__listing w-full mx-auto mt-10 md:mt-24">
              //     <PropertyDisplaySection
              //       title={`Recently Sold Homes in ${
              //         region?.name || main_data?.City || "Ontario"
              //       }`}
              //       subtitle={`Check out recently sold properties. Listings updated daily`}
              //       exploreAllLink={null}
              //     >
              //       <UnlockableCards data={oldSoldData} />
              //     </PropertyDisplaySection>
              //   </section>
            }
            {formattedSlug && newSalesData?.length > 0 && (
              <section className="additonal__listing w-full mx-auto mt-10 md:mt-24">
                <PropertyDisplaySection
                  title={`Similar ${
                    homeText[
                      Object.values(pillar9HouseTypes).find(
                        (data) => data.value == main_data.PropertySubType
                      )?.name
                    ]
                  } nearby in ${region?.name || main_data?.City || "Ontario"}`}
                  subtitle={`Check out 100+ listings near this property. Listings updated daily`}
                  exploreAllLink={generateURL({
                    houseTypeVal: Object.values(pillar9HouseTypes).find(
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

AlbertaListingDetailPage.generateMetadata = async function ({ params }) {
  const slug = params.slug1;
  const listingID = slug[slug.length - 1];
  const parts = listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingIDValue = lastPart;

  const [main_data, imageURLs] = await Promise.all([
    fetchAlbertaDataFromMLS(listingIDValue),
    generateImageURLs(listingIDValue),
  ]);

  console.log(
    `${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix} in ${main_data?.City} MLS # ${main_data?.ListingId} - Dolphy`
  );
  return {
    alternates: {
      canonical: `https://dolphy.ca/resale/alberta/${
        params.slug1[0]
      }/listings/${slugGenerator(main_data)}`,
    },
    openGraph: {
      images: imageURLs?.length > 0 ? imageURLs[0] : null,
    },
    title: `${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix} in ${main_data?.City} MLS # ${main_data?.ListingId} - Dolphy`,
    description: `Book a showing for ${main_data?.StreetNumber} ${main_data?.StreetName} ${main_data?.StreetSuffix} with MLS # ${main_data?.ListingId} in ${main_data?.City} with us - Dolphy`,
  };
};
