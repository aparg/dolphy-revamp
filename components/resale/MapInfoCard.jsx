"use client";
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/helpers/formatPrice';

const MapInfoCard = ({ property }) => {
  if (!property) return null;

  const slug = `${property.StreetNumber}-${property.StreetName?.replace(/\s+/g, '-')?.toLowerCase()}`;
  const href = `/resale/ontario/${property.City?.toLowerCase()}/homes-for-sale/${slug}`;

  return (
    <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={property.ImageUrls?.[0] || '/images/placeholder.jpg'}
          alt={`${property.StreetNumber} ${property.StreetName}`}
          fill
          className="object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm font-semibold">
          {formatPrice(property.ListPrice)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <Link href={href} className="group">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {property.StreetNumber} {property.StreetName}
          </h3>
          <p className="text-gray-600 mt-1">{property.City}, Ontario</p>
        </Link>

        {/* Property Details */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="font-semibold">{property.BedroomsTotal || 'N/A'}</p>
            <p className="text-gray-500">Beds</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="font-semibold">{property.BathroomsFull || 'N/A'}</p>
            <p className="text-gray-500">Baths</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="font-semibold">{property.LivingArea ? `${Math.round(property.LivingArea)}` : 'N/A'}</p>
            <p className="text-gray-500">Sq.Ft</p>
          </div>
        </div>

        {/* View Details Button */}
        <Link 
          href={href}
          className="mt-4 w-full block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MapInfoCard;
