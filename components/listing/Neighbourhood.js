import Image from "next/image";

const Neighbourhood = ({ projectName, street_map }) => {
  return (
    <div className="py-6">
      <div className="mt-5 flex items-center gap-2 mb-6">
        <Image
          src="/icons/home_address.png"
          alt="Walking icon"
          height={44}
          width={44}
        />
        <h2 className="text-[1rem] font-[700]">
          Walk around the neighbourhood
        </h2>
      </div>
      {console.log(street_map)}
      <div className="bg-white p-1 rounded-md">
        <div className="map-responsive">
          <iframe
            title={`Google Street Map View for ${projectName}`}
            src={street_map}
            width="650"
            height="340"
            className="border-0"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-2 mt-1">
        Note : The exact location of the project may vary from the street view
        shown here
      </p>
    </div>
  );
};

export default Neighbourhood;
