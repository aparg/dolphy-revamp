"use client";
import React, { useEffect, useState } from "react";
import { getStatistics } from "@/app/_resale-api/getStatistics";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import { houseType } from "@/constant";
import formatCurrency from "@/helpers/formatCurrency";
import { FadeLoader } from "react-spinners";

const Statistics = ({ city, propertyType }) => {
  const [propertyStats, setPropertyStats] = useState({});
  const [totalPropertiesCount, setTotalPropertiesCount] = useState({});
  const [totalSoldCount, setTotalSoldCount] = useState({});
  const [lastMonthName, setLastMonthName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const propertyTypes = Object.values(houseType)
      .map((obj) => obj.value)
      .filter((value) => value !== null);

    const averagePromises = propertyTypes.map(async (propertyType) => {
      const statistics = await getStatistics({
        city: capitalizeFirstLetter(city),
        propertyType: propertyType,
      });
      return { propertyType, statistics };
    });

    const totalProperties = await getStatistics({
      city: capitalizeFirstLetter(city),
    });
    const totalSold = await getStatistics({
      city: capitalizeFirstLetter(city),
      sold: true,
    });

    const results = await Promise.all(averagePromises);

    const stats = {};
    results.forEach(({ propertyType, statistics }) => {
      stats[propertyType] = {
        average: statistics.avg,
        totalCount: statistics.totalCount,
      };
    });

    setPropertyStats(stats);
    setTotalPropertiesCount(totalProperties);
    setTotalSoldCount(totalSold);
    const lastMonth = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).toLocaleString("default", { month: "long" });
    setLastMonthName(lastMonth);
  };

  useEffect(() => {
    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
    });
  }, [city]);

  return !loading ? (
    <div className="relative max-w-[90%] mx-auto bg-white">
      <div
        className="absolute inset-0"
        // style={{
        //   backgroundImage: "url(/canadaleaf.svg)",
        //   backgroundRepeat: "repeat",
        //   backgroundSize: "50px 50px",
        //   filter: "opacity(0.1)",
        //   zIndex: -1,
        // }}
      />

      <div className="my-2">
        <h2 className="tracking-wider font-light uppercase text-4xl text-red-500">
          {city || "Ontario"}
        </h2>
        <p className="tracking-tighter font-thin uppercase text-2xl sm:text-3xl mt-2">
          {lastMonthName},{" "}
          {new Date(
            new Date().setMonth(new Date().getMonth() - 1)
          ).getFullYear()}
        </p>
      </div>
      {/* <h1 className="font-bold my-4 text-3xl">Property Statistics one month</h1> */}
      <table className="min-w-full bg-white border border-gray-300 my-10 ">
        <thead>
          <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
            <th className="py-3 sm:px-6 px-3  border-b border-gray-300 text-left">
              Property Type
            </th>
            <th className="py-3 sm:px-6 px-3  border-b border-gray-300 text-left">
              Average Price
            </th>
            <th className="py-3 sm:px-6 px-3  border-b border-gray-300 text-left">
              Total Count
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 font-light text-xs sm:text-base">
          {Object.entries(propertyStats).map(([propertyType, stats]) => (
            <tr
              key={propertyType}
              className="border-b border-gray-300 hover:bg-gray-100"
            >
              <td className="py-3 sm:px-6 px-3  text-left">{propertyType}</td>
              <td className="py-3 sm:px-6 px-3  text-left">
                {formatCurrency(stats.average.toFixed(2))}
              </td>
              <td className="py-3 sm:px-6 px-3  text-left">
                {stats.totalCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="sm:mt-8 text-lg list-disc list-inside text-left">
        {/* Last month's data */}
        <li className="mb-2">
          <span className="font-semibold uppercase text-sm tracking-wider">
            Total Homes listed:
          </span>{" "}
          <span className="text-black font-bold text-sm tracking-wide">
            {totalPropertiesCount.totalCount}
          </span>
        </li>
        <li>
          <span className="font-semibold uppercase text-sm tracking-wider">
            Total Homes Sold:
          </span>{" "}
          <span className="text-black font-bold text-sm tracking-wide">
            {totalSoldCount.totalCount}
          </span>
        </li>
      </ul>
    </div>
  ) : (
    <div className="flex w-full justify-center">
      <FadeLoader />
    </div>
  );
};

export default Statistics;
