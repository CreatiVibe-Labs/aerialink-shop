import Badge from "@/components/common/badge";
import React from "react";
import CouponCard from "../coupon-card/coupon-card";
import LoadButton from "@/components/common/load-button";

// Configuration object for tier data
const tierData = {
  basic: {
    name: "Basic Tier",
    progress: 40, // Percentage of progress
    pointsNeeded: 120,
    nextTier: "Silver Tier",
  },
  silver: {
    name: "Silver Tier",
    progress: 60, // Percentage of progress
    pointsNeeded: 200,
    nextTier: "Gold Tier",
  },
  gold: {
    name: "Gold Tier",
    progress: 80, // Percentage of progress
    pointsNeeded: 300,
    nextTier: "Platinum Tier",
  },
  platinum: {
    name: "Platinum Tier",
    progress: 100, // Percentage of progress
    pointsNeeded: 0,
    nextTier: null,
  },
};

const TierSummaryTab: React.FC<{ currentTier: keyof typeof tierData }> = ({
  currentTier,
}) => {
  const tier = tierData[currentTier];

  return (
    <>
      <div
        className="max-w-[70%] max-2xl:max-w-full rounded-xl mx-auto min-h-40 max-md:min-h-32 max-md:space-y-1 py-3 shadow-lg bg-white relative flex items-start p-3 justify-center flex-col space-y-4 w-full"
        style={{
          boxShadow: "0px 0px 7.7px 0px #00000045",
        }}
      >
        {/* Heading */}
        <h3 className="font-bold text-primary text-2xl max-md:text-base">Tier Point Balance</h3>

        {/* Tier Progress */}
        <div className="flex flex-col w-full space-y-2">
          <h3 className="font-semibold text-light-gray max-md:text-sm">{tier.name}</h3>

          <div
            className={`border-2  rounded-xl h-11 w-full overflow-hidden p-0.5 ${
              tier.name === "Basic Tier"
                ? "border-[#A9CBA4]"
                : tier.name === "Silver Tier"
                ? "border-gray-400"
                : tier.name === "Gold Tier"
                ? "border-yellow-400"
                : "border-gray-500"
            }`}
          >
            {/* Progress Bar */}
            <div
              className={`h-full rounded-lg transition-all duration-500 ${
                tier.name === "Basic Tier"
                  ? "bg-[#A9CBA4]"
                  : tier.name === "Silver Tier"
                  ? "bg-gray-400"
                  : tier.name === "Gold Tier"
                  ? "bg-yellow-400"
                  : "bg-gray-500"
              }`}
              style={{ width: `${tier.progress}%` }}
            ></div>
          </div>

          <h4 className="text-sm mt-1 flex text-[#E56B73] font-bold max-md:hidden">
            {tier.pointsNeeded > 0
              ? `You need ${tier.pointsNeeded} points to reach ${
                  tier.nextTier || ""
                }`
              : "You have reached the highest tier!"}
            {tier.nextTier && <Badge>{tier.nextTier}</Badge>}
          </h4>
        </div>
      </div>
      {/* Coupons */}
      <div className="center-col w-full max-w-[70%] max-lg:max-w-full  mt-10 mx-auto max-md:mt-5">
        <div className="grid grid-cols-2 min-h-20 w-full place-items-center gap-4 max-md:grid-cols-1">
          <CouponCard />
          <CouponCard />
        </div>
        <LoadButton onClick={() => {}} className="mt-5" />
      </div>
    </>
  );
};

export default TierSummaryTab;
