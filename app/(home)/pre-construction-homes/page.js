import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import DolphyAdvantage from "@/components/DolphyAdvantage";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import HomebabaAdvantage from "@/components/HomebabaAdvantage";

async function getData(city) {
  const res = await fetch("https://api.dolphy.ca/api/all-precons", {
    next: { revalidate: 10 },
  });

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

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy.ca/pre-construction-homes/`,
    },
    openGraph: {
      images: "/social/precon.webp",
    },
    title: `Be First to Move Into Canada's Most Exciting New Construction Neighborhoods`,
    description: `Lock in pricing and incentives on model homes available for a limited time. Act now before inventory fills up in Canada's most in-demand locales. With prices still accessible compared to resales, find your perfect fit.`,
  };
}

export default async function Home({ params }) {
  let all_data = await getData();
  let cities = await getCities();

  return (
    <>
      {/* <FixedContactButton></FixedContactButton> */}
      <div className="pt-4 position-relative">
        <div className="row row-cols-1 row-cols-md-1 align-items-center mx-0">
          <div className="col">
            <div className="py-md-4"></div>
            <h1 className="text-3xl font-bold text-center pt-5 my-4">
              List of Pre Construction Projects in <br /> Canada
            </h1>
            <h2 className="text-green mt-4 text-center">
              Register Today For VIP First Access
            </h2>
            <p className="text-green mb-4 text-center">
              Get exclusive first access to floor plans and the best pricing
            </p>
            <div className="pb-5 flex justify-center">
              <button className="btn btn-lg rounded-full bg-blue-500 text-white px-6 py-2">
                Register Now
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="pb-1 w-full">
                <SearchBar cities={cities} />
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 my-3"></div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {all_data &&
              all_data.length > 0 &&
              all_data.map((item) => (
                <div className="col">
                  <Link
                    href={"/pre-construction-homes/" + item.slug}
                    className="text-black"
                  >
                    <h4 className="text-lg font-bold">{item.name}</h4>
                  </Link>
                  <div className="maxhh">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {item.preconstructions &&
                        item.preconstructions.map((precon, no) => (
                          <Link
                            href={`/pre-construction-homes/${item.slug}/${precon.slug}`}
                            className="mb-0 text-sm col"
                            target="_blank"
                          >
                            {precon.project_name}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-5 pt-5">
            <h3 className="text-2xl font-bold">
              <strong>Explore more cities </strong>
            </h3>
            <div>
              {cities &&
                cities.map((item) => (
                  <Link
                    href={"/pre-construction-homes/" + item.slug}
                    className="btn btn-light text-black bg-gray-200 me-3 mb-3"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>
          <div className="py-2"></div>
          <div className="pt-5 mt-5"></div>
          <HomebabaAdvantage />
          <div className="py-5 my-5" id="mycontact">
            <BottomContactForm
              proj_name="All"
              city="Preconstruction Homes Page"
            ></BottomContactForm>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}
