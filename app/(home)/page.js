import Link from "next/link";
import BottomContactForm from "@/components/BottomContactForm";
import CondoCard from "@/components/CondoCard";
import CalgaryCardHome from "@/components/CalgaryCardHome";
import { notFound } from "next/navigation";
import DolphyAdvantage from "@/components/DolphyAdvantage";
import InstagramPost from "@/components/InstagramPost";
import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";
import MainSearch from "@/components/MainSearch";
import CondoCardHome from "@/components/CondoCardHome";

async function getData(city) {
  const res = await fetch(
    "https://api.dolphy.ca/api/preconstructions-city/" + city + "?page_size=10",
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

async function getCitiesandProjects() {
  const res = await fetch("https://api.dolphy.ca/api/all-precons", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data = await getData("calgary");
  const toronto_data = await getData("toronto");
  let cities = await getCities();
  let dropdown_cities = await getCitiesandProjects();

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };

  return (
    <>
      <FixedContactButton></FixedContactButton>
      <div className="py-3"></div>
      <div className="pt-3">
        <div className="container-fluid2">
          {/* <div className="d-flex flex-column align-items-center justify-content-center">
            <img
              src="/dolphin.png"
              alt="dolphy logo icon"
              className="img-fluid icon-img"
            />
            <MainSearch cities={cities} />
          </div>
          <h4 className="text-center fs-md-2 fw-bold mb-0">
            Calgary's Top Pre Construction Homes Platform
          </h4>
          <p className="text-center fs-small fs-md-5 mt-2 fw-less mt-md-0">
            A platform for everyone, no matter where you come from
          </p>
 */}
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="fw-mine ccent-line fs-big fs-1">
              <Link
                href={"/pre-construction-homes/calgary"}
                className="link-black"
              >
                Top Calgary Projects
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-5">
            <p className="fs-5 mb-0 text-center">
              Explore 20+ current & past new homes communities from Truman homes
              in Calgary
            </p>
            <Link
              href={"/pre-construction-homes/calgary"}
              className="mt-1 text-mine"
            >
              More communities in Calgary{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          {/* <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 gy-4 gx-3 gx-lg-3">
            {data.preconstructions &&
              data.preconstructions.slice(0, 6).map((item) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCardHome {...item} />
                </div>
              ))}
          </div> */}
          <CalgaryCardHome></CalgaryCardHome>
          <div className="pt-5 mt-5"></div>
          <div>
            <div className="text-center fw-bold fs-3 text-mine">
              Calgary Communities
            </div>
            <div className="py-3">
              <div className="row row-cols-2 row-cols-md-6 gy-5">
                <div className="col d-none d-md-block"></div>
                <div className="col">
                  <h4 className="fs-m fw-bold text-center">
                    North West, Calgary
                  </h4>
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Ambleton
                    </Link>
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Crimson Ridge
                    </Link>
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Carrington
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <h4 className="fs-m fw-bold text-center">
                    South West, Calgary
                  </h4>
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      West District
                    </Link>
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Peaks of Aspen Woods
                    </Link>
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Timberstone Ridge
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <h4 className="fs-m fw-bold text-center">
                    North East,Calgary
                  </h4>
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Cornerstone
                    </Link>
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Huxley
                    </Link>
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Timberstone Ridge
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <h4 className="fs-m fw-bold text-center">
                    South East, Calgary
                  </h4>
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Walden
                    </Link>
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Rangeview
                    </Link>
                    <Link href={`#`} className="mb-0 fs-small link-black">
                      Wolf Willow
                    </Link>
                  </div>
                </div>
                <div className="col d-none d-md-block"></div>
              </div>
            </div>
          </div>
          <div className="py-3">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center align-items-center">
              <img src="/Calgary.png" alt="Calgary map" className="img-fluid" />
              <img
                src="/Calgary2.png"
                alt="Calgary map"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="pt-5"></div>
          <div className="py-2"></div>
          <div className="py-5 my-2"></div>
          {/* <div className="d-flex align-items-center justify-content-center">
            <h2 className="fw-mine ccent-line fs-big fs-1">
              <Link href={"/greater-toronto-area/"} className="link-black">
                Toronto
              </Link>
            </h2>
          </div>
          <div className="d-flex flex-column justify-content-center flex-column align-items-center mb-5">
            <p className="fs-5 mb-0 text-center">
              Explore 100+ currently selling & upcoming pre-construction
              communities in Toronto
            </p>
            <Link
              href={"/pre-construction-homes/toronto"}
              className="mt-1 text-mine"
            >
              More developments in Toronto{" "}
              <i className="bi bi-arrow-right-short"></i>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 gy-4 gx-3 gx-lg-2">
            {toronto_data.preconstructions &&
              toronto_data.preconstructions.slice(0.5).map((item) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} />
                </div>
              ))}
          </div>
          <div className="pt-5"></div>
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
          </div> */}
        </div>
        <div className="py-3 py-md-5">
          <div className="my-5 py-5">
            <div className="position-relative bg-lightblue container-fluid2">
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
        <div className="container-fluid2">
          <DolphyAdvantage></DolphyAdvantage>
          <div className="py-md-5"></div>
          <div className="py-md-5">
            <div className="py-3 d-flex justify-content-center">
              <InstagramPost></InstagramPost>
            </div>
          </div>
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
            <div className="container-fluid2">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact Dolphy Team Today
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm
                    proj_name="All"
                    city="Home Page"
                  ></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}
