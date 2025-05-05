"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getImageUrls } from "@/app/_resale-api/getSalesData";
import { Skeleton } from "@/components/ui/skeleton";

const MarkerInfoCard = ({ listing, onClose }) => {
  const router = useRouter();
  const [loadingImage, setLoadingImage] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (listing?.ListingKey) {
      setLoadingImage(true);
      getImageUrls({
        MLS: listing.ListingKey,
        thumbnailOnly: true,
      }).then((urls) => {
        setImgUrl(urls?.[0] || null);
        setLoadingImage(false);
      });
    }
  }, [listing]);

  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const citySlug = listing.City.toLowerCase().replace(/\s+/g, "-");
    const streetAndMLS = [
      listing.StreetNumber?.replace("/", "-"),
      listing.StreetName?.trim().replace(/ /g, "-"),
      listing.StreetSuffix,
      listing.ListingKey
    ].filter(Boolean).join("-");
    
    const url = `/resale/ontario/${citySlug}/listings/${streetAndMLS}`;
    window.open(url, '_blank');
    if (onClose) onClose();
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/noimage.webp";
  };

  return (
    <a 
      href="#"
      className="block bg-white rounded-lg shadow-lg p-3 min-w-[300px] cursor-pointer hover:shadow-xl transition-shadow"
      onClick={handleClick}
    >
      <div className="relative w-full h-[200px] mb-3 overflow-hidden rounded-md">
        {loadingImage ? (
          <Skeleton className="w-full h-full bg-gray-200" />
        ) : imgUrl ? (
          <img
            src={imgUrl}
            alt={listing.UnparsedAddress}
            className="w-full h-full object-cover transition-all duration-200 transform hover:scale-110"
            onError={handleImageError}
          />
        ) : (
          <img
            src="/noimage.webp"
            alt="No image available"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <h3 className="font-semibold text-lg mb-1">{listing.UnparsedAddress}</h3>
      <p className="text-blue-600 font-bold text-xl mb-2">
        {formatPrice(listing.ListPrice)}
      </p>
      <div className="flex gap-4 text-sm text-gray-600">
        <span>{listing.BedroomsTotal} Beds</span>
        <span>{listing.BathroomsTotalInteger} Baths</span>
        <span>{listing.PropertySubType}</span>
      </div>
    </a>
  );
};

export default MarkerInfoCard;
