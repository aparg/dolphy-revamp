import { useEffect, useMemo, useState } from "react";

export const useClientFilter = (salesData, filterState) => {
  const [data, setData] = useState(salesData);
  const [isClientFiltered, setIsClientFiltered] = useState(false);

  const filteredSalesData = useMemo(() => {
    let result = salesData;

    if (filterState.Basement.length > 0) {
      result = result.filter((data) => {
        return filterState.Basement.every((basement) =>
          data.Basement.includes(basement)
        );
      });
    }

    if (filterState.Roads.length > 0) {
      result = result.filter((data) => {
        return filterState.Roads.every((road) => {
          return data.PropertyFeatures.includes(road);
        });
      });
    }

    return result;
  }, [salesData, filterState.Basement, filterState.Roads]);

  const clientFiltering = async () => {
    if (filterState.Basement.length > 0 || filterState.Roads.length > 0) {
      setIsClientFiltered(true);
      setData(filteredSalesData);
    } else {
      setIsClientFiltered(false);
      setData([]);
    }
  };

  useEffect(() => {
    clientFiltering();
  }, [filterState.Basement, filterState.Roads]);

  return [data, isClientFiltered];
};
