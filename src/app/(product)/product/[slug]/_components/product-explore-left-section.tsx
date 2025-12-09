"use client";
import { useProducts } from "@/contexts/product-context";
import Image from "next/image";
import React, { useState, useMemo, useEffect } from "react";

// Skeleton for Left Section
const ProductLeftSkeleton = () => (
  <div className="col-span-2 flex max-lg:flex-col-reverse h-full animate-pulse">
    <div className="flex flex-col gap-3 max-lg:flex-row">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="size-28 max-md:size-20 bg-gray-200 rounded-xl"
        ></div>
      ))}
    </div>
    <div className="flex-1 ml-10 max-lg:ml-0 mt-4 max-lg:mt-0">
      <div className="w-full h-96 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
);

const ProductExploreLeftSection = () => {
  const { state } = useProducts();
  const { product, productLoading } = state;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Close lightbox on ESC
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  // Lock scroll while lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [lightboxOpen]);

  const imageUrls = useMemo(() => {
    if (!product?.images?.length) return [];
    return product.images.map((img) => img.url);
  }, [product?.images]);

  // Show skeleton
  if (productLoading) return <ProductLeftSkeleton />;

  if (!product || imageUrls.length === 0) {
    return (
      <div className="col-span-2 flex h-full items-center justify-center">
        <p className="text-[#AFB1AE]">No images available</p>
      </div>
    );
  }

  return (
    <div className="col-span-2 flex max-lg:flex-col-reverse h-full">
      <div className="flex flex-col max-lg:mt-4 gap-3 justify-center max-md:flex-row max-lg:flex-row  ">
        {imageUrls.map((url, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`rounded-xl overflow-hidden border-2 transition-all ${
              selectedIndex === i ? "border-primary" : "border-gray-200"
            }`}
          >
            <div className="relative size-28 max-md:size-20 max-sm:size-18 cursor-pointer bg-[#F8F5EE] hover:opacity-80 transition">
              <Image
                src={url}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover p-1  !relative inset-[unset] rounded-xl"
                unoptimized
              />
            </div>
          </button>
        ))}
      </div>

      <div
        className="relative p-2 flex-1 ml-10 max-lg:ml-0 flex justify-center items-center border border-gray-200/50 shadow rounded-xl cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
        role="button"
        aria-label="Open image preview"
      >
        
          <Image
            src={imageUrls[selectedIndex]}
            alt="Main product image"
            fill
            className="object-cover rounded-xl transition-transform duration-300 !w-[98%] !h-[98%] !relative inset-[unset]"
            priority
          />

        <div
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50"
          onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
          aria-label="Open image preview"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-[#AFB1AE]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 7.5v6m-3-3h6"
            />
          </svg>
        </div>
      </div>
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[12000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Wrapper positioned relative so controls can sit outside the white box */}
          <div
            className="relative max-w-5xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Outside Controls */}
            {imageUrls.length > 1 && (
              <>
                {/* Prev outside left */}
                {selectedIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedIndex((i) => Math.max(0, i - 1))}
                    className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 bg-white/25 hover:bg-white/35 cursor-pointer text-white w-10 h-10 rounded-full flex items-center justify-center max-md:left-2 max-md:top-1/2 max-md:w-8 max-md:h-8 max-md:bg-black/40 max-md:hover:bg-black/50"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                )}
                {/* Next outside right */}
                {selectedIndex < imageUrls.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setSelectedIndex((i) => Math.min(imageUrls.length - 1, i + 1))}
                    className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 bg-white/25 cursor-pointer hover:bg-white/35 text-white w-10 h-10 rounded-full flex items-center justify-center max-md:right-2 max-md:top-1/2 max-md:w-8 max-md:h-8 max-md:bg-black/40 max-md:hover:bg-black/50"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}
              </>
            )}

            {/* Close outside top-right of box */}
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-11 right-0 z-20 bg-white/25 hover:bg-white/35 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl cursor-pointer max-md:top-2 max-md:right-2 max-md:w-8 max-md:h-8 max-md:bg-black/40 max-md:hover:bg-black/50"
              aria-label="Close preview"
            >
              ×
            </button>

            {/* Counter outside top-left of box */}
            <div className="absolute -top-10 left-0 z-20 bg-white/25 text-white text-sm px-3 py-1 rounded-full max-md:top-2 max-md:left-2 max-md:bg-black/40">
              {selectedIndex + 1} / {imageUrls.length}
            </div>

            {/* White content box with padding to avoid image cut */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-black/10 p-3">
              <div className="relative w-full aspect-video max-md:aspect-square">
                <Image
                  src={imageUrls[selectedIndex]}
                  alt="Enlarged product image"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductExploreLeftSection;