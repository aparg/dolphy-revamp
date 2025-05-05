import Link from "next/link";

const AssignmentCityNav = () => {
  const assignmentCityList = [
    { city_name: "downtown", city_name_cap: "Downtown" },
    { city_name: "north-york", city_name_cap: "North York" },
    { city_name: "etobicoke", city_name_cap: "Etobicoke" },
    { city_name: "scarborough", city_name_cap: "Scarborough" },
    { city_name: "markham", city_name_cap: "Markham" },
    { city_name: "richmond-hill", city_name_cap: "Richmond Hill" },
    { city_name: "aurora", city_name_cap: "Aurora" },
    { city_name: "stouffville", city_name_cap: "Stouffville" },
    { city_name: "vaughan", city_name_cap: "Vaughan" },
    { city_name: "mississauga", city_name_cap: "Mississauga" },
    { city_name: "oakville", city_name_cap: "Oakville" },
    { city_name: "milton", city_name_cap: "Milton" },
    { city_name: "brampton", city_name_cap: "Brampton" },
    { city_name: "burlington", city_name_cap: "Burlington" },
    { city_name: "hamilton", city_name_cap: "Hamilton" },
    { city_name: "pickering", city_name_cap: "Pickering" },
    { city_name: "ajax", city_name_cap: "Ajax" },
    { city_name: "whitby", city_name_cap: "Whitby" },
    { city_name: "oshawa", city_name_cap: "Oshawa" },
    { city_name: "king", city_name_cap: "King" },
    { city_name: "newmarket", city_name_cap: "Newmarket" },
    { city_name: "gwillimbury", city_name_cap: "Gwillimbury" },
    { city_name: "barrie", city_name_cap: "Barrie" },
    { city_name: "waterloo-kitchener", city_name_cap: "Waterloo-Kitchener" },
    { city_name: "simcoe-county", city_name_cap: "Simcoe County" },
    { city_name: "alberta", city_name_cap: "Alberta" },
    { city_name: "niagara-falls", city_name_cap: "Niagara Falls" },
    { city_name: "shelburne", city_name_cap: "Shelburne" },
    { city_name: "halton-hills", city_name_cap: "Halton Hills" },
    { city_name: "quebec", city_name_cap: "Quebec" },
    { city_name: "bowmanville", city_name_cap: "Bowmanville" },
    { city_name: "wasaga-beach", city_name_cap: "Wasaga Beach" },
    { city_name: "bracebridge", city_name_cap: "Bracebridge" },
    { city_name: "guelph", city_name_cap: "Guelph" },
    { city_name: "kawartha-lakes", city_name_cap: "Kawartha Lakes" },
    { city_name: "ottawa", city_name_cap: "Ottawa" },
    { city_name: "creemore", city_name_cap: "Creemore" },
    { city_name: "prince-edward", city_name_cap: "Prince Edward" },
    { city_name: "Montreal", city_name_cap: "Montréal" },
    { city_name: "severn", city_name_cap: "Severn" },
    { city_name: "haldimand-county", city_name_cap: "Haldimand County" },
    { city_name: "brantford", city_name_cap: "Brantford" },
    { city_name: "toronto", city_name_cap: "Toronto" },
    { city_name: "caledon", city_name_cap: "Caledon" },
    { city_name: "edmonton", city_name_cap: "Edmonton" },
    { city_name: "calgary", city_name_cap: "Calgary" },
    { city_name: "chestermere", city_name_cap: "Chestermere" },
    { city_name: "cochrane", city_name_cap: "Cochrane" },
    { city_name: "midtown", city_name_cap: "Midtown" },
    { city_name: "cambridge", city_name_cap: "Cambridge" },
    { city_name: "london", city_name_cap: "London" },
    { city_name: "belleville", city_name_cap: "Belleville" },
  ];
  return (
    <nav className="relative">
      <div className="relative mx-auto py-3 overflow-hidden">
        <div className="flex flex-wrap gap-3 justify-center overflow-x-auto scrollbar-hide scroll-smooth">
          {assignmentCityList.map((city) => (
            <Link
              key={city.city_name}
              href={`/assignment-sale/${city.city_name}`}
              className="text-sm font-medium text-gray-700 hover:text-black border-b-2 border-gray-300 hover:border-black whitespace-nowrap"
            >
              {city.city_name_cap}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AssignmentCityNav;
