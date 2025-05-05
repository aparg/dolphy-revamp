"use client";
import React from "react";
import DateSelector from "./DateSelector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Calendar,
  CalendarDays,
  CircleUserRound,
  MessageCircle,
  MessageSquareText,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
const BookShowingForm = ({ address }) => {
  return (
    <div className="sticky top-20 z-0 w-full rounded-md bg-very-light-gray flex items-center sm:pt-2 sm:mt-0 shadow-2xl">
      <div className="flex sm:flex-row flex-col w-full overflow-hidden">
        {/* <div className="w-full sm:w-1/2">
          <img
            src={bannerImage}
            alt="property-img"
            className="object-cover w-full h-full"
          />
        </div> */}
        <div className="w-full flex flex-col justify-center items-center">
          {/**Schedule a viewing form */}
          {/* <section className="w-full flex flex-row justify-between">
            <div className="flex flex-row space-x-4 items-center">
            
              <div className="bg-white rounded-full">
                <img src="/milan-2.png" className="w-14 h-12 " />
              </div>
              <div className="flex flex-col space-y-0 text-2xl font-semibold">
                
                <p>Contact Agent</p>
                <div className="flex items-center flex-row">
                  <span className="text-xs sm:text-sm font-bold">dolphy</span>
                  <Image
                    src="/canadaleaf.svg"
                    alt="Maple Leaf Icon for Logo"
                    width={12}
                    height={12}
                    className="hidden md:block"
                  />
                  <Image
                    src="/canadaleaf.svg"
                    alt="Maple Leaf Icon for Logo"
                    width={15}
                    height={15}
                    className="block md:hidden"
                  />
                </div>
              </div>
            </div>
          </section> */}

          {/* <Dialog>
            <div className="p-4 rounded-lg flex flex-col space-y-4 justify-center">
              <p className="flex justify-start space-x-3">
                <CalendarDays />{" "}
                <span>Request a tour as early as tomorrow</span>
              </p>
              <p className="flex justify-start space-x-3">
                <MessageSquareText />{" "}
                <span>For all other questions, contact us</span>
              </p>

              <DialogTrigger className="px-10 bg-black text-white font-semibold py-2 text-lg rounded-lg hover:bg-gray-800 w-fit self-center">
                Book Now
              </DialogTrigger>
            </div>
            <DialogContent className="z-[9999]">
              <DialogHeader>
                <DialogTitle>
                  <div className="text-center text-2xl">Book a showing</div>
                </DialogTitle>
                <DialogDescription>
                  <DateSelector showBookingType={false} address={address} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}
          <DateSelector showBookingType={false} address={address} />
          {/* <span className="my-4">{address}</span> */}
        </div>
      </div>
    </div>
  );
};

export default BookShowingForm;
