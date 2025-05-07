import Link from "next/link";
import dynamic from "next/dynamic";
import SocialMediaShare from "@/components/SocialMediaShare";
import ProjectLocation from "@/components/listing/ProjectLocation";
import Neighbourhood from "@/components/listing/Neighbourhood";
import nFormatter from "@/helpers/nFormatter";
import Head from "next/head";
import FloorPlanSection from "@/components/listing/FloorPlanSection";
import CollapsibleContent from "./CollapsibleContent";
import RequestPriceButton from "./RequestPriceButton";
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
            <div className="flex items-end justify-start gap-1 mt-1">
              <h1 className="text-2xl md:text-4xl leading-none text-black font-black whitespace-nowrap overflow-hidden text-ellipsis">
                {house_detail.project_name}
              </h1>
              <div className="flex items-center gap-2">
                {house_detail.is_featured && (
                  <span className="bg-blue-500 px-1.5 py-0.5 rounded-[3px] text-[9px] font-medium text-white flex items-center gap-0.5 shadow-sm">
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
            </div>
            <div className="flex items-center gap-2 my-1">
              <h2 className="text-sm md:text-xl font-[400]">
                {house_detail.price_starting_from === 0 && `Price Coming Soon`}
                {house_detail.price_starting_from > 0 &&
                  `Starting From Low $${nFormatter(
                    house_detail.price_starting_from
                  )}`}
              </h2>
              <RequestPriceButton
                projectName={house_detail.project_name}
                city={house_detail.city.name}
              />
            </div>

            <SocialMediaShare />
          </div>
          <div>
            <section aria-labelledby="about-heading">
              <div className="bg-white rounded-lg p-0">
                <dl>
                  <div className="py-2">
                    <dd className="mt-2">
                      <ul className="space-y-3 p-0 m-0">
                        <li className="flex items-center text-gray-600">
                          <span className="w-28 font-medium text-black">
                            Developer:
                          </span>
                          <Link
                            href={`/developers/${house_detail.developer.slug}`}
                            className="text-blue-600 hover:underline"
                          >
                            {house_detail.developer.name}
                          </Link>
                        </li>
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

                  <div>
                    <dd>
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
                </dl>
              </div>
            </section>
          </div>
          <div className="my-16">
            <CollapsibleContent
              title="Project Details"
              subtitle={`Check out project details of ${house_detail.project_name}`}
              content={house_detail.description}
              ctaText="Request More Details"
              ctaType="project-details"
              houseDetail={house_detail}
            />
          </div>
          <div>
            <CollapsibleContent
              title="Deposit Structure"
              subtitle={`Check out deposit structure of ${house_detail.project_name}`}
              content={house_detail.deposit_structure}
              ctaText="Request Deposit Info"
              ctaType="deposit-structure"
              houseDetail={house_detail}
            />
            <FloorPlanSection projectName={house_detail.project_name} />
            <div className="mb-16">
              <CollapsibleContent
                title="Facts and Features"
                subtitle={`Check out facts and features of ${house_detail.project_name}`}
                content={house_detail.facts_about}
                ctaText="Request Full Package"
                ctaType="full-package"
                houseDetail={house_detail}
              />
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
            address={`${house_detail.project_address}, ${city}, ON`}
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
