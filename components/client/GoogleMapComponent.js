"use client";
import { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, InfoWindow, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const GoogleMapComponent = ({
  apiKey,
  center = { lat: 43.653225, lng: -79.383186 }, // Default to Toronto
  zoom = 12,
  markers = [],
  onMarkerClick,
  mapOptions = {}
}) => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    setMap(null);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  const defaultMapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    ...mapOptions
  };

  return (
    <div className="w-full h-full">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={defaultMapOptions}
        >
          {markers.map((marker, index) => (
            <MarkerF
              key={`${marker.id || index}`}
              position={marker.position}
              onClick={() => handleMarkerClick(marker)}
              icon={marker.icon}
            />
          ))}
          
          {selectedMarker && selectedMarker.infoContent && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="info-window">
                {typeof selectedMarker.infoContent === 'function' 
                  ? selectedMarker.infoContent(selectedMarker)
                  : selectedMarker.infoContent}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
