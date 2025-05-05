"use client";
import { useState } from 'react';
import GoogleMapComponent from './GoogleMapComponent';

const MapExample = ({ apiKey, propertyLocation }) => {
  // Default to Toronto if no location provided
  const location = propertyLocation || { lat: 43.653225, lng: -79.383186 };
  
  // Example markers - you would replace this with your actual property data
  const [markers, setMarkers] = useState([
    {
      id: 1,
      position: location,
      infoContent: (marker) => (
        <div className="p-2">
          <h3 className="font-semibold text-lg">Property Name</h3>
          <p className="text-sm">123 Main Street</p>
          <p className="text-sm">$599,000</p>
        </div>
      )
    }
  ]);

  const handleMarkerClick = (marker) => {
    console.log('Marker clicked:', marker);
    // You can add additional functionality here
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
      <GoogleMapComponent 
        apiKey={apiKey}
        center={location}
        zoom={15}
        markers={markers}
        onMarkerClick={handleMarkerClick}
        mapOptions={{
          scrollwheel: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      />
    </div>
  );
};

export default MapExample;
