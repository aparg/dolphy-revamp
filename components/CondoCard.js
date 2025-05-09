import Link from "next/link";
import nFormatter from "./nFormatter";
import { ArrowUpRight } from "lucide-react";
import ContactFormSubmit from "./ContactFormSubmit";
import RequestModal from "./RequestModal";

export default function CondoCard(props) {
  function checkPricing(prii) {
    if (parseInt(prii) == 0) {
      return `Pricing not available`;
    } else {
      return `Starting from low $${nFormatter(prii, 2)}`;
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

  const [showContactModal, setShowContactModal] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    realtor: "No",
    project_namee: houseDetail?.project_name || "Pre construction Homes",
    cityy: houseDetail?.city?.name || "Ontario",
  });
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    ContactFormSubmit(credentials, setSubmitBtn, setCredentials);
    const timer = setTimeout(() => {
      setShowContactModal(false);
    }, 2000);
    return () => clearTimeout(timer);
  };
  return (
    <>
      <div className="card border-0 shadow-lg my-3 p-[1rem] rounded-2xl overflow-hidden">
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
          <button
            className="bg-[#006169] flex px-3 py-1 rounded-3xl text-white my-2 text-xs items-center hover:scale-110 duration-500"
            onClick={() => setShowRequestModal(true)}
          >
            Request Price List <ArrowUpRight className="w-3 ml-2" />
          </button>
          <p className="text-gray-600 leading-6">{props.project_type}</p>
          <h4 className="text-[0.9rem] font-normal text-[#0f1010] my-0">
            {checkPricing(props.price_starting_from)}
          </h4>
          <h5 className="truncate text-[0.9rem] my-0">
            {props.project_address}
          </h5>
          <p className="text-[0.9rem] truncate my-0">
            Occupancy: {props.occupancy}
          </p>
          /Users/apar/work/deploy-site/homebaba/components/RequestModal.js
        </div>
      </div>
      {showContactModal && (
        <RequestModal
          requestType={ctaType}
          credentials={credentials}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          handleCloseModal={() => setShowContactModal(false)}
          projectName={props?.project_name}
          submitBtn={submitBtn}
        />
      )}
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
