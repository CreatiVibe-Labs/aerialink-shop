"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CartItem } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import api from "@/lib/api";

interface EnrichedCartItem extends CartItem {
  productData?: any;
  images?: Array<{url: string}>;
  title_en?: string;
  title_jp?: string;
}

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  shippingDetails: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
  };
  cartItems: CartItem[];
  subtotal: number;
  shippingRate: number;
  consumerTax: number;
  total: number;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  shippingDetails,
  cartItems,
  subtotal,
  shippingRate,
  consumerTax,
  total,
}) => {
  const { language } = useLanguage();
  const [enrichedCartItems, setEnrichedCartItems] = useState<EnrichedCartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const taxAmount = (subtotal + shippingRate) * (consumerTax / 100);

  // Fetch product details for cart items
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cartItems.length === 0 || !isOpen) return;
      
      setLoading(true);
      try {
        const enrichedItems = await Promise.all(
          cartItems.map(async (cartItem) => {
            try {
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
                  title_jp: product?.product?.title_jp || product?.product?.title_en
                };
              }
              return { ...cartItem, title_en: 'Product Name', images: [] };
            } catch (error) {
              console.error(`Failed to fetch product ${cartItem.id}:`, error);
              return { ...cartItem, title_en: 'Product Name', images: [] };
            }
          })
        );
        
        setEnrichedCartItems(enrichedItems);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setEnrichedCartItems(cartItems.map(item => ({ ...item, title_en: 'Product Name', images: [] })));
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProductDetails();
    }
  }, [cartItems, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="rounded-2xl
   w-[95vw]         
    max-w-[95vw]      
    sm:max-w-md     
    md:max-w-3xl     
    lg:max-w-4xl      
    xl:max-w-4xl     
    2xl:max-w-4xl  
        overflow-y-auto
        max-h-[90vh]
        p-4
        sm:p-6
  "
      >
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center gap-2">
            <h3 className="text-[16px] leading-[20px] font-albert-sans tracking-[4%] lg:text-[36px] lg:leading-[40px] font-[500] text-[#AFB1AE]">
              Confirm Your Order
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full cursor-pointer"
            >
              <Image
                src="/assets/account/icon-cancel.png"
                alt="close"
                width={64}
                height={64}
                className="w-[19px] h-[19px] lg:w-[64px] lg:h-[64px]"
              />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-[15px] lg:gap-[30px] w-full">
          {/* Shipping Details Section */}
          <div className="bg-[#F5F5F5] rounded-[14px] p-3 lg:p-6">
            <h4 className="text-[14px] lg:text-[24px] font-semibold text-[#AFB1AE] mb-2 lg:mb-4">
              Shipping Details
            </h4>
            <div className="space-y-1.5 lg:space-y-2 text-[12px] lg:text-[17px] text-[#AFB1AE]">
              <div className="flex gap-2 flex-wrap">
                <span className="font-medium min-w-[80px] lg:min-w-[120px]">Name:</span>
                <span className="break-words flex-1">{shippingDetails.fullName}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="font-medium min-w-[80px] lg:min-w-[120px]">Email:</span>
                <span className="break-words flex-1 text-xs lg:text-[17px]">{shippingDetails.email}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="font-medium min-w-[80px] lg:min-w-[120px]">Phone:</span>
                <span className="break-words flex-1">{shippingDetails.phone}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="font-medium min-w-[80px] lg:min-w-[120px]">Address:</span>
                <span className="break-words flex-1">{shippingDetails.address}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="font-medium min-w-[80px] lg:min-w-[120px]">Postal Code:</span>
                <span className="break-words flex-1">{shippingDetails.postalCode}</span>
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="bg-[#F5F5F5] rounded-[14px] p-3 lg:p-6">
            <h4 className="text-[14px] lg:text-[24px] font-semibold text-[#AFB1AE] mb-2 lg:mb-4">
              Order Items
            </h4>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-[#AFB1AE] text-sm lg:text-base">Loading product details...</div>
              </div>
            ) : (
              <div className="space-y-3">
                {enrichedCartItems.map((item, index) => {
                  const productImage = item.images && item.images.length > 0 
                    ? item.images[0].url 
                    : '/placeholder-product.png';
                  
                  return (
                    <div
                      key={index}
                      className="flex gap-2 lg:gap-4 items-start text-[12px] lg:text-[17px] text-[#AFB1AE] pb-2 lg:pb-3 border-b border-gray-300 last:border-0"
                    >
                      {/* Product Image */}
                      <div className="relative w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] flex-shrink-0 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={productImage}
                          alt={(language === "EN" ? item.title_en || item.title_jp : item.title_jp || item.title_en) || 'Product'}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#AFB1AE] text-xs lg:text-base line-clamp-2">
                          {(language === "EN" ? item.title_en || item.title_jp : item.title_jp || item.title_en) || `Product #${item.id}`}
                        </p>
                        <p className="text-[10px] lg:text-sm text-[#AFB1AE] mt-0.5 lg:mt-1">
                          Size: {item.size} | Room: {item.room_type}
                        </p>
                        <p className="text-[10px] lg:text-sm text-[#AFB1AE] mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-[#AFB1AE] text-xs lg:text-base">
                          ¥{Number(item.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="bg-[#F5F5F5] rounded-[14px] p-3 lg:p-6">
            <h4 className="text-[14px] lg:text-[24px] font-semibold text-[#AFB1AE] mb-2 lg:mb-4">
              Order Summary
            </h4>
            <div className="space-y-1.5 lg:space-y-2 text-[12px] lg:text-[17px] text-[#AFB1AE]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>¥{Number(subtotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>¥{Number(shippingRate).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({consumerTax}%):</span>
                <span>¥{Number(taxAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-[14px] lg:text-[20px] pt-1.5 lg:pt-2 border-t-2 border-gray-400 mt-1.5 lg:mt-2">
                <span>Total:</span>
                <span>¥{Number(total).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 lg:gap-5 pt-2">
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-[#AFB1AE] w-full sm:w-[200px] lg:w-[300px] 
                h-[38px] lg:h-[53px] px-4 lg:px-8 py-2 rounded-[14px]
                text-[13px] uppercase lg:text-[20px] cursor-pointer transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-[#98C1A9] hover:bg-[#82ab94] text-white w-full sm:w-[200px] lg:w-[300px] 
                h-[38px] lg:h-[53px] px-4 lg:px-8 py-2 rounded-[14px]
                text-[13px] uppercase lg:text-[20px] cursor-pointer transition"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationModal;
