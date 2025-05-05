"use client";
import React, { useEffect, useState } from "react";
import MapControls from "../resale-map/MapControls";

const ResaleMap = ({ address }) => {
  const [position, setPosition] = useState([]);
  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Initialize the map and places service
    if (window.google && !map) {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
      });
      setMap(mapInstance);
      setPlacesService(new window.google.maps.places.PlacesService(mapInstance));
    }

    // Geocode the address
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    )
      .then((value) => value.json())
      .then((decodedObj) => {
        const latitude = decodedObj.results[0].geometry.location.lat;
        const longitude = decodedObj.results[0].geometry.location.lng;
        setPosition([latitude, longitude]);
        
        if (map) {
          map.setCenter({ lat: latitude, lng: longitude });
          // Add marker for the property
          new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            icon: {
              url: "/icons/home_address.png",
              scaledSize: new window.google.maps.Size(41, 41),
            },
          });
        }
      });
  }, [address, map]);

  const handleControlChange = (type, isChecked) => {
    if (!map || !placesService || position.length !== 2) return;

    // Clear existing markers of this type
    markers.filter(m => m.type === type).forEach(m => m.setMap(null));
    setMarkers(markers.filter(m => m.type !== type));

    if (isChecked) {
      const request = {
        location: { lat: position[0], lng: position[1] },
        radius: 1500, // 1.5km radius
        type: type === "schools" ? "school" :
              type === "restaurants" ? "restaurant" :
              type === "hospitals" ? "hospital" :
              "transit_station"
      };

      placesService.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newMarkers = results.map(place => {
            const marker = new window.google.maps.Marker({
              position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              },
              map: map,
              title: place.name,
              icon: {
                url: `/icons/${type}.png`,
                scaledSize: new window.google.maps.Size(32, 32),
              }
            });

            // Add info window
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-bold">${place.name}</h3>
                  <p class="text-sm">${place.vicinity}</p>
                  ${place.rating ? `
                    <p class="text-sm">Rating: ${place.rating} ⭐ (${place.user_ratings_total} reviews)</p>
                  ` : ''}
                </div>
              `
            });

            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });

            marker.type = type;
            return marker;
          });

          setMarkers(prev => [...prev, ...newMarkers]);
        }
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <MapControls onControlChange={handleControlChange} />
      <div id="map" className="w-full h-full" />
    </div>
  );
};

export default ResaleMap;
