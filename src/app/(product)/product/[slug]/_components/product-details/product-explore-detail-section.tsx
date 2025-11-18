"use client";
import PrimaryButton from "@/components/common/primary-button";
import { useState } from "react";
import ProductDetailTab1 from "./tabs/product-detail-tab-1";
import ProductDetailTab2 from "./tabs/product-detail-tab-2";
import ProductDetailTab3 from "./tabs/product-detail-tab-3";
import ProductDetailTab4 from "./tabs/product-detail-tab-4";

export default function ProductExploreDetailSection() {
  const [activeTab, setActiveTab] = useState("usage");
  return (
    <section className="mt-8  max-lg:px-0">
      {/* Tabs */}
      <div className="flex max-w-3xl gap-3 max-md:gap-1 mb-6">
        {[
          { key: "usage", label: "Usage Instruction" },
          { key: "description", label: "Description" },
          { key: "additional", label: "Additional Information" },
          { key: "reviews", label: "Reviews" },
        ].map((tab) => (
          <PrimaryButton
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`min-h-10  text-sm max-md:text-xs ${
              activeTab != tab.key ? "opacity-50 cursor-pointer" : ""
            }`}
          >
            {tab.label}
          </PrimaryButton>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl w-full min-h-full ">
        {/* Tab 1 - Usage Instruction */}
        {activeTab === "usage" && <ProductDetailTab1 />}

        {/* Tab 2 - Description */}
        {activeTab === "description" && <ProductDetailTab2 />}

        {/* Tab 3 - Additional Information */}
        {activeTab === "additional" && <ProductDetailTab3 />}

        {/* Tab 4 - Reviews */}
        {activeTab === "reviews" && <ProductDetailTab4 />}
      </div>
    </section>
  );
}
