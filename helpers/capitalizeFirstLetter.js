const capitalizeFirstLetter = (str) => {
  let sss = str?.replace(/-/g, " ");
  return sss
    ?.toLowerCase()
    ?.replace(/\b(\w)/g, (_, initial) => initial.toUpperCase());
};

export default capitalizeFirstLetter;
