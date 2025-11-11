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
import toast, { Toaster } from "react-hot-toast";

type Size = {
  size_name: string;
  size_value: string;
  size_value_jp?: string;
};

type Variant = {
  id: number;
  sku: string;
  price: string;
  stock: number;
  sizes: {
    Edoma: Size[];
    Danchima: Size[];
  };
};

type Props = {
  variants?: Variant[];
  onSizeSelect?: (category: string, size: string) => void;
};

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

const ProductExploreRightSection: React.FC<Props> = ({ variants, onSizeSelect }) => {
  const { state } = useProducts();
  const { language } = useLanguage();
  const { cartItems, addToCart, updateQuantity, updateSize, isInCart } = useCart();
  const { isInWishlist, toggleWishlist, loading } = useWishlist(); // ✅ moved up

  const { product, productLoading } = state;

  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [buttonText, setButtonText] = useState(!category || !selectedSize ? "Select Category & Size" : "Add to Cart");

  // Use product variants instead of props variants (for now, since props variants might be empty)
  const actualVariants = product?.variants || variants || [];

  const prices = actualVariants?.map(v => parseFloat(v.price)) || [];

  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const [priceToShow, setPriceToShow] = useState<string>("");
  const [finalPriceForCart, setFinalPriceForCart] = useState<string>("0");

  useEffect(() => {
    if (minPrice === maxPrice) {
      setPriceToShow(`¥${minPrice.toFixed(2)}`);
      setFinalPriceForCart(minPrice.toFixed(2));
    } else {
      setPriceToShow(`¥${minPrice.toFixed(2)} - ¥${maxPrice.toFixed(2)}`);
      setFinalPriceForCart(maxPrice.toFixed(2));
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (!category) {
      setSizes([]);
      setSelectedSize("");
      setButtonText("Select Category & Size");
      return;
    }

    // Extract sizes from variant attributes based on category
    const availableSizes: Size[] = [];

    actualVariants.forEach((variant) => {
      // Check if this is a ProductVariant (has attributes) vs Variant (has sizes)
      if ('attributes' in variant && variant.attributes) {
        // Find category attribute (could be "category", "type", etc.)
        const categoryAttr = variant.attributes.find((attr: any) =>
          attr.attribute_name.toLowerCase().includes('category') ||
          attr.attribute_name.toLowerCase().includes('type')
        );

        // Find size attribute
        const sizeAttr = variant.attributes.find((attr: any) =>
          attr.attribute_name.toLowerCase().includes('size')
        );

        // If this variant matches the selected category and has size
        if (categoryAttr?.attribute_value === category && sizeAttr) {
          const sizeObj: Size = {
            size_name: sizeAttr.attribute_value,
            size_value: sizeAttr.attribute_value,
            size_value_jp: sizeAttr.attribute_value // fallback
          };

          // Avoid duplicates
          if (!availableSizes.find(s => s.size_value === sizeObj.size_value)) {
            availableSizes.push(sizeObj);
          }
        }
      } else if ('sizes' in variant && variant.sizes) {
        // This is the custom Variant type with sizes property
        const categorySizes = variant.sizes[category as keyof typeof variant.sizes];
        if (categorySizes) {
          categorySizes.forEach(size => {
            if (!availableSizes.find(s => s.size_value === size.size_value)) {
              availableSizes.push(size);
            }
          });
        }
      }
    });

    setSizes(availableSizes);
    const firstSize = availableSizes[0]?.size_value || "";
    setSelectedSize(firstSize);

    if (firstSize) {
      setButtonText("Add to Cart");
    }

    // Notify parent
    if (firstSize && onSizeSelect) {
      onSizeSelect(category, firstSize);
    }
  }, [category, product?.variants]); // Use stable reference

  // Separate useEffect for price updates to avoid infinite loops
  useEffect(() => {
    if (!category || !selectedSize) return;

    const selectedVariant = actualVariants.find((variant) => {
      if ('attributes' in variant && variant.attributes) {
        const categoryAttr = variant.attributes.find((attr: any) =>
          attr.attribute_name.toLowerCase().includes('category') ||
          attr.attribute_name.toLowerCase().includes('type')
        );
        const sizeAttr = variant.attributes.find((attr: any) =>
          attr.attribute_name.toLowerCase().includes('size')
        );

        return categoryAttr?.attribute_value === category && sizeAttr?.attribute_value === selectedSize;
      } else if ('sizes' in variant && variant.sizes) {
        const categorySizes = variant.sizes[category as keyof typeof variant.sizes];
        return categorySizes?.some(size => size.size_value === selectedSize);
      }
      return false;
    });

    if (selectedVariant) {
      const variantPrice = parseFloat(selectedVariant.price);
      setPriceToShow(`¥${variantPrice.toFixed(2)}`);
      setFinalPriceForCart(variantPrice.toFixed(2));
    }
  }, [category, selectedSize, product?.variants]);

  // Early returns AFTER all hooks are declared ✅
  if (productLoading) return <ProductRightSkeleton />;
  if (!product) return null;

  const handleAddToCart = () => {
    setAddToCartLoading(true);

    setTimeout(() => {
      addToCart(product.id, quantity, selectedSize, finalPriceForCart, category, product.slug);
      toast.success("Product added to cart");
      setButtonText("Added");

      setTimeout(() => setButtonText("Add to Cart"), 1000);
      setAddToCartLoading(false);
    }, 500);
  };

  const increaseQty = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
  };

  const decreaseQty = () => {
    const newQty = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQty);
  };

  const adjustQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  }

  const handleSizeChange = (val: string) => {
    setSelectedSize(val);
    // Price update will be handled by useEffect automatically
    if (onSizeSelect && category) onSizeSelect(category, val);
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
      <Toaster position="top-right" />
      <h2 className="text-2xl font-semibold text-min-gray">
        {language === "EN" ? product.title_en : product.title_jp}
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

      <p className="text-3xl font-bold text-min-gray">{priceToShow}</p>

      <div className="flex flex-col max-md:flex-col-reverse">

        <div className="space-y-3 w-full mt-2 flex gap-2">
          {/* Category Dropdown */}
          <div className="flex flex-col gap-1 w-[50%]">
            <label className="text-sm font-medium text-min-gray">Room Type:</label>
            <Dropdown
              mainParentClass="max-w-full!"
              className="bg-transparent border border-light-gray text-min-gray! max-md:py-1.5 text-sm px-5 rounded-xl min-w-[150px]"
              DropDownclassName="bg-white text-min-gray!"
              hideLabelOnMobile={false}
              label={category || "Select Category"}
              list={[
                { key: "Edoma", val: "Edoma" },
                { key: "Danchima", val: "Danchima" },
              ]}
              onChange={(val) => setCategory(val as "Edoma" | "Danchima")}
            />
          </div>

          {/* Sizes Dropdown - Only show if category is selected */}
          {category && (
            <div className="flex flex-col gap-1 w-[50%]">
              <label className="text-sm font-medium text-min-gray">Size:</label>
              <Dropdown
                mainParentClass="max-w-full!"
                className="bg-transparent border border-light-gray text-min-gray! max-md:py-1.5 text-sm px-5 rounded-xl min-w-[150px]"
                DropDownclassName="bg-white text-min-gray!"
                hideLabelOnMobile={false}
                label={selectedSize || "Select Size"}
                list={sizes.map((s) => ({
                  key: s.size_value,
                  val: language === "EN" ? s.size_name : (s.size_value_jp || s.size_name)
                }))}
                onChange={handleSizeChange}

              />
              {sizes.length === 0 && (
                <p className="text-xs text-gray-500">No sizes available for {category}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mt-2 max-md:flex-wrap">
          <div className="border border-light-gray rounded-xl flex items-center overflow-hidden">
            <button
              onClick={decreaseQty}
              className="px-3 py-1 border-r border-light-gray cursor-pointer hover:bg-gray-50"
            >
              −
            </button>
            <input type="text" value={quantity} onChange={adjustQuantity} className="outline-0 font-medium min-w-12 text-center text-min-gray max-w-12" />
            <button
              onClick={increaseQty}
              className="px-3 py-1 border-l bg-primary text-white cursor-pointer hover:bg-primary/90"
            >
              +
            </button>
          </div>
          {/* Show selected info */}
          {category && selectedSize && (
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              Selected: <span className="font-medium">{category}</span> - <span className="font-medium">{selectedSize}</span>
            </div>
          )}
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
            disabled={!category && !selectedSize}
          >
            {addToCartLoading ? 'Adding...' : buttonText}
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
