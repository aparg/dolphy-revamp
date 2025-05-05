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
      "?project_type=Townhome&page_size=200",
    {
      next: { revalidate: 10 },
    }
  );
  console.log("RESPONSE");
  console.log(res);
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
      canonical: `https://dolphy.ca/pre-construction-homes/${params.city}/townhomes/`,
    },
    title:
      data.preconstructions.length + " Preconstruction Townhomes in " + city,
    openGraph: {
      images: retImage(data.preconstructions),
    },
    description: `${city} upcoming pre construction Townhomes. Check out ${data.preconstructions.length}+ new construction townhomes on Dolphy. Floor plans & pricing updated for upcoming new construction townhomes in ${city}`,
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);
  console.log(data);
  const blogPosts = await fetchBlogPostByCity(params?.city);
  let cities = await getCities();

  return (
    <>
      {/* <FixedContactButton></FixedContactButton> */}
      <div className="pt-4 position-relative">
        <div className="container-fluid">
          <div className="pb-0  px-8">
            <h1 className="font-bold text-4xl">
              {`${
                data.preconstructions.length
              }+ Active New Construction Townhomes in ${CapitalizeFirst(
                params.city
              )} ( Selling Now )`}
            </h1>
            <p className="text-dark text-left text-md-start mb-2">
              {`${
                data.preconstructions.length
              } Pre construction Townhomes in ${CapitalizeFirst(
                params.city
              )} (Updated ${
                new Date().getMonth() +
                1 +
                "-" +
                new Date().getDate() +
                "-" +
                new Date().getFullYear()
              })`}
            </p>
          </div>
          {/* <div className="d-flex mb-4 mt-0 gap-2 overflow-hidden">
            <div>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/`}
              >
                All Projects in {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/upcoming/`}
              >
                Upcoming Projects in {CapitalizeFirst(params.city)}
              </Link>
            </div>
            <div>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/detached/`}
              >
                {CapitalizeFirst(params.city)} Detached Homes
              </Link>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/condos/`}
              >
                {CapitalizeFirst(params.city)} Condos
              </Link>
            </div>
          </div> */}
        </div>

        <EventBanner></EventBanner>

        <div className="container-fluid">
          <div className="py-2"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            {data.preconstructions &&
              data.preconstructions.map((item, no) => (
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
          <div className="pt-5 mt-5"></div>
          <HomebabaAdvantage></HomebabaAdvantage>
          <div className="pt-5 mt-5"></div>
          {/* <div className="mb-5">
            <h3 className="fs-2">
              <strong>The Dolphy Insights</strong> - Know Whats Happening in{" "}
              {CapitalizeFirst(data.city.name)}
            </h3>
            <p>
              Learn about the new projects, news and insights and current new
              trends happening in {CapitalizeFirst(data.city.name)}
            </p>
          </div> */}
          {/* <div className="row row-cols-lg-5">
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
          </div> */}
          <div className="py-5 my-5" id="mycontact">
            <div className="container-fluid">
              <div className="flex justify-center">
                <img src="/contact-bottom-2.png" alt="dce" className="w-60" />
              </div>
              <h2 className="font-bold text-center text-5xl my-4">
                Contact Dolphy Team Today
              </h2>
              <div className="max-w-6xl mx-auto">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm
                    proj_name="City Page"
                    city={data.city.name}
                  ></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
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
