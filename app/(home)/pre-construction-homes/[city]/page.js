import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import DolphyAdvantage from "@/components/DolphyAdvantage";
import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";
import { fetchBlogPostByCity } from "@/app/api/blogs";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import EventBanner from "@/components/Banner";
import HomebabaAdvantage from "@/components/HomebabaAdvantage";

async function getData(city) {
  const res = await fetch(
    "https://api.dolphy.ca/api/preconstructions-city/" +
      city +
      "?page_size=200",
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getCities() {
  const res = await fetch("https://api.dolphy.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

const retImage = (data) => {
  if (data.length > 0) {
    if (data[0].image.length > 0 && data[0].image[0].image) {
      return `https://api.dolphy.ca${data[0].image[0].image}`;
    }
  } else {
    return "/social/gta.webp";
  }
};

export async function generateMetadata({ params }, parent) {
  let city = CapitalizeFirst(params.city);
  const data = await getData(params.city);
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy.ca/pre-construction-homes/${params.city}/`,
    },
    title: data.preconstructions.length + " Preconstruction Homes in " + city,
    openGraph: {
      images: retImage(data.preconstructions),
    },
    description: `${city} pre construction TownHomes, Detached & Condos. Check out ${data.preconstructions.length}+ new construction homes on Dolphy. Floor plans & pricing updated for new construction homes in ${city}`,
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);
  const blogPosts = await fetchBlogPostByCity(params?.city);

  const filteredprojects = (value) => {
    return data.preconstructions.filter((item) => item.status == value);
  };

  return (
    <>
      {/* <FixedContactButton></FixedContactButton> */}
      <div className="pt-4 relative">
        <div className="px-4 mx-auto">
          <div className="pb-0">
            <h1 className="text-3xl font-bold text-center md:text-left mb-0">
              {`${
                data.preconstructions.length
              }+ Active Pre Construction & New Homes in ${CapitalizeFirst(
                params.city
              )} ( Selling Now )`}
            </h1>
            <p className="text-gray-800 text-center md:text-left mb-2">
              {`${data.preconstructions.length}+ New Pre construction Detached,
              Townhomes and Condos for sale in ${CapitalizeFirst(
                params.city
              )} (Updated ${
                new Date().getMonth() +
                "-" +
                new Date().getDate() +
                "-" +
                new Date().getFullYear()
              })`}
            </p>
          </div>
          <div className="flex mb-4 mt-0 gap-2 overflow-hidden">
            <div>
              <Link
                className="bg-white text-black py-2 px-4 rounded shadow-sm text-sm font-medium"
                href={`/pre-construction-homes/${params.city}/upcoming/`}
              >
                Upcoming Projects in {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="bg-white text-black py-2 px-4 rounded shadow-sm text-sm font-medium"
                href={`/pre-construction-homes/${params.city}/townhomes/`}
              >
                New Townhomes {CapitalizeFirst(params.city)}
              </Link>
            </div>
            <div>
              <Link
                className="bg-white text-black py-2 px-4 rounded shadow-sm text-sm font-medium"
                href={`/pre-construction-homes/${params.city}/detached/`}
              >
                New Detached Homes {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="bg-white text-black py-2 px-4 rounded shadow-sm text-sm font-medium"
                href={`/pre-construction-homes/${params.city}/condos/`}
              >
                New Condos {CapitalizeFirst(params.city)}
              </Link>
            </div>
          </div>
          <EventBanner></EventBanner>
        </div>
        <div className="px-4">
          <div className="py-2"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            {data.preconstructions &&
              filteredprojects("Selling").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5"></div>
          <h2 className="fw-bold fs-3 mb-4">
            {filteredprojects("Upcoming").length > 0 ? (
              `Launching Soon - New Construction Projects in ${CapitalizeFirst(
                data.city.name
              )}`
            ) : (
              <></>
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.preconstructions &&
              filteredprojects("Planning Phase").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
            {data.preconstructions &&
              filteredprojects("Upcoming").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5"></div>
          <h2 className="fw-bold fs-3 mb-4 text-red">
            {filteredprojects("Sold out").length > 0 ? (
              <i>{`Past Communities in ${CapitalizeFirst(
                data.city.name
              )} - Sold out`}</i>
            ) : (
              <></>
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.preconstructions &&
              filteredprojects("Sold out").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <HomebabaAdvantage />
          <div className="pt-5 mt-5"></div>
          <div className="mb-5">
            <h3 className="fs-2">
              <strong>The Dolphy Insights</strong> - Know Whats Happening in{" "}
              {CapitalizeFirst(data.city.name)}
            </h3>
            <p>
              Learn about the new projects, news and insights and current new
              trends happening in {CapitalizeFirst(data.city.name)}
            </p>
          </div>
          <div className="row row-cols-lg-5">
            {blogPosts.length > 0 ? (
              <>
                {blogPosts.map((blog, index) => {
                  return (
                    <div className="col-12 mb-4" key={index}>
                      <BlogCard blog={blog} />
                    </div>
                  );
                })}
              </>
            ) : (
              <div>
                <p className="fs-2 text-center fw-bold text-secondary">
                  No blog post found
                </p>
              </div>
            )}
          </div>
          <div className="py-5 my-5" id="mycontact">
            <BottomContactForm
              proj_name="City Page"
              city={data.city.name}
            ></BottomContactForm>
          </div>

          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="d-flex justify-content-center">
            <div className="py-5 max-w-mine">
              {data.city && (
                <div className="container" id="make-img-responsive">
                  <div className="row row-cols-1">
                    <div
                      className="col-12 mt-mine px-3"
                      dangerouslySetInnerHTML={{
                        __html: data.city.details,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
