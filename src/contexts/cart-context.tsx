'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from './types-and-interfaces/product';

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  updateSize: (id: number, size: string) => void;
  isInCart: (productId: number) => boolean;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'cart_items';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CartItem[];
        setCartItems(parsed);
      } catch {
        localStorage.removeItem(CART_KEY);
      }
    }
  }, []);

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } else {
      localStorage.removeItem(CART_KEY);
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    // Check if product already exists
    const exists = cartItems.some(item => item.id === product.id);
    if (!exists) {
      const newItem: CartItem = { ...product, quantity: 1, size: 'small' };
      setCartItems(prev => [...prev, newItem]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty >= 1) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  const updateSize = (id: number, size: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, size } : item
      )
    );
  };

  const isInCart = (productId: number): boolean => {
    return cartItems.some(item => item.id === productId);
  };

  const getTotal = (): number => {
    return cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateSize,
        isInCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};