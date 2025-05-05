"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleMap, useLoadScript, InfoWindow, MarkerF } from '@react-google-maps/api';
import ResaleCard from './ResaleCard';

const libraries = ["places"];

const ResaleMapDrawer = ({ 
  isOpen, 
  onClose,
  properties, 
  city, 
  isLoading, 
  geocodedProperties, 
  onGeocodeComplete 
}) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 }); // Toronto center
  const [map, setMap] = useState(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Memoize markers based on properties and geocodedProperties
  const markers = useMemo(() => {
    if (!properties?.length) return [];

    return properties
      .map(property => {
        if (geocodedProperties.has(property.ListingId)) {
          return {
            position: geocodedProperties.get(property.ListingId),
            property
          };
        }
        return null;
      })
      .filter(marker => marker !== null);
  }, [properties, geocodedProperties]);

  // Map container styles
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  // Map options
  const mapOptions = {
    disableDefaultUI: true,
    clickableIcons: false,
    mapTypeId: 'roadmap',
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: true,
    styles: [
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
    ]
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
  const getCustomMarkerIcon = useCallback((color) => {
    if (!isLoaded || !window.google) return null;
    
    return {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 1.5,
      anchor: new window.google.maps.Point(12, 22),
      labelOrigin: new window.google.maps.Point(12, 9)
    };
  }, [isLoaded]);

  // Function to geocode properties that aren't already cached
  const geocodeUncachedProperties = useCallback(async () => {
    if (!isLoaded || !window.google || !properties?.length || isGeocoding) return;
    
    const uncachedProperties = properties.filter(p => !geocodedProperties.has(p.ListingId));
    if (!uncachedProperties.length) return;

    setIsGeocoding(true);
    const geocoder = new window.google.maps.Geocoder();
    const batchSize = 10;

    try {
      for (let i = 0; i < uncachedProperties.length; i += batchSize) {
        const batch = uncachedProperties.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (property) => {
            try {
              const streetNumber = property?.StreetNumber || '';
              const streetName = property?.StreetName || property?.StreetAddress || '';
              const propertyCity = property?.City || city;

              if (!streetNumber || !streetName || !propertyCity) return;

              const address = `${streetNumber} ${streetName}, ${propertyCity}, Ontario, Canada`;
              const result = await geocoder.geocode({ address });
              
              if (result && result.results && result.results[0]) {
                const { lat, lng } = result.results[0].geometry.location;
                const position = {
                  lat: typeof lat === 'function' ? lat() : lat,
                  lng: typeof lng === 'function' ? lng() : lng,
                };
                onGeocodeComplete(property.ListingId, position);
              }
            } catch (error) {
              console.error('Geocoding error for address:', error);
            }
          })
        );
        
        if (i + batchSize < uncachedProperties.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    } finally {
      setIsGeocoding(false);
    }
  }, [isLoaded, properties, city, geocodedProperties, isGeocoding, onGeocodeComplete]);

  // Function to handle map load
  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Function to fit map to marker bounds
  const fitMapToBounds = useCallback((markersToFit) => {
    if (!map || !markersToFit.length || !window.google) return;
    
    const bounds = new window.google.maps.LatLngBounds();
    markersToFit.forEach(marker => bounds.extend(marker.position));
    
    map.fitBounds(bounds);
    
    const zoom = map.getZoom();
    map.setZoom(Math.min(15, Math.max(10, zoom)));
  }, [map]);

  // Effect to trigger geocoding of uncached properties when map is opened
  useEffect(() => {
    if (isOpen && isLoaded && properties?.length > 0) {
      geocodeUncachedProperties();
    }
  }, [isOpen, isLoaded, geocodeUncachedProperties, properties]);

  // Effect to fit bounds when markers change
  useEffect(() => {
    if (markers.length > 0 && map) {
      fitMapToBounds(markers);
    }
  }, [markers, map, fitMapToBounds]);

  // Reset selected property when map is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedProperty(null);
    }
  }, [isOpen]);

  if (loadError) {
    return <div className="p-4">Error loading maps</div>;
  }

  if (!isLoaded || isLoading) {
    return (
      <div className={`fixed top-0 right-0 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ width: '50%', zIndex: 1000 }}>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p>Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`fixed top-0 right-0 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} 
      style={{ width: '50%', zIndex: 1000 }}
    >
      <div className="relative h-full">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          {markers.map(({ position, property }) => (
            <MarkerF
              key={property.ListingId}
              position={position}
              onClick={() => setSelectedProperty(property)}
              icon={getCustomMarkerIcon(getPriceRangeColor(property.ListPrice))}
              label={{
                text: `$${Math.round(property.ListPrice / 1000)}k`,
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            />
          ))}

          {selectedProperty && (
            <InfoWindow
              position={markers.find(m => m.property.ListingId === selectedProperty.ListingId)?.position}
              onCloseClick={() => setSelectedProperty(null)}
            >
              <div className="max-w-sm">
                <ResaleCard curElem={selectedProperty} small={true} />
              </div>
            </InfoWindow>
          )}

          {isGeocoding && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm">Loading more locations...</span>
              </div>
            </div>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default ResaleMapDrawer;
