
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Profile from "../../components/account/profileData";
import OrderHistory from "../../components/account/order-history";
import DeliveryAddress from "@/components/account/address";
import BreadCrumbs from "@/components/common/bread-crumbs";
import ProfileCardsSection from "@/components/account/ProfileCardsSection";
import { useProfile } from "@/contexts/profile-context";

const AccountPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("profile");
  const { user } = useProfile();

  return (
    <>
      <BreadCrumbs />
      <div className=" ">
        {/* Header */}
        <h1 className="lg:text-[36px] text-[21.05px] font-[500] lg:font-semibold mb-5 text-[#686868] ">
          Hello {user?.name || "username"}
        </h1>

        {/* 3 Boxes in One Line */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] lg:gap-6 w-full max-w-5xl m-auto  border border-red-500"> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] lg:gap-6 w-full max-w-6xl mx-auto">
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
        <div className="mx-auto max-w-6xl w-full ">
          {activeSection === "profile" && (
            <div>
              <Profile />
            </div>
          )}

          {activeSection === "orders" && (
            <div className="mx-auto w-full">
              <OrderHistory />
            </div>
          )}

          {activeSection === "address" && (
            <div className="bg-white rounded-xl ">


              <DeliveryAddress />

            </div>
          )}
        </div>


<div className="w-full max-w-6xl mx-auto">
          {" "}
          <ProfileCardsSection />
        </div>


      </div>
    </>
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
      className={`rounded-[10px] lg:rounded-[14px] px-2 lg:px-[17px] lg:py-[10px] py-[10px] flex flex-col lg:gap-2 
        w-full lg:h-[100px] h-auto
        gap-[10px] cursor-pointer transition-all duration-200 group 
        ${isActive
          ? "bg-[#98C1A9] shadow-[0_0_6.1px_0_#00000040]"
          : "bg-[#FFFDFA]  border-gray-200 shadow-lg"
        }`}
    >
      <div className="flex items-center gap-2"> 
        <div
          className={` py-2  rounded-full flex items-center justify-center transition-all duration-200
            ${isActive ? "bg-[#98C1A9]" : "bg-white "}`}
        >
          <Image
            src={icon}
            alt={title}
            width={24}
            height={24}
            className={`transition-all duration-200 ${isActive ? "brightness-0 invert" : ""}`}
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
        className={`text-sm leading-snug pl-8 transition-all duration-200 hidden sm:block
          ${isActive ? "text-white/90" : "text-gray-600 "}`}
      >
        {description}
      </p>
    </div>
  );
};
