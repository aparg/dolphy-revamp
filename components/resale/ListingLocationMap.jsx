"use client";
import React, { useEffect, useState } from "react";

const ListingLocationMap = ({ address }) => {
  useEffect(() => {
    // Create a simple iframe-based map for now
    const mapContainer = document.getElementById("listing-map");
    if (mapContainer && address) {
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.src = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(address)}&zoom=16`;
      
      // Clear previous content and add the iframe
      mapContainer.innerHTML = "";
      mapContainer.appendChild(iframe);
    }
  }, [address]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div id="listing-map" className="w-full h-full" />
    </div>
  );
};

export default ListingLocationMap;
