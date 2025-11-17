"use client";
import React from "react";
import TopBanner from "./components/top-banner";
import ProductCard from "@/components/common/product-card";
import InfoBanner from "./components/info-banner";
import FilterBar from "./components/filterbar";
import LoadButton from "@/components/common/load-button";
import GridSection from "../grid-section/grid-section";
import { useCategory } from "@/contexts/category-context";
import { useState } from "react";
import ProductsSkeletonSections from "./components/products-skeleton-sections";

const HomeRightSection = () => {
  const { state, loadMore } = useCategory();
  const {
    allProducts,
    allLoading,
    filteredProducts,
    filterLoading,
    filteredMeta,
  } = state;

  const [visibleCount, setVisibleCount] = useState(8); // initially 8 products

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8); // show 8 more each click
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-10">
      <TopBanner />

      {/* All Products */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 max-sm:gap-3">
        {allLoading ? (
          <ProductsSkeletonSections />
        ) : allProducts.length > 0 ? (
          allProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onHeartOnClick={() => { }} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">No products</p>
        )}
      </div>

      <InfoBanner />

      <FilterBar />

      {/* Filtered Products */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 max-sm:gap-3">
        {filterLoading ? (
          <ProductsSkeletonSections />
        ) : filteredProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onHeartOnClick={() => { }}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">
            No products match
          </p>
        )}
      </div>

      {/* Load More */}
      {!filterLoading && visibleCount < filteredProducts.length && (
        <div className="center">
          <LoadButton onClick={handleLoadMore}>
            Load More
          </LoadButton>
        </div>
      )}

      <GridSection className="md:hidden" />
    </div>
  );
};

export default HomeRightSection;