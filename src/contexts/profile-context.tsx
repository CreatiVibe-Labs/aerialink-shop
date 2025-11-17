"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/api";

interface WalletTransaction {
  id: number;
  wallet_id: number;
  type: string;
  amount: string;
  source: string;
  meta: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface Wallet {
  id?: number;
  user_id?: number;
  balance: string;
  transactions?: WalletTransaction[];
}

interface Session {
  id: number;
  device: string;
  last_used: string | null;
  created: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  profile_photo_url: string;
  level: number;
  is_active: number;
  wallet?: Wallet;
}

interface ProfileData {
  user: User;
  ip: string;
  device: string;
  sessions: Session[];
  wallet: Wallet;
}

interface ProfileContextType {
  user: User | null;
  wallet: Wallet | null;
  sessions: Session[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone_number: string
  ) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (
    email: string,
    otp: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  logoutAllDevices: () => Promise<void>;
}

interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  password_confirmation?: string;
  image?: File | Blob | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // Restore user from cookies at startup   
  useEffect(() => {
    const token = Cookies.get("token");
    const userData = Cookies.get("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        Cookies.remove("user");
      }
    }
    setLoading(false);
  }, []);

  // --- Register
  const register = async (
    name: string,
    email: string,
    password: string,
    phone_number: string
  ) => {
    setLoading(true);
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: password,
        phone_number,
      });

      if (!res.data.success) throw new Error(res.data.message || "Registration failed");
      return res.data;
      // router.push("/login");
    } catch (err: any) {
      throw err.response?.data || { message: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  // --- Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/login", { email, password });
      if (!res.data.success) throw new Error(res.data.message || "Login failed");
      const { token, user } = res.data.data;
      console.log({token, user});
        Cookies.set("token", token, { expires: 30, sameSite: "Lax", secure: false, path: "/" });
        Cookies.set("user", JSON.stringify(user), { expires: 30 });
        // Debug: Check if cookies are set and log environment
        if (typeof window !== "undefined") {
          console.log("[DEBUG] Cookies.set called on client");
          console.log("[DEBUG] token:", Cookies.get("token"));
          console.log("[DEBUG] user:", Cookies.get("user"));
        } else {
          console.log("[DEBUG] Cookies.set called on server (should not happen)");
        }
      Cookies.remove("reset_email");
      Cookies.remove("reset_otp");

      setUser(user);
      await fetchProfile();
      router.push("/");
    } catch (err: any) {
      throw err.response?.data || { message: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // --- Logout
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("reset_email");
    Cookies.remove("reset_otp");
    setUser(null);
    setWallet(null);
    setSessions([]);
    // router.push("/login");
  };

  const logoutAllDevices = async () => {
    const token = Cookies.get("token");
    if (!token) throw { message: "Not authenticated" };
    setLoading(true);
    try {
      const res = await api.post("/logout-all");
      if (!res.data.success) throw new Error(res.data.message || "Failed to logout devices");
      await fetchProfile();
    } catch (err: any) {
      throw err.response?.data || { message: err.message || "Failed to logout devices" };
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch profile
  const fetchProfile = async () => {
    const token = Cookies.get("token");
    if (!token) return;
    setLoading(true);

    try {
      const res = await api.get("/profile");
      if (!res.data.success) throw new Error("Profile fetch failed");

      const data: ProfileData = res.data.data;
      setUser(data.user);
      setWallet(data.wallet);
      setSessions(data.sessions);
      Cookies.set("user", JSON.stringify(data.user), { expires: 30 });
    } catch (err: any) {
      console.error("Profile fetch failed", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot password
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      const res = await api.post("/forgot-password", { email });
      if (!res.data.success) throw new Error(res.data.message || "Failed to send OTP");

      Cookies.set("reset_email", email, { expires: 1 / 288 });
      router.push("/verify-code");
    } catch (err: any) {
      Cookies.remove("reset_email");
      throw err.response?.data || { message: "Failed to send OTP" };
    } finally {
      setLoading(false);
    }
  };

  // --- Resend OTP
  const resendOtp = async (email: string) => {
    setLoading(true);
    try {
      const res = await api.post("/resend-otp", { email });
      if (!res.data.success) throw new Error(res.data.message || "Failed to resend OTP");
    } catch (err: any) {
      throw err.response?.data || { message: "Failed to resend OTP" };
    } finally {
      setLoading(false);
    }
  };

  // --- Verify OTP
  const verifyOtp = async (email: string, otp: string) => {
    setLoading(true);
    try {
      const res = await api.post("/verify-otp", { email, otp });
      if (!res.data.success) throw new Error(res.data.message || "Invalid OTP");

      Cookies.set("reset_email", email, { expires: 1 / 288 });
      Cookies.set("reset_otp", otp, { expires: 1 / 288 });
      router.push("/new-password");
    } catch (err: any) {
      Cookies.remove("reset_otp");
      throw err.response?.data || { message: "Invalid or expired OTP" };
    } finally {
      setLoading(false);
    }
  };

  // --- Reset password
  const resetPassword = async (
    email: string,
    otp: string,
    password: string,
    password_confirmation: string
  ) => {
    setLoading(true);
    try {
      const res = await api.post("/reset-passwords", {
        email,
        otp,
        password,
        password_confirmation,
      });
      if (!res.data.success) throw new Error(res.data.message || "Failed to reset password");

      Cookies.remove("reset_email");
      Cookies.remove("reset_otp");
      router.push("/login");
    } catch (err: any) {
      throw err.response?.data || { message: "Password reset failed" };
    } finally {
      setLoading(false);
    }
  };

  // --- Update profile
  const updateProfile = async (payload: UpdateProfilePayload) => {
    const token = Cookies.get("token");
    if (!token) throw { message: "Not authenticated" };
    setLoading(true);
    try {
      let res;
      // Decide between JSON and multipart
      if (payload.image) {
        const formData = new FormData();
        if (payload.name !== undefined) formData.append("name", payload.name);
        if (payload.email !== undefined) formData.append("email", payload.email);
        if (payload.phone_number !== undefined) formData.append("phone_number", payload.phone_number);
        if (payload.password) formData.append("password", payload.password);
        if (payload.password_confirmation) formData.append("password_confirmation", payload.password_confirmation);
        formData.append("image", payload.image);
        res = await api.put("/profile", formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        res = await api.put("/profile", {
          name: payload.name,
          email: payload.email,
          phone_number: payload.phone_number,
          password: payload.password,
          password_confirmation: payload.password_confirmation,
        });
      }

      if (!res.data.success) throw new Error(res.data.message || "Profile update failed");
      // API may return updated user either directly or inside data.user
      const updatedData = res.data.data;
      const updatedUser: User = updatedData?.user ?? updatedData;
      setUser(updatedUser);
      Cookies.set("user", JSON.stringify(updatedUser), { expires: 30 });
    } catch (err: any) {
      throw err.response?.data || { message: err.message || "Profile update failed" };
    } finally {
      setLoading(false);
    }
  };

  // --- Auto fetch on mount
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        user,
        wallet,
        sessions,
        loading,
        login,
        register,
        logout,
        fetchProfile,
        forgotPassword,
        resendOtp,
        verifyOtp,
        resetPassword,
        updateProfile,
        logoutAllDevices,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
