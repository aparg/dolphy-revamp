"use client";
import { useState, useEffect, useMemo } from 'react';
import { GoogleMap, LoadScript, InfoWindow, MarkerF } from '@react-google-maps/api';
import ResaleCard from './ResaleCard';

const libraries = ["places"];

const ResaleMapView = ({ properties, city }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [map, setMap] = useState(null);

  // Map container styles
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  // Custom map styles for a cleaner look
  const mapStyles = [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#333333" }]
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f5f5f5" }]
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ saturation: -100 }, { lightness: 45 }]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#C5E1EA" }, { visibility: "on" }]
    }
  ];

  // Map options
  const mapOptions = {
    disableDefaultUI: true,
    clickableIcons: false,
    mapTypeId: 'roadmap',
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: false,
    styles: mapStyles,
  };

  // Function to handle current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          map?.panTo(pos);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    }
  };

  // Function to get color based on price
  const getPriceRangeColor = (price) => {
    price = parseFloat(price || 0);
    if (price < 500000) return '#3B82F6'; // blue-500
    if (price < 1000000) return '#10B981'; // emerald-500
    if (price < 2000000) return '#F59E0B'; // amber-500
    if (price < 5000000) return '#EF4444'; // red-500
    return '#8B5CF6'; // purple-500
  };

  // Function to create custom marker icon
  const getCustomMarkerIcon = (color) => {
    return {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 1.5,
      anchor: new google.maps.Point(12, 22),
      labelOrigin: new google.maps.Point(12, 9)
    };
  };

  useEffect(() => {
    // Geocode all property addresses and set markers
    const geocodeProperties = async () => {
      if (!window.google || !properties) return;
      
      const geocoder = new window.google.maps.Geocoder();
      const markersData = await Promise.all(
        properties.map(async (property) => {
          try {
            if (!property.UnparsedAddress) return null;

            const address = `${property.UnparsedAddress}, ${city}, Ontario, Canada`;
            const result = await geocoder.geocode({ address });
            
            if (result && result.results && result.results[0]) {
              const { lat, lng } = result.results[0].geometry.location;
              return {
                position: {
                  lat: typeof lat === 'function' ? lat() : lat,
                  lng: typeof lng === 'function' ? lng() : lng,
                },
                property: property
              };
            }
            return null;
          } catch (error) {
            console.error('Geocoding error:', error);
            return null;
          }
        })
      );

      const validMarkers = markersData.filter(marker => marker !== null);
      setMarkers(validMarkers);

      if (validMarkers.length > 0) {
        setCenter(validMarkers[0].position);
        fitMapToBounds(validMarkers);
      }
    };
    
    if (mapLoaded) {
      geocodeProperties();
    }
  }, [properties, mapLoaded, city]);

  // Function to handle map load
  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    setMapLoaded(true);
  };

  // Function to fit map to marker bounds
  const fitMapToBounds = (markersToFit) => {
    if (!map || !markersToFit.length) return;
    
    const bounds = new google.maps.LatLngBounds();
    markersToFit.forEach(marker => bounds.extend(marker.position));
    
    map.fitBounds(bounds);
    
    const zoom = map.getZoom();
    map.setZoom(Math.min(15, Math.max(10, zoom)));
  };

  return (
    <div className="w-full h-full relative" id="resale-map-container">
      <LoadScript 
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={mapOptions}
          onLoad={handleMapLoad}
          onClick={() => setSelectedProperty(null)}
        >
          {/* Controls */}
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {/* Current Location Button */}
            <button
              onClick={handleCurrentLocation}
              className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center gap-2"
              title="Show your location"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </button>

            {/* Zoom Controls */}
            <div className="flex flex-col gap-1 bg-white rounded-lg shadow-md">
              <button
                onClick={() => map?.setZoom((map.getZoom() || 12) + 1)}
                className="p-2 hover:bg-gray-50 transition-colors rounded-t-lg"
                title="Zoom in"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <div className="h-px bg-gray-200" />
              <button
                onClick={() => map?.setZoom((map.getZoom() || 12) - 1)}
                className="p-2 hover:bg-gray-50 transition-colors rounded-b-lg"
                title="Zoom out"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </div>

            {/* Reset View Button */}
            <button
              onClick={() => fitMapToBounds(markers)}
              className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
              title="Reset view"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>

          {/* Property Markers */}
          {markers.map((marker, index) => (
            <MarkerF
              key={`property-${index}`}
              position={marker.position}
              icon={getCustomMarkerIcon(getPriceRangeColor(marker.property?.ListPrice))}
              onClick={() => setSelectedProperty(marker)}
            />
          ))}

          {/* Property InfoWindow */}
          {selectedProperty && (
            <InfoWindow
              position={selectedProperty.position}
              onCloseClick={() => setSelectedProperty(null)}
              options={{
                pixelOffset: new window.google.maps.Size(0, -30),
                maxWidth: 340
              }}
            >
              <div className="p-2">
                <ResaleCard
                  property={selectedProperty.property}
                  minimal={true}
                />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ResaleMapView;
