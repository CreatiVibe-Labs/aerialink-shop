"use client";
import React from "react";
import CheckoutLeft from "./_components/checkout-left";
import ChekoutRight from "./_components/chekout-right";
import BreadCrumbs from "@/components/common/bread-crumbs";

const CheckOutPage = () => {
  return (
    <div className="w-full bg-gray-50 py-10 px-5 max-md:py-5 max-md:px-3 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <BreadCrumbs className="max-md:hidden" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* LEFT SIDE: Billing Details */}
        <CheckoutLeft />
        {/* RIGHT SIDE: Summary */}
        <ChekoutRight />
      </div>
    </div>
  );
};

export default CheckOutPage;
