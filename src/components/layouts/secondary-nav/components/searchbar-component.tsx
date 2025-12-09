"use client";

import { CiSearch } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { getProductTitle } from "@/lib/language-helpers";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  main_image: string;
  images?: Array<{ url: string }>;
  variants?: Array<{ price: string }>;
  title_en?: string;
  title_jp?: string;
}

const SearchbarComponent = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced API search
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Don't search if query is empty
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Set new timer for debounced search
    debounceTimerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?search=${encodeURIComponent(query)}`
        );

        if (response.ok) {
          const data = await response.json();
          // Handle both data.products and data.data.products structure
          const products = data.data?.products || data.products || [];
          setSearchResults(products);
          setShowResults(true);
        }
      } catch (error) {
        // Silent error handling
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  // Open results on focus
  const handleFocus = () => {
    if (query.trim() && searchResults.length > 0) {
      setShowResults(true);
    }
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
          className="absolute top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-[9] max-h-96 overflow-y-auto left-0 right-0 max-md:left-[-6.5rem] max-md:right-[-1rem] max-md:w-screen max-md:max-w-[calc(100vw-2rem)]"
          onMouseDown={(e) => e.preventDefault()}
        >
          {loading ? (
            <div className="p-4 text-center text-[#AFB1AE] text-sm">
              Loading...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-1 p-2">
              {searchResults.map((item) => {
                const title = getProductTitle(item.title_en, item.title_jp, language);

                const imageUrl = item.images?.[0]?.url || "/placeholder.png";
                const prices = item?.variants?.map(v => parseFloat(v.price)) || [];

                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);

                const finalPrice = `¥${minPrice.toLocaleString()}`;

                return (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    className="search-result-item flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
                    onClick={handleResultClick}
                  >
                    <div className="w-12 h-12 flex-shrink-0">
                      <Image
                        src={imageUrl}
                        alt={title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{title}</h4>
                      <p className="text-sm font-semibold text-primary mt-1">

                        {finalPrice}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button className="cursor-pointer text-xs bg-primary text-white px-3 py-1.5 rounded-full hover:bg-primary/90 transition">
                        View Details
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center text-[#AFB1AE] text-sm">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchbarComponent;