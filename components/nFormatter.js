function nFormatter(num, digits) {
  if (!num || num === 0) return "0";

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item =
    lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      }) || lookup[0]; // Default to first item if no match found

  return (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol;
}

export default nFormatter;
