"use client";
import React from "react";
import PrimaryButton from "@/components/common/primary-button";
import Link from "next/link";

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
  return (
    <div className="flex flex-col items-end mt-3 gap-6 w-full">
      {/* Update Cart Button - Hidden on Mobile */}
      {/* <PrimaryButton
        onClick={onUpdateCart}
        className="max-sm:hidden max-w-fit px-4 min-h-12 border-2 border-primary bg-transparent text-primary!"
      >
        Update Cart
      </PrimaryButton> */}

      {/* Mobile Text */}
      <p className="text-sm text-red-500 md:hidden">
        Don’t worry you will be able to review your order before payment
      </p>

      {/* Cart Total Box */}
      <div className="w-full md:w-[20rem] border border-light-gray rounded-xl p-3 shadow-sm">
        <h3 className="text-center text-min-gray font-medium mb-4">
          Cart Total
        </h3>

        <div className="flex justify-between text-sm text-min-gray mb-3 font-medium">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </div>

        <div className="flex justify-between text-sm border-t font-medium border-light-gray pt-3 text-min-gray mb-2">
          <span>Shipping:</span>
          <span>Calculate on checkout</span>
        </div>

        <div className="flex justify-between text-sm font-semibold text-min-gray mt-3 border-t border-light-gray pt-2">
          <span>Total:</span>
          <span>${subtotal}</span>
        </div>

        <div className="flex justify-center items-center mt-3">
          <PrimaryButton
            className="max-md:min-h-10 max-md:max-w-fit px-3 text-sm"
          >
            <Link href="/checkout">
              Proceed to checkout
            </Link>
          </PrimaryButton>
        </div>

        <p className="text-sm text-red-500 max-md:hidden mt-3">
          Don’t worry you will be able to review your order before payment
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
