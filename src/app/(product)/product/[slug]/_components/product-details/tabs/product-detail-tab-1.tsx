"use client";
import { useLanguage } from "@/contexts/language-context";
import { useProducts } from "@/contexts/product-context";
import React from "react";

const Tab1Skeleton = () => (
  <ul className="list-disc pl-5 space-y-3 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <li key={i} className="h-4 bg-gray-200 rounded w-full max-w-md"></li>
    ))}
  </ul>
);

const ProductDetailTab1 = () => {
  const { state } = useProducts();
  const { language } = useLanguage();
  const { product, productLoading } = state;

  // Show skeleton while loading
  if (productLoading) return <Tab1Skeleton />;

  const productFinal = {
    productDetails:
      language === "EN" ? product?.translations.en : product?.translations.jp,
  };

  if (!product) return <p className="text-gray-500">No product data.</p>;

  const instructions = productFinal.productDetails?.user_instruction;

  if (!instructions || instructions.trim() === "") {
    return <p className="text-gray-500">No Instructions</p>;
  }

  return (
    <div
      className="prose prose-sm max-w-none text-min-gray"
      dangerouslySetInnerHTML={{
        __html: instructions,
      }}
    />
  );
};

// export default ProductDetailTab1;
