"use client";
import { useLanguage } from "@/contexts/language-context";
import { useProducts } from "@/contexts/product-context";
import React from "react";
import parse from 'html-react-parser';

// Skeleton for Variants Tab
const VariantsSkeleton = () => (
  <div className="rounded-xl border border-gray-200 overflow-hidden max-w-2xl animate-pulse">
    {/* Header */}
    <div className="bg-gray-50 grid grid-cols-4 text-sm font-medium text-gray-700 border-b border-gray-200">
      <div className="p-3">Variant</div>
      <div className="p-3">Color</div>
      <div className="p-3">Price</div>
      <div className="p-3">Stock</div>
    </div>
    {/* Rows */}
    {[...Array(2)].map((_, i) => (
      <div key={i} className="grid grid-cols-4 border-b border-gray-200">
        <div className="p-3">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="p-3">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="p-3">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="p-3">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    ))}
  </div>
);

const ProductDetailTab3 = () => {
  const { state } = useProducts();
  const { product, productLoading } = state;
  const { language } = useLanguage();

  // Show skeleton while loading
  if (productLoading) return <VariantsSkeleton />;

  // No product
  if (!product) return <p className="text-gray-500">No product data.</p>;

  // Parse colors, sizes, weight from specifications with fallback
  const color = language === 'EN' 
    ? product.color.name_en || product.color.name_jp || "N/A"
    : product.color.name_jp || product.color.name_en || "N/A";
  
  const netWeightContent = language === 'EN'
    ? product.net_weight_en || product.net_weight_jp
    : product.net_weight_jp || product.net_weight_en;
  const NetWeight = netWeightContent ? parse(netWeightContent) : "N/A";
  
  const packingContent = language === 'EN'
    ? product.packing_en || product.packing_jp
    : product.packing_jp || product.packing_en;
  const packing = packingContent ? parse(packingContent) : "N/A";
  
  const packingRemarksContent = language === 'EN'
    ? product.packing_remarks_en || product.packing_remarks_jp
    : product.packing_remarks_jp || product.packing_remarks_en;
  const packingRemarks = packingRemarksContent ? parse(packingRemarksContent) : "N/A";
  
  const harmfulContent = language === 'EN'
    ? product.harmful_content_en || product.harmful_content_jp
    : product.harmful_content_jp || product.harmful_content_en;
  const Harmfull = harmfulContent ? parse(harmfulContent) : "N/A";

  return (
    <div className="rounded-2xl border border-[#666664] overflow-hidden max-w-[66%]">
      {/* Colors Row */}
      <div className="grid grid-cols-[200px_1fr] border-b border-[#666664]">
        <div className="px-4 py-3 bg-white font-medium text-gray-700 border-r border-[#666664]">Color</div>
        <div className="px-4 py-3 bg-white text-gray-600">{color}</div>
      </div>

      {/* Sizes Row */}
      <div className="grid grid-cols-[200px_1fr] border-b border-[#666664]">
        <div className="px-4 py-3 bg-white font-medium text-gray-700 border-r border-[#666664]">New Weight</div>
        <div className="px-4 py-3 bg-white text-gray-600">{NetWeight}</div>
      </div>

      <div className="grid grid-cols-[200px_1fr] border-b border-[#666664]">
        <div className="px-4 py-3 bg-white font-medium text-gray-700 border-r border-[#666664]">Packing</div>
        <div className="px-4 py-3 bg-white text-gray-600">
          <div>{packing}</div>
          <div>{packingRemarks}</div>
        </div>
      </div>


      {/* Weight Row */}
      <div className="grid grid-cols-[200px_1fr]">
        <div className="px-4 py-3 bg-white font-medium text-gray-700 border-r border-[#666664]">Harmfull Content</div>
        <div className="px-4 py-3 bg-white text-gray-600">{Harmfull}</div>
      </div>


    </div>
  );
};

export default ProductDetailTab3;
