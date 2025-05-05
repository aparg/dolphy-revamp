import Link from "next/link";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import DolphyAdvantage from "@/components/DolphyAdvantage";
import SearchBar from "@/components/SearchBar";

async function getCities() {
  const res = await fetch("https://api.dolphy.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getCitiesandProjects() {
  const res = await fetch("https://api.dolphy.ca/api/all-precons", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy.ca/greater-toronto-area/`,
    },
    openGraph: {
      images: "/social/gta.webp",
    },
    title: "Looking for a Preconstruction Homes in Greater Toronto Area ? ",
    description:
      "Search our selection of new construction homes for sale in Greater Toronto Area. Our ever-changing portfolio of pre constructions brings you closer to your ideal homes in the growing area of Toronto.",
  };
}

export default async function Home() {
  let cities = await getCities();
  let dropdown_cities = await getCitiesandProjects();

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };
  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-1 align-items-center">
          <div className="col">
            <div className="py-md-4"></div>
            <h1 className="main-title text-center fs-3 fw-bold fs-gta pt-5 my-4">
              Pre Construction Projects in <br /> Greater Toronto Area
            </h1>
            <h2 className="text-green mt-4 text-center">
              Register Today For VIP First Access
            </h2>
            <p className="text-green mb-4 text-center">
              Get excluisive first access to floor plans and the best pricing
            </p>
            <div className="pb-5 d-flex justify-content-center">
              <button className="btn btn-lg rounded-pill registernoebtn">
                Register Now
              </button>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="pb-1 ww">
                <SearchBar cities={cities} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5"></div>
      <div className="pt-3">
        <div className="container-fluid">
          <div>
            <div className="text-center fw-bold fs-3 text-mine">
              Greater Toronto Area Communities
            </div>
            <div className="py-3">
              <div className="row row-cols-2 row-cols-md-3 gy-3">
                {dropdown_cities &&
                  filteredprojects([
                    "Toronto",
                    "Mississauga",
                    "Brampton",
                    "Ajax",
                    "Burlington",
                    "Kitchener",
                    "Hamilton",
                    "Oakville",
                  ]).map((city, no) => (
                    <div className="col-12 col-sm-6 col-md-3 mb-4" key={no}>
                      <Link
                        className="link-black"
                        href={`/pre-construction-homes/${city.slug}/`}
                      >
                        <h4 className="fs-m fw-bold text-center">
                          {city.name}
                        </h4>
                      </Link>
                      <div className="d-flex justify-content-center flex-column align-items-center">
                        {city.preconstructions &&
                          city.preconstructions.length > 0 &&
                          city.preconstructions
                            .slice(0, 5)
                            .map((project, no) => (
                              <Link
                                className="fs-small link-black text-center"
                                href={`/pre-construction-homes/${city.slug}/${project.slug}`}
                              >
                                {project.project_name}
                              </Link>
                            ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 py-md-5">
          <div className="my-5 py-5">
            <div className="position-relative bg-lightblue container-fluid">
              <div className="side-img">
                <img
                  src="/calgarypng.png"
                  alt="condo in calgary"
                  className="img-fluid"
                />
              </div>
              <div className="side-text">
                <p>
                  Dolphy has one of the largest, most updated database of new
                  construction homes, backed by industry-leading technology and
                  partners.
                </p>
                <h3 className="fw-bold">dolphy</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <DolphyAdvantage></DolphyAdvantage>
          <div className="py-md-5"></div>
          <div className="py-5">
            <h3 className="fs-2 text-mine fw-bold text-center mb-0">
              We bring you home from credible builders
            </h3>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img
                src="/builders.png"
                alt="builders in dolphy"
                className="img-fluid mt-3 w-100 w-md-75"
              />
            </div>
          </div>
          <div className="py-5 my-5" id="mycontact">
            <BottomContactForm></BottomContactForm>
          </div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}
