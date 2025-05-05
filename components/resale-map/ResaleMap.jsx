"use client";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, InfoWindowF } from "@react-google-maps/api";
import { X, ZoomIn, ZoomOut, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { geocodeAddress } from "@/utils/geocoding";
import MarkerInfoCard from "./MarkerInfoCard";
import { getImageUrls } from "@/app/_resale-api/getSalesData";
import MapPinMarker from "./MapPinMarker";
import MapControls from "./MapControls";
import MapFilters from "./MapFilters";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: false,
  mapTypeId: "roadmap",
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  zoomControl: false,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#333333" }],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ saturation: -100 }, { lightness: 45 }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#C5E1EA" }, { visibility: "on" }],
    },
  ],
};

const libraries = ["places"];

const formatPrice = (price) => {
  if (!price) return "";

  // Convert price to number if it's a string
  const numPrice =
    typeof price === "string"
      ? parseFloat(price.replace(/[^0-9.]/g, ""))
      : price;

  if (isNaN(numPrice) || numPrice === 0) return "";

  if (numPrice >= 1000000) {
    return `$${(numPrice / 1000000).toFixed(1)}M`;
  }
  // For prices under 1M, show in K with no decimal places
  return `$${Math.round(numPrice / 1000)}K`;
};

const getListingPrice = (listing) => {
  if (!listing) return 0;
  const price = listing.ListPrice || listing.StartingPrice;
  if (!price) return 0;

  // If price is a string with dollar sign, remove it and any commas
  if (typeof price === "string") {
    return parseFloat(price.replace(/[$,]/g, ""));
  }
  return parseFloat(price);
};

// Function to create custom POI marker icon
const getCustomPOIMarkerIcon = (type) => {
  const baseConfig = {
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#FFFFFF",
    scale: 1.2,
    anchor: new google.maps.Point(12, 22),
    labelOrigin: new google.maps.Point(12, 9),
  };

  switch (type) {
    case "schools":
      return {
        ...baseConfig,
        path: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
        fillColor: "#84CC16", // lime-500
      };
    case "restaurants":
      return {
        ...baseConfig,
        path: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z",
        fillColor: "#FB923C", // orange-400
      };
    case "hospitals":
      return {
        ...baseConfig,
        path: "M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z",
        fillColor: "#EC4899", // pink-500
      };
    case "transit":
      return {
        ...baseConfig,
        path: "M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20v1h12v-1l-1.5-1c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4z",
        fillColor: "#06B6D4", // cyan-500
      };
    default:
      return {
        ...baseConfig,
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        fillColor: "#6B7280", // gray-500
      };
  }
};

const ResaleMap = ({ listings = [], onClose }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [center, setCenter] = useState({
    lat: 43.6532,
    lng: -79.3832,
  });
  const [listingsWithCoords, setListingsWithCoords] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedMarkerImage, setSelectedMarkerImage] = useState(null);
  const [poiMarkers, setPoiMarkers] = useState([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState(null);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    const getCoordinates = async () => {
      const listingsWithCoordsPromises = listings.map(async (listing) => {
        if (!listing.coordinates) {
          const address = `${
            listing.UnitNumber ? listing.UnitNumber + "-" : ""
          }${listing.StreetNumber} ${listing.StreetName}, ${listing.City}, ${
            listing.Province
          }`;
          const coordinates = await geocodeAddress(address);
          return { ...listing, coordinates };
        }
        return listing;
      });

      const resolvedListings = await Promise.all(listingsWithCoordsPromises);
      setListingsWithCoords(resolvedListings);
      setFilteredListings(resolvedListings);
    };

    if (listings.length > 0) {
      getCoordinates();
    }
  }, [listings]);

  const handleFilterChange = ({ priceRange, type }) => {
    let filtered = [...listingsWithCoords];

    // Filter by price range
    if (priceRange.min > 0 || priceRange.max > 0) {
      filtered = filtered.filter((listing) => {
        const price = getListingPrice(listing);
        if (priceRange.min > 0 && price < priceRange.min) return false;
        if (priceRange.max > 0 && price > priceRange.max) return false;
        return true;
      });
    }

    // Filter by property type
    if (type && type !== "all") {
      filtered = filtered.filter((listing) => listing.PropertyType === type);
    }

    setFilteredListings(filtered);
  };

  const onLoad = (map) => {
    setMap(map);
    setPlacesService(new window.google.maps.places.PlacesService(map));
  };

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          map?.panTo(pos);
          map?.setZoom(15);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    }
  };

  const handleMarkerClick = async (listing) => {
    if (selectedMarker?.ListingId === listing.ListingId) {
      setSelectedMarker(null);
      setSelectedMarkerImage(null);
      return;
    }

    setSelectedMarker(listing);
    if (listing.ListingId) {
      const images = await getImageUrls({
        MLS: listing.ListingId,
        thumbnailOnly: true,
      });
      setSelectedMarkerImage(images?.[0] || null);
    }
    if (map) {
      map.panTo(listing.coordinates);
    }
  };

  const handleControlChange = (type, isChecked) => {
    if (!map || !placesService || !center) return;

    // Clear existing markers of this type and close any active info window
    poiMarkers
      .filter((m) => m.type === type)
      .forEach((m) => {
        if (m.infoWindow) {
          m.infoWindow.close();
        }
        m.setMap(null);
      });
    setPoiMarkers((prev) => prev.filter((m) => m.type !== type));
    setActiveInfoWindow(null);

    if (isChecked) {
      const request = {
        location: center,
        radius: 1500, // 1.5km radius
        type:
          type === "schools"
            ? "school"
            : type === "restaurants"
            ? "restaurant"
            : type === "hospitals"
            ? "hospital"
            : "transit_station",
      };

      placesService.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newMarkers = results.map((place) => {
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-bold">${place.name}</h3>
                  <p class="text-sm">${place.vicinity}</p>
                  ${
                    place.rating
                      ? `
                    <p class="text-sm">Rating: ${place.rating} ⭐ (${place.user_ratings_total} reviews)</p>
                  `
                      : ""
                  }
                </div>
              `,
            });

            const marker = new window.google.maps.Marker({
              position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
              map: map,
              title: place.name,
              icon: getCustomPOIMarkerIcon(type),
            });

            // Store the info window with the marker
            marker.infoWindow = infoWindow;

            marker.addListener("click", () => {
              // Close the currently active info window if it exists
              if (activeInfoWindow) {
                activeInfoWindow.close();
              }
              // Open this marker's info window
              infoWindow.open(map, marker);
              // Set this as the active info window
              setActiveInfoWindow(infoWindow);
            });

            marker.type = type;
            return marker;
          });

          setPoiMarkers((prev) => [...prev, ...newMarkers]);
        }
      });
    }
  };

  // Close active info window when component unmounts
  useEffect(() => {
    return () => {
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }
    };
  }, [activeInfoWindow]);

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white/80">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <MapFilters onFilterChange={handleFilterChange} />
      <MapControls onControlChange={handleControlChange} />
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8 rounded-full bg-white shadow-md"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8 rounded-full bg-white shadow-md"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8 rounded-full bg-white shadow-md"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8 rounded-full bg-white shadow-md"
          onClick={handleLocate}
        >
          <Locate className="h-4 w-4" />
        </Button>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={mapOptions}
        onLoad={onLoad}
        onClick={() => {
          if (activeInfoWindow) {
            activeInfoWindow.close();
            setActiveInfoWindow(null);
          }
        }}
      >
        {filteredListings.map(
          (listing) =>
            listing.coordinates && (
              <MapPinMarker
                key={listing.ListingId}
                position={listing.coordinates}
                price={formatPrice(getListingPrice(listing))}
                onClick={() => handleMarkerClick(listing)}
                isSelected={selectedMarker?.ListingId === listing.ListingId}
              />
            )
        )}

        {selectedMarker && (
          <InfoWindowF
            position={selectedMarker.coordinates}
            onCloseClick={() => {
              setSelectedMarker(null);
              setSelectedMarkerImage(null);
            }}
          >
            <MarkerInfoCard
              listing={selectedMarker}
              image={selectedMarkerImage}
            />
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

export default ResaleMap;
