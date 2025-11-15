import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export interface Address {
  id: number;
  name: string;
  phone_number: string;
  address1: string;
  postal_code: string;
  default?: boolean;
}

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");

      if (!token) {
        setAddresses([]);
        setLoading(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delivery-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch addresses: ${res.status}`);
      }

      const data = await res.json();
      console.log("Addresses API Response:", data);

      // Handle different response formats
      const addressList = Array.isArray(data) ? data : data.data || [];
      setAddresses(addressList);

      // Auto-select default address if available
      const defaultAddr = addressList.find((addr: Address) => addr.default);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      } else if (addressList.length > 0) {
        setSelectedAddress(addressList[0]);
      }

      setError(null);
    } catch (err) {
      console.error("Addresses API Error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch addresses");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (addressData: Omit<Address, "id">) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delivery-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!res.ok) {
        throw new Error(`Failed to save address: ${res.status}`);
      }

      const data = await res.json();
      console.log("Add Address API Response:", data);

      // Refresh addresses list
      await fetchAddresses();

      return { success: true, data };
    } catch (err) {
      console.error("Add Address API Error:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to save address",
      };
    }
  };

  const updateAddress = async (id: number, addressData: Omit<Address, "id">) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delivery-details/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!res.ok) {
        throw new Error(`Failed to update address: ${res.status}`);
      }

      const data = await res.json();
      console.log("Update Address API Response:", data);

      // Refresh addresses list
      await fetchAddresses();

      return { success: true, data };
    } catch (err) {
      console.error("Update Address API Error:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to update address",
      };
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    selectedAddress,
    setSelectedAddress,
    loading,
    error,
    addAddress,
    updateAddress,
    refreshAddresses: fetchAddresses,
  };
};
