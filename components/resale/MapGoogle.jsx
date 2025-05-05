"use client";

const MapGoogle = ({
  width = 600,
  height = 400,
  location = "University of Oxford",
  zoom = 14,
}) => {
  const mapSrc = `https://maps.google.com/maps?hl=en&q=${encodeURIComponent(
    location
  )}&t=m&z=${zoom}&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="relative text-right max-w-full">
      <div
        className="overflow-hidden bg-none"
        style={{ height: `${height}px` }}
      >
        <iframe
          className="max-w-full"
          height={height}
          width={width}
          src={mapSrc}
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default MapGoogle;
