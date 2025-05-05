"use client";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";

const Map = ({ main_data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [state, setState] = useState({
    lat: null,
    lon: null,
  });

  const ACCESS_TOKEN =
    "pk.eyJ1IjoiZG9scGh5bWFwYm94IiwiYSI6ImNscTYwcXR5YTBqcG4yam51NDFtbTZkbjcifQ.BXRuDHFFdtNdKyhduH3icA";

  async function getLatLongForMap(listDetail) {
    const { Street, StreetAbbreviation, StreetName, Area, Province } =
      listDetail;
    const fullAddressForMap = encodeURIComponent(
      `${StreetName} ${StreetAbbreviation}, ${Area}, ${Province}, Canada`
    );
    const url = `https://api.mapbox.com/search/geocode/v6/forward?country=canada&place=${fullAddressForMap}&access_token=${ACCESS_TOKEN}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  // Memoize the marker icon to prevent recreating it on every render
  const customIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "/property-page-img/marker.svg",
      }),
    []
  );

  useEffect(() => {
    const commonFunctionCall = async () => {
      try {
        const result = await getLatLongForMap(main_data);
        for (const feature of result?.features) {
          if (
            feature?.geometry?.coordinates[0] != undefined &&
            feature?.geometry?.coordinates[1] != undefined
          ) {
            setState({
              lat: feature.geometry.coordinates[1],
              lon: feature.geometry.coordinates[0],
            });
            break;
          }
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      } finally {
        setIsMounted(true);
      }
    };
    commonFunctionCall();

    // Cleanup function
    return () => {
      setIsMounted(false);
    };
  }, [main_data]); // Add main_data as dependency

  if (!state.lat || !isMounted) {
    return null;
  }

  return (
    <MapContainer
      key={`${state.lat}-${state.lon}`} // Add key to force remount when coordinates change
      center={[state.lat, state.lon]}
      zoom={14}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "5px",
      }}
      attributionControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}" />
      <Marker position={[state.lat, state.lon]} icon={customIcon} />
    </MapContainer>
  );
};

export default Map;
