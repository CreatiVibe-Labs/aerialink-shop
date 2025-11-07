"use client";
import { useProducts } from "@/contexts/product-context";
import Image from "next/image";
import React, { useState, useMemo } from "react";

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

  const imageUrls = useMemo(() => {
    if (!product?.images?.length) return [];
    return product.images.map((img) => img.url);
  }, [product?.images]);

  // Show skeleton
  if (productLoading) return <ProductLeftSkeleton />;

  if (!product || imageUrls.length === 0) {
    return (
      <div className="col-span-2 flex h-full items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="col-span-2 flex max-lg:flex-col-reverse h-full">
      <div className="flex flex-col max-lg:mt-4 gap-3 justify-center max-md:flex-row max-lg:flex-row">
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
                className="object-contain p-2"
                unoptimized
              />
            </div>
          </button>
        ))}
      </div>

      <div className="relative flex-1 ml-10 max-lg:ml-0 flex justify-center items-center border border-gray-200/50 shadow rounded-xl">
        <div className="overflow-hidden rounded-2xl bg-white">
          <Image
            src={imageUrls[selectedIndex]}
            alt="Main product image"
            width={500}
            height={500}
            className="object-contain transition-transform duration-300"
            priority
          />
        </div>

        <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProductExploreLeftSection;