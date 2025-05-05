import Link from "next/link";
import dynamic from "next/dynamic";
import ProjectLocation from "@/components/listing/ProjectLocation";
import Neighbourhood from "@/components/listing/Neighbourhood";
import nFormatter from "@/helpers/nFormatter";
import ListingInteractions from "./ListingInteractions";
import Head from "next/head";
// Dynamically import WalkScore with no SSR
const WalkScore = dynamic(() => import("./WalkScore"), {
  ssr: false,
});

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

function generateProjectTypeUrl(projectType) {
  if (projectType === "Condo") {
    return "condos";
  } else if (projectType === "Detached") {
    return "pre-construction/detached";
  } else if (projectType === "Townhome") {
    return "pre-construction/townhomes";
  } else if (projectType === "Semi-Detached") {
    return "pre-construction/semi-detached";
  } else {
    return "";
  }
}

export default function ListingInfo({ house_detail, city }) {
  // Structured data for real estate listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: house_detail.project_name,
    description: house_detail.description,
    url: typeof window !== "undefined" ? window.location.href : "",
    datePosted: new Date().toISOString(),
    address: {
      "@type": "PostalAddress",
      addressLocality: house_detail.city.name,
      addressRegion: "ON",
      postalCode: house_detail.postalcode,
      streetAddress: house_detail.project_address,
      addressCountry: "CA",
    },
    price:
      house_detail.price_starting_from > 0
        ? house_detail.price_starting_from
        : undefined,
    priceCurrency: "CAD",
    offers: {
      "@type": "Offer",
      availability:
        house_detail.status === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      price:
        house_detail.price_starting_from > 0
          ? house_detail.price_starting_from
          : undefined,
      priceCurrency: "CAD",
    },
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <div>
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="flex items-center gap-2 mt-4">
              {house_detail.is_featured && (
                <span className=" bg-blue-500 px-1.5 py-0.5 rounded-[3px] text-[9px] font-medium text-white flex items-center gap-0.5 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    fill="currentColor"
                    className="bi bi-star"
                    viewBox="0 0 22 22"
                  >
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                  </svg>
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-[3rem] text-[red] font-black leading-[3rem]">
              {house_detail.project_name}
            </h1>
            <h2 className="text-2xl md:text-3xl font-[700]">
              {house_detail.price_starting_from === 0 && `Price Coming Soon`}
              {house_detail.price_starting_from > 0 &&
                `Starting From Low $${nFormatter(
                  house_detail.price_starting_from
                )}`}
            </h2>
          </div>
          <div className="mt-10">
            <section aria-labelledby="about-heading">
              <h2
                id="about-heading"
                className="text-2xl md:text-3xl font-[800] mb-4"
              >
                About {house_detail.project_name}
              </h2>
              <div className="bg-white rounded-lg p-0">
                <dl>
                  <div className="py-2">
                    <dt className="text-lg font-semibold text-gray-900">
                      Developed by
                    </dt>
                    <dd className="mt-2">
                      <Link
                        href={`/developers/${house_detail.developer.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {house_detail.developer.name}
                      </Link>
                    </dd>
                  </div>

                  <div className="py-2">
                    <dt className="text-lg font-semibold text-gray-900">
                      Location Details
                    </dt>
                    <dd className="mt-2">
                      <ul className="space-y-3 p-0 m-0">
                        <li className="flex items-center text-gray-600">
                          <span className="w-28 font-medium text-black">
                            City:
                          </span>
                          <Link
                            href={`/${slugify(house_detail.city.name)}`}
                            className="text-blue-600 hover:underline"
                          >
                            {house_detail.city.name}
                          </Link>
                        </li>
                        <li className="flex items-start text-gray-600">
                          <span className="w-28 font-medium text-black">
                            Address:
                          </span>
                          <span className="flex-1">
                            {house_detail.project_address}
                          </span>
                        </li>
                        <li className="flex items-center text-gray-600">
                          <span className="w-28 font-medium text-black">
                            Postal Code:
                          </span>
                          <span>{house_detail.postalcode}</span>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  <div className="py-2">
                    <dt className="text-lg font-semibold text-gray-900">
                      Project Information
                    </dt>
                    <dd className="mt-2">
                      <ul className="space-y-3 p-0 m-0">
                        <li className="flex items-center text-gray-600">
                          <span className="w-28 font-medium text-black">
                            Type:
                          </span>
                          <Link
                            href={`/${slugify(
                              house_detail.city.name
                            )}/${generateProjectTypeUrl(
                              house_detail.project_type
                            )}`}
                            className="text-blue-600 hover:underline"
                          >
                            {house_detail.project_type}
                          </Link>
                        </li>
                        <li className="flex items-center text-gray-600">
                          <span className="w-28 font-medium text-black">
                            Status:
                          </span>
                          <span>{house_detail.status}</span>
                        </li>
                        <li className="flex items-center text-gray-600">
                          <span className="w-28 font-medium text-black">
                            Occupancy:
                          </span>
                          <span>{house_detail.occupancy}</span>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  {/* Interactive Buttons Section */}
                  <div className="py-4">
                    <ListingInteractions house_detail={house_detail} />
                  </div>
                </dl>
              </div>
            </section>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-black mb-2">
              Project Details: {house_detail.project_name} in{" "}
              {house_detail.city.name}
            </h2>
            <div className="text-start text-inside">
              <div
                className="prose max-w-none text-sm md:text-base text-gray-600 leading-10"
                dangerouslySetInnerHTML={{
                  __html: house_detail.description,
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 my-20 gap-4">
            <div>
              <h3 className="text-[1.25rem] text-[black] font-[700] mb-2">
                Deposit Structure
              </h3>
              <div
                className="iframe-container leading-9 space-y-5"
                dangerouslySetInnerHTML={{
                  __html: house_detail.deposit_structure,
                }}
              ></div>
            </div>
            <div>
              <h3 className="text-[1.25rem] text-[black] font-[700] mb-2">
                Facts and Features
              </h3>
              <div
                className="iframe-container leading-9 space-y-5"
                dangerouslySetInnerHTML={{
                  __html: house_detail.facts_about,
                }}
              ></div>
            </div>
          </div>
          {house_detail.project_address && (
            <WalkScore
              projectName={house_detail.project_name}
              address={`${house_detail.project_address}, ${city}, ON`}
            />
          )}
          <ProjectLocation
            projectName={house_detail.project_name}
            address={house_detail.project_address}
            latitude={house_detail.latitute}
            longitude={house_detail.longitude}
          />
          <Neighbourhood
            projectName={house_detail.project_name}
            street_map={house_detail.street_map}
          />
          <div className="py-5">
            <p className="text-xs leading-5 text-gray-500">
              Note: Dolphy is Canada's one of the largest database of new
              construction homes. Our comprehensive database is populated by our
              research and analysis of publicly available data. Dolphy strives
              for accuracy and we make every effort to verify the information.
              The information provided on Dolphy.ca may be outdated or
              inaccurate. Dolphy Inc. is not liable for the use or misuse of the
              site's information.The information displayed on{" "}
              <a href="https://dolphy.ca" className="text-primary">
                dolphy.ca
              </a>{" "}
              is for reference only. Please contact a liscenced real estate
              agent or broker to seek advice or receive updated and accurate
              information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
