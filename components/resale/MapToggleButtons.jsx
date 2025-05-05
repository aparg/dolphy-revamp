"use client";
import { useMap } from "@/components/resale-map/MapContext";

export default function MapToggleButtons() {
  const { isMapOpen, setIsMapOpen } = useMap();

  return (
    <>
      <button 
        className={`px-3 text-sm py-1 rounded-full ${!isMapOpen ? 'bg-white shadow-sm' : ''}`}
        onClick={() => setIsMapOpen(false)}
      >
        List
      </button>
      <button 
        className={`px-3 text-sm py-1 rounded-full ${isMapOpen ? 'bg-white shadow-sm' : ''}`}
        onClick={() => setIsMapOpen(true)}
      >
        Map
      </button>
    </>
  );
} 