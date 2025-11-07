import React from "react";
import PointsBadge from "./points-badge";
import PointsComponentCard from "./points-component-card";

const PointsBar = () => {
  return (
    <div className="w-full flex justify-center max-2xl:mt-10">
      <div className="w-[70%]  max-2xl:w-full rounded-xl min-h-40 max-sm:min-h-32  py-3 shadow-lg bg-[#EBECF0] relative flex items-center justify-end ">
        {/* badge */}
        <PointsBadge />
        <div className="w-[80%] max-2xl:w-[70%] max-sm:w-[67%] h-full flex items-center justify-around relative">
          {/* points blanace */}
          <PointsComponentCard title="Points Balance" value={1500} />
          {/* lines */}
          <div className="w-1 h-full bg-[#D9D9D9]"></div>
          {/* Total Save */}
          <PointsComponentCard title="Total Save" value={`$100`} />
        </div>
      </div>
    </div>
  );
};

export default PointsBar;
