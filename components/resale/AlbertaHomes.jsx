import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import React from "react";

export default function AlbertaHomes() {
  return (
    <div className="w-full bg-gradient-to-br from-white via-gray-50 to-blue-100 p-8 rounded-lg shadow-lg my-20">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="md:w-1/2 pr-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="text-blue-500 font-bold">EXPLORE HOMES</span>
            <span className="block">IN ALBERTA</span>
          </h2>
          <div className=" text-lg text-gray-700">
            <p className="">
              Browse our extensive listings of detached houses, semi-detached
              properties, townhomes, and modern condos throughout Cochrane,
              Edmonton, Lethbridge and across all Alberta communities.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <button className="p-4 bg-white bg-opacity-70 rounded-lg hover:scale-105 duration-200 hover:bg-gray-50 overflow-hidden">
            <Link
              href={generateURL({ province: "alberta", cityVal: "canmore" })}
              className="font-bold text-blue-500"
            >
              Canmore
            </Link>
          </button>
          <button className="p-4 bg-white bg-opacity-70 rounded-lg hover:scale-105 duration-200 hover:bg-gray-50 overflow-hidden">
            <Link
              href={generateURL({ province: "alberta", cityVal: "edmonton" })}
              className="font-bold text-blue-500"
            >
              Edmonton
            </Link>
          </button>
          <button className="p-4 bg-white bg-opacity-70 rounded-lg hover:scale-105 duration-200 hover:bg-gray-50 overflow-hidden">
            <Link
              href={generateURL({ province: "alberta", cityVal: "cochrane" })}
              className="font-bold text-blue-500"
            >
              Cochrane
            </Link>
          </button>
          <button className="p-4 bg-white bg-opacity-70 rounded-lg hover:scale-105 duration-200 hover:bg-gray-50 overflow-hidden">
            <Link
              href={generateURL({ province: "alberta", cityVal: "Lethbridge" })}
              className="font-bold text-blue-500"
            >
              Lethbridge
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
