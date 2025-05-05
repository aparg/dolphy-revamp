import Gallery from "@/components/listing/Gallery";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import SocialMediaShare from "@/components/SocialMediaShare";
import ListingInfo from "@/components/listing/ListingInfo";
import SidebarContact from "@/components/listing/SidebarContact";
import Script from "next/script";
import nFormatter from "@/helpers/nFormatter";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import ListingCard from "@/components/ListingCard";
import { notFound } from "next/navigation";

async function getListingData(listingId) {
  try {
    const response = await fetch(
      `https://admin.dolphy.ca/api/pre-constructions/${listingId}/`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    // Validate required data
    if (!data.house_detail || !data.images) {
      throw new Error("Invalid data structure received from API");
    }

    return data;
  } catch (error) {
    console.error("Error fetching listing data:", error);
    throw error; // Let Next.js handle the error
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

function createSchema(listing) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: listing.project_name,
    image:
      (listing.image && listing.image[0] && listing.image[0].image) ||
      "/noimage.webp",
    description:
      listing.project_name +
      " is a brand new Pre-construction located at  " +
      listing.project_address +
      " , " +
      listing.city.name +
      " with great features " +
      " and in high demand all over Canada.",
    brand: listing.developer.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "20",
    },
    offers: {
      "@type": "AggregateOffer",
      url: `https://dolphy.ca/${listing.city.slug}/${listing.slug}`,
      priceCurrency: "CAD",
      lowPrice: listing.price_starting_from || "0",
      highPrice: listing.price_to || "0",
    },
  };
}

export default async function ListingPage({ params }) {
  try {
    const data = await getListingData(params.listing_id);

    // Ensure all required data exists
    if (!data || !data.house_detail || !data.images || !data.partnerdata) {
      console.error("Missing required data:", data);
      notFound();
    }

    const { house_detail, images, partnerdata } = data;

    const accordionData = [
      {
        title: "Who is the builder for " + house_detail.project_name + " ?",
        content: (
          <strong>
            {house_detail.project_name} is developed by{" "}
            {house_detail.developer.name}
          </strong>
        ),
      },
      {
        title: "Where is " + house_detail.project_name + " located ?",
        content: (
          <strong>
            {house_detail.project_name} is located in{" "}
            {house_detail.project_address}
          </strong>
        ),
      },
      {
        title:
          "What is the starting price for the homes or unit in " +
          house_detail.project_name +
          " ?",
        content: (
          <strong>
            The price of the homes or unit could change. Please contact the real
            estate agent{" "}
            <a
              href="#mycontact"
              className="text-primary text-decoration-underline"
            >
              here
            </a>{" "}
            to get more information
          </strong>
        ),
      },
    ];

    return (
      <main className="min-h-screen bg-background">
        {/* <div className="fixed bottom-4 left-[140px] -translate-x-1/2 z-50 md:hidden w-[250px] rounded-xl shadow-large">
          <div className="bg-white shadow text-center p-2 rounded-t-xl font-bold">
            {house_detail.price_starting_from > 0 &&
              `Starting From Low ${nFormatter(house_detail.price_starting_from)}`}
            {house_detail.price_starting_from === 0 && `Price Coming Soon`}
          </div>
          <Link
            href="#mycontact"
            className="flex items-center justify-center bg-[#ff6200] text-white px-6 py-3 shadow-lg w-full rounded-b-xl"
          >
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-2">
                Send a message
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chat-left-dots"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </span>
            </div>
          </Link>
        </div> */}
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createSchema(house_detail)),
          }}
        />
        <div className="max-w-7xl mx-auto px-0 sm:px-4">
          <div className="w-full mt-2 md:mt-2 px-2 md:px-0">
            <Breadcrumbs />
            <Gallery images={images} projectName={house_detail.project_name} />
            <div className="max-w-5xl mx-auto px-2 sm:px-8 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8 mt-8">
                <div className="col-span-2 pe-0 md:pe-2">
                  <SocialMediaShare />
                  <ListingInfo house_detail={house_detail} city={params.city} />
                </div>

                <div className="col-span-1 flex flex-col items-center mt-14 md:mt-0">
                  <img
                    src="/reg.png"
                    alt="Register Now"
                    className="w-[200px] sm:w-[250px] rounded-xl overflow-hidden"
                    style={{ borderRadius: "8px" }}
                  />
                  <div className="sticky top-24 w-full justify-center hidden md:flex">
                    <div className="w-[350px] min-w-[350px] mx-auto">
                      <SidebarContact
                        projectName={house_detail.project_name}
                        city={params.city}
                        partnerdata={partnerdata}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <NewsLetter /> */}

              <div className="max-w-3xl mx-auto mt-20 mb-20">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center">
                  Summary of{" "}
                  <Link
                    href={`/pre-construction/${slugify(
                      house_detail.project_name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-700 hover:text-blue-900"
                  >
                    {house_detail.project_name}
                  </Link>{" "}
                  Project
                </h2>
                <div className="prose max-w-none text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
                  <p>
                    <Link
                      href={`/pre-construction/${slugify(
                        house_detail.project_name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-900"
                    >
                      {house_detail.project_name}
                    </Link>{" "}
                    is an exciting{" "}
                    <Link
                      href={`/${
                        house_detail.city.name
                      }/pre-construction/${house_detail.project_type.toLowerCase()}s`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-900"
                    >
                      new pre construction home in {house_detail.city.name}{" "}
                    </Link>
                    developed by{" "}
                    <Link
                      href={`/developers/${slugify(
                        house_detail.developer.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-900"
                    >
                      {house_detail.developer.name}
                    </Link>
                    , ideally located near {house_detail.project_address},{" "}
                    {house_detail.city.name} ({house_detail.postalcode}). Please
                    note: the exact project location may be subject to change.
                  </p>
                  <p>
                    {house_detail.price_starting_from > 0 ? (
                      <>
                        Offering a collection of modern and stylish
                        <Link
                          href={`/${house_detail.city.name.toLowerCase()}/pre-construction/${house_detail.project_type.toLowerCase()}s#selling`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-700 hover:text-blue-900"
                        >
                          {" "}
                          {house_detail.project_type.toLowerCase()} for sale in{" "}
                          {house_detail.city.name},
                        </Link>
                        <Link
                          href={`/pre-construction/${slugify(
                            house_detail.project_name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-700 hover:text-blue-900"
                        >
                          {" "}
                          {house_detail.project_name}
                        </Link>{" "}
                        is launching with starting prices from the low{" "}
                        {nFormatter(house_detail.price_starting_from)}s (pricing
                        subject to change without notice).
                      </>
                    ) : (
                      <>
                        Offering a collection of modern and stylish
                        <Link
                          href={`/${house_detail.city.name.toLowerCase()}/pre-construction/${house_detail.project_type.toLowerCase()}s#selling`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-700 hover:text-blue-900"
                        >
                          {" "}
                          {house_detail.project_type.toLowerCase()} for sale in{" "}
                        </Link>
                        {house_detail.city.name},
                        <Link
                          href={`/${house_detail.city.name}/${house_detail.project_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-700 hover:text-blue-900"
                        >
                          {" "}
                          {house_detail.project_name}
                        </Link>{" "}
                        pricing details will be announced soon.
                      </>
                    )}
                  </p>
                  <p>
                    Set in one of{" "}
                    <Link
                      href="/resale/ontario"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-900"
                    >
                      Ontario's
                    </Link>{" "}
                    fastest-growing cities, this thoughtfully planned community
                    combines suburban tranquility with convenient access to
                    urban amenities, making it a prime choice for{" "}
                    <Link
                      href="/blogs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-900"
                    >
                      first-time buyers
                    </Link>
                    , families, and{" "}
                    <Link
                      href="/blog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-900"
                    >
                      real estate investors alike
                    </Link>
                    . While the occupancy date is{" "}
                    {house_detail.occupancy || "still to be announced"}, early
                    registrants can now request floor plans, parking prices,
                    locker prices, and estimated maintenance fees.
                  </p>
                  <p className="font-medium">
                    Don't miss out on this incredible opportunity to be part of
                    the{" "}
                    <Link
                      href={`/pre-construction/${slugify(
                        house_detail.project_name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-900"
                    >
                      {house_detail.project_name} community
                    </Link>{" "}
                    —{" "}
                    <Link
                      href="/contact-us"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-900"
                    >
                      register today{" "}
                    </Link>
                    for priority updates and early access!
                  </p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto mt-40">
                <h2 className="text-2xl font-extrabold text-center my-4 border-b border-gray-800 pb-4">
                  Frequently Asked Questions about {house_detail.project_name}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {accordionData.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="hover:no-underline text-start items-center">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>{item.content}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div className="mt-40"></div>
              <div className="block">
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
                    More about {house_detail.project_name}
                  </h2>
                  <p className="text-gray-600 text-center text-sm md:text-base">
                    Get VIP Access and be on priority list
                  </p>
                </div>
                <ContactForm
                  projectName={house_detail.project_name}
                  city={params.city}
                  partnerdata={partnerdata}
                  defaultMessage={`Please send me additional information about ${house_detail.project_name}. Thank you !`}
                />
              </div>
            </div>
            {/* Add Related Listings Section after FAQ */}
            {house_detail.related1 && house_detail.related1.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 mt-40 mb-20">
                <div className="flex justify-between items-center mb-8">
                  <Link
                    href={`/${params.city}`}
                    className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-gray-300 hover:border-gray-800 transition-all duration-300 cursor-pointer"
                  >
                    See similar preconstruction homes in {params.city}
                  </Link>
                  <Link href={`/${params.city}`} className="text-gray-600 mt-2">
                    View All
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-2 md:gap-2">
                  {house_detail.related1.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      city={params.city}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    // Add better error logging
    console.error("Error in ListingPage:", error);
    throw error; // Let Next.js error boundary handle it
  }
}

// Generate metadata
export async function generateMetadata({ params }) {
  try {
    const data = await getListingData(params.listing_id);
    const { house_detail } = data;

    if (!house_detail) {
      return {
        title: "Listing Not Found",
        description: "The requested listing could not be found.",
      };
    }

    return {
      title: house_detail.meta_title || house_detail.project_name,
      description:
        house_detail.meta_description ||
        `Details about ${house_detail.project_name}`,
      openGraph: {
        title: house_detail.meta_title || house_detail.project_name,
        description:
          house_detail.meta_description ||
          `Details about ${house_detail.project_name}`,
        images: data.images?.[0]?.images || "https://dolphy.ca/noimage.webp",
      },
      alternates: {
        canonical: `https://dolphy.ca/${params.city}/${params.listing_id}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading the listing.",
    };
  }
}
