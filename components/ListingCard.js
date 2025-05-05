import Link from "next/link";
import nFormatter from "@/helpers/nFormatter";
import RequestModal from "@/components/RequestModal";
import InquiryButton from "./InquiryButton";

export default function ListingCard({ city, listing, index, minimal = false }) {
  function checkPricing(prii) {
    if (parseInt(prii) == 0) {
      return `Pricing not available`;
    } else {
      return `Starting from low $${nFormatter(prii, 2)}`;
    }
  }

  // Minimal version for map infowindow
  if (minimal) {
    return (
      <div
        className={`rounded-xl my-3 md:my-0 transition-all duration-300 ${
          listing.is_featured
            ? "shadow-featured border-blue-500 border"
            : "shadow-lg"
        } hover:shadow-xl hover:translate-y-[-5px]`}
        style={{ maxWidth: "280px" }}
      >
        <div className={`relative`}>
          {listing.images && listing.images.length > 0 ? (
            <img
              loading="lazy"
              src={listing.images[0].split(",")[0]}
              className="w-full h-[150px] rounded-t-xl object-cover transition-transform duration-300 ease-in-out"
              style={{
                background:
                  "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
              }}
              alt={`${listing.project_name} located at ${listing.project_address} cover image`}
            />
          ) : (
            <img
              loading="lazy"
              src="/noimage.webp"
              className="w-full h-[150px] rounded-t-xl object-cover transition-transform duration-300 ease-in-out"
              style={{
                background:
                  "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
              }}
              alt={"no image available for " + listing.project_name}
            />
          )}
          {listing.is_featured && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-star"
                viewBox="0 0 22 22"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
              </svg>
              Featured
            </span>
          )}
          <span className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs">
            {listing.status}
          </span>
        </div>
        <div className={`block p-4 bg-white rounded-b-xl no-underline`}>
          <div className="space-y-1">
            <Link
              href={`/${city}/${listing.slug}`}
              className="no-underline"
              target="_blank"
            >
              <h3 className="text-[1.1rem] font-bold my-0 leading-tight line-clamp-1 hover:text-[#00b5d6] transition-colors duration-300">
                {listing.project_name}
              </h3>
            </Link>
            <h4 className="text-[0.9rem] font-normal text-[#00b5d6] my-0">
              {checkPricing(listing.price_starting_from)}
            </h4>
            <h5 className="truncate text-[0.9rem] my-0">
              {listing.project_address}
            </h5>
            <p className="text-[0.9rem] truncate my-0">
              Occupancy {listing.occupancy}
            </p>

            <InquiryButton minimal={true} city={city} listing={listing} />
          </div>
        </div>
      </div>
    );
  }

  // Original version for regular listing pages
  return (
    <>
      <div
        className={`rounded-xl my-3 md:my-0 transition-all duration-300 ${
          listing.is_featured
            ? "md:col-span-1 shadow-featured border-blue-500 border"
            : "shadow-lg"
        } hover:shadow-xl hover:translate-y-[-5px]`}
      >
        <div className={`relative overflow-hidden rounded-t-xl`}>
          <Link
            href={`/${city}/${listing.slug}`}
            className="block h-[200px] md:h-[250px]"
            target="_blank"
          >
            {listing.images && listing.images.length > 0 ? (
              <img
                loading="lazy"
                src={listing.images[0].split(",")[0]}
                className="w-full h-[200px] md:h-[250px] rounded-t-xl object-cover transition-transform duration-300 ease-in-out"
                style={{
                  background:
                    "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
                }}
                alt={`${listing.project_name} located at ${listing.project_address} cover image`}
              />
            ) : (
              <img
                loading="lazy"
                src="/noimage.webp"
                className="w-full h-[200px] md:h-[250px] rounded-t-xl object-cover transition-transform duration-300 ease-in-out"
                style={{
                  background:
                    "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
                }}
                alt={"no image available for " + listing.project_name}
              />
            )}
          </Link>
          {listing.is_featured && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-star"
                viewBox="0 0 22 22"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
              </svg>
              Featured
            </span>
          )}
          <span className="absolute bottom-2 left-2">
            <span className="bg-white px-2 py-1 rounded text-xs">
              {listing.status}
            </span>
          </span>
        </div>
        <div className={`px-2 md:px-3 py-4 bg-white rounded-b-xl`}>
          <div className="space-y-0.5">
            <Link
              href={`/${city}/${listing.slug}`}
              className="no-underline"
              target="_blank"
            >
              <h3 className="text-[0.8rem] md:text-[1.15rem] font-bold my-0 leading-tight">
                {index && index + ". "}
                {listing.project_name}
              </h3>
            </Link>
            <h4 className="text-[0.7rem] md:text-[0.9rem] font-semibold text-[#00b5d6] tracking-wide my-0">
              {checkPricing(listing.price_starting_from)}
            </h4>
            <h5 className="truncate text-[0.7rem] md:text-[0.8rem] text-gray-600 my-0">
              {listing.project_address}
            </h5>
            <p className="text-[0.7rem] md:text-[0.8rem] truncate text-gray-600 leading-[1.1rem] my-0">
              Occupancy {listing.occupancy}
            </p>
          </div>
          {/* <InquiryButton minimal={false} city={city} listing={listing} /> */}
          <Link
            href={`/${city}/${listing.slug}`}
            className="mt-3 bg-white text-black py-1.5 px-4 rounded-full border border-gray-200 font-medium text-sm transition-all duration-300 hover:bg-[#f8f9fa] hover:border-black hover:shadow-lg flex items-center justify-start gap-3 relative overflow-hidden group w-fit"
          >
            <img
              src="/angela.jpeg"
              alt="Agent"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/90"
            />
            Inquire Now
          </Link>
        </div>
      </div>
    </>
  );
}
