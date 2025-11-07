import Image from "next/image";
import React from "react";

const EarnPointsTab = () => {
  return (
    <div className="text-center text-gray-700 max-w-[70%] mx-auto max-2xl:max-w-full overflow-hidden">
      <div className="w-full min-h-[20rem] max-md:min-h-[10rem] center border-2 border-light-gray rounded-2xl max-md:rounded-none max-md:border overflow-hidden">
        <img
          src="/assets/poster/earn-points.png"
          alt="earn-points"
          className="max-md:h-[80%] object-contain"
        />
      </div>
      {/* content */}
      <div className="mt-5 flex items-start max-sm:mt-3">
        <p className="text-start max-md:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          tincidunt euismod ante. Vivamus placerat at enim non condimentum.
          Donec sit amet mauris purus. Lorem ipsum dolor sit amet,
          consecteturLorem.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Praesent tincidunt euismod ante. Vivamus placerat at enim non
          condimentum. Donec sit amet mauris purus. Lorem ipsum dolor sit amet,
          consecteturLorem.
        </p>
      </div>
    </div>
  );
};

export default EarnPointsTab;
