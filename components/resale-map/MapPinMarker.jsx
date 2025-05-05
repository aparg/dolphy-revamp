import React from 'react';
import { MarkerF } from "@react-google-maps/api";

const formatPrice = (price) => {
  if (!price) return '';
  
  const numPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.]/g, ''))
    : parseFloat(price);

  if (isNaN(numPrice)) return '';
    
  if (numPrice >= 1000000) {
    return `$${(numPrice / 1000000).toFixed(1)}M`;
  }
  return `$${(numPrice / 1000).toFixed(0)}K`;
};

const MapPinMarker = ({ 
  position, 
  price, 
  isSelected = false, 
  onClick 
}) => {
  // SVG path for an elegant pin with subtle shadow effect
  const pinPath = `
    M 0,-16
    a 16,16 0 1,0 0,32
    a 16,16 0 1,0 0,-32
    M -9,13
    Q -9,14 0,38
    Q 9,14 9,13
    Z
  `;

  const shadowPath = `
    M 0,-15
    a 15,15 0 1,0 0,30
    a 15,15 0 1,0 0,-30
    M -8,12
    Q -8,13 0,35
    Q 8,13 8,12
    Z
  `;

  return (
    <>
      <MarkerF
        position={position}
        onClick={onClick}
        icon={{
          path: shadowPath,
          fillColor: '#000000',
          fillOpacity: 0.15,
          strokeWeight: 0,
          scale: 1.2,
          anchor: new google.maps.Point(0, 35)
        }}
      />
      <MarkerF
        position={position}
        onClick={onClick}
        label={{
          text: formatPrice(price),
          color: '#FFFFFF',
          fontSize: '12.5px',
          fontWeight: '500',
          className: 'marker-label'
        }}
        icon={{
          path: pinPath,
          fillColor: isSelected ? '#EF4444' : '#FF4B4B',
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 1.2,
          labelOrigin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 38)
        }}
      />
    </>
  );
};

export default MapPinMarker;
