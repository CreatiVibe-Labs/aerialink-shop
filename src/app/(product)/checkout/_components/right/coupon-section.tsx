import Input from "@/components/common/input";
import PrimaryButton from "@/components/common/primary-button";
import React from "react";

const CouponSection = () => {
  return (
    <div className="mt-5 max-md:mt-3 flex gap-2 items-center">
      <Input placeholder="Coupon" />
      <PrimaryButton className="max-w-fit px-4">Apply Coupon</PrimaryButton>
    </div>
  );
};

export default CouponSection;
