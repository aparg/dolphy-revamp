"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";

import citiesWithProvinces from "../../data/ontarioCities";

const MapboxMap = ({ listings = [], city }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(false);
  const activePopup = useRef(null); // Add ref for tracking active popup
  // Default to Toronto if city not found
  const [viewport, setViewport] = useState({
    lat: 43.6532,
    lng: -79.3832,
    zoom: 12
  });

  // Function to fetch properties within the current viewport
  const fetchPropertiesInViewport = async (bounds) => {
    if (!bounds) return;
    
    try {
      setLoading(true);
      const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
      console.log('Fetching properties with bbox:', bbox);
      
      const url = `${process.env.NEXT_PUBLIC_MAP_BACKEND}api/map_properties/?bbox=${bbox}`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      console.log('Received data:', data);
      console.log('Number of markers:', data.markers?.length || 0);
      
      return data.markers;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch detailed property information
  const fetchPropertyDetails = async (listingKey) => {
    try {
      console.log('Fetching details for listing:', listingKey);
      const response = await fetch(`${process.env.NEXT_PUBLIC_MAP_BACKEND}api/properties/${listingKey}/`);
      const data = await response.json();
      console.log('Received property details:', data);
      return data;
    } catch (error) {
      console.error('Error fetching property details:', error);
      return null;
    }
  };

  // Update viewport when city changes
  useEffect(() => {
    if (!city) return;
    console.log('[MapboxMap] city prop:', city);
    // Try to find city info (case-insensitive, trimmed)
    const cityObj = citiesWithProvinces.find(
      c => c.city.trim().toLowerCase() === city.trim().toLowerCase()
    );
    console.log('[MapboxMap] cityObj found:', cityObj);
    if (cityObj && typeof cityObj.lat === 'number' && typeof cityObj.lng === 'number' && typeof cityObj.zoom === 'number') {
      setViewport(v => ({ ...v, lat: cityObj.lat, lng: cityObj.lng, zoom: cityObj.zoom }));
    } else {
      if (!cityObj) {
        console.warn(`[MapboxMap] City not found in ontarioCities.js: '${city}'`);
      } else {
        console.warn(`[MapboxMap] City data missing lat/lng/zoom in ontarioCities.js: '${city}'`, cityObj);
      }
      // fallback: Toronto
      setViewport(v => ({ ...v, lat: 43.6532, lng: -79.3832, zoom: 12 }));
    }
  }, [city]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Validate viewport values
    if (
      isNaN(viewport.lat) ||
      isNaN(viewport.lng) ||
      isNaN(viewport.zoom)
    ) {
      console.error('Invalid viewport values:', viewport);
      return;
    }

    console.log('Initializing map with token:', process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ? 'Token exists' : 'No token found');
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [viewport.lng, viewport.lat],
      zoom: viewport.zoom,
      minZoom: 9,
      maxZoom: 18,
    });

    console.log('Map instance created');

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      }),
      "top-right"
    );

    // Add geolocation control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
      }),
      "top-right"
    );

    // Wait for map to load before adding sources and layers
    map.current.on('load', () => {
      console.log('Map loaded, adding sources and layers');

      // Add a source for clustered points
      map.current.addSource('properties', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });
      console.log('Added source: properties');

      // Add cluster circles
      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'properties',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': 'rgb(3, 120, 136)',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            5,
            25,
            10,
            30
          ],
          'circle-opacity': 0.9,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 1
        }
      });
      console.log('Added layer: clusters');

      // Add cluster count numbers
      map.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'properties',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 13,
          'text-allow-overlap': true
        },
        paint: {
          'text-color': '#ffffff'
        }
      });
      console.log('Added layer: cluster-count');

      // Add unclustered point circles
      map.current.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'properties',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#EF4444',
          'circle-radius': 22,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.9,
          'circle-stroke-opacity': 1
        }
      });
      console.log('Added layer: unclustered-point');

      // Replace circle with rectangular markers for individual properties
      map.current.addLayer({
        id: 'unclustered-point-bg',
        type: 'symbol',
        source: 'properties',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': 'rectangle',
          'icon-size': 1,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true
        }
      });

      // Add a custom image for the rectangular marker
      const createRectangleImage = () => {
        const width = 80;
        const height = 44;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Draw rounded rectangle
        ctx.beginPath();
        const radius = 10;
        ctx.moveTo(radius, 0);
        ctx.lineTo(width - radius, 0);
        ctx.quadraticCurveTo(width, 0, width, radius);
        ctx.lineTo(width, height - radius);
        ctx.quadraticCurveTo(width, height, width - radius, height);
        ctx.lineTo(radius, height);
        ctx.quadraticCurveTo(0, height, 0, height - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();

        // Fill with red color
        ctx.fillStyle = '#EF4444';
        ctx.fill();

        // Add white border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        return canvas;
      };

      // Add the custom rectangle image when the map loads
      map.current.on('load', () => {
        const rectangleImage = createRectangleImage();
        map.current.addImage('rectangle', rectangleImage);
      });

      // Update the price label layer for better positioning on rectangular markers
      map.current.addLayer({
        id: 'unclustered-point-price',
        type: 'symbol',
        source: 'properties',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'text-field': ['get', 'price'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 13,
          'text-allow-overlap': true,
          'text-ignore-placement': true,
          'text-anchor': 'center'
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-width': 0
        }
      });

      // Function to update map markers
      const updateMapMarkers = (properties) => {
        console.log('Updating markers with properties:', properties);
        const source = map.current.getSource('properties');
        if (source) {
          const features = properties.map(property => {
            // Log the raw property data
            console.log('Raw property data:', property);

            // Check if we have valid coordinates
            if (!property.longitude || !property.latitude) {
              console.error('Missing coordinates for property:', property);
              return null;
            }

            // Ensure coordinates are numbers
            const longitude = parseFloat(property.longitude);
            const latitude = parseFloat(property.latitude);

            if (isNaN(longitude) || isNaN(latitude)) {
              console.error('Invalid coordinates for property:', property);
              return null;
            }

            // Format price
            let priceDisplay;
            try {
              const price = parseFloat(property.list_price);
              priceDisplay = price >= 1000000 
                ? `$${(price / 1000000).toFixed(1)}M` 
                : `$${Math.round(price / 1000)}K`;
            } catch (error) {
              console.error('Error formatting price for property:', property);
              priceDisplay = 'Price N/A';
            }

            const feature = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
              },
              properties: {
                listing_key: property.listing_key || '',
                price: priceDisplay,
                property_type: property.property_type || '',
                bedrooms: property.bedrooms || 0,
                bathrooms: property.bathrooms || 0
              }
            };

            console.log('Created feature:', feature);
            return feature;
          }).filter(Boolean); // Remove any null features

          console.log('Total valid features created:', features.length);

          const geojsonData = {
            type: 'FeatureCollection',
            features: features
          };

          console.log('Setting GeoJSON data:', geojsonData);
          source.setData(geojsonData);

          // Verify the source data was set
          const currentData = source.getData();
          console.log('Current source data:', currentData);
        } else {
          console.error('Source not found: properties');
        }
      };

      // Initial load of properties
      const initialLoad = async () => {
        console.log('Starting initial load');
        const bounds = map.current.getBounds();
        console.log('Initial bounds:', bounds.toString());
        const properties = await fetchPropertiesInViewport(bounds);
        if (properties) {
          console.log('Initial properties loaded:', properties.length);
          updateMapMarkers(properties);
        } else {
          console.log('No properties returned from initial load');
        }
      };

      // Handle clicks on clusters
      map.current.on('click', 'clusters', (e) => {
        console.log('Cluster clicked:', e.features[0]);
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.current.getSource('properties').getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) {
              console.error('Error expanding cluster:', err);
              return;
            }

            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      });

      // Handle clicks on individual properties
      map.current.on('click', 'unclustered-point', async (e) => {
        console.log('Property clicked:', e.features[0]);
        
        // Close existing popup if there is one
        if (activePopup.current) {
          activePopup.current.remove();
        }
        
        const coordinates = e.features[0].geometry.coordinates.slice();
        const listingKey = e.features[0].properties.listing_key;

        const propertyDetails = await fetchPropertyDetails(listingKey);
        if (!propertyDetails) {
          console.error('Failed to fetch property details');
          return;
        }

        // Create listing URL with constant /resale/ontario/ prefix
        const city = propertyDetails.city?.toLowerCase() || '';
        const listingUrl = `/resale/ontario/${city}/listings/${propertyDetails.listing_key}`;

        // Create popup content with entire card clickable
        const popupContent = `
          <a href="${listingUrl}" class="block hover:bg-gray-50 transition-colors rounded-lg">
            <div class="p-4 min-w-[300px]">
              <div class="font-bold text-xl mb-2">$${propertyDetails.list_price?.toLocaleString()}</div>
              <div class="text-sm text-gray-700 mb-1">${propertyDetails.street_number} ${propertyDetails.street_name} ${propertyDetails.street_suffix || ''}</div>
              <div class="text-sm text-gray-500">${propertyDetails.city}, ${propertyDetails.state_or_province}</div>
              ${propertyDetails.bedrooms ? 
                `<div class="flex items-center gap-3 mt-2 text-sm text-gray-600">
                  <span>${propertyDetails.bedrooms} Beds</span>
                  <span>•</span>
                  <span>${propertyDetails.bathrooms} Baths</span>
                  ${propertyDetails.property_type ? `<span>•</span><span>${propertyDetails.property_type}</span>` : ''}
                </div>` 
              : ''}
              ${propertyDetails.living_area ? 
                `<div class="text-sm text-gray-500 mt-1">
                  Living Area: ${propertyDetails.living_area} sqft
                </div>`
              : ''}
            </div>
          </a>
        `;

        // Create and store the new popup
        activePopup.current = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
          className: 'property-popup'
        })
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map.current);

        // Clear the reference when popup is manually closed
        activePopup.current.on('close', () => {
          activePopup.current = null;
        });
      });

      // Change cursor on hover
      map.current.on('mouseenter', 'clusters', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'clusters', () => {
        map.current.getCanvas().style.cursor = '';
      });
      map.current.on('mouseenter', 'unclustered-point', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'unclustered-point', () => {
        map.current.getCanvas().style.cursor = '';
      });

      // Update markers when map moves
      map.current.on('moveend', async () => {
        console.log('Map moved, updating markers');
        const bounds = map.current.getBounds();
        const properties = await fetchPropertiesInViewport(bounds);
        if (properties) {
          console.log('New properties loaded after move:', properties.length);
          updateMapMarkers(properties);
        } else {
          console.log('No properties returned after move');
        }
      });

      // Verify layers are visible
      const layersToCheck = ['clusters', 'cluster-count', 'unclustered-point', 'unclustered-point-price'];
      layersToCheck.forEach(layerId => {
        const visibility = map.current.getLayoutProperty(layerId, 'visibility');
        console.log(`Layer ${layerId} visibility:`, visibility || 'visible');
      });

      // Add debug click handler to check if map is receiving events
      map.current.on('click', (e) => {
        console.log('Map clicked at:', e.lngLat);
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ['clusters', 'unclustered-point']
        });
        console.log('Features at click point:', features);
      });

      // Load initial properties
      initialLoad();
    });

    // Cleanup on unmount
    return () => {
      console.log('Cleaning up map instance');
      if (map.current) {
        map.current.remove();
      }
    };
  }, [viewport.lat, viewport.lng, viewport.zoom]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      {loading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-sm text-gray-600">Loading properties...</span>
          </div>
        </div>
      )}
      <style jsx global>{`
        .mapboxgl-popup {
          max-width: none !important;
        }
        .mapboxgl-popup-content {
          padding: 0 !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
        .mapboxgl-popup-close-button {
          padding: 4px 8px !important;
          color: #666 !important;
          font-size: 16px !important;
        }
        .mapboxgl-popup-close-button:hover {
          background-color: transparent !important;
          color: #000 !important;
        }
        .property-popup .mapboxgl-popup-content {
          min-width: 300px;
        }
      `}</style>
    </div>
  );
};

export default MapboxMap; 