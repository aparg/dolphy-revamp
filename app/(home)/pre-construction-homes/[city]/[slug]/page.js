import nFormatter from "@/helpers/nFormatter";
import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import Accordion from "@/components/Accordion";
import SideContactForm from "@/components/SideContactForm";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";
import FloorPlans from "@/components/FloorPlans";

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
      return "Low $ " + Nformatter(noo, 2);
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PreconSchema(data)),
        }}
      />
      {/* <FixedContactButton></FixedContactButton> */}
      <div className="pt-md-1">
        <div className="container">
          <Breadcrumb
            homeElement={"Home"}
            separator={
              <span>
                {" "}
                <svg
                  className="svg text-black w-[18px] h-[18px]"
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
            activeClasses="text-black"
            containerClasses="flex items-center p-0 m-0 pt-4 breadcrumb"
            listClasses="mx-1"
            capitalizeLinks
          />
          <Gallery
            images={data.image}
            project_name={data.project_name}
            project_address={data.project_address}
          ></Gallery>
          <div className="container px-2 sm:px-0 pt-5 pt-md-1 mt-4 mt-md-0">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 justify-between">
              <div className="col-span-3 md:col-span-2">
                <div className="screenshot">
                  <div className="row row-cols-1 row-cols-sm-2">
                    <div className="col-sm-12">
                      <h1 className="main-title text-red font-medium">
                        {data.project_name}
                      </h1>
                      <p className="mb-0">
                        Developed By{" "}
                        <strong>
                          <Link
                            className="text-black"
                            href={`/pre-construction-homes/builders/${data.developer.slug}/`}
                          >
                            {data.developer.name}
                          </Link>
                        </strong>
                      </p>
                      <h2 className="vmain-title fs-3 fw-mine3 mt-1 mb-0">
                        {checkPricing(data.price_starting_from, data.price_to)}
                      </h2>
                      <div className="mb-1">
                        <span scope="col">Project status : {data.status}</span>
                      </div>
                      <div className="mb-1">
                        <span className="me-2 fw-mine2 mb-2 fs-mine3">
                          Project Location:
                        </span>
                        <span scope="col">
                          {data.project_address}, {data.city.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="my-2"></div>
                  <div className="features">
                    <div className="mb-5 mt-5">
                      <div className="rounded-mine">
                        <div></div>
                      </div>
                    </div>
                    <div className="py-5 pt-3">
                      <h2 className="fw-bold fs-3">
                        About {data.project_name} in {data.city.name}
                      </h2>
                      <div className="text-start mb-1 text-inside">
                        <div
                          className="iframe-container"
                          dangerouslySetInnerHTML={{
                            __html: data.description,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 my-5  position-relative">
                  <h2 className="fw-bold fs-4 pb-3">
                    {data.floorplan.length > 0
                      ? `See Available Floor Plans for ${data.project_name}`
                      : `Floor Plans Coming Soon`}
                  </h2>
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3">
                    {data.floorplan && data.floorplan.length > 0 && (
                      <FloorPlans images={data.floorplan}></FloorPlans>
                    )}
                  </div>
                </div>
                <div className="py-3 my-5">
                  <h2 className="fw-bold fs-4 pb-3">
                    Walk Score for {data.project_name}
                  </h2>
                  <div>
                    <div className="p-1">
                      <div className="walkscore-container mt-2 p-1 rounded-mine">
                        <iframe
                          height="500px"
                          title="Walk Score"
                          className="ham"
                          width="100%"
                          src={
                            "https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=" +
                            convDash(data.project_address) +
                            "&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737"
                          }
                        ></iframe>
                        <script
                          type="text/javascript"
                          src="https://www.walkscore.com/tile/show-walkscore-tile.php"
                        ></script>
                      </div>
                    </div>
                  </div>
                  {/* <div className="py-4">
                    <h2 className="fw-bold fs-4">
                      <span className="mx-1"></span>
                      Project Location - {data.project_name}
                    </h2>
                    <div>
                      <div className="bg-white p-1 rounded-mine">
                        <div className="mx-5 px-5"></div>
                        <Map
                          id="ds"
                          heightt="50vh"
                          project_address={data.project_address}
                          name={data.project_name}
                        ></Map>
                      </div>
                    </div>
                    <p className="small-text2 mb-2 mt-1">
                      Note : The exact location of the project may be vary from
                      the address shown here
                    </p>
                  </div> */}
                </div>
              </div>
              <div className="col-span-3 sm:col-span-1 px-2" id="mycontact">
                <div className="py-4 py-md-0"></div>
                <div className="text-center">
                  <img
                    alt="Register Now Text Design"
                    src="/reg.webp"
                    className="img-fluid mb-3 side-contact-img"
                  />
                </div>
                <div className="side-fix-contact mt-mine pe-0">
                  <div className="m-1 p-4 py-3 shadow-lg rounded-mine bordt">
                    <div className="grid grid-cols-2 items-center justify-center">
                      <div className="col-span-1 h-40">
                        <img
                          src="/contact-image.png"
                          alt="contact image"
                          className="agent-img"
                        />
                      </div>
                      <div className="col-span-1">
                        <h5 className="font-bold text-center text-xl">
                          Send a Message
                        </h5>
                        <p className="mb-0 text-center">
                          <Link
                            href="telto:(587) 887-2572"
                            className="link-black"
                          ></Link>
                        </p>
                      </div>
                    </div>
                    <div className="my-4"></div>
                    <SideContactForm
                      proj_name={data.project_name}
                      city={data.city.name}
                      defaultmessage={
                        "Please send me additional information about " +
                        data.project_name +
                        ".  Thank you"
                      }
                    ></SideContactForm>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5 my-5 d-none d-md-block">
            <BottomContactForm
              proj_name={data.project_name}
              city="Project Detail Page"
            ></BottomContactForm>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="container-fluid px-md-4 pt-md-5 mt-4">
            <section>
              <div className="d-flex flex-column justify-content-center align-items-center pb-md-4">
                <h3 className="main-title mb-3 mt-2 mb-md-5 text-center d-flex flex-column d-md-block">
                  Frequently Asked Questions About{" "}
                  <u className="ms-2">{data.project_name}</u>
                </h3>
                <div className="col-12 col-md-7">
                  <Accordion accdata={accordionData}></Accordion>
                </div>
              </div>

              <div className="my-3"></div>
            </section>
            <div className="py-4"></div>
          </div>
          <div className="py-5 my-5"></div>
          <div>
            <div className="d-flex flex-column">
              <h2 className="main-title">
                Similar New Construction Homes in {data.city.name} ( 2023 )
              </h2>
            </div>
            <div className="py-2"></div>
            <div className="row row-cols-1 row-cols-md-4 gy-4">
              {related &&
                related.map((item) => (
                  <div className="col" key={item.id}>
                    <CondoCard {...item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
