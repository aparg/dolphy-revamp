export const saleLease = {
  sale: { name: "For Sale", value: "Sale" },
  lease: { name: "For Lease", value: "Lease" },
  // all: { name: "All", value: undefined },
};

export const listingType = {
  "gas station": { name: "Gas Station", value: "Gas Stations" },
  motel: {
    name: "Motel",
    value: "Hotel/Motel/Inn",
  },
  "convenience store": {
    name: "Convenience Store",
    value: "Convenience/Variety",
  },
  restaurant: {
    name: "Restaurant",
    value: "Restaurant",
  },
};

export const areas = {
  GTA: {
    name: "GTA",
    value: [
      // "Toronto",
      "Mississauga",
      "Brampton",
      "Markham",
      "Vaughan",
      "Richmond Hill",
      "Oakville",
      "Burlington",
      "Pickering",
      "Oshawa",
      "Whitby",
      "Ajax",
      "Caledon",
      "Halton Hills",
      "Milton",
      "Newmarket",
      "Aurora",
      "King",
      "Whitchurch-Stouffville",
      "East Gwillimbury",
      "Georgina",
      "Bradford West Gwillimbury",
      "Brock",
      "Scugog",
      "Uxbridge",
      "Clarington",
      "Mono",
      "Adjala-Tosorontio",
      "Essa",
      "Innisfil",
      "New Tecumseth",
    ],
  },
  ontario: {
    name: "Ontario",
    value: [], //this value is empty array because the api doesn't need any queries for displaying all ontario listings
  },
};

const firstDateOfMonth = () => {
  var currentDateUTC = new Date(Date.now());

  currentDateUTC.setUTCDate(1);

  var startDateOfMonthUTC = currentDateUTC.toISOString().split("T")[0];
  return startDateOfMonthUTC;
};

const firstDateofLastSixMonths = () => {
  var currentDate = new Date();

  currentDate.setMonth(currentDate.getMonth() - 6);
  currentDate.setDate(1);

  var formattedDate = currentDate.toISOString().slice(0, 10);
  return formattedDate;
};

const firstDateOfWeek = () => {
  // Get the current date
  var currentDate = new Date();

  // Calculate the difference between the current day and the first day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
  var firstDayOfWeek = currentDate.getDay();
  var diff = currentDate.getDate() - firstDayOfWeek;

  // Set the date to the first day of the current week
  currentDate.setDate(diff);

  // Format the date to YYYY-MM-DD
  var formattedDate = currentDate.toISOString().slice(0, 10);

  // Output the date of the first day of the current week
  return formattedDate;
};

const getLastDateOfLastWeek = () => {
  // Get the current date
  var currentDate = new Date();

  // Calculate the difference between the current day and the first day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
  var firstDayOfWeek = currentDate.getDay();
  var diff = currentDate.getDate() - firstDayOfWeek;

  // Set the date to the first day of the current week
  currentDate.setDate(diff);

  // Subtract 7 days to get the first day of the last week
  currentDate.setDate(currentDate.getDate() - 7);

  // Format the date to YYYY-MM-DD
  var formattedDate = currentDate.toISOString().slice(0, 10);

  // Output the date of the first day of the last week
  return formattedDate;
};

const todayDate = () => {
  const currentDate = new Date(Date.now());
  const formattedData = currentDate.toISOString().slice(0, 10);
  return formattedData;
};

function get24HoursAgoTime() {
  // Get current date and time
  const currentDate = new Date();

  // Subtract 24 hours (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const twentyFourHoursAgo = new Date(
    currentDate.getTime() - 24 * 60 * 60 * 1000
  );

  // Format the date in the desired format: YYYY-MM-DD HH:mm:ss.s
  const formattedTime = twentyFourHoursAgo
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  return formattedTime;
}

export const numberOfDays = {
  thisWeek: { name: "This Week", value: firstDateOfWeek(), userFilter: true },
  lastWeek: {
    name: "Last Week",
    value: getLastDateOfLastWeek(),
    userFilter: true,
  },
  thisMonth: {
    name: "This Month",
    value: firstDateOfMonth(),
    userFilter: true,
  },
  lastSixMonths: {
    name: "Last Six Months",
    value: firstDateofLastSixMonths(),
    userFilter: true,
  },
  twentyFourHrsAgo: {
    name: "Today",
    value: get24HoursAgoTime(),
    userFilter: false,
  },
};

export const bedCount = {
  any: { name: "Beds", value: 0 },
  one: { name: "1 Beds", value: 1, slug: "one-bedroom" },
  two: { name: "2 Beds", value: 2, slug: "two-bedroom" },
  three: { name: "3 Beds", value: 3, slug: "three-bedroom" },
  four: { name: "4 Beds", value: 4, slug: "four-bedroom" },
  five: { name: "5 Beds", value: 5, slug: "five-bedroom" },
};

export const washroomCount = {
  any: { name: "Any", value: 0 },
  one: { name: "1+", value: 1 },
  two: { name: "2+", value: 2 },
  three: { name: "3+", value: 3 },
  four: { name: "4+", value: 4 },
  five: { name: "5+", value: 5 },
};

export const priceRangesSaleProperties = {
  "Under $500,000": { min: 0, max: 500000, slug: "under-500k" },
  "Under $600,000": {
    min: 0,
    max: 600000,
    slug: "under-600k",
  },
  "Under $700,000": {
    min: 0,
    max: 700000,
    slug: "under-700k",
  },
  "Under $800,000": {
    min: 0,
    max: 800000,
    slug: "under-800k",
  },
  "Under $1,000,000": {
    min: 0,
    max: 1000000,
    slug: "under-1M",
  },
  "Under $1,500,000": {
    min: 0,
    max: 1500000,
    slug: "under-1.5M",
  },
  "Under $2,000,000": {
    min: 0,
    max: 2000000,
    slug: "under-2M",
  },
  "Under $2,500,000": {
    min: 0,
    max: 2500000,
    slug: "under-2.5M",
  },
  "$2,000,000 and above": {
    min: 2000000,
    max: 0,
    slug: "above-2M",
  }, //if max less than min, max is ignored
};

export const priceRanges = [
  { label: "Under $500k", path: "homes-under-500k", maxPrice: 500000 },
  {
    label: "$500k - $750k",
    path: "homes-between-500k-750k",
    minPrice: 500000,
    maxPrice: 750000,
  },
  {
    label: "$750k - $1M",
    path: "homes-between-750k-1000k",
    minPrice: 750000,
    maxPrice: 1000000,
  },
  {
    label: "$1M - $1.5M",
    path: "homes-between-1000k-1500k",
    minPrice: 1000000,
    maxPrice: 1500000,
  },
  { label: "Over $1.5M", path: "homes-over-1500k", minPrice: 1500000 },
];

export const priceRangesLeaseProperties = {
  "Under $2,000": { min: 0, max: 2000, slug: "under-2000" },
  "Under $2,500": { min: 0, max: 2500, slug: "under-2500" },
  "Under $3,500": { min: 0, max: 3500, slug: "under-3500" },
  "Under $3,500": { min: 0, max: 3500, slug: "under-3500" },
  "Above $3,500": { min: 3500, max: 0, slug: "above-3500" },
};

export const houseType = {
  all: { name: "All Properties", value: null },
  semi: {
    name: "Semi Detached",
    value: "Semi-Detached ",
    slug: "semi-detached-homes",
  },
  detached: { name: "Detached", value: "Detached", slug: "detached-homes" },
  town: { name: "Townhomes", value: "Att/Row/Townhouse", slug: "townhomes" },
  condo: { name: "Condo", value: "Condo Apartment", slug: "condos" },
};

export const basementType = {
  "Separate Entrance": "Separate Entrance",
  Walkout: "Walk-Out",
  "Finished Basement": "Finished",
};

export const roads = {
  "Public Transit": "Public Transit",
  Highway: "Highway",
};

export const openHouse = {
  "Open House": true,
};

export const homeText = {
  "Semi Detached": "Semi Detached Homes",
  "Semi-Detached": "Semi Detached Homes",
  Detached: "Detached Homes",
  Townhomes: "Townhomes",
  Condo: "Condos",
  Triplex: "Triplex Homes",
  Duplex: "Duplex Homes",
  Apartment: "Apartments",
  "Semi Detached (Half Duplex)": "Semi Detached Homes",
};

export const propertyTypes = {
  "semi-detached": {
    label: "Semi-Detached",
    subtypes: ["Semi-Detached"],
    exactPath: "semi-detached",
  },
  detached: {
    label: "Detached",
    subtypes: ["Detached"],
    exactPath: "detached",
  },
  "condo-townhomes": {
    label: "Condo Townhome",
    subtypes: ["Condo Townhouse"],
    exactPath: "condo-townhomes",
  },
  townhomes: {
    label: "Townhomes",
    subtypes: ["Att/Row/Townhouse"],
    exactPath: "townhomes",
  },
  condos: {
    label: "Condo Apartment",
    subtypes: ["Condo Apartment"],
    exactPath: "condos",
  },
};

export const pillar9HouseTypes = {
  all: { name: "All Properties", value: null },
  semi: {
    name: "Semi Detached",
    value: "Semi Detached (Half Duplex)",
    slug: "semi-detached-homes",
  },
  detached: { name: "Detached", value: "Detached", slug: "detached-homes" },
  town: { name: "Townhomes", value: "Row/Townhouse", slug: "townhomes" },
  apartment: { name: "Apartment", value: "Apartment", slug: "apartment" },
};
