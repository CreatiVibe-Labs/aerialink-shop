import { CartProvider } from "@/contexts/cart-context";
import { CategoryProvider } from "@/contexts/category-context";
import { LanguageProvider } from "@/contexts/language-context";
import { ProductProvider } from "@/contexts/product-context";
import { ProfileProvider } from "@/contexts/profile-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
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
            <CategoryProvider>
              <ProductProvider>{children}</ProductProvider>
            </CategoryProvider>
          </ProfileProvider>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

export default AppProvider;
