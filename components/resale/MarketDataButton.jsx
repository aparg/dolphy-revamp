import { ChartNoAxesCombined } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Statistics from "./Statistics";

const MarketDataButton = ({ city, propertyType }) => {
  return (
    <Dialog>
      <DialogTrigger
        className={`mx-[2px] px-2 sm:px-3 h-8 border-[#b2b2b2] border-[1px] tracking-[0.01125] cursor-pointer text-nowrap flex justify-center items-center rounded-full hover:shadow-lg text-xs font-semibold shadow-lg
             bg-[#ffe3e3] text-black
             `}
      >
        {/* <div className="p-4 rounded-lg flex flex-col space-y-4 justify-center"> */}
        View Market Data
        <ChartNoAxesCombined className="w-3 h-3 mr-1" />
        {/* </div> */}
      </DialogTrigger>
      <DialogContent className="z-[9999] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            <div className="flex items-center">
              <img src="/canadaleaf.svg" className="w-4 h-4 mr-2"></img>
              <h2 className="tracking-wide font-semibold uppercase text-lg">
                HOMEBABA DATA INTELLIGENCE
              </h2>
            </div>
          </DialogTitle>
          <DialogDescription className="bg-white">
            <Statistics city={city} propertyType={propertyType} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MarketDataButton;
