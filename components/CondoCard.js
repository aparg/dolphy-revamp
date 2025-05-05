import Link from "next/link";
import nFormatter from "./nFormatter";

export default function CondoCard(props) {
  function checkPricing(price) {
    if (parseInt(price) > 0) {
      return `Starting from $${nFormatter(price, 2)}`;
    } else {
      return `Pricing not available`;
    }
  }

  function daysCount(x) {
    let date_1 = new Date(x);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    if (TotalDays == 0) {
      return "Today";
    } else {
      return Math.abs(TotalDays) + " day ago ";
    }
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="card border-0 shadow-lg my-3 p-[1.6rem] rounded-2xl overflow-hidden">
        <div className="relative max-h-72 h-72">
          <Link
            href={`/pre-construction-homes/${props.city.slug}/${props.slug}`}
            className="mylinkk"
            target="_blank"
          >
            <img
              loading="lazy"
              src={
                props.image.length > 0
                  ? `https://api.dolphy.ca${props.image[0].image}`
                  : "/noimage.webp"
              }
              className="w-full h-full object-cover rounded-2xl overflow"
              alt={`${props.project_name} image`}
            />
          </Link>
          {/* Status Badge */}
          {props.status && (
            <span
              className={`absolute h-auto top-2 left-2 p-1 px-2 rounded ${getStatusClass(
                props.status
              )}`}
            >
              {props.status}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">{props.project_name}</h3>
          <p className="text-gray-600 leading-6">{props.project_type}</p>
          <p className="text-gray-500 leading-6">{props.project_address}</p>
          <div className="flex text-[1.4rem] justify-between items-center bg-[#f5f5f5] rounded-xl p-4 my-2">
            <div className="flex flex-col justify-between w-[50%] items-center">
              <span className="font-bold text-sm">Launch Price</span>
              <span className="text-[#006169] font-extrabold text-base text-center">{`$ ${props.price_starting_from}`}</span>
            </div>
            <div className="h-10 border-gray-400 border-r-[2px]"></div>
            <div className="flex flex-col justify-between w-[50%] items-center px-3">
              <span className="font-bold text-sm">Status</span>
              <span className="text-[#006169] font-extrabold text-base text-center">
                {props.occupancy}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper function to get status class
function getStatusClass(status) {
  switch (status) {
    case "Upcoming":
      return "bg-yellow-400 text-white";
    case "Sold out":
      return "bg-green-500 text-white";
    case "Selling":
      return "bg-blue-500 text-white";
    case "Planning Phase":
      return "bg-yellow-400 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}
