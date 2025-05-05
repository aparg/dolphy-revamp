"use client";
import React, { useRef } from "react";
//ICONS
// import PropertyCard from "./PropertyCard";
import useDeviceView from "@/helpers/useDeviceView";
import ResaleCard, { LockedResaleCard } from "./ResaleCard";
// import PreconstructionCard from "./PreconstructionCard";
import CreateSchema from "@/helpers/CreateSchema";
import AlbertaResaleCard from "./AlbertaResaleCard";

// type: resale/commercial
// data: array of json properties
const Slider = ({ data, type, soldData = false, province = "ontario" }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const { isMobileView } = useDeviceView();
  //business is returned as Sale of business so we need to modify it to Business

  return (
    <div className="relative flex justify-center">
      <div
        className={`w-full grid grid-rows-1 grid-cols-2 sm:grid-cols-5 overflow-x-hidden grid-nowrap justify-between sm:py-3 gap-1 md:gap-4 auto-rows-[minmax(100px,_auto)]`}
        id="slider"
        ref={scrollRef}
      >
        {data?.map((curElem, index) => {
          if (
            curElem.ListingKey !== "C8446018" &&
            curElem.ListingKey !== "C8450446"
          ) {
            //manual removal, to be removed later
            return (
              <div className="my-2 sm:my-0 row-auto" key={index} ref={cardRef}>
                {
                  <>
                    <script
                      key={curElem}
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(CreateSchema(curElem)),
                      }}
                    />
                    {province == "ontario" && (
                      <ResaleCard
                        curElem={curElem}
                        soldData={soldData}
                        small={true}
                      />
                    )}
                    {province == "alberta" && (
                      <AlbertaResaleCard curElem={curElem} />
                    )}
                  </>
                }
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export const SliderSkeleton = ({ data, setSignedIn }) => {
  const imageUrls = [];

  return (
    <div className="relative flex justify-center">
      {/* <Skeleton className="btns flex justify-between">
        <button
          className=" absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} color="black" />
        </button>
        <button
          className=" absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} color="black" />
        </button>
      </Skeleton> */}
      <div
        className={`w-full grid grid-rows-1 grid-cols-2 sm:grid-cols-5 overflow-x-hidden grid-nowrap justify-between sm:py-3 gap-x-4 auto-rows-[minmax(100px,_auto)]`}
      >
        {data?.map((obj, index) => {
          //manual removal, to be removed later
          return (
            <div className="my-2 sm:my-0 row-auto" key={index}>
              <LockedResaleCard curElem={obj} setSignedIn={setSignedIn} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
