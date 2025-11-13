"use client";
import React, { useState } from "react";
import Image from "next/image";
import Profile from "../../components/account/profileData";
import OrderHistory from "../../components/account/order-history";
import DeliveryAddress from "@/components/account/address";
import BreadCrumbs from "@/components/common/bread-crumbs";
import ProfileCardsSection from "@/components/account/ProfileCardsSection";

const AccountPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("profile");

  return (
    <>
      <BreadCrumbs />
      <div className="min-h-screen py-2 ">
        {/* Header */}
        <h1 className="lg:text-[36px] text-[21.05px] font-[500] lg:font-semibold mb-5 text-[#686868] ">
          Hello username
        </h1>

        {/* 3 Boxes in One Line */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] lg:gap-6 w-full max-w-5xl m-auto  border border-red-500"> */}
        <div className="flex flex-wrap  gap-[10px] lg:gap-6 w-full max-w-6xl mx-auto">
          {/* Profile */}
          <Box
            title="Profile"
            description="Manage your personal information"
            icon="/assets/account/interface-user-circle.png"
            iconActive="/assets/account/active-user.png"
            isActive={activeSection === "profile"}
            onClick={() => setActiveSection("profile")}
          />

          {/* Order History */}
          <Box
            title="Order History"
            description="View your past orders and invoices"
            icon="/assets/account/interface-time.png"
            iconActive="/assets/account/active-timer.png"
            isActive={activeSection === "orders"}
            onClick={() => setActiveSection("orders")}
          />

          {/* Delivery Address */}
          <Box
            title="Delivery Address"
            description="Manage your saved addresses"
            icon="/assets/account/travel-map-location-pin.png"
            iconActive="/assets/account/activ-location.png"
            isActive={activeSection === "address"}
            onClick={() => setActiveSection("address")}
          />
        </div>

        {/* Section Placeholder */}
        {/* <div className="mx-auto max-w-[1013px] w-full "> */}
        <div className="w-full max-w-6xl mx-auto lg:mt-15 mt-0">
          {activeSection === "profile" && (
            <div>
              <Profile />
            </div>
          )}

          {activeSection === "orders" && (
            <div className="w-full ">
              <OrderHistory />
            </div>
          )}

          {activeSection === "address" && (
            <div className="bg-white rounded-xl">
              <DeliveryAddress />
            </div>
          )}
        </div>

        {/* cards sections */}
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
  iconActive: string;
  isActive: boolean;
  onClick: () => void;
}

const Box: React.FC<BoxProps> = ({
  title,
  description,
  icon,
  iconActive,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-[10px] lg:rounded-[14px] px-2 lg:px-[17px] lg:py-[20px] py-[10px] flex flex-col lg:gap-2 
        lg:w-[497px] w-full lg:h-[147px] h-auto
        gap-[10px] cursor-pointer transition-all duration-200 group 
        ${
          isActive
            ? "bg-[#98C1A9] shadow-[0_0_6.1px_0_#00000040]"
            : "bg-[#FFFDFA]  border-gray-200 shadow-lg"
        }`}
    >
      <div className="flex gap-3 lg:items-start items-center">
        <div
          className={`rounded-full lg:py-2 py-0 flex transition-all duration-200
            ${isActive ? "bg-[#98C1A9]" : "bg-white "}`}
        >
          <Image
            src={isActive ? iconActive : icon}
            alt={title}
            width={41}
            height={41}
            className={`transition-all duration-200 w-[27px] h-[27px] lg:w-[41px] lg:h-[41px]
              ${isActive ? "invert-0 " : ""}`}
          />
        </div>
        <div>
          <h2
            className={`lg:text-[32px] text-[20.93px] font-semibold transition-all duration-200 font-albert-sans
            ${isActive ? "text-[#F5F5F5]" : "text-[#666664] "}`}
          >
            {title}
          </h2>
          <p
            className={`text-[16px] leading-[25.71px] transition-all duration-200 font-albert-sans hidden lg:block
          ${isActive ? "text-white/90" : "text-[#666664]"}`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
