"use client";
import React from "react";
import TopBanner from "./components/top-banner";
import ProductCard from "@/components/common/product-card";
import InfoBanner from "./components/info-banner";
import FilterBar from "./components/filterbar";
import LoadButton from "@/components/common/load-button";
import GridSection from "../grid-section/grid-section";
import { useCategory } from "@/contexts/category-context";
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

  return (
    <div className="col-span-4 px-3 max-sm:px-0 space-y-10 max-md:space-y-5 max-2xl:pr-0 max-xl:col-span-4 max-sm:col-span-1">
      <TopBanner />

      {/* All Products */}
      <div className="grid grid-cols-4 gap-4 max-sm:gap-3 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-2">
        {allLoading ? (
          <ProductsSkeletonSections />
        ) : allProducts.length > 0 ? (
          allProducts.map((product) => (
            <ProductCard key={product.id} product={product} onHeartOnClick={() => {}} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">No products</p>
        )}
      </div>

      <InfoBanner />

      <FilterBar />

      {/* Filtered Products */}
      <div className="grid grid-cols-4 gap-4 max-sm:gap-3 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-2">
        {filterLoading  ? (
          <ProductsSkeletonSections />
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onHeartOnClick={() => {}} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">
            No products match
          </p>
        )}
      </div>

      {/* Load More */}
      {filteredMeta && filteredMeta.current_page < filteredMeta.last_page && (
        <div className="center">
          <LoadButton onClick={loadMore} disabled={allLoading}>
            {allLoading ? "Loading..." : "Load More"}
          </LoadButton>
        </div>
      )}

      <GridSection className="md:hidden" />
    </div>
  );
};

export default HomeRightSection;