"use client";

import { CiSearch } from "react-icons/ci";
import { useState, useEffect, useMemo, useRef } from "react";
import { useProducts } from "@/contexts/product-context";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const SearchbarComponent = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { state } = useProducts();
  const { products = [], loading } = state;
  const { language } = useLanguage();

  // Force re-render when products change (even if reference same)
  const productsKey = products.map(p => p.id).join(",") + products.length;

  // Instant search with proper dependency
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();

    return products
      .filter((product) => {
        const name =
          (language === "EN"
            ? product.translations?.en?.name
            : product.translations?.jp?.name
          )?.toLowerCase() || "";

        const price = String(product.price);

        return name.includes(lowerQuery) || price.includes(lowerQuery);
      })
      .slice(0, 5);
  }, [query, products, language, productsKey]); // productsKey forces update

  // Open results on focus
  const handleFocus = () => {
    if (query.trim()) setShowResults(true);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest(".search-result-item")
      ) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showResults]);

  const handleResultClick = () => {
    setShowResults(false);
    setQuery("");
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full h-full shadow rounded-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full center h-full"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className="w-full h-full outline-none border-none md:px-5 px-4 min-h-10 text-sm md:text-base rounded-full"
        />
        <button
          type="submit"
          className="md:bg-primary max-md:text-primary md:px-10 min-h-10 rounded-full xl:mr-0 lg:mr-0 md:mr-0 mr-3 text-white h-full flex items-center justify-center"
        >
          <CiSearch strokeWidth={0.5} className="text-2xl" />
        </button>
      </form>

      {/* Instant Results */}
      {showResults && query.trim() && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-96 overflow-y-auto"
          onMouseDown={(e) => e.preventDefault()}
        >
          {loading ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              Loading...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-1 p-2">
              {searchResults.map((item) => {
                const title =
                  language === "EN"
                    ? item.translations?.en?.name || "No name"
                    : item.translations?.jp?.name || "No name";

                const desc =
                  language === "EN"
                    ? item.translations?.en?.description
                    : item.translations?.jp?.description;

                const imageUrl = item.images?.[0]?.url || "/placeholder.png";

                return (
                  <Link
                    key={item.id}
                    href={`/product/${item.id}`}
                    className="search-result-item flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition block"
                    onClick={handleResultClick}
                  >
                    <div className="w-12 h-12 flex-shrink-0">
                      <Image
                        src={imageUrl}
                        alt={title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{title}</h4>
                      {desc && (
                        <p
                          className="text-xs text-gray-500 line-clamp-1"
                          dangerouslySetInnerHTML={{
                            __html: desc.replace(/<[^>]*>/g, ""),
                          }}
                        />
                      )}
                      <p className="text-sm font-semibold text-primary mt-1">
                        ${item.price}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchbarComponent;