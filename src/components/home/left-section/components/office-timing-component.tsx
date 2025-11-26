import React from "react";
import { BsClock } from "react-icons/bs";

const OfficeTimingComponent = () => {
  return (
    <div className="rounded-xl border border-light-gray p-3 space-y-2 text-[#AFB1AE] hover:text-black">
      {/* Heading */}
      <div className="flex items-center space-x-2">
        <BsClock /> <span className="font-medium">Office Timing</span>
      </div>

      {/* Timings Box */}
      <div className="rounded-xl border border-light-gray text-[.7rem] overflow-hidden">
        {/* Row 1 */}
        <div className="flex border-b border-light-gray">
          <div className="min-w-24 border-r border-light-gray p-2">
            Open Timing
          </div>
          <div className=" p-2">Mon-Fri (9am - 6pm)</div>
        </div>
        {/* Row 2 */}
        <div className="flex">
          <div className="min-w-24 border-r border-light-gray p-2">
            Close Timing
          </div>
          <div className=" p-2">Sat - Sun</div>
        </div>
      </div>
    </div>
  );
};

export default OfficeTimingComponent;
