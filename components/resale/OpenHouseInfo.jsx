import { format } from "date-fns";

export default function OpenHouseInfo({ openHouseData }) {
  if (!openHouseData || openHouseData.length === 0) {
    return null;
  }

  // Sort open houses by date
  const sortedOpenHouses = [...openHouseData].sort(
    (a, b) => new Date(a.OpenHouseDate) - new Date(b.OpenHouseDate)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Open House Schedule</h2>
      <div className="space-y-4">
        {sortedOpenHouses.map((openHouse) => {
          const date = new Date(openHouse.OpenHouseDate);
          const startTime = new Date(openHouse.OpenHouseStartTime);
          const endTime = new Date(openHouse.OpenHouseEndTime);

          return (
            <div
              key={openHouse.OpenHouseKey}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="font-semibold">
                  {format(date, "EEEE, MMMM d, yyyy")}
                </div>
                <div className="text-gray-600">
                  {format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {openHouse.OpenHouseType} Open House
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
