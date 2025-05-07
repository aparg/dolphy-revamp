import nFormatter from "@/helpers/nFormatter";
import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import SideContactForm from "@/components/SideContactForm";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";
import FloorPlans from "@/components/FloorPlans";
import ListingInfo from "@/components/listing/ListingInfo";
import SidebarContact from "@/components/listing/SidebarContact";
import BannerPrecon from "@/components/listing/BannerPrecon";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";

async function getData(slug) {
  const res = await fetch(
    "https://api.dolphy.ca/api/preconstructions-detail/" + slug,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getRelatedData(city) {
  const res = await fetch("https://api.dolphy.ca/api/related-precons/" + city, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const retImage = (data) => {
  if (data.image.length > 0) {
    return `https://api.dolphy.ca${data.image[0].image}`;
  } else {
    return "/social/gta.webp";
  }
};

export async function generateMetadata({ params }, parent) {
  const data = await getData(params.slug);

  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy.ca/pre-construction-homes/${params.city}/${params.slug}`,
    },
    openGraph: {
      images: retImage(data),
    },
    title:
      data.project_name +
      " in " +
      data.city.name +
      " by " +
      data.developer.name,
    description:
      data.project_name +
      " in " +
      data.city.name +
      " by " +
      data.developer.name +
      " prices starting from " +
      nFormatter(data.price_starting_from, 2) +
      " CAD",
  };
}

export default async function Home({ params }) {
  const data = await getData(params.slug);
  const related = await getRelatedData(params.city);

  const convDash = (add) => {
    var result = add.split(" ").join("-");
    var newresult = result.split(",").join("-");
    return newresult;
  };

  /* const doTOcheck = (noo) => {
    if (parseInt(noo) != 0) {
      return "- High $ " + Nformatter(noo, 2);
    }
  }; */

  const doTOcheck2 = (noo) => {
    if (parseInt(noo) != 0) {
      return "Low $ " + nFormatter(noo, 2);
    } else {
      return "Pricing not available";
    }
  };

  function checkPricing(prii, priito) {
    if (parseInt(prii) == 0) {
      return `Pricing not available`;
    } else {
      return "Starting from " + doTOcheck2(prii);
    }
  }

  const accordionData = [
    {
      title: "Who is the builder for " + data.project_name + " ?",
      content: (
        <strong>
          {data.project_name} is developed by {data.developer.name}
        </strong>
      ),
    },
    {
      title: "Where is " + data.project_name + " located ?",
      content: (
        <strong>
          {data.project_name} is located in {data.project_address}
        </strong>
      ),
    },
    {
      title:
        "What is the starting price for the homes or unit in " +
        data.project_name +
        " ?",
      content: (
        <strong>
          The price of the homes or unit could change. Please contact the real
          estate agent{" "}
        </strong>
      ),
    },
  ];

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PreconSchema(data)),
        }}
      />
      {/* <FixedContactButton></FixedContactButton> */}
      <div className="max-w-7xl mx-auto px-0 sm:px-4">
        <div className="w-full mt-2 md:mt-2 px-2 md:px-0">
          <Gallery
            images={data.image}
            project_name={data.project_name}
            project_address={data.project_address}
          ></Gallery>
          <div className="max-w-5xl mx-auto px-2 sm:px-8 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-12 mt-2">
              <div className="col-span-2 pe-0 lg:pe-6">
                <Breadcrumb
                  homeElement={"Home"}
                  separator={
                    <span>
                      {" "}
                      <svg
                        className="svg h-3"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z"
                          fill={"#869099"}
                        ></path>
                      </svg>{" "}
                    </span>
                  }
                  activeClasses="text-dark"
                  containerClasses="flex items-center p-0 m-0 pt-4 breadcrumb"
                  listClasses="mx-1"
                  capitalizeLinks
                />
                <ListingInfo house_detail={data} city={params.city} />
              </div>

              <div className="col-span-1 flex flex-col items-center mt-14 md:mt-0">
                <div className="sticky top-10 w-full justify-center hidden md:flex">
                  <div className="w-[350px] min-w-[350px] mx-auto">
                    {console.log("HELLO")}
                    {console.log(data)}
                    <SideContactForm
                      projectName={data.project_name}
                      city={params.city}
                      partnerdata={data.partnerdata}
                    ></SideContactForm>
                  </div>
                </div>
              </div>
            </div>

            <BannerPrecon
              projectName={data.project_name}
              developer={data.developer}
              project_type={data.project_type}
              city={data.city.name}
            />

            <div className="max-w-3xl mx-auto mt-20 mb-20">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center">
                Summary of{" "}
                <Link
                  href={`/pre-construction-homes/${slugify(data.project_name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-700 hover:text-blue-900"
                >
                  {data.project_name}
                </Link>{" "}
                Project
              </h2>
              <div className="prose max-w-none text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  <Link
                    href={`/pre-construction-homes/${slugify(
                      data.project_name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-700 hover:text-blue-900"
                  >
                    {data.project_name}
                  </Link>{" "}
                  is an exciting{" "}
                  <Link
                    href={`/${
                      data.city.name
                    }/pre-construction-homes/${data.project_type.toLowerCase()}s`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-700 hover:text-blue-900"
                  >
                    new pre construction home in {data.city.name}{" "}
                  </Link>
                  developed by{" "}
                  <Link
                    href={`/developers/${slugify(data.developer.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-700 hover:text-blue-900"
                  >
                    {data.developer.name}
                  </Link>
                  , ideally located near {data.project_address},{" "}
                  {data.city.name} ({data.postalcode}). Please note: the exact
                  project location may be subject to change.
                </p>
                <p>
                  {data.price_starting_from > 0 ? (
                    <>
                      Offering a collection of modern and stylish
                      <Link
                        href={`/${data.city.name.toLowerCase()}/pre-construction-homes/${data.project_type.toLowerCase()}s#selling`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-700 hover:text-blue-900"
                      >
                        {" "}
                        {data.project_type.toLowerCase()} for sale in{" "}
                        {data.city.name},
                      </Link>
                      <Link
                        href={`/pre-construction-homes/${slugify(
                          data.project_name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-700 hover:text-blue-900"
                      >
                        {" "}
                        {data.project_name}
                      </Link>{" "}
                      is launching with starting prices from the low{" "}
                      {nFormatter(data.price_starting_from)}s (pricing subject
                      to change without notice).
                    </>
                  ) : (
                    <>
                      Offering a collection of modern and stylish
                      <Link
                        href={`/${data.city.name.toLowerCase()}/pre-construction-homes/${data.project_type.toLowerCase()}s#selling`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-700 hover:text-blue-900"
                      >
                        {" "}
                        {data.project_type.toLowerCase()} for sale in{" "}
                      </Link>
                      {data.city.name},
                      <Link
                        href={`/${data.city.name}/${data.project_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-700 hover:text-blue-900"
                      >
                        {" "}
                        {data.project_name}
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
                  combines suburban tranquility with convenient access to urban
                  amenities, making it a prime choice for{" "}
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
                  {data.occupancy || "still to be announced"}, early registrants
                  can now request floor plans, parking prices, locker prices,
                  and estimated maintenance fees.
                </p>
                <p className="font-medium">
                  Don't miss out on this incredible opportunity to be part of
                  the{" "}
                  <Link
                    href={`/pre-construction-homes/${slugify(
                      data.project_name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-700 hover:text-blue-900"
                  >
                    {data.project_name} community
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
                Frequently Asked Questions about {data.project_name}
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
                  More about {data.project_name}
                </h2>
                <p className="text-gray-600 text-center text-sm md:text-base">
                  Get VIP Access and be on priority list
                </p>
              </div>
              <BottomContactForm
                proj_name={data.project_name}
                city="Project Detail Page"
                image={false}
              ></BottomContactForm>
            </div>
          </div>
          {/* Add Related Listings Section after FAQ */}
          {data.related1 && data.related1.length > 0 && (
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-3">
                {related &&
                  related.map((item) => (
                    <div className="col" key={item.id}>
                      <CondoCard {...item} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
