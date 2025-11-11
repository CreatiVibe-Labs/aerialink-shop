'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from './types-and-interfaces/product';

export interface CartItem {
  id: number;
  quantity: number;
  size: string;
  price: string;
  room_type: string;
  slug: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (id: number, quantity: number, size: string, price: string, room_type: string, slug: string) => void;
  removeFromCart: (id: number) => void;
  removeFromCartByIndex: (index: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  updateQuantityByIndex: (index: number, qty: number) => void;
  updateSize: (id: number, size: string) => void;
  updateSizeByIndex: (index: number, size: string) => void;
  updateRoomType: (id: number, room_type: string) => void;
  updateRoomTypeByIndex: (index: number, room_type: string) => void;
  updatePriceByIndex: (index: number, price: string) => void;
  isInCart: (productId: number) => boolean;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'cart_items';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  console.log({ cartItems });
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

  const addToCart = (id: number, quantity: number, size: string, price: string, room_type: string, slug: string) => {
    console.log('Adding to cart:', { id, quantity, size, price, room_type, slug });
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === id && item.size === size && item.room_type === room_type);

      if (existingItem) {
        // Increase quantity and update price accordingly
        return prevItems.map(item =>
          item.id === id && item.size === size && item.room_type === room_type
            ? {
              ...item,
              quantity: item.quantity + quantity,
            }
            : item
        );
      } else {
        // Add new product with base price
        const newItem: CartItem = {
          id,
          size,
          quantity,
          price: (parseFloat(price) * quantity).toFixed(2),
          room_type,
          slug,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const removeFromCartByIndex = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
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

  const updateQuantityByIndex = (index: number, qty: number) => {
    if (qty >= 1) {
      setCartItems(prev =>
        prev.map((item, i) =>
          i === index ? { ...item, quantity: qty } : item
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

  const updateSizeByIndex = (index: number, size: string) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, size } : item
      )
    );
  };

  const updateRoomType = (id: number, room_type: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, room_type } : item
      )
    );
  };

  const updateRoomTypeByIndex = (index: number, room_type: string) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, room_type } : item
      )
    );
  };

  const updatePriceByIndex = (index: number, price: string) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, price } : item
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
        removeFromCartByIndex,
        updateQuantity,
        updateQuantityByIndex,
        updateSize,
        updateSizeByIndex,
        updateRoomType,
        updateRoomTypeByIndex,
        updatePriceByIndex,
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