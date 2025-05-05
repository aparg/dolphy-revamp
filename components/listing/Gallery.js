"use client";

import Image from "next/image";
import { Gallery as PhotoSwipeGallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export default function Gallery({ images, projectName }) {
  // Ensure we always have 7 images by filling with placeholder
  const displayImages = [...images];
  while (displayImages.length < 7) {
    displayImages.push({
      id: `placeholder-${displayImages.length}`,
      images: "https://admin.dolphy.ca/media/noimage.webp",
      imagealt: "no image available",
    });
  }

  return (
    <PhotoSwipeGallery>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5 md:gap-2">
        {/* Main large image */}
        <Item
          original={displayImages[0].images}
          thumbnail={displayImages[0].images}
          width={1200}
          height={800}
        >
          {({ ref, open }) => (
            <div className="col-span-2 row-span-2 md:row-span-4 relative aspect-[4/3] md:aspect-square h-[200px] sm:h-[250px] md:h-[410px] w-full rounded-[8px] overflow-hidden">
              <Image
                ref={ref}
                src={displayImages[0].images}
                alt={`${projectName} - Main View`}
                fill
                className="object-cover !rounded-[8px] cursor-pointer"
                priority
                onClick={open}
              />
            </div>
          )}
        </Item>

        {/* Smaller images grid */}
        <div className="col-span-2 md:col-span-3 grid grid-cols-3 md:grid-cols-3 gap-1.5 md:gap-2">
          {displayImages.slice(1, 7).map((image, index) => (
            <Item
              key={image.id}
              original={image.images}
              thumbnail={image.images}
              width={1200}
              height={800}
            >
              {({ ref, open }) => (
                <div className="relative aspect-[4/3] md:aspect-square h-[100px] sm:h-[120px] md:h-[200px] w-full rounded-[8px] overflow-hidden">
                  <Image
                    ref={ref}
                    src={image.images}
                    alt={`${projectName} - View ${index + 2}`}
                    fill
                    className="object-cover !rounded-[8px] cursor-pointer hover:opacity-90 transition"
                    onClick={open}
                  />
                </div>
              )}
            </Item>
          ))}
        </div>
      </div>
    </PhotoSwipeGallery>
  );
}
