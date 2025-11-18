import PrimaryButton from "@/components/common/primary-button";
import { useCart } from "@/contexts/cart-context";
import React from "react";
import Cookies from "js-cookie";
import { useShippingState } from "@/hooks/use-shipping-state";
import { useConsumerTax } from "@/hooks/use-consumer-tax";

const TotalSection = () => {
  const { getTotal } = useCart();
  const subtotal = getTotal();
  const { postalCode, shippingRate } = useShippingState();
  const { consumerTax, loading: taxLoading, error: taxError } = useConsumerTax();

  let shippingDisplay = '';
  let hasShippingError = false;

  // Determine shipping display and error state
  if (!postalCode) {
    shippingDisplay = 'Enter postal code to calculate shipping';
    hasShippingError = true;
  } else if (shippingRate === null) {
    shippingDisplay = 'No shipping available';
    hasShippingError = true;
  } else if (shippingRate === 0) {
    shippingDisplay = 'Free';
  } else {
    shippingDisplay = `¥${Number(shippingRate).toLocaleString()}`;
  }

  // Consumer tax display
  const consumerTaxDisplay = taxLoading
    ? 'Loading...'
    : taxError
      ? 'Error'
      : consumerTax === 0 || consumerTax === null
        ? 'Free'
        : `${consumerTax.toFixed(2)}%`;

  // Ensure valid numbers
  const validShippingRate = shippingRate && shippingRate > 0 ? Number(shippingRate) : 0;
  const consumerTaxPercent = consumerTax && consumerTax > 0 ? Number(consumerTax) : 0;

  // Calculate consumer tax on (subtotal + shipping)
  const validConsumerTax = ((subtotal + validShippingRate) * consumerTaxPercent) / 100;

  // Calculate total
  const total = subtotal + validShippingRate + validConsumerTax;

  return (
    <div className="w-full mt-5 max-md:border max-md:border-min-gray max-md:px-4 max-md:py-5 max-md:rounded-xl max-md:mt-3">
      <div className="flex justify-between text-sm text-min-gray mb-4 max-md:mb-3 font-medium">
        <span>Subtotal:</span>
        <span>¥{Number(subtotal).toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-sm border-t font-medium border-min-gray pt-4 max-md:pt-3 text-min-gray mb-2">
        <span>Shipping:</span>
        <span>{shippingDisplay}</span>
      </div>

      <div className="flex justify-between text-sm border-t font-medium border-min-gray pt-4 max-md:pt-3 text-min-gray mb-2">
        <span>Consumer Tax:</span>
        <span>{consumerTaxDisplay}</span>
      </div>


      <div className="flex justify-between text-sm font-semibold text-min-gray mt-3 border-t border-min-gray pt-2">
        <span>Total:</span>
        <span>¥{Number(total).toLocaleString()}</span>
      </div>

      {/* Mobile Place Order Button */}
      {/* <PrimaryButton className="mt-3 min-h-9 md:hidden w-full">
        Place Order
      </PrimaryButton> */}
    </div>
  );
};

export default TotalSection;
