"use client";

import { useLanguage } from "@/contexts/language-context";
import { Product } from "@/contexts/types-and-interfaces/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CommunityProductGridProps {
  products: Product[];
  selectProduct: (id: number | string) => void;
  selectedProduct: number | string | null;
}

const CommunityProductGrid: React.FC<CommunityProductGridProps> = ({
  products,
  selectProduct,
  selectedProduct,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(10);
  const { language } = useLanguage();
  const productsPerRow = 5; // show 5 per row

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // mobile (below md)
        setProductsPerPage(4);
      } else {
        // desktop/tablet
        setProductsPerPage(10);
      }
    };

    handleResize(); // run initially
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div>
      {/* Product Grid */}
      <div className="grid xl:grid-cols-5 grid-cols-2  gap-4">
        {currentProducts?.length > 0 &&
          currentProducts.map((product) => (
            <div
              key={product.id}
              className={`p-4 rounded-xl text-center cursor-pointer bg-[#FFFDFA] shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] transition-transform duration-300 ease-in-out ${
                Number(selectedProduct) == product.id ? "scale-105" : ""
              }`}
              onClick={() => selectProduct(product.id)}
            >
              {/* Example extra info */}
              {product?.images[0]?.url && (
                <div className="relative h-40 center ">
                  <Image
                    src={product?.images[0]?.url}
                    alt={
                      language == "EN"
                        ? product.title_en || product.title_jp || "Product"
                        : product.title_jp || product.title_en || "Product"
                    }
                    fill
                    className="mx-auto w-50 object-cover rounded"
                  />
                </div>
              )}
              <p className="text-[#666664] text-sm font-medium mt-3 line-clamp-1">
                {language == "EN"
                  ? product.title_en || product.title_jp || "Product"
                  : product.title_jp || product.title_en || "Product"}
              </p>
            </div>
          ))}
      </div>

      {currentProducts?.length == 0 && (
        <div className="text-center w-full">
          <p className="capitalize text-[#666664] text-xl">
            No Products Found!
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          {/* Previous Arrow */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 cursor-pointer"
            disabled={currentPage === 1}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1484 0.5L3.99844 6.65C3.95061 6.69489 3.91248 6.74911 3.88642 6.80931C3.86036 6.8695 3.84692 6.9344 3.84692 7C3.84692 7.0656 3.86036 7.1305 3.88642 7.19069C3.91248 7.25089 3.95061 7.30511 3.99844 7.35L10.1484 13.5"
                stroke="#666664"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`min-w-[45px] min-h-[45px] font-semibold text-sm border-1 border-[#98C1A9] rounded-lg transition cursor-pointer ${
                currentPage === i + 1 ? "bg-[#98C1A9] text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Arrow */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 cursor-pointer"
            disabled={currentPage === totalPages}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.851562 0.5L7.00156 6.65C7.04939 6.69489 7.08752 6.74911 7.11358 6.80931C7.13964 6.8695 7.15308 6.9344 7.15308 7C7.15308 7.0656 7.13964 7.1305 7.11358 7.19069C7.08752 7.25089 7.04939 7.30511 7.00156 7.35L0.851562 13.5"
                stroke="#666664"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityProductGrid;
