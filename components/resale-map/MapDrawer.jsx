"use client";
import { useEffect, useState } from "react";
import MapboxMap from "./MapboxMap";
import { useMap } from "./MapContext";

const MapDrawer = ({ listings, city, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isMapOpen } = useMap();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`w-full transition-all duration-300 ease-in-out ${isMapOpen ? 'lg:grid lg:grid-cols-2 lg:gap-0' : ''}`}>
      {/* Listings Container */}
      <div className={`${isMapOpen ? 'lg:h-[calc(100vh-112px)] lg:overflow-y-auto' : ''}`}>
        {children}
      </div>

      {/* Map Container */}
      {isMapOpen && (
        <div className="hidden lg:block lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)] bg-white">
          <div className="h-full w-full">
            <MapboxMap listings={listings} city={city} />
          </div>
        </div>
      )}

      {/* Mobile Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-[80vh] bg-white rounded-t-xl shadow-xl">
            <div className="h-full">
              <MapboxMap listings={listings} city={city} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapDrawer;
