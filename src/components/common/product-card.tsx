"use client";
import { useLanguage } from "@/contexts/language-context";
import { Product } from "@/contexts/types-and-interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiStarFill } from "react-icons/pi";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";

// Helper: Render stars with half-star support
const renderStars = (rating: number, reviewCount: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <PiStarFill key={`full-${i}`} className="text-amber-400" size={16} />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <div className="relative">
          <PiStarFill className="text-gray-300" size={16} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <PiStarFill className="text-amber-400" size={16} />
          </div>
        </div>
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <PiStarFill key={`empty-${i}`} className="text-gray-300" size={16} />
      ))}

      {/* Review Count */}
      <span className="text-light-gray text-sm font-medium pl-1">
        ({reviewCount})
      </span>
    </div>
  );
};

interface ProductCardI {
  product: Product;
  onHeartOnClick: () => void;
}

const ProductCard: FC<ProductCardI> = ({ product, onHeartOnClick }) => {
  const productInnerLink = `/product/${product?.id}`;
  const { language } = useLanguage();
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist, loading } = useWishlist();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!inCart) addToCart(product);
  };

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onHeartOnClick();
    await toggleWishlist(product.id);
  };

  // Dynamic values
  const avgRating = product.average_rating || 0;
  const reviewCount = product.reviews?.length || 0;

  return (
    <div className="bg-white cover-shadow relative rounded-2xl grid grid-cols-1 p-3 max-sm:p-2 px-4">
      {/* Wishlist Icon */}
      <div
        className={`absolute top-3 right-3 max-sm:top-1 max-sm:right-1 cursor-pointer z-10 transition-colors ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "text-light-gray hover:text-red-500"
        }`}
        onClick={handleHeartClick}
      >
        {inWishlist ? (
          <GoHeartFill
            size={40}
            className="bg-red-100 rounded-full  text-red-500! p-2"
          />
        ) : (
          <GoHeart size={40} className="bg-white rounded-full p-2" />
        )}
      </div>

      {/* Image + Link */}
      <Link href={productInnerLink} className="w-full">
        <div className="w-full min-h-52 max-md:min-h-40 max-sm:min-h-32 relative">
          <Image
            src={product?.images?.[0]?.url || "/fallback-image.jpg"}
            alt={
              product?.translations?.[language === "EN" ? "en" : "jp"]?.name ||
              "Product"
            }
            fill
            className="object-cover aspect-square"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="center-col items-start space-y-1 max-sm:text-xs">
        <Link href={productInnerLink}>
          <h2 className="text-light-gray font-medium">
            {language === "EN"
              ? product?.translations?.en?.name
              : product?.translations?.jp?.name}
          </h2>
        </Link>

        <h3 className="text-red-700 font-medium max-sm:text-sm">
          $
          {typeof product?.price === "string"
            ? parseFloat(product.price).toFixed(2)
            : product?.price}
        </h3>

        {/* Dynamic Rating */}
        {renderStars(avgRating, reviewCount)}

        {/* Add to Cart */}
        <div className="mt-3 w-full z-10 max-sm:mt-1">
          <button
            onClick={handleAddToCart}
            disabled={inCart || loading}
            className={`capitalize rounded-xl min-h-10 w-full text-white font-medium center max-sm:min-h-7 ${
              inCart || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 cursor-pointer"
            }`}
          >
            {inCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
