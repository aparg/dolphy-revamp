import { Button } from "../ui/button";
import { Table, TableBody, TableHeader } from "../ui/table";
import { TableRow, TableHead } from "@/components/ui/table";
import { useState } from "react";

const RoomInfo = ({ data }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedRooms = showAll ? data : data?.slice(0, 8);

  return (
    data.length > 0 && (
      <div className="pt-4 mt-12">
        <h2 className="font-extrabold pb-3 text-2xl sm:text-3xl">
          Room Information
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className="text-left px-0 font-bold text-xs sm:text-base text-nowrap">
                Room Type
              </TableHead>
              <TableHead className="text-left px-0 pr-0 sm:pr-3 font-bold hidden sm:flex text-xs sm:text-base sm:items-center">
                Dimension (length x width)
              </TableHead>
              <TableHead className="text-left px-0  font-bold text-xs sm:text-base">
                Features
              </TableHead>
              <TableHead className="text-left px-0 font-bold text-xs sm:text-base text-nowrap">
                Level
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedRooms?.map((room) => (
              <TableRow key={room.RoomKey} className=" text-xs sm:text-sm">
                <td className="py-3 pr-6 sm:pr-4">
                  {room.RoomType}
                  <br />
                  <span className="block sm:hidden">{`${room.RoomLength} x ${room.RoomWidth} m`}</span>
                </td>
                <td className="py-3 pr-8 sm:pr-3 hidden sm:block">
                  {room.RoomLength && room.RoomWidth
                    ? `${room.RoomLength} x ${room.RoomWidth} m`
                    : ""}
                </td>

                <td className="py-3 pr-6 sm:pr-3">
                  {[room.RoomFeature1, room.RoomFeature2, room.RoomFeature3]
                    .filter((item) => item)
                    .join(", ")}
                </td>
                <td className="py-3 pr-0 sm:pr-3 ">{room.RoomLevel}</td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data?.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 text-black font-bold hover:underline"
          >
            {showAll ? "See Less" : "See All"}
          </button>
        )}
      </div>
    )
  );
};

export default RoomInfo;
