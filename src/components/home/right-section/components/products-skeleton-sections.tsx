import React from "react";
import ProductCardSkeleton from "./product-card-skeleton";

const ProductsSkeletonSections = () => {
  return Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton  key={i}/>);
};

export default ProductsSkeletonSections;
