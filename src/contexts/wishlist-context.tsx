"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/lib/api";
import { Product } from "./types-and-interfaces/product";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface WishlistItem {
  id: number;
  user_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistProductIds: number[]; // Quick check for isInWishlist
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number, product?: Product) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistProductIds, setWishlistProductIds] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch wishlist on mount
  const token =
    typeof window !== "undefined" ? Cookies.get("token") : null;
  useEffect(() => {
    if (!token) {
      // Load local wishlist (unauthenticated)
      try {
        const raw = localStorage.getItem("wishlist");
        const localProducts: Product[] = raw ? JSON.parse(raw) : [];
        setWishlistProductIds(localProducts.map(p => p.id));
        // Populate wishlist array for UI that relies on `wishlist`
        const mapped: WishlistItem[] = localProducts.map((p) => ({
          id: p.id,
          user_id: 0,
          product_id: p.id,
          created_at: "",
          updated_at: "",
          product: p,
        }));
        setWishlist(mapped);
      } catch (e) {
        // ignore malformed local data
        setWishlistProductIds([]);
        setWishlist([]);
      }
      return;
    }
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await api.get("/wishlist");
      if (response.data.success) {
        console.log({ response })
        setWishlist(response.data.data);
        setWishlistProductIds(
          response.data.data.map((item: WishlistItem) => item.product.id)
        );
      } else {
        toast.error("Failed to load wishlist");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch wishlist");
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlistProductIds.includes(productId);
  };

  const toggleWishlist = async (productId: number, product?: Product) => {
    setLoading(true);
    try {
      if (!token) {
        // Local wishlist flow
        const raw = localStorage.getItem("wishlist");
        const localProducts: Product[] = raw ? JSON.parse(raw) : [];

        if (isInWishlist(productId)) {
          const updated = localProducts.filter(p => p.id !== productId);
          localStorage.setItem("wishlist", JSON.stringify(updated));
          setWishlistProductIds(prev => prev.filter(id => id !== productId));
          setWishlist(prev => prev.filter(item => item.product.id !== productId));
        } else {
          if (product) {
            const updated = [...localProducts, product];
            localStorage.setItem("wishlist", JSON.stringify(updated));
            setWishlistProductIds(prev => [...prev, productId]);
            setWishlist(prev => ([...prev, {
              id: product.id,
              user_id: 0,
              product_id: product.id,
              created_at: "",
              updated_at: "",
              product,
            }]))
          } else {
            // If product data is missing, skip add to avoid broken UI
            toast.error("Unable to add wishlist item");
          }
        }
      } else {
        if (isInWishlist(productId)) {
          // Remove from wishlist
          await api.delete(`/wishlist/${productId}`);
          setWishlist((prev) =>
            prev.filter((item) => item.product.id !== productId)
          );
          setWishlistProductIds((prev) => prev.filter((id) => id !== productId));
        } else {
          // Add to wishlist
          await api.post("/wishlist", { product_id: productId });
          // Refetch to get updated data (or you can add manually if you have product data)
          await fetchWishlist();
        }
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to toggle wishlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistProductIds,
        isInWishlist,
        toggleWishlist,
        loading,
        error,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
