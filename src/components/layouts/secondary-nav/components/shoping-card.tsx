"use client"
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const ShopingCard = () => {
  const { cartItems } = useCart();
  return (
    <Link href={'/cart'} className="max-md:hidden">
      <div className="relative">
        <FiShoppingCart size={30} strokeWidth={1} />
        {/* count */}
        <div className="bg-primary  center absolute rounded-full size-4.5 text-xs -top-1 -right-2 text-white">
          <span>{cartItems.length}</span>
        </div>
      </div>
    </Link>
  );
};

export default ShopingCard;
