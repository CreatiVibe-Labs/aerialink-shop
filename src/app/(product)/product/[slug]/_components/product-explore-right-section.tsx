"use client";
import Dropdown from "@/components/common/dropdown";
import PrimaryButton from "@/components/common/primary-button";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { useProducts } from "@/contexts/product-context";
import { useWishlist } from "@/contexts/wishlist-context";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PiSpinnerGapBold, PiStarFill, PiStarHalfFill } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { toast } from "react-toastify";

// Skeleton Component
const ProductRightSkeleton = () => (
  <div className="flex flex-col gap-4 animate-pulse">
    <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
        ))}
      </div>
      <div className="h-4 w-20 bg-gray-200 rounded"></div>
    </div>
    <div className="h-10 w-32 bg-gray-200 rounded"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="flex gap-3 mt-4">
      <div className="h-12 w-32 bg-gray-200 rounded-xl"></div>
      <div className="h-12 w-32 bg-gray-200 rounded-xl"></div>
    </div>
    <div className="h-12 bg-gray-200 rounded-xl"></div>
    <div className="space-y-3 mt-4">
      <div className="flex gap-3 p-3 border-b">
        <div className="w-7 h-7 bg-gray-200 rounded"></div>
        <div className="flex-1 space-y-1">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-40"></div>
        </div>
      </div>
      <div className="flex gap-3 p-3">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="flex-1 space-y-1">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  </div>
);

const ProductExploreRightSection = () => {
  const { state } = useProducts();
  const { language } = useLanguage();
  const { cartItems, addToCart, updateQuantity, updateSize, isInCart } = useCart();
  const { isInWishlist, toggleWishlist, loading } = useWishlist(); // ✅ moved up

  const { product, productLoading } = state;

  // Prepare data safely before conditional returns
  const cartItem = product ? cartItems.find((item) => item.id === product.id) : null;
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);
  const [selectedSize, setSelectedSize] = useState(cartItem?.size || "small");

  const productFinal = {
    productDetails:
      language === "EN" ? product?.translations.en : product?.translations.jp,
  };

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setSelectedSize(cartItem.size);
    } else {
      setQuantity(1);
      setSelectedSize("small");
    }
  }, [cartItem]);

  // Early returns AFTER all hooks are declared ✅
  if (productLoading) return <ProductRightSkeleton />;
  if (!product) return null;

  const handleAddToCart = () => {
    const itemToAdd = { ...product, quantity, size: selectedSize };
    if (isInCart(product.id)) {
      updateQuantity(product.id, quantity);
      updateSize(product.id, selectedSize);
    } else {
      addToCart(itemToAdd);
    }
    toast.success("Cart updated!");
  };

  const increaseQty = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    if (isInCart(product.id)) updateQuantity(product.id, newQty);
  };

  const decreaseQty = () => {
    const newQty = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQty);
    if (isInCart(product.id)) updateQuantity(product.id, newQty);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    if (isInCart(product.id)) updateSize(product.id, size);
  };

  // Helper function to render stars (full, half, empty)
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <PiStarFill key={`full-${i}`} className="text-amber-400" size={16} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <PiStarHalfFill className="text-gray-300" size={16} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <PiStarHalfFill className="text-amber-400" size={16} />
          </div>
        </div>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <PiStarFill key={`empty-${i}`} className="text-gray-300" size={16} />
      );
    }

    return stars;
  };

  const inWishlist = isInWishlist(product.id);

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleWishlist(product.id);
  };

  return (
    <div className="flex flex-col gap-2 max-md:mt-2 h-full">
      <h2 className="text-2xl font-semibold text-min-gray">
        {productFinal.productDetails?.name}
      </h2>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            {renderStars(product.average_rating)}
            <span className="text-light-gray text-sm font-medium pl-1">
              ({product.reviews?.length || 0} Reviews)
            </span>
          </div>
        </div>
      </div>

      <p className="text-3xl font-bold text-min-gray">${product.price}</p>

      <p
        className="text-gray-600 text-sm leading-relaxed border-b border-light-gray pb-2 max-md:border-b-0"
        dangerouslySetInnerHTML={{
          __html:
            productFinal.productDetails?.short_description ||
            "No short description available.",
        }}
      />

      <div className="flex flex-col max-md:flex-col-reverse">
        <div className="flex items-center gap-3 mt-2 max-md:flex-wrap">
          <div className="border border-light-gray rounded-xl flex items-center overflow-hidden">
            <button
              onClick={decreaseQty}
              className="px-3 py-1 border-r border-light-gray cursor-pointer hover:bg-gray-50"
            >
              −
            </button>
            <span className="font-medium min-w-12 text-center text-min-gray">
              {quantity}
            </span>
            <button
              onClick={increaseQty}
              className="px-3 py-1 border-l bg-primary text-white cursor-pointer hover:bg-primary/90"
            >
              +
            </button>
          </div>

          <Dropdown
            mainParentClass="max-w-full!"
            className="bg-transparent border border-light-gray text-min-gray! max-md:py-1.5 text-sm px-5 rounded-xl"
            DropDownclassName="bg-white text-min-gray!"
            hideLabelOnMobile={false}
            label={selectedSize ?? "Size"}
            list={[
              { key: "small", val: "Small" },
              { key: "medium", val: "Medium" },
              { key: "large", val: "Large" },
            ]}
            onChange={handleSizeChange}
          />
        </div>

        <div className="flex items-center mt-2 space-x-2">
          <button
            onClick={handleHeartClick}
            className="border border-light-gray rounded-xl p-2 h-full cursor-pointer hover:bg-gray-50"
          >
            {!loading ? (
              inWishlist ? (
                <GoHeartFill
                  size={24}
                  className="hover:bg-red-100 rounded-full text-red-500"
                />
              ) : (
                <GoHeart size={24} className="hover:bg-gray-200 rounded-full " />
              )
            ) : (
              <PiSpinnerGapBold className="animate-spin w-5 h-5 " />
            )}
          </button>

          <PrimaryButton
            className="min-h-11 flex-1"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isInCart(product.id)}
          >
            {isInCart(product.id)
              ? "Added"
              : product.stock === 0
              ? "Out of Stock"
              : "Add To Cart"}
          </PrimaryButton>
        </div>
      </div>

      <div className="mt-2 p-3 text-white text-center bg-[#CCCCFF] rounded-md">
        Visit the 360° virtual showroom to see how it fits your room. It’s fun!
      </div>

      <div className="border border-light-gray rounded-xl mt-2 space-y-3 text-sm text-min-gray">
        <div className="flex items-center gap-3 my-3 border-b p-3 pb-4">
          <TbTruckDelivery className="size-7" strokeWidth={1} />
          <p className="flex flex-col">
            <strong>Free Delivery</strong>
            <Link href="/" className="underline text-sm">
              Enter postal code for availability.
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 my-3 pt-4">
          <TfiReload className="size-6" strokeWidth={0} />
          <p className="flex flex-col">
            <strong>Return Delivery</strong>
            <Link href="/" className="text-sm">
              Free 30 days returns.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductExploreRightSection;
