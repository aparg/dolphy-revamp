export const priceFormatter = (num) => {
  const numStr = num.toString();
  const length = numStr.length;
  const decimalIndex = numStr.indexOf(".");

  // Get the whole number part
  const wholeNumber =
    decimalIndex === -1 ? numStr : numStr.slice(0, decimalIndex);
  const decimalPart = decimalIndex === -1 ? "" : numStr.slice(decimalIndex);

  // Handle millions (7+ digits)
  if (wholeNumber.length >= 7) {
    if (wholeNumber.slice(-6) === "000000") {
      return wholeNumber.slice(0, wholeNumber.length - 6) + "M";
    } else {
      const millions = wholeNumber.slice(0, wholeNumber.length - 6);
      const remainder = wholeNumber.slice(-6, -3);
      if (parseInt(remainder) === 0) {
        return millions + "M";
      }
      return millions + "." + remainder.slice(0, 2) + "M";
    }
  }
  // Handle thousands (4-6 digits)
  else if (wholeNumber.length > 3) {
    if (wholeNumber.slice(-3) === "000") {
      return wholeNumber.slice(0, wholeNumber.length - 3) + "K";
    } else {
      const thousands = wholeNumber.slice(0, wholeNumber.length - 3);
      const remainder = wholeNumber.slice(-3);
      if (parseInt(remainder) === 0) {
        return thousands + "K";
      }
      return thousands + "." + remainder.slice(0, 2) + "K";
    }
  }
  // Return original number if less than 4 digits
  else {
    return parseFloat(numStr).toFixed(2);
  }
};
