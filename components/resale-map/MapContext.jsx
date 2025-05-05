"use client";
import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <MapContext.Provider value={{ isMapOpen, setIsMapOpen }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
}
