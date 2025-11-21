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
    <div className="mt-8  max-lg:px-0">
      <SmallHeading label="You may be also interested in" />

      {/* Loading */}
      {loading ? (
        <div className="grid mt-5 gap-4 max-sm:gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          <ProductsSkeletonSections />
        </div>
      ) : relatedProducts.length > 0 ? (
        /* Show only 4 products */
        <div className="grid mt-5 gap-4 max-sm:gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
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
