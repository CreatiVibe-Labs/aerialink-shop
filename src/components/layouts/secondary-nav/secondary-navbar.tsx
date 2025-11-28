"use client";
import Link from "next/link";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { TfiWorld } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import Dropdown from "../../common/dropdown";
import CoinsCard from "./components/coins-card";
import SearchbarComponent from "./components/searchbar-component";
import ShopingCard from "./components/shoping-card";
import WishlistIcon from "./components/wishlist-icon";
import { useProfile } from "@/contexts/profile-context";
import { PiSpinnerGapBold } from "react-icons/pi";
import { useLanguage } from "@/contexts/language-context";
import { useCart } from "@/contexts/cart-context";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { PiCoinsLight } from "react-icons/pi";

const SecondaryNavbar = () => {
  const { language, setLanguage } = useLanguage();
  const { user, loading, logout } = useProfile();

  const router = useRouter();

  return (
    <div className="mt-8 max-w-7xl w-full mx-auto xl:px-9 lg:px-10 md:px-10 px-5 flex justify-between items-center xl:my-8 lg:my-8 md:my-8 xl:gap-5 lg:gap-5 md:gap-5 gap-2 bg-[#fdfdfd] ">
      {/* Language Selector */}
      <Dropdown
        prefixIcon={<TfiWorld size={20} />}
        label={language}
        className="px-[15px] py-[9px]"
        labelClassName="text-[17px] "
        list={[
          { key: "EN", val: "EN" },
          { key: "JP", val: "JP" },
        ]}
        onChange={(val: string) => {
          const selected = val.toUpperCase() as "EN" | "JP";
          setLanguage(selected);
          console.log("Language updated globally:", selected);
        }}
      />

      {/* Searchbar */}
      <SearchbarComponent />

      {/* Wishlist */}
      <WishlistIcon />

      {/* Shopping Cart */}
      <ShopingCard />

      {/* Coins */}
      <CoinsCard />

      {/*User State */}
      {loading ? (
        <div className="max-md:hidden flex items-center justify-center bg-primary text-white rounded-2xl w-[120px] py-2">
          <PiSpinnerGapBold className="animate-spin w-5 h-5 " />
        </div>
      ) : user ? (
        <Dropdown
          className="max-md:hidden"
          prefixIcon={<BiUser size={20} />}
          labelClassName="text-nowrap !capitalize"
          label="My Account"
          list={[
            {
              key: "profile",
              val: "My Profile",
              onClick: () => {
                console.log("Profile clicked");
                router.push("/account");
              },
            },
            {
              key: "logout",
              val: "Logout",
              onClick: async () => {
                console.log("Logout clicked");
                try {
                  if (logout) {
                    logout();
                    console.log("Logout successful");
                    router.push("/login");
                  } else {
                    console.error("Logout function is undefined");
                  }
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              },
            },
          ]}
          onChange={(val: string) => console.log("Dropdown changed:", val)}
        />
      ) : (
        <div className="max-md:hidden relative max-w-fit z-[30] flex flex-col items-center">
          <Link
            href="/login"
            className="text-white bg-primary rounded-2xl px-10 py-2 flex items-center justify-center space-x-2 cursor-pointer select-none"
          >
            Login
          </Link>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
          {/* Home */}
          <Link href="/" className="flex flex-col items-center text-gray-700">
            <AiOutlineHome size={22} />
            <span className="text-[11px] mt-1">Home</span>
          </Link>

          {/* Points Management */}
          <Link href="/points-management" className="flex flex-col items-center text-gray-700">
            <PiCoinsLight size={22} />
            <span className="text-[11px] mt-1">Points</span>
          </Link>

          {/* Cart */}
          <Link href="/product/cart" className="relative flex flex-col items-center text-gray-700">
            <AiOutlineShoppingCart size={22} />
            <span className="text-[11px] mt-1">Cart</span>
          </Link>

          {/* Profile */}
          <Link href={user ? "/account" : "/login"} className="flex flex-col items-center text-gray-700">
            <AiOutlineUser size={22} />
            <span className="text-[11px] mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNavbar;
