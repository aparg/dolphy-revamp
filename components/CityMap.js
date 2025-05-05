"use client";
import { useState, useEffect, useMemo } from 'react';
import { GoogleMap, LoadScript, InfoWindow, MarkerF } from '@react-google-maps/api';
import Image from 'next/image';
import Link from 'next/link';
import ListingCard from './ListingCard';

const libraries = ["places"];

const CityMap = ({ properties, city }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [mapType, setMapType] = useState('roadmap');
  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);

  // POI states
  const [showSchools, setShowSchools] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);
  const [showTransit, setShowTransit] = useState(false);
  const [poiMarkers, setPoiMarkers] = useState([]);

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
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#b8b8b8" }]
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
      featureType: "road.highway",
      elementType: "all",
      stylers: [{ visibility: "simplified" }]
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
    mapTypeId: mapType,
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

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + 'M';
    } else if (price >= 1000) {
      return (price / 1000).toFixed(0) + 'K';
    }
    return price.toString();
  };

  // Function to search for POIs
  const searchNearbyPlaces = (type) => {
    if (!map || !placesService) return;
    
    // Clear existing markers of this type
    setPoiMarkers(prev => prev.filter(marker => marker.type !== type));

    const request = {
      location: center,
      radius: 5000, // 5km radius
      type: type
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const newMarkers = results.map(place => ({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          type: type,
          name: place.name,
          address: place.vicinity,
          rating: place.rating,
          userRatingsTotal: place.user_ratings_total,
          placeId: place.place_id
        }));
        setPoiMarkers(prev => [...prev, ...newMarkers]);
      }
    });
  };

  // Effect to handle POI visibility
  useEffect(() => {
    if (showSchools) searchNearbyPlaces('school');
    if (showRestaurants) searchNearbyPlaces('restaurant');
    if (showHospitals) searchNearbyPlaces('hospital');
    if (showTransit) searchNearbyPlaces('transit_station');
  }, [showSchools, showRestaurants, showHospitals, showTransit, mapLoaded]);

  useEffect(() => {
    // Geocode all property addresses and set markers
    const geocodeProperties = async () => {
      if (!window.google) {
        console.log('Google Maps not loaded yet');
        return;
      }
      
      if (!properties || properties.length === 0) {
        console.log('No properties provided');
        return;
      }
      
      console.log('Properties received:', properties);
      
      const geocoder = new window.google.maps.Geocoder();
      const markersData = await Promise.all(
        properties.map(async (property) => {
          try {
            // Skip if no address
            if (!property.project_address) {
              console.log('No address for property:', property.project_name);
              return null;
            }

            const address = `${property.project_address}, ${city}, Canada`;
            console.log('Geocoding address:', address);
            
            const result = await geocoder.geocode({ address });
            
            if (result && result.results && result.results[0]) {
              const { lat, lng } = result.results[0].geometry.location;
              const marker = {
                position: {
                  lat: typeof lat === 'function' ? lat() : lat,
                  lng: typeof lng === 'function' ? lng() : lng,
                },
                property: property
              };
              console.log('Created marker:', marker);
              return marker;
            }
            console.log('No results found for address:', address);
            return null;
          } catch (error) {
            console.error('Geocoding error for property:', property.project_name, error);
            return null;
          }
        })
      );

      const validMarkers = markersData.filter(marker => marker !== null);
      console.log('Valid markers:', validMarkers);
      setMarkers(validMarkers);

      if (validMarkers.length > 0) {
        setCenter(validMarkers[0].position);
      }
    };
    
    if (mapLoaded) {
      console.log('Starting geocoding process');
      geocodeProperties();
    } else {
      console.log('Map not loaded yet');
    }
  }, [properties, mapLoaded, city]);

  // Function to handle map load and setup
  const handleMapLoad = (mapInstance) => {
    console.log('Map loaded');
    setMap(mapInstance);
    setPlacesService(new window.google.maps.places.PlacesService(mapInstance));
    setMapLoaded(true);
    
    // Auto-fit markers on initial load
    if (markers && markers.length > 0) {
      setTimeout(() => {
        fitMapToBounds(markers);
      }, 100);
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

  // Function to create custom POI marker icon
  const getCustomPOIMarkerIcon = (type) => {
    const baseConfig = {
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 1.2,
      anchor: new google.maps.Point(12, 22),
      labelOrigin: new google.maps.Point(12, 9)
    };

    switch (type) {
      case 'school':
        return {
          ...baseConfig,
          path: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
          fillColor: '#84CC16' // lime-500, different from blue-500 used for properties
        };
      case 'restaurant':
        return {
          ...baseConfig,
          path: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z",
          fillColor: '#FB923C' // orange-400, different from amber-500 used for properties
        };
      case 'hospital':
        return {
          ...baseConfig,
          path: "M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z",
          fillColor: '#EC4899' // pink-500, different from red-500 used for properties
        };
      case 'transit_station':
        return {
          ...baseConfig,
          path: "M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20v1h12v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4z",
          fillColor: '#06B6D4' // cyan-500, different from blue-500 used for properties
        };
      default:
        return {
          ...baseConfig,
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
          fillColor: '#6B7280' // gray-500
        };
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState(0); // Start with 'All'
  const [projectType, setProjectType] = useState('');
  const [visibleMarkers, setVisibleMarkers] = useState([]);

  const priceRanges = [
    { value: 0, label: 'All', min: 0, max: Infinity },
    { value: 1, label: '<500K', min: 0, max: 500000 },
    { value: 2, label: '500K-1M', min: 500000, max: 1000000 },
    { value: 3, label: '1M-2M', min: 1000000, max: 2000000 },
    { value: 4, label: '2M-5M', min: 2000000, max: 5000000 },
    { value: 5, label: '>5M', min: 5000000, max: Infinity }
  ];

  const projectTypes = [
    { value: '', label: 'All' },
    { value: 'Condo', label: 'Condo' },
    { value: 'Townhome', label: 'Townhome' },
    { value: 'Semi-Detached', label: 'Semi-Detached' },
    { value: 'Detached', label: 'Detached' }
  ];

  // Update visible markers when filters change
  useEffect(() => {
    if (!markers) {
      setVisibleMarkers([]);
      return;
    }

    let filtered = [...markers];

    // Apply price filter
    if (priceRange !== 0) {
      const { min, max } = priceRanges[priceRange];
      filtered = filtered.filter(marker => {
        const price = parseFloat(marker.property?.price_starting_from || 0);
        return price >= min && price < max;
      });
    }

    // Apply project type filter
    if (projectType) {
      filtered = filtered.filter(marker => 
        marker.property?.project_type === projectType
      );
    }

    setVisibleMarkers(filtered);
    
    // Auto-fit markers if map is loaded
    if (map && filtered.length > 0) {
      fitMapToBounds(filtered);
    }
  }, [markers, priceRange, projectType, map]);

  // Function to fit map to marker bounds
  const fitMapToBounds = (markersToFit) => {
    if (!map || !markersToFit.length) return;
    
    const bounds = new google.maps.LatLngBounds();
    
    // Add all marker positions to bounds
    markersToFit.forEach(marker => {
      bounds.extend(marker.position);
    });
    
    // Fit the map to the bounds with some padding
    map.fitBounds(bounds);
    
    // Set a minimum zoom level to prevent excessive zooming on single/few markers
    const currentZoom = map.getZoom();
    if (currentZoom > 15) {
      map.setZoom(15);
    }
    
    // Set a maximum zoom level to prevent zooming out too far
    if (currentZoom < 10) {
      map.setZoom(10);
    }
  };

  // For debugging
  useEffect(() => {
    if (markers && markers.length > 0) {
      console.log('Sample marker data:', markers[0]);
    }
  }, [markers]);

  return (
    <div className="w-full h-full relative" id="map-container">
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
          onClick={() => {
            setSelectedProperty(null);
            setSelectedAmenity(null);
            setShowFilters(false);
          }}
        >
          {/* Right Controls - Fullscreen Button */}
          <div className="absolute right-4 top-4">
            <button
              onClick={() => {
                const mapContainer = document.getElementById('map-container');
                if (!document.fullscreenElement) {
                  mapContainer.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
              }}
              className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
              title="Toggle fullscreen"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>

          {/* Left Controls */}
          <div className="absolute left-4 top-20 flex flex-col gap-2">
            {/* Current Location Button */}
            <button
              onClick={handleCurrentLocation}
              className="p-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
              title="Show your location"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
              <span className="text-sm font-medium text-black">My Location</span>
            </button>

            {/* Zoom Controls */}
            <div className="flex flex-col gap-1 bg-white rounded-lg shadow-md">
              <button
                onClick={() => map?.setZoom((map.getZoom() || 12) + 1)}
                className="p-2 hover:bg-gray-100 transition-colors rounded-t-lg flex items-center gap-2 justify-center"
                title="Zoom in"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Zoom In</span>
              </button>
              <div className="h-px bg-gray-700" />
              <button
                onClick={() => map?.setZoom((map.getZoom() || 12) - 1)}
                className="p-2 hover:bg-gray-100 transition-colors rounded-b-lg flex items-center gap-2 justify-center"
                title="Zoom out"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Zoom Out</span>
              </button>
            </div>

            {/* Reset View Button */}
            <button
              onClick={() => fitMapToBounds(visibleMarkers)}
              className="p-2 bg-red-50 text-red-700 rounded-lg shadow-md hover:bg-red-100 transition-colors flex items-center gap-2"
              title="Reset view to show all properties"
            >
              <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <span className="text-sm font-medium text-red-700">Reset</span>
            </button>

            {/* Filter Button and Panel */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-lg shadow-lg flex items-center gap-2 ${
                priceRange !== 0 || projectType !== '' 
                ? 'bg-green-700 text-white font-medium' 
                : 'bg-green-700 text-white hover:bg-green-800'
              }`}
              title="Filter properties"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm font-medium">
                {priceRange !== 0 || projectType !== '' 
                  ? `Filters (${(priceRange !== 0 ? 1 : 0) + (projectType !== '' ? 1 : 0)})` 
                  : 'Filters'}
              </span>
              {(priceRange !== 0 || projectType !== '') && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              )}
            </button>

            {/* Filter Panel */}
            {showFilters && (
              <div className="absolute left-0 top-14 p-5 bg-white rounded-lg shadow-xl border border-blue-100" style={{ width: '400px', zIndex: 1000 }}>
                <h2 className="font-semibold text-lg text-gray-800 mb-4">Property Filters</h2>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-gray-800">Price Range</h3>
                  <div className="relative px-4">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="1"
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: 'linear-gradient(to right, #dbeafe, #3b82f6)',
                        height: '6px'
                      }}
                    />
                    <div className="flex justify-between mt-4 relative" style={{ height: '45px' }}>
                      {priceRanges.map((range, index) => (
                        <div
                          key={index}
                          className="absolute transform -translate-x-1/2 cursor-pointer"
                          style={{ 
                            left: `${(index * 100) / 5}%`,
                            width: '40px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                          onClick={() => setPriceRange(range.value)}
                        >
                          <div 
                            className={`w-4 h-4 rounded-full ${priceRange === range.value ? 'bg-blue-600 ring-2 ring-blue-200' : 'bg-gray-400'}`}
                            title={range.label}
                          />
                          <span 
                            className={`mt-3 text-xs whitespace-nowrap ${priceRange === range.value ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
                          >
                            {range.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Type Filter */}
                <div className="mb-4">
                  <h3 className="font-medium mb-3 text-gray-800">Project Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setProjectType('')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors col-span-2 ${
                        projectType === ''
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {projectTypes.slice(1).map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setProjectType(type.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          projectType === type.value
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 text-sm border-t border-gray-200 flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    {visibleMarkers.length} properties shown
                  </span>
                  {(priceRange !== 0 || projectType !== '') && (
                    <button 
                      onClick={() => {
                        setPriceRange(0);
                        setProjectType('');
                      }}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Price Range Legend - Bottom Center with fixed text wrapping */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-white rounded-lg shadow-lg px-6 py-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-xs text-gray-600 whitespace-nowrap">N/A</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600 whitespace-nowrap">&lt;500K</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-gray-600 whitespace-nowrap">500K‑1M</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs text-gray-600 whitespace-nowrap">1M‑2M</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs text-gray-600 whitespace-nowrap">2M‑5M</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs text-gray-600 whitespace-nowrap">&gt;5M</span>
              </div>
            </div>
          </div>

         {/* Bottom Right Legend */}
<div className="absolute bottom-20 right-4 z-10 bg-white rounded-lg shadow-lg p-3 max-w-[200px]">
  <div className="flex flex-col gap-2">
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={showSchools}
        onChange={(e) => {
          setShowSchools(e.target.checked);
          if (!e.target.checked) {
            setPoiMarkers(prev => prev.filter(m => m.type !== 'school'));
          }
        }}
        className="form-checkbox h-4 w-4 text-blue-600 rounded"
      />
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-lime-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        </svg>
        Schools
      </span>
    </label>
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={showRestaurants}
        onChange={(e) => {
          setShowRestaurants(e.target.checked);
          if (!e.target.checked) {
            setPoiMarkers(prev => prev.filter(m => m.type !== 'restaurant'));
          }
        }}
        className="form-checkbox h-4 w-4 text-blue-600 rounded"
      />
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
        </svg>
        Restaurants
      </span>
    </label>
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={showHospitals}
        onChange={(e) => {
          setShowHospitals(e.target.checked);
          if (!e.target.checked) {
            setPoiMarkers(prev => prev.filter(m => m.type !== 'hospital'));
          }
        }}
        className="form-checkbox h-4 w-4 text-blue-600 rounded"
      />
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
        </svg>
        Hospitals
      </span>
    </label>
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={showTransit}
        onChange={(e) => {
          setShowTransit(e.target.checked);
          if (!e.target.checked) {
            setPoiMarkers(prev => prev.filter(m => m.type !== 'transit_station'));
          }
        }}
        className="form-checkbox h-4 w-4 text-blue-600 rounded"
      />
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20v1h12v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4z" />
        </svg>
        Transit
      </span>
    </label>
  </div>
</div>

          {/* Property Markers */}
          {visibleMarkers.map((marker, index) => (
            <MarkerF
              key={`property-${index}`}
              position={marker.position}
              icon={getCustomMarkerIcon(getPriceRangeColor(marker.property?.price_starting_from))}
              onClick={() => {
                setSelectedProperty({
                  position: marker.position,
                  property: marker.property,
                  location: marker.location
                });
              }}
            />
          ))}

          {/* POI Markers */}
          {poiMarkers.map((marker, index) => (
            <MarkerF
              key={`poi-${index}`}
              position={marker.position}
              icon={getCustomPOIMarkerIcon(marker.type)}
              onClick={() => {
                setSelectedAmenity(marker);
                setSelectedProperty(null);
              }}
            />
          ))}

          {/* Property InfoWindow */}
          {selectedProperty && (
            <InfoWindow
              position={{
                lat: selectedProperty.position.lat,
                lng: selectedProperty.position.lng,
              }}
              onCloseClick={() => setSelectedProperty(null)}
              options={{
                pixelOffset: new window.google.maps.Size(0, -30),
                maxWidth: 340
              }}
            >
              <div className="p-2">
                <ListingCard
                  listing={selectedProperty.property}
                  city={city}
                  minimal={true}
                />
              </div>
            </InfoWindow>
          )}

          {/* Amenity InfoWindow */}
          {selectedAmenity && (
            <InfoWindow
              position={selectedAmenity.position}
              onCloseClick={() => setSelectedAmenity(null)}
              options={{
                pixelOffset: new window.google.maps.Size(0, -30),
                maxWidth: 280
              }}
            >
              <div className="bg-white p-3">
                <h3 className="font-medium mb-1">{selectedAmenity.name}</h3>
                {selectedAmenity.vicinity && (
                  <p className="text-sm text-gray-600 mb-2">{selectedAmenity.vicinity}</p>
                )}
                {selectedAmenity.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-sm">{selectedAmenity.rating}</span>
                  </div>
                )}
                <a
                  href={`https://www.google.com/maps/place/?q=place_id:${selectedAmenity.place_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View on Google Maps
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CityMap;