"use client";
import { useLanguage } from "@/contexts/language-context";
import { useProducts } from "@/contexts/product-context";
import React from "react";

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

  // Show skeleton while loading
  if (productLoading) return <VariantsSkeleton />;

  // No product
  if (!product) return <p className="text-gray-500">No product data.</p>;

  // No variants
  if (!product.variants || product.variants.length === 0) {
    return <p className="text-gray-500">No variants available.</p>;
  }

  return (
    <div className="rounded-xl border border-min-gray overflow-hidden max-w-2xl">
      {/* Table Header */}
      <div className="bg-gray-50 grid grid-cols-4 text-sm font-medium text-min-gray border-b border-min-gray">
        <div className="p-3">Variant</div>
        <div className="p-3">Color</div>
        <div className="p-3">Price</div>
        <div className="p-3">Stock</div>
      </div>

      {/* Table Rows */}
      {product.variants.map((variant) => {
        const colorAttr = variant.attributes.find(
          (attr) => attr.attribute_name.toLowerCase() === "color"
        );
        const color = colorAttr?.attribute_value || "—";

        return (
          <div
            key={variant.id}
            className="grid grid-cols-4 text-sm text-min-gray border-b border-min-gray last:border-b-0"
          >
            {/* SKU */}
            <div className="p-3 font-medium">{variant.sku}</div>

            {/* Color */}
            <div className="p-3">
              <span className="inline-flex items-center gap-1">{color}</span>
            </div>

            {/* Price */}
            <div className="p-3 font-semibold">${variant.price}</div>

            {/* Stock */}
            <div className="p-3">
              {variant.stock > 0 ? (
                <span className="text-green-600">{variant.stock} in stock</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// export default ProductDetailTab3;
