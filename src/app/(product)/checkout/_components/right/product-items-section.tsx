import React, { useEffect, useState } from "react";

import CheckoutItemCard from "./checkout-item-card";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import api from "@/lib/api";
import { CartItem } from "@/contexts/cart-context";

interface EnrichedCartItem extends CartItem {
  productData?: any;
  images?: Array<{url: string}>;
  title_en?: string;
  title_jp?: string;
}

const ProductItemsSection = () => {
  const { cartItems } = useCart();
  const { language } = useLanguage();
  const [enrichedCartItems, setEnrichedCartItems] = useState<EnrichedCartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch product details for cart items using slug or id
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartItems.length === 0) return;
      
      setLoading(true);
      try {
        const enrichedItems = await Promise.all(
          cartItems.map(async (cartItem) => {
            try {
              // Use slug if available, otherwise use id
              const endpoint = cartItem.slug 
                ? `${process.env.NEXT_PUBLIC_API_URL}/products?slug=${cartItem.slug}`
                : `${process.env.NEXT_PUBLIC_API_URL}/products?id=${cartItem.id}`;
              
              const res = await api.get(endpoint);
              
              if (res.status === 200) {
                const product = cartItem.slug ? res.data.data : res.data.data.product;
                return {
                  ...cartItem,
                  productData: product?.product,
                  images: product?.product?.images || [],
                  title_en: product?.product?.title_en,
                  title_jp: product?.product?.title_jp || product?.product?.title_en || 'Product Name'
                };
              }
              return cartItem;
            } catch (error) {
              console.error(`Failed to fetch product ${cartItem.id}:`, error);
              return {
                ...cartItem,
                images: [],
                translations: {
                  en: { name: 'Product Name' },
                  jp: { name: 'Product Name' }
                }
              };
            }
          })
        );
        
        setEnrichedCartItems(enrichedItems);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setEnrichedCartItems(cartItems.map(item => ({
          ...item,
          images: [],
          translations: {
            en: { name: 'Product Name' },
            jp: { name: 'Product Name' }
          }
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [cartItems]);

  return (
    <div className="pb-4 max-md:mt-3">
      {/* Mobile Heading */}
      <div className="md:hidden bg-primary rounded-xl py-2 px-3 text-sm text-white font-medium">
        <h2>Total Items</h2>
      </div>

      <div className="max-md:mt-3 space-y-2 px-1">
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="text-[#AFB1AE]">Loading product details...</div>
          </div>
        )}
        
        {cartItems.length > 0 ? (
          (loading ? cartItems : enrichedCartItems).map((item, index) => {
            const displayItem = loading ? item : (item as EnrichedCartItem);
            const enrichedItem = displayItem as EnrichedCartItem;
            const productTitle = loading 
              ? "Loading..."
              : language === "EN"
                ? enrichedItem.title_en || enrichedItem.title_jp || "Product Name"
                : enrichedItem.title_jp || enrichedItem.title_en || "Product Name";
                
            const productImage = loading 
              ? "/fallback-image.png"
              : enrichedItem.images?.[0]?.url || "/fallback-image.png";
              
            return (
              <CheckoutItemCard
                key={loading ? item.id : `${displayItem.id}-${displayItem.size}-${displayItem.room_type}`}
                id={displayItem.id}
                title={productTitle}
                price={Number(item.price) * item.quantity}
                image={productImage}
                quantity={item.quantity}
                size={displayItem.size}
                roomType={displayItem.room_type}
              />
            );
          })
        ) : (
          <p className="text-center text-[#AFB1AE] py-4">No items in cart</p>
        )}
      </div>
    </div>
  );
};

export default ProductItemsSection;
