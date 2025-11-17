"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";

interface OrderItem {
  id: number;
  [key: string]: any;
}

interface Order {
  id: number;
  total: number;
  status: string;
  items: OrderItem[];
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  fetchOrders: (pageNum?: number) => Promise<void>;
  loadMore: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]); // visible slice
  const [allOrders, setAllOrders] = useState<Order[]>([]); // full list from API
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const INITIAL_COUNT = 5;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const fetchOrders = async (pageNum: number = 1) => {
    const token = Cookies.get("token");
    if (!token) return;

    setLoading(true);
    try {
      // Backend currently returns all orders; fetch once and paginate client-side
      const res = await api.get(`/orders`);
      if (!res.data.success) throw new Error("Failed to fetch orders");

      const fetched: Order[] = Array.isArray(res.data.data) ? res.data.data : [];
      // Deduplicate by id just in case
      const deduped = (() => {
        const seen = new Set<number>();
        const out: Order[] = [];
        for (const o of fetched) {
          const id = o.id as number;
          if (!seen.has(id)) {
            out.push(o);
            seen.add(id);
          }
        }
        return out;
      })();

      setAllOrders(deduped);
      setPage(1);
      const initial = Math.min(INITIAL_COUNT, deduped.length);
      setVisibleCount(initial);
      setOrders(deduped.slice(0, initial));
      setHasMore(deduped.length > initial);
    } catch (err: any) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;
    // Reveal remaining orders after the initial 5
    setOrders(allOrders);
    setVisibleCount(allOrders.length);
    setHasMore(false);
    setPage(2);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchOrders(1);
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        hasMore,
        page,
        fetchOrders,
        loadMore,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
};
