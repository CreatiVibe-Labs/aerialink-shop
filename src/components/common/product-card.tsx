"use client";
import { useLanguage } from "@/contexts/language-context";
import { Product } from "@/contexts/types-and-interfaces/product";
import { getProductTitle } from "@/lib/language-helpers";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiStarFill } from "react-icons/pi";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useProfile } from "@/contexts/profile-context";
import LoginAlertModal from "../home/right-section/components/loginAlert";
import toast, { Toaster } from "react-hot-toast";

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
      <span className="text-[#666664] text-base font-[600] pl-1 leading-[16px] font-font-albert-sans">
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
  const productInnerLink = `/product/${product?.slug}`;
  const { language } = useLanguage();
  // Extract variant prices safely
  const prices = useMemo(() => {
    const list = product?.variants?.map(v => {
      const p = parseFloat(v.price);
      return isNaN(p) ? null : p;
    }).filter((p): p is number => p !== null) || [];
    return list;
  }, [product.variants]);

  const hasPrices = prices.length > 0;
  const minPrice = hasPrices ? Math.min(...prices) : 0;
  const maxPrice = hasPrices ? Math.max(...prices) : 0;
  const isRange = hasPrices && minPrice !== maxPrice;
  const finalPrice = hasPrices
    ? `¥${minPrice.toLocaleString()}`
    : "Price N/A";

  // Cart price: use min variant price as base
  const cartBasePrice = hasPrices ? minPrice.toFixed(2) : "0.00";

  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist, loading } = useWishlist();
  const { user } = useProfile();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Cart");

  const handleAddToCart = () => {
    if (!hasPrices || product.variants.length === 0) return;
    setAddToCartLoading(true);

    const variant = product.variants[0];
    const edomaSizes = variant?.sizes?.Edoma || [];
    const danchimaSizes = variant?.sizes?.Danchima || [];

    // Pick first available size (prefer Danchima)
    const chosenSize = danchimaSizes[0]?.size_value || edomaSizes[0]?.size_value || "";
    const roomType = danchimaSizes.length > 0 ? 'Danchima' : 'Edoma';
    const variantId = variant?.id;

    if (!chosenSize) {
      toast.error("No size available");
      setAddToCartLoading(false);
      return;
    }

    setTimeout(() => {
      addToCart(product.id, 1, chosenSize, cartBasePrice, roomType, product.slug, variantId);
      toast.success("Product added to cart");
      setButtonText("Added");
      setTimeout(() => setButtonText("Add to Cart"), 1000);
      setAddToCartLoading(false);
    }, 400);
  };


  const handleHeartClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowLoginModal(true);
      return;
    }
    onHeartOnClick();
    await toggleWishlist(product.id);
  };

  // Dynamic values
  const avgRating = product.average_rating || 0;
  const reviewCount = product.reviews?.length || 0;

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-[#FFFDFA] cover-shadow relative rounded-[14px] grid grid-cols-1 p-4 max-sm:p-2 px-4 gap-2">
        {/* Wishlist Icon */}
        <div
          className={`absolute top-1 right-1 max-sm:top-1 max-sm:right-1 cursor-pointer z-[1] transition-colors ${loading
            ? "opacity-50 cursor-not-allowed"
            : "text-[#CCCCFF]/50  hover:text-[#CCCCFF]"
            }`}
          onClick={handleHeartClick}
        >
          {inWishlist ? (
            <GoHeartFill
              size={41}
              className="bg-[#EBECF0] rounded-full  text-[#CCCCFF] p-2"      
            />
          ) : (
            <GoHeart size={41} className="bg-white rounded-full p-2" />
          )}
        </div>

        {/* Image + Link */}
        <Link href={productInnerLink} className="w-full" aria-label="View product details">
          <div className="w-full h-full xl:min-h-[200px] lg:min-h-[200px] md:min-h-[200px] min-h-[150px] xl:max-h-[200px] lg:max-h-[200px] md:max-h-[200px] max-h-[150px] relative">
            <Image
              src={product?.images?.[0]?.url || "/fallback-image.png"}
              alt={getProductTitle(product.title_en, product.title_jp, language)}
              fill
              className="object-cover w-56 h-56 rounded-md"
            />
          </div>
        </Link>

        {/* Details */}
        <div className="center-col items-start max-sm:text-xs gap-[6.23px]">
          <Link href={productInnerLink}>
            <h2 className="text-[#666664] font-[500] text-base leading-[19px] my-1 font-font-albert-sans line-clamp-1">
              {getProductTitle(product.title_en, product.title_jp, language)}
            </h2>
          </Link>

          <h3 className="text-[#DB4444] font-[500] text-base leading-[19px] my-2 font-font-albert-sans">
            {finalPrice}
          </h3>

          <div className="my-1">
            {/* Dynamic Rating */}
            {renderStars(avgRating, reviewCount)}
          </div>

          {/* Add to Cart */}
          <div className="mt-1 w-full z-10 max-sm:mt-1">
            {
              hasPrices && product.variants.length === 1 ? (
                <button
                  onClick={handleAddToCart}
                  disabled={addToCartLoading}
                  className={`capitalize 
              bg-primary hover:bg-primary/80 cursor-pointer
              rounded-xl text-base leading-[19px] font-[500] min-h-[40px] w-full text-[#FFFAFA] center`}
                >
                  {addToCartLoading ? 'Adding...' : buttonText}
                </button>) : (
                <Link
                  className={`capitalize 
              bg-primary hover:bg-primary/80 cursor-pointer
              rounded-xl text-base leading-[19px] font-[500] min-h-[40px] w-full text-[#FFFAFA] center`}
                  href={productInnerLink}
                >
                  Select Options
                </Link>
              )
            }
          </div>
        </div>
      </div>

      {/*Login Required Modal */}
      <LoginAlertModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default ProductCard;
