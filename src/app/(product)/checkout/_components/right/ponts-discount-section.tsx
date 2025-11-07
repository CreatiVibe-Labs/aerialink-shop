import PrimaryButton from "@/components/common/primary-button";
import React, { ChangeEvent, useState } from "react";

const PontsDiscountSection = () => {
  const [points, setPoints] = useState<number>(60);

  return (
    <div className=" border border-light-gray rounded-xl p-3 max-md:p-4 space-y-3">
      <div className="">
        <h4 className="text-primary  font-bold text-lg">
          Select Points for discount
        </h4>
        <p className="text-sm text-min-gray mb-2">1 point is worth $0.50</p>
      </div>
      <div className="flex items-start  flex-col">
        <span className="text-xs text-primary font-bold mb-1">
          <span className="text-lg">{points}</span> Points
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={points}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPoints(Number(e.target.value))
          }
          className="w-full h-2 appearance-none rounded-lg outline-none cursor-pointer bg-light-gray"
          style={{
            background: `linear-gradient(to right, var(--primary-color) ${points}%, #d1d5db ${points}%)`,
          }}
        />
      </div>
      <PrimaryButton className="min-h-10 max-md:min-h-9 mt-4">
        Apply
      </PrimaryButton>
    </div>
  );
};

export default PontsDiscountSection;
