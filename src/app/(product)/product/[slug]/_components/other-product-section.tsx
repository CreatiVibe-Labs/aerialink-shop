"use client";
import ProductCard from "@/components/common/product-card";
import SmallHeading from "@/components/common/small-heading";
import ProductsSkeletonSections from "@/components/home/right-section/components/products-skeleton-sections";
import { useProducts } from "@/contexts/product-context";
import React from "react";

const OtherProductSection = () => {
  const { state } = useProducts();
  const { products, loading, product: currentProduct } = state;

  const relatedProducts = products
    .filter((p) => p.id !== currentProduct?.id) 
    .slice(0, 4); // sirf 4 products

  return (
    <div className="mt-8 px-8 max-lg:px-0">
      <SmallHeading label="You may be also interested in" />

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-4 mt-5 gap-4 max-sm:gap-3 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-2">
          <ProductsSkeletonSections />
        </div>
      ) : relatedProducts.length > 0 ? (
        /* Show only 4 products */
        <div className="grid grid-cols-4 mt-5 gap-4 max-sm:gap-3 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-2">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onHeartOnClick={() => {}}
            />
          ))}
        </div>
      ) : (
        /* No related products */
        <p className="text-center text-gray-500 mt-5">
          No related products found.
        </p>
      )}
    </div>
  );
};

export default OtherProductSection;
