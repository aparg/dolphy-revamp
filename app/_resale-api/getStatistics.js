"use server";

import { BASE_URL } from ".";

const firstDayLastMonth = () => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const firstDayLastMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth(),
    1
  ).toISOString();
  return firstDayLastMonth;
};

const lastDayLastMonth = () => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth());
  const lastDayLastMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth(),
    0
  ).toISOString();
  return lastDayLastMonth;
};

export const getStatistics = async ({ city, propertyType, sold = false }) => {
  try {
    let filterClause;
    if (city) {
      filterClause = `contains(City,'${city}') and OriginalEntryTimestamp ge ${firstDayLastMonth()} and OriginalEntryTimestamp le ${lastDayLastMonth()} and TransactionType eq 'For Sale' `;
    } else {
      filterClause = `OriginalEntryTimestamp ge ${firstDayLastMonth()} and OriginalEntryTimestamp le ${lastDayLastMonth()} and TransactionType eq 'For Sale' `;
    }
    if (propertyType) {
      filterClause += ` and PropertySubType eq '${propertyType}'`;
    }
    const response = await fetch(
      `${BASE_URL}/odata/Property?$count=true&$filter=${filterClause}&$select=ListPrice`,
      {
        method: "GET",
        headers: {
          Authorization: !sold
            ? process.env.BEARER_TOKEN_FOR_API
            : process.env.BEARER_TOKEN_FOR_VOW,
        },
        cache: "force-cache",
        next: {
          revalidate: 172800,
        },
      }
    );
    const data = await response.json();
    const totalPrice = data.value.reduce((acc, obj) => acc + obj.ListPrice, 0);
    const totalCount = await data["@odata.count"];
    const avg = totalPrice / totalCount;
    return { totalCount, avg };
  } catch (err) {
    return "An error occured";
  }
};
