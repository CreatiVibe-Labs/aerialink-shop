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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchOrders = async (pageNum: number = 1) => {
    const token = Cookies.get("token");
    if (!token) return;

    setLoading(true);
    try {
      const res = await api.get(`/orders?page=${pageNum}`);
      if (!res.data.success) throw new Error("Failed to fetch orders");

      const newOrders: Order[] = res.data.data;
      
      if (pageNum === 1) {
        setOrders(newOrders);
      } else {
        setOrders((prev) => [...prev, ...newOrders]);
      }

      // Check if there are more orders (you can adjust this logic based on your API)
      if (newOrders.length === 0) {
        setHasMore(false);
      }
    } catch (err: any) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchOrders(nextPage);
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
