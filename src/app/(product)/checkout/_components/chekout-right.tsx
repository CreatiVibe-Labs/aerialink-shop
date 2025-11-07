import CouponSection from "./right/coupon-section";
import PontsDiscountSection from "./right/ponts-discount-section";
import ProductItemsSection from "./right/product-items-section";
import TotalSection from "./right/total-section";

const ChekoutRight = () => {
  return (
    <div className="flex justify-end max-md:hidden">
      <div className="lg:max-w-[70%] w-full space-y-1">
        {/* Product Items */}
        <ProductItemsSection />

        {/* Points Discount */}
        {/* <PontsDiscountSection /> */}

        {/* Coupon */}
        {/* <CouponSection /> */}

        {/* Totals */}
        <TotalSection />
      </div>
    </div>
  );
};

export default ChekoutRight;
