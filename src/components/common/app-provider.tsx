import { CartProvider } from "@/contexts/cart-context";
import { CategoryProvider } from "@/contexts/category-context";
import { LanguageProvider } from "@/contexts/language-context";
import { ProductProvider } from "@/contexts/product-context";
import { ProfileProvider } from "@/contexts/profile-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { OrderProvider } from "@/contexts/order-context";
import { AddressProvider } from "@/contexts/address-context";
import React, { FC } from "react";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          <ProfileProvider>
            <OrderProvider>
              <AddressProvider>
                <CategoryProvider>
                  <ProductProvider>{children}</ProductProvider>
                </CategoryProvider>
              </AddressProvider>
            </OrderProvider>
          </ProfileProvider>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

export default AppProvider;
