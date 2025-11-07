import React from "react";
import ElipsShape from "./elips-shape";

const CouponCard: React.FC = () => {
  return (
    <div className="grid grid-cols-3 min-h-40  max-md:min-h-32 max-sm:min-h-24 w-full overflow-hidden">
      {/* left */}
      <div className="col-span-2 bg-primary relative center">
        {/* shapes */}
        {/* left-top */}
        <ElipsShape className="-top-4 -left-4" />
        {/* left-bottom */}
        <ElipsShape className="-bottom-4 -left-4 -rotate-45!" />
        {/* right-top */}
        <ElipsShape className="-top-5 -right-5.5 -rotate-0!" />
        {/* left-bottom */}
        <ElipsShape className="-bottom-5 -right-5.5 -rotate-0!" />
        {/* content */}
        <div className="flex flex-col">
          <h3 className="text-white font-bold text-3xl max-sm:text-xl">$20 Discount</h3>
          <p className="text-white text-sm font-medium ">
            Expires on feb 01-2025
          </p>
        </div>

      </div>
      {/* right */}
      <div className="bg-primary border-white border-l-3  border-dotted rounded-r-xl center">
        <div className="flex flex-col">
          <h3 className="text-white font-bold text-xl max-sm:text-lg uppercase">coupon1</h3>

        </div>
      </div>
    </div>
  );
};

export default CouponCard;
