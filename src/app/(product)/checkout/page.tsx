"use client";
import React from "react";
import CheckoutLeft from "./_components/checkout-left";
import ChekoutRight from "./_components/chekout-right";
import BreadCrumbs from "@/components/common/bread-crumbs";

const CheckOutPage = () => {
  return (
    <div className="w-full py-10">
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
