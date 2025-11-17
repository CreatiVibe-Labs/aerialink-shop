"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useProfile } from "@/contexts/profile-context";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "@/components/account/Phone";

interface FormData {
  fullname: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
}





const Profile: React.FC = () => {
  const { user, updateProfile, sessions, logoutAllDevices } = useProfile();

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingOutDevices, setIsLoggingOutDevices] = useState(false);

  const sessionDeviceLabels = useMemo(() => {
    const detectOs = (ua: string) => {
      const agent = ua.toLowerCase();
      if (agent.includes("windows")) return "Windows";
      if (agent.includes("mac")) return "macOS";
      if (agent.includes("iphone") || agent.includes("ipad") || agent.includes("ios")) return "iOS";
      if (agent.includes("android")) return "Android";
      if (agent.includes("linux")) return "Linux";
      return "Unknown OS";
    };

    const detectBrowser = (ua: string) => {
      const agent = ua.toLowerCase();
      if (agent.includes("edg")) return "Edge";
      if (agent.includes("chrome")) return "Chrome";
      if (agent.includes("safari")) return agent.includes("chrome") ? "Chrome" : "Safari";
      if (agent.includes("firefox")) return "Firefox";
      if (agent.includes("opr") || agent.includes("opera")) return "Opera";
      return "Browser";
    };

    const formatRelative = (timestamp?: string | null) => {
      if (!timestamp) return "Unknown";
      const target = new Date(timestamp);
      if (Number.isNaN(target.getTime())) return "Unknown";
      const diffMs = Date.now() - target.getTime();
      if (diffMs <= 0) return "Just now";

      const minute = 60 * 1000;
      const hour = 60 * minute;
      const day = 24 * hour;
      const week = 7 * day;

      if (diffMs < minute) return "Just now";
      if (diffMs < hour) {
        const minutes = Math.floor(diffMs / minute);
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
      }
      if (diffMs < day) {
        const hours = Math.floor(diffMs / hour);
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
      }
      if (diffMs < week) {
        const days = Math.floor(diffMs / day);
        return `${days} day${days === 1 ? "" : "s"} ago`;
      }
      const weeks = Math.floor(diffMs / week);
      return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    };

    return (ua: string, lastUsed?: string | null) => {
      const os = detectOs(ua);
      const browser = detectBrowser(ua);
      return {
        title: `Login with ${os} ${browser}`,
        lastActive: formatRelative(lastUsed),
      };
    };
  }, []);

  const handleLogoutAllDevices = async () => {
    if (isLoggingOutDevices) return;
    try {
      setIsLoggingOutDevices(true);
      await logoutAllDevices();
      toast.success("Logged out from other devices");
    } catch (err: any) {
      const msg = err?.message || err?.data?.message || "Failed to logout devices";
      toast.error(msg);
    } finally {
      setIsLoggingOutDevices(false);
    }
  };

  // Auto-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullname: user.name || "",
        phone: user.phone_number || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setIsSubmitting(true);
      await updateProfile({
        name: formData.fullname.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone.trim() || undefined,
        password: formData.password ? formData.password : undefined,
        password_confirmation: formData.password ? formData.password_confirmation : undefined,
      });
      toast.success("Profile updated successfully");
      setFormData(prev => ({
        ...prev,
        password: "",
        password_confirmation: "",
      }));
    } catch (err: any) {
      const msg = err?.message || err?.data?.message || "Failed to update profile";
      if (err?.errors) {
        const firstKey = Object.keys(err.errors)[0];
        if (firstKey) {
          const val = err.errors[firstKey];
          if (Array.isArray(val) && val.length) {
            toast.error(val[0]);
            setIsSubmitting(false);
            return;
          }
        }
      }
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-7 ">
      <Toaster position="top-right" />
      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl w-full space-y-6"
      >
        {/* Full Name */}
        <div className="flex flex-col gap-2 pt-8">
          <label className="text-sm font-medium text-[#666664]/40 md:text-xl">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full lg:px-4 px-[19px] py-2 border border-[#EBECF0] text-[#666664] font-[500] placeholder:text-[#666664] lg:text-[20px] text-[16px] lg:leading-[24px] leading-[18.86px] font-albert-sans lg:rounded-[14px] rounded-[11px] lg:h-[55px] h-[40px] focus:outline-none bg-[#F5F5F5] pr-12 disabled:opacity-60"
          />
        </div>
        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          {/* Phone Number */}
            <PhoneInput value={formData.phone} onChange={handleChange}
            />
        </div>
        {/* Email Address */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#666664]/40 md:text-xl">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full lg:px-4 px-[19px] py-2 border border-[#EBECF0] text-[#666664] font-[500] placeholder:text-[#666664] lg:text-[20px] text-[16px] lg:leading-[24px] leading-[18.86px] font-albert-sans lg:rounded-[14px] rounded-[11px] lg:h-[55px] h-[40px] focus:outline-none bg-[#F5F5F5] pr-12 disabled:opacity-60"
          />
        </div>
        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#666664]/40 md:text-xl">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full lg:px-4 px-[19px] py-2 border border-[#EBECF0] text-[#666664] font-[500] placeholder:text-[#666664] lg:text-[20px] text-[16px] lg:leading-[24px] leading-[18.86px] font-albert-sans lg:rounded-[14px] rounded-[11px] lg:h-[55px] h-[40px] focus:outline-none bg-[#F5F5F5] pr-12 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666664] hover:text-[#98C1A9]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#666664]/40 md:text-xl">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full lg:px-4 px-[19px] py-2 border border-[#EBECF0] text-[#666664] font-[500] placeholder:text-[#666664] lg:text-[20px] text-[16px] lg:leading-[24px] leading-[18.86px] font-albert-sans lg:rounded-[14px] rounded-[11px] lg:h-[55px] h-[40px] focus:outline-none bg-[#F5F5F5] pr-12 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666664] hover:text-[#98C1A9]"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-[232px] h-12 bg-[#98C1A9] text-white text-[17px] py-2 rounded-[14px] disabled:opacity-60 disabled:cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "SAVE"}
        </button>
      </form>

      {/* Login & Security Section */}
      <section className="w-full space-y-4">

        <h3 className="text-2xl font-bold text-[#98C1A9]">Login & Security</h3>

        <p className="text-[#666664] text-[17px] leading-relaxed mb-2 ">
          Manage and log out your active sessions on other browsers and devices.
        </p>
        <p className="text-[#666664] text-[17px] leading-relaxed ">
          If necessary, you may log out of all of your other browser sessions across all of your devices.
          Some of your recent sessions are listed below; however, this list may not be exhaustive.
          If you feel your account has been compromised, you should also update your password.
        </p>

        <div className="flex flex-col gap-4 pt-2">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => {
              const { title, lastActive } = sessionDeviceLabels(session.device, session.last_used || session.created);
              return (
                <div
                  key={session.id}
                  className="h-[80px] max-w-[644px] bg-[#F5F5F5] text-[#666664] text-[16px] font-medium transition flex items-center justify-start px-4"
                >
                  <div className="w-10 h-10 bg-[#F5F5F5] rounded-full mr-4 flex items-center justify-center">
                    <Image
                      src="/assets/account/computer-desktop-remove.png"
                      alt="Device icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span>{title}</span>
                    <span className="text-sm text-[#666664] mt-1">Last active: {lastActive}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-[80px] max-w-[644px] bg-[#F5F5F5] text-[#666664] text-[16px] flex items-center px-4">
              No other active sessions found.
            </div>
          )}

          <button
            type="button"
            onClick={handleLogoutAllDevices}
            disabled={isLoggingOutDevices}
            className="w-[277px] h-12 bg-[#98C1A9] font-semibold text-white text-[17px] py-2 rounded-[14px] disabled:opacity-60"
          >
            {isLoggingOutDevices ? "Logging out..." : "Logout From Another Device"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;