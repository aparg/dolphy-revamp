export default function QuickLinks({ cityName }) {
  const projectTypes = [
    {
      value: "Detached",
      label: `Pre Construction Detached Homes in ${cityName}`,
      path: `/pre-construction/detached`,
    },
    {
      value: "Semi-Detached",
      label: `Pre Construction Semi-Detached Homes in ${cityName}`,
      path: `/pre-construction/semi-detached`,
    },
    {
      value: "Townhome",
      label: `Pre Construction Townhomes in ${cityName}`,
      path: `/pre-construction/townhomes`,
    },
    {
      value: "Condo",
      label: `Pre Construction Condos in ${cityName}`,
      path: `/condos`,
    },
  ];

  const priceRanges = [
    {
      value: "0-500k",
      label: `Pre Construction Homes Under $500K in ${cityName}`,
    },
    {
      value: "500k-600k",
      label: `Pre Construction Homes from $500K to $600K in ${cityName}`,
    },
    {
      value: "600k-700k",
      label: `Pre Construction Homes from $600K to $700K in ${cityName}`,
    },
    {
      value: "700k-800k",
      label: `Pre Construction Homes from $700K to $800K in ${cityName}`,
    },
    {
      value: "800k-1mil",
      label: `Pre Construction Homes from $800K to $1M in ${cityName}`,
    },
    {
      value: "1mil-1.5mil",
      label: `Pre Construction Homes from $1M to $1.5M in ${cityName}`,
    },
  ];

  return (
    <div className="mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Browse by Property Type</h2>
        <div className="flex flex-wrap gap-3">
          {projectTypes.map((type) => (
            <a
              key={type.value}
              href={`/${cityName}${type.path}`}
              className="text-xs text-gray-700 py-1 px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {type.label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Browse by Price Range</h2>
        <div className="flex flex-wrap gap-3">
          {priceRanges.map((range) => (
            <a
              key={range.value}
              href={`/${cityName}/price-range/${range.value}`}
              className="text-xs text-gray-700 py-1 px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {range.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
