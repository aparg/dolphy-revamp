"use client";
import React from 'react';
import MapViewButton from './MapViewButton';

const MapViewContainer = ({ properties, city }) => {
  return (
    <div className="absolute right-4 top-2 z-30">
      <MapViewButton properties={properties} city={city} />
    </div>
  );
};

export default MapViewContainer;
