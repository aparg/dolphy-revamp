import {
  BedDoubleIcon,
  Bike,
  Building,
  ConciergeBell,
  Dumbbell,
  Package,
  ParkingCircle,
  PartyPopper,
  WashingMachine,
} from "lucide-react";
import React from "react";
import { CgTennis } from "react-icons/cg";
import { FaHotTub, FaSwimmingPool } from "react-icons/fa";

const OtherAmentities = ({ amenities }) => {
  const iconClass = "w-5 h-5";
  const amenityIcon = {
    Gym: <Dumbbell className={iconClass} />,
    Storage: <Package className={iconClass} />,
    "Coin Laundry": <WashingMachine className={iconClass} />,
    "On-Site Laundry": <WashingMachine className={iconClass} />,
    "Guest Suites": <BedDoubleIcon className={iconClass} />,
    "Dining Room": <img src="/icons/dining.svg" className={iconClass} />,
    "Exercise Room": <Dumbbell className={iconClass} />,
    "Indoor Pool": <FaSwimmingPool className={iconClass} />,
    Sauna: <FaHotTub className={iconClass} />,
    "Tennis Court": <CgTennis className={iconClass} />,
    Concierge: <ConciergeBell className={iconClass} />,
    "Visitor Parking": <ParkingCircle className={iconClass} />,
    "Parking Garage": (
      <img src="/resale-card-img/garage.svg" className={iconClass} />
    ),
    "BBQ Permitted": <img src="/icons.bbq.svg" className={iconClass} />,
    "Party Room/Meeting Room": <PartyPopper className={iconClass} />,
    "Bike Storage": <Bike className={iconClass} />,
  };
  return (
    <div className="mt-12">
      <p className="font-semibold pb-3 text-2xl sm:text-3xl"> Amenities</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8 mt-4">
        {console.log(amenities)}
        {Array.isArray(amenities) &&
          amenities?.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2 ">
              {amenityIcon[amenity] || <Building className={iconClass} />}
              <span className="text-gray-700">{amenity}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OtherAmentities;
