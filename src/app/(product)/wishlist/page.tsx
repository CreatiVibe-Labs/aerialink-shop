"use client";

import BreadCrumbs from "@/components/common/bread-crumbs";
import ProductCard from "@/components/common/product-card";
import { useWishlist } from "@/contexts/wishlist-context";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import Cookies from "js-cookie";

const WishListPage = () => {
  const { wishlist, loading, error } = useWishlist();
  const [products, setProducts] = useState<any[]>([]);
  const { language } = useLanguage();

  const token =
    typeof window !== "undefined" ? Cookies.get("token") : null;

  useEffect(() => {
    if (!token) return;

    if (wishlist && wishlist.length > 0) {
      const mappedProducts = wishlist.map((item) => {
        const product = item.product;
        return {
          link: `/product/${product.id}`,
          image: {
            src: product.images[0]?.url
              ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${product.images[0].url}`
              : "/assets/home/product/product.png",
            alt:
              language === "EN"
                ? product?.title_en
                : product?.title_jp,
          },
          rating: 4,
          title:
            language === "EN"
              ? product?.title_en
              : product?.title_jp,
          product: product,
          onHeartOnClick: () => {},
          addToCardOnClick: () => {},
        };
      });

      setProducts(mappedProducts);
    } else {
      // Clear when wishlist becomes empty, so UI updates without refresh
      setProducts([]);
    }
  }, [wishlist, token, language]);

  if (!token) {
    return (
      <div className="max-w-7xl w-full mx-auto max-md:px-5 max-sm:px-3 my-5">
        <BreadCrumbs />
        <div className="text-center py-10">
          <p className="text-lg text-[#AFB1AE] font-medium">
            Please log in first to view or add wishlist items.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl w-full mx-auto max-md:px-5 max-sm:px-3 my-5">
        <BreadCrumbs />
        <div className="text-center py-10">Loading wishlist...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl w-full mx-auto max-md:px-5 max-sm:px-3 my-5">
        <BreadCrumbs />
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl w-full mx-auto max-md:px-5 max-sm:px-3 my-5">
        <BreadCrumbs />
        <div className="text-center py-10">
          <p className="text-lg text-[#AFB1AE]">Your wishlist is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto max-md:px-5 max-sm:px-3 my-8">
      <BreadCrumbs />
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 max-sm:gap-3">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </div>
  );
};

export default WishListPage;
