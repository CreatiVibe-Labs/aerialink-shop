import PrimaryButton from "@/components/common/primary-button";
import { useCart } from "@/contexts/cart-context";
import React from "react";

const TotalSection = () => {
  const { getTotal } = useCart();
  const subtotal = getTotal();

  return (
    <div className="w-full mt-5 max-md:border max-md:border-min-gray max-md:px-4 max-md:py-5 max-md:rounded-xl max-md:mt-3">
      <div className="flex justify-between text-sm text-min-gray mb-4 max-md:mb-3 font-medium">
        <span>Subtotal:</span>
        <span>${subtotal}</span>
      </div>

      <div className="flex justify-between text-sm border-t font-medium border-min-gray pt-4 max-md:pt-3 text-min-gray mb-2">
        <span>Consumer Tax:</span>
        <span>Free</span>
      </div>
      <div className="flex justify-between text-sm border-t font-medium border-min-gray pt-4 max-md:pt-3 text-min-gray mb-2">
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div className="flex justify-between text-sm border-t font-medium border-min-gray pt-4 max-md:pt-3 text-min-gray mb-2">
        <span>Delivery Fees:</span>
        <span>Free</span>
      </div>

      <div className="flex justify-between text-sm font-semibold text-min-gray mt-3 border-t border-min-gray pt-2">
        <span>Total:</span>
        <span>${subtotal}</span>
      </div>

      {/* Mobile Place Order Button */}
      {/* <PrimaryButton className="mt-3 min-h-9 md:hidden w-full">
        Place Order
      </PrimaryButton> */}
    </div>
  );
};

export default TotalSection;
