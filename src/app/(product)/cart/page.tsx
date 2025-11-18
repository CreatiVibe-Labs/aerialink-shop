'use client';

import BreadCrumbs from "@/components/common/bread-crumbs";
import CartSummary from "./_components/cart-summary";
import CartTable from "./_components/cart-table";
import MobileCartCard from "./_components/mobile-cart-card";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { useProducts } from "@/contexts/product-context";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { CartItem } from "@/contexts/cart-context";

interface EnrichedCartItem extends CartItem {

  productData?: any;
  images?: Array<{url: string}>;
  title_en?: string;
  title_jp?: string;
}

const CartPage = () => {
  const { 
    cartItems, 
    updateQuantity, 
    updateQuantityByIndex,
    updateSize, 
    updateSizeByIndex,
    updateRoomType, 
    updateRoomTypeByIndex,
    updatePriceByIndex,
    removeFromCart,
    removeFromCartByIndex,
    getTotal 
  } = useCart();
  const { language } = useLanguage();
  const [enrichedCartItems, setEnrichedCartItems] = useState<EnrichedCartItem[]>([]);
  const [loading, setLoading] = useState(false);


  // Fetch product details for cart items
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartItems.length === 0) return;
      
      setLoading(true);
      try {
        const enrichedItems = await Promise.all(
          cartItems.map(async (cartItem) => {
            try {
              const res = await api.get(
                `${process.env.NEXT_PUBLIC_API_URL}/products?slug=${cartItem.slug}`
              );
              
              if (res.status === 200) {
                const product = res.data.data.product;
                return {
                  ...cartItem,
                  productData: product,
                  images: product?.images || [],
                  title_en: product?.title_en ,
                  title_jp: product?.title_jp,
                };
              }
              return cartItem;
            } catch (error) {
              console.error(`Failed to fetch product ${cartItem.id}:`, error);
              return cartItem;
            }
          })
        );
        
        setEnrichedCartItems(enrichedItems);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setEnrichedCartItems(cartItems);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        <BreadCrumbs />
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (index: number, action: "inc" | "dec") => {
    const currentItem = cartItems[index];
    if (currentItem) {
      const newQty = action === "inc" ? currentItem.quantity + 1 : currentItem.quantity - 1;
      updateQuantityByIndex(index, newQty);
    }
  };

  const handleSizeChange = (index: number, val: string) => {
    updateSizeByIndex(index, val);
  };

  const handleRoomTypeChange = (index: number, val: string) => {
    updateRoomTypeByIndex(index, val);
  };

  const subtotal = getTotal();

  return (
    <div className="w-full py-5">
      <BreadCrumbs />

      {/* Desktop Table */}
      <CartTable
        cartItems={loading ? cartItems : enrichedCartItems}
        handleRemove={removeFromCartByIndex}
        handleQuantityChange={handleQuantityChange}
        handleSizeChange={handleSizeChange}
        handleRoomTypeChange={handleRoomTypeChange}
        updatePriceByIndex={updatePriceByIndex}
        updateQuantityByIndex={updateQuantityByIndex}
        loading={loading}
      />

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-3 overflow-hidden">
        {(loading ? cartItems : enrichedCartItems).map((item, index) => {
          const displayItem = loading ? item : (item as EnrichedCartItem);
          return (
          <MobileCartCard
            key={`${displayItem.id}-${displayItem.size}-${displayItem.room_type}`}
            id={displayItem.id}
            image={loading ? "/fallback-image.png" : (displayItem as EnrichedCartItem).images?.[0]?.url || "/fallback-image.png"}
            name={loading ? "Loading..." : language === "EN" ? ((displayItem as EnrichedCartItem).title_en || (displayItem as EnrichedCartItem).title_jp || "Product Name") : ((displayItem as EnrichedCartItem).title_jp || (displayItem as EnrichedCartItem).title_en || "Product Name")}
            price={displayItem.price}
            quantity={displayItem.quantity}
            size={displayItem.size}
            roomType={displayItem.room_type}
            index={index}
            onRemove={removeFromCartByIndex}
            onQuantityChange={handleQuantityChange}
            onSizeChange={handleSizeChange}
            onRoomTypeChange={handleRoomTypeChange}
          />
        )})}
      </div>

      {/* Summary */}
      <CartSummary 
        subtotal={subtotal}
        onUpdateCart={() => {}} // Optional
        onCheckout={() => console.log("Proceed to checkout")}
      />
    </div>
  );
};

export default CartPage;