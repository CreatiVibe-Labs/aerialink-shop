import React from "react";

import CheckoutItemCard from "./checkout-item-card";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";

const ProductItemsSection = () => {
  const { cartItems } = useCart();
  const { language } = useLanguage();

  return (
    <div className="pb-4 max-md:mt-3">
      {/* Mobile Heading */}
      <div className="md:hidden bg-primary rounded-xl py-2 px-3 text-sm text-white font-medium">
        <h2>Total Items</h2>
      </div>

      <div className="max-md:mt-3 space-y-2 px-1">
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const productTitle =
              language == "EN"
                ? item.translations.en.name
                : item.translations.jp.name;
            return (
              <CheckoutItemCard
                key={item.id}
                id={item.id}
                title={productTitle}
                price={Number(item.price)}
                image={item.images[0].url}
                quantity={item.quantity}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-4">No items in cart</p>
        )}
      </div>
    </div>
  );
};

export default ProductItemsSection;
