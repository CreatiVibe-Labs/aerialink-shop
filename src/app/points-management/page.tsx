"use client";

import { useState } from "react";
import BreadCrumbs from "@/components/common/bread-crumbs";
import PointsBar from "./_components/points-bar";
import PrimaryButton from "@/components/common/primary-button";
import LoadButton from "@/components/common/load-button";
import EarnPointsTab from "./_components/tabs/earn-points-tab";
import PointsHistoryTab from "./_components/tabs/points-history-tab";
import TierSummaryTab from "./_components/tabs/tier-summary-tab";

const PointsManagementPage = () => {
  const [activeTab, setActiveTab] = useState<
    "tier-summary" | "points-history-tab" | "earn-points"
  >("tier-summary");

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-5">
      <BreadCrumbs className="max-md:hidden" />

      {/* Points bar */}
      <PointsBar />

      {/* Tabs */}
      <div className="flex justify-between w-[60%] max-2xl:w-[90%] max-md:w-full max-sm:gap-1 max-sm:mt-5 max-md:mt-10 mx-auto gap-3 mt-14">
        <PrimaryButton
          onClick={() => setActiveTab("tier-summary")}
          className={`cursor-pointer w-full max-md:min-h-10 max-sm:text-xs ${activeTab === "tier-summary"
            ? "text-white"
            : "bg-transparent border-2 border-primary text-primary! hover:text-white!"
            }`}
        >
          Tier Summary
        </PrimaryButton>

        <PrimaryButton
          onClick={() => setActiveTab("points-history-tab")}
          className={`cursor-pointer w-full max-md:min-h-10  max-sm:text-xs ${activeTab === "points-history-tab"
            ? "text-white"
            : "bg-transparent border-2 border-primary text-primary! hover:text-white!"
            }`}
        >
          Points History
        </PrimaryButton>

        <PrimaryButton
          onClick={() => setActiveTab("earn-points")}
          className={`cursor-pointer w-full max-md:min-h-10 max-sm:text-xs ${activeTab === "earn-points"
            ? "text-white"
            : "bg-transparent border-2 border-primary text-primary! hover:text-white!"
            }`}
        >
          How to Earn Points
        </PrimaryButton>
      </div>

      {/* Tab Content */}
      <div className="mt-10 max-md:mt-5">
        {activeTab === "tier-summary" && <TierSummaryTab currentTier="gold" />}

        {activeTab === "points-history-tab" && <PointsHistoryTab />}

        {activeTab === "earn-points" && <EarnPointsTab />}
      </div>
    </div>
  );
};

export default PointsManagementPage;