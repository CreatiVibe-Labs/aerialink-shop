"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiStarFill } from "react-icons/pi";
import CommunityProductGrid from "./ProductGrid";
import CommunityQuestionsAnswers from "./QuestionAnswers";
import CommunityReviews from "./Reviews";
import { useCategory } from "@/contexts/category-context";
import { useLanguage } from "@/contexts/language-context";
import SkeletonGrid from "./SkeletonGrid";
import SkeletonProductDetail from "./SkeletonProductDetail";
import SkeletonTabContent from "./SkeletonTabContent";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

export default function CommunityForumComponent() {
  // ✅ Hooks must always be on top, unconditionally
  const [selectedProduct, setSelectedProduct] = useState<number | string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTabs, setActiveTabs] = useState("questions");

  const { state, loadMore } = useCategory();
  const { language } = useLanguage();
  const router = useRouter();

  const { allProducts, allLoading, filteredProducts, filterLoading } = state;

  // Filter products based on search term
  const displayedProducts = searchTerm.trim()
    ? allProducts.filter((product) => {
        const titleEN = typeof product.title_en === 'string' ? product.title_en.toLowerCase() : "";
        const titleJP = typeof product.title_jp === 'string' ? product.title_jp.toLowerCase() : "";
        const search = searchTerm.toLowerCase();
        return titleEN.includes(search) || titleJP.includes(search);
      })
    : allProducts;

  // ✅ Avoid unsafe non-null assertions (!.) in optional chains
  const activeProduct = allProducts.find((p) => p.id === selectedProduct);

  const reviews = (activeProduct as any)?.reviews || [];
  const prices = activeProduct?.variants?.map(v => parseFloat(v.price)) || [];

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const finalPrice = `¥${minPrice.toLocaleString()}`;

  useEffect(() => {
    if (!allLoading && allProducts.length > 0 && selectedProduct === null) {
      const firstId = allProducts[0].id;
      setSelectedProduct(firstId);
      router.replace(`?product=${firstId}`, { scroll: false });
    }
  }, [allLoading, allProducts, selectedProduct, router]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mb-10 max-2xl: gap-x-1 min-h-screen max-w-7xl w-full mx-auto mt-7  ">
      <h1 className="text-[#AFB1AE] text-center font-bold xl:text-5xl lg:text-5xl md:text-5xl text-3xl w-full">
        Welcome to our community
      </h1>

      {/* Search Bar */}
      <div className="searchBar mt-7 max-w-6xl m-auto">
        <div className="h-full rounded-full center w-full shadow md:border md:border-gray-100">
          <form onSubmit={handleSearch} className="w-full center h-full">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-full outline-none border-none px-5 min-h-10"
            />
            <button
              type="submit"
              className="bg-primary px-10 min-h-10 rounded-full text-white h-full"
            >
              <CiSearch strokeWidth={0.5} className="text-2xl" />
            </button>
          </form>
        </div>
      </div>

      {/* Select Products */}
      <div className="selectProducts">
        <h2 className="capitalize text-center text-[#AFB1AE] text-2xl mt-10">
          Select a product
        </h2>
        <div className="mt-7">
          {allLoading ? (
            <SkeletonGrid count={10} />
          ) : displayedProducts.length > 0 ? (
            <CommunityProductGrid
              products={displayedProducts}
              selectProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          ) : (
            <div className="text-center py-10 text-[#AFB1AE]">
              No products found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      {/* Product Detail */}
      <div className="mt-10">
        {allLoading ? (
          <SkeletonProductDetail />
        ) : selectedProduct && activeProduct ? (
          <div className="productDetail rounded-xl flex xl:flex-row lg:flex-row flex-col bg-[#FFFDFA] p-2 mt-10 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]">
            <div className="productData flex xl:max-w-[30%] lg:max-w-[30%] max-w-[100%] w-full gap-5 items-center">
              <div className="productImage">
                {activeProduct?.images?.[0]?.url && (
                  <Image
                    src={activeProduct?.images[0]?.url}
                    width={500}
                    height={500}
                    alt={
                      language === "EN"
                        ? activeProduct?.title_en || activeProduct?.title_jp || "Product"
                        : activeProduct?.title_jp || activeProduct?.title_en || "Product"
                    }
                    className="w-28 h-28 object-cover rounded-xl bg-[#FFFDFA] shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]"
                  />
                )}
              </div>
              <div className="productMeta flex flex-col gap-2">
                <span className="productTitle font-medium text-[#AFB1AE] text-lg line-clamp-1 xl:pr-5">
                  {language === "EN"
                    ? activeProduct?.title_en || activeProduct?.title_jp || "Product"
                    : activeProduct?.title_jp || activeProduct?.title_en || "Product"}
                </span>
                <span className="productRating">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <PiStarFill 
                        key={i} 
                        className={i < (activeProduct?.average_rating || 0) ? "text-amber-300" : "text-[#AFB1AE]"} 
                        size={18} 
                      />
                    ))}
                  </div>
                </span>
                <span className="productPrice text-lg font-medium text-[#db4444]">
                  {finalPrice}
                </span>
              </div>
            </div>
            <div className="border-l-1 xl:border-t-0 lg:border-t-0 border-[#D9D9D9] xl:max-w-[4%] lg:max-w-[4%] w-full min-[360px]:max-w-[100%] min-[360px]:border-t-1 min-[360px]:my-3"></div>
            <div className="productDesc max-w-[66%] min-[360px]:max-w-[100%] w-full flex justify-center flex-col gap-2">
              <span className="font-medium text-sm text-[#AFB1AE]">Description</span>
              <span className="font-medium text-sm text-[#AFB1AE] line-clamp-2">
                {language === "EN"
                  ? parse(activeProduct?.detailed_description_en || activeProduct?.detailed_description_jp || "No description available")
                  : parse(activeProduct?.detailed_description_jp || activeProduct?.detailed_description_en || "No description available")}
              </span>
              <Link
                href={`/product/${activeProduct.slug}`}
                className="text-[#98C1A9] font-medium text-lg capitalize flex gap-2 items-center"
              >
                read more about this product
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 2L11.8796 6.73077C11.9176 6.7653 11.9479 6.80701 11.9686 6.85331C11.9893 6.89962 12 6.94954 12 7C12 7.05046 11.9893 7.10038 11.9686 7.14669C11.9479 7.19299 11.9176 7.2347 11.8796 7.26923L7 12"
                    stroke="#98C1A9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 2L6.88644 6.73077C6.95923 6.80267 7 6.89933 7 7C7 7.10067 6.95923 7.19734 6.88644 7.26923L2 12"
                    stroke="#98C1A9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-[#AFB1AE]">
            Please select a product to view details.
          </div>
        )}
      </div>

      {/* Tabs */}
      {!allLoading && selectedProduct && (
        <>
          <div className="tabsButtons flex justify-center xl:gap-10 min-[360px]:gap-2 mt-10">
            <div
              onClick={() => setActiveTabs("questions")}
              className={`${activeTabs === "questions"
                ? "bg-[#98C1A9] text-white"
                : "text-[#98C1A9]"
                } tab border-2 border-[#98C1A9] rounded-xl py-4 xl:min-w-[266px] xl:max-w-[266px] lg:min-w-[266px] lg:max-w-[266px] md:min-w-[266px] md:max-w-[266px] min-[360px]:px-5 text-center font-medium text-md cursor-pointer transition-all hover:bg-[#98C1A9] hover:text-white capitalize`}
            >
              <span>Questions & Answers</span>
            </div>
            <div
              onClick={() => setActiveTabs("reviews")}
              className={`${activeTabs === "reviews"
                ? "bg-[#98C1A9] text-white"
                : "text-[#98C1A9]"
                } tab border-2 border-[#98C1A9] rounded-xl py-4 xl:min-w-[266px] xl:max-w-[266px] lg:min-w-[266px] lg:max-w-[266px] md:min-w-[266px] md:max-w-[266px] min-[360px]:px-5 text-center font-medium text-md cursor-pointer transition-all hover:bg-[#98C1A9] hover:text-white capitalize`}
            >
              <span>reviews</span>
            </div>
          </div>

          <div className="mt-6">
            {activeTabs === "questions" ? (
              filterLoading ? (
                <SkeletonTabContent />
              ) : (
                activeProduct && (
                  <CommunityQuestionsAnswers selectedProduct={activeProduct.id} />
                )
              )
            ) : filterLoading ? (
              <SkeletonTabContent />
            ) : (
              <CommunityReviews reviews={reviews} product_id={selectedProduct} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
