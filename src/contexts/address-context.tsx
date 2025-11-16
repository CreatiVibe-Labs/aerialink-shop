"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface DeliveryAddress {
  id: number;
  name: string;
  email?: string;
  phone_number: string;
  address1: string;
  address2?: string;
  postal_code: string;
  prefecture?: string;
  delivery_instruction?: string;
  default: boolean;
}

interface AddressFormData {
  name: string;
  phone_number: string;
  address1: string;
  address2?: string;
  postal_code: string;
  prefecture?: string;
  delivery_instruction?: string;
  default: boolean;
}

interface AddressContextType {
  addresses: DeliveryAddress[];
  loading: boolean;
  fetchAddresses: () => Promise<void>;
  addAddress: (data: AddressFormData) => Promise<void>;
  updateAddress: (id: number, data: AddressFormData) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  setDefaultAddress: (id: number) => Promise<void>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: React.ReactNode }) => {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    setLoading(true);
    try {
      const res = await api.get("/delivery-details");
      if (!res.data.success) throw new Error("Failed to fetch addresses");
      setAddresses(res.data.data || []);
    } catch (err: any) {
      console.error("Failed to fetch addresses", err);
      toast.error(err?.response?.data?.message || "Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (data: AddressFormData) => {
    const token = Cookies.get("token");
    if (!token) throw new Error("Not authenticated");

    setLoading(true);
    try {
      const res = await api.post("/delivery-details", data);
      if (!res.data.success) throw new Error(res.data.message || "Failed to add address");
      toast.success("Address added successfully");
      await fetchAddresses();
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to add address";
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id: number, data: AddressFormData) => {
    const token = Cookies.get("token");
    if (!token) throw new Error("Not authenticated");

    setLoading(true);
    try {
      const res = await api.post(`/delivery-details/${id}`, data);
      if (!res.data.success) throw new Error(res.data.message || "Failed to update address");
      toast.success("Address updated successfully");
      await fetchAddresses();
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to update address";
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id: number) => {
    const token = Cookies.get("token");
    if (!token) throw new Error("Not authenticated");

    setLoading(true);
    try {
      const res = await api.delete(`/delivery-details/${id}`);
      if (!res.data.success) throw new Error(res.data.message || "Failed to delete address");
      toast.success("Address deleted successfully");
      await fetchAddresses();
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to delete address";
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (id: number) => {
    const token = Cookies.get("token");
    if (!token) throw new Error("Not authenticated");

    setLoading(true);
    try {
      const res = await api.post(`/delivery-details/${id}/default`);
      if (!res.data.success) throw new Error(res.data.message || "Failed to set default address");
      toast.success("Default address updated");
      await fetchAddresses();
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to set default address";
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchAddresses();
    }
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const context = useContext(AddressContext);
  if (!context) throw new Error("useAddresses must be used within an AddressProvider");
  return context;
};
