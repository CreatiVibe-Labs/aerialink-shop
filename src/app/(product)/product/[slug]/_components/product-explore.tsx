"use client"
import { useProducts } from "@/contexts/product-context";
import ProductExploreLeftSection from "./product-explore-left-section";
import ProductExploreRightSection from "./product-explore-right-section";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProductExplore() {
  const { state, fetchProduct } = useProducts();
  const { slug } = useParams();

  useEffect(() => {
    const id = String(slug);
    if (id) {
      fetchProduct(id);
    }
  }, [slug, fetchProduct]);

  const { productLoading, productError } = state;

  // Global error/loading
  if (productError)
    return <p className="text-red-500">Error: {productError}</p>;

  return (
    <div className="grid grid-cols-3 gap-8 max-md:gap-3 max-w-7xl mx-auto items-start max-lg:grid-cols-2 max-md:grid-cols-1">
      <ProductExploreLeftSection />
      <ProductExploreRightSection />
    </div>
  );
}
