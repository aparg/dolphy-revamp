import {
  AirVent,
  Building,
  DollarSign,
  Droplet,
  Flame,
  ParkingCircle,
  Shield,
  Tv,
  Wrench,
} from "lucide-react";
import React from "react";
import { FaWater } from "react-icons/fa";
import formatCurrency from "@/helpers/formatCurrency";
import GetStatusReport from "./GetStatusReport";
const MaintenanceItem = ({ data, fee }) => {
  const iconClass = "w-5 h-5";
  const maintenanceIcon = {
    Heat: <Flame className={iconClass} />,
    Water: <Droplet className={iconClass} />,
    Hydro: <FaWater className={iconClass} />,
    "Air Conditioning": <AirVent className={iconClass} />,
    "Building Insurance": <Shield className={iconClass} />,
    Parking: <ParkingCircle className={iconClass} />,
    "Common Elements": <Building className={iconClass} />,
    "Cable TV": <Tv className={iconClass} />,
    "Condo Taxes": <DollarSign className={iconClass} />,
  };
  return (
    <div className="mt-4 mb-4 p-4 rounded-md bg-[#f5f5f5]">
      <p className="font-md pb-0 text-sm sm:text-lg mb-2 mt-0">
        Included in Maintenance Fee:
      </p>
      <div className="flex flex-wrap gap-4 gap-y-4 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1 w-fit">
            {maintenanceIcon[item] || <Wrench className={iconClass} />}
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
};

export default MaintenanceItem;
