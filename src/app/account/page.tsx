"use client";
import React, { useState } from "react";
import Image from "next/image";
import Profile from "../../components/account/profileData";
import OrderHistory from "../../components/account/order-history";
import DeliveryAddress from "@/components/account/address";

const AccountPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("profile");

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Header */}
      <h1 className="text-[36px] font-semibold mb-3 text-gray-600 ">
        Hello username
      </h1>

      {/* 3 Boxes in One Line */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl m-auto ">
        {/* Profile */}
        <Box
          title="Profile"
          description="Manage your personal information"
          icon="/assets/account/interface-user-circle.png"
          isActive={activeSection === "profile"}
          onClick={() => setActiveSection("profile")}
        />

        {/* Order History */}
        <Box
          title="Order History"
          description="View your past orders and invoices"
          icon="/assets/account/interface-time.png"
          isActive={activeSection === "orders"}
          onClick={() => setActiveSection("orders")}
        />

        {/* Delivery Address */}
        <Box
          title="Delivery Address"
          description="Manage your saved addresses"
          icon="/assets/account/travel-map-location-pin.png"
          isActive={activeSection === "address"}
          onClick={() => setActiveSection("address")}
        />
      </div>

      {/* Section Placeholder */}
      <div className="mx-auto max-w-[1013px] w-full ">
        {activeSection === "profile" && (
          <div>
            <Profile />
          </div>
        )}

        {activeSection === "orders" && (
          <div
            className="mx-auto w-full h-[660]"
            style={{ maxWidth: "1013px" }}
          >
            <OrderHistory />
          </div>
        )}

        {activeSection === "address" && (
          <div className="bg-white rounded-xl ">


            <DeliveryAddress />

          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;

/* ----------------------------- Reusable Box ----------------------------- */
interface BoxProps {
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const Box: React.FC<BoxProps> = ({
  title,
  description,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border p-6 flex flex-col gap-2 cursor-pointer transition-all duration-200 group
        ${isActive
          ? "bg-[#98C1A9] border-[#98C1A9] shadow-md"
          : "bg-white border-gray-200 "
        }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-full flex items-center justify-center transition-all duration-200
            ${isActive ? "bg-[#98C1A9]" : "bg-white "}`}
        >
          <Image
            src={icon}
            alt={title}
            width={24}
            height={24}
            className={`transition-all duration-200
              ${isActive ? "invert-0 " : ""}`}
          />
        </div>

        <h2
          className={`text-lg font-semibold transition-all duration-200
            ${isActive ? "text-white" : "text-[#666664] "}`}
        >
          {title}
        </h2>
      </div>

      <p
        className={`text-sm leading-snug transition-all duration-200
          ${isActive ? "text-white/90" : "text-gray-600 "}`}
      >
        {description}
      </p>
    </div>
  );
};
