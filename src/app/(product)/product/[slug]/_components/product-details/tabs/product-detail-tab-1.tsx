"use client";
import { useLanguage } from "@/contexts/language-context";
import { useProducts } from "@/contexts/product-context";
import React from "react";
import parse from 'html-react-parser';

// Skeleton for Usage Instruction Tab

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
    instructions: language === "EN" ? parse(product?.usage_information_en || 'No Instructions') : parse(product?.usage_information_jp || 'No Instructions') || 'No Instructions',
  };

  if (!product) return <p className="text-gray-500">No product data.</p>;

  const instructions = productFinal.instructions;

  return (
    <div>
      {instructions}
    </div>
  );
};

export default ProductDetailTab1;
