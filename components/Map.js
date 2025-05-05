"use client";
import { useEffect, useRef } from "react";

const Map = ({ latitudeval, longitudeval, title, address, heightt }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Validate coordinates
    if (!latitudeval || !longitudeval) return;

    try {
      // Create the map iframe
      const iframe = document.createElement("iframe");
      iframe.style.border = "0";
      iframe.style.width = "100%";
      iframe.style.height = heightt || "400px";

      // Construct Google Maps URL
      const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${latitudeval},${longitudeval}&zoom=15`;

      iframe.src = mapUrl;

      // Clear and append the iframe
      if (mapRef.current) {
        mapRef.current.innerHTML = "";
        mapRef.current.appendChild(iframe);
      }
    } catch (error) {
      console.error("Error loading map:", error);
    }
  }, [latitudeval, longitudeval, heightt]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      aria-label={`Map showing location of ${title}`}
    />
  );
};

export default Map;
