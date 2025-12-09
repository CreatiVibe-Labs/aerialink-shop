"use client";
import React, { useState } from "react";
import PrimaryButton from "@/components/common/primary-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiSpinnerGapBold } from "react-icons/pi";

interface CartSummaryProps {
  subtotal: number;
  onUpdateCart?: () => void;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  onUpdateCart,
  onCheckout,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    if (loading) return;
    setLoading(true);
    onCheckout && onCheckout();
    // Small timeout gives user visual feedback before navigation
    setTimeout(() => {
      router.push('/checkout');
    }, 150);
  };
  return (
    <div className="flex flex-col items-end mt-3 gap-6 w-full">
      {/* Update Cart Button - Hidden on Mobile */}
      {/* <PrimaryButton
        onClick={onUpdateCart}
        className="max-sm:hidden max-w-fit px-4 min-h-12 border-2 border-primary bg-transparent text-primary!"
      >
        Update Cart
      </PrimaryButton> */}


      {/* Cart Total Box */}
      <div className="w-full md:w-[20rem] border-2 border-gray-300 rounded-3xl p-3 shadow-sm">
        <h3 className="text-center text-[#AFB1AE] font-medium mb-4">
          Cart Total
        </h3>

        <div className="flex justify-between text-sm text-[#AFB1AE] mb-3 font-medium">
          <span>Subtotal:</span>
          <span>¥{Number(subtotal).toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm border-t font-medium border-gray-300 pt-3 text-[#AFB1AE] mb-2">
          <span>Shipping:</span>
          <span>Calculate on checkout</span>
        </div>

        <div className="flex justify-between text-sm font-semibold text-[#AFB1AE] mt-3 border-t border-gray-300 pt-2">
          <span>Total:</span>
          <span>¥{Number(subtotal).toLocaleString()}</span>
        </div>

        <div className="flex justify-center items-center mt-3">
          <PrimaryButton
            className="max-md:min-h-10 max-md:max-w-fit px-3 text-sm flex items-center gap-2"
            disabled={loading}
            onClick={handleCheckout}
          >
            {loading && <PiSpinnerGapBold className="animate-spin size-5" />}
            {loading ? 'Processing...' : 'Proceed to checkout'}
          </PrimaryButton>
        </div>

        {/* Info text moved to page level under product list */}
      </div>
    </div>
  );
};

export default CartSummary;
