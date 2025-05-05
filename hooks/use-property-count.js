import { getPropertiesCount } from "@/app/_resale-api/getSalesData";
import { houseType } from "@/constant";
import { useEffect, useState } from "react";

export const usePropertyCount = (city, requiredType) => {
  const [propertyCount, setPropertyCount] = useState("100+");
  const requiredTypeValue =
    Object.values(houseType).find((obj) => obj.name == requiredType)?.value ||
    null;
  useEffect(() => {
    getPropertiesCount({
      city: city,
      propertyType: requiredTypeValue,
    }).then((data) => {
      const localeStringNumber = Number(data["@odata.count"])?.toLocaleString();
      const propertyCount = localeStringNumber;
      setPropertyCount(propertyCount);
    });
  });
  return propertyCount;
};
