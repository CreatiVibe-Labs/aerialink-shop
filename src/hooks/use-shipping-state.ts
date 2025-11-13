import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useShippingState = () => {
  const [shippingState, setShippingState] = useState(() => {
    const checkoutShipping = Cookies.get("checkout_shipping");
    if (checkoutShipping) {
      const parsed = JSON.parse(checkoutShipping);
      return {
        postalCode: parsed.postalCode || '',
        shippingRate: parsed.shippingRate !== undefined ? Number(parsed.shippingRate) : null,
      };
    }
    return {
      postalCode: '',
      shippingRate: null,
    };
  });

  useEffect(() => {
    const checkCookie = () => {
      const checkoutShipping = Cookies.get("checkout_shipping");
      if (checkoutShipping) {
        const parsed = JSON.parse(checkoutShipping);
        const newState = {
          postalCode: parsed.postalCode || '',
          shippingRate: parsed.shippingRate !== undefined ? Number(parsed.shippingRate) : null,
        };

        // Only update if state actually changed
        if (newState.postalCode !== shippingState.postalCode ||
            newState.shippingRate !== shippingState.shippingRate) {
          setShippingState(newState);
        }
      } else if (shippingState.postalCode || shippingState.shippingRate !== null) {
        // Reset if cookie is cleared
        setShippingState({ postalCode: '', shippingRate: null });
      }
    };

    // Check immediately
    checkCookie();

    // Check every 500ms for cookie changes
    const interval = setInterval(checkCookie, 500);

    return () => clearInterval(interval);
  }, [shippingState.postalCode, shippingState.shippingRate]);

  return shippingState;
};