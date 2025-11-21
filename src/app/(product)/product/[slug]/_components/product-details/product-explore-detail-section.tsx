"use client";
import PrimaryButton from "@/components/common/primary-button";
import { useState, useEffect, useRef } from "react";
import ProductDetailTab1 from "./tabs/product-detail-tab-1";
import ProductDetailTab2 from "./tabs/product-detail-tab-2";
import ProductDetailTab3 from "./tabs/product-detail-tab-3";
import ProductDetailTab4 from "./tabs/product-detail-tab-4";

export default function ProductExploreDetailSection() {
  const tabs = [
    { key: "usage", label: "Usage Instruction" },
    { key: "description", label: "Description" },
    { key: "additional", label: "Additional Information" },
    { key: "reviews", label: "Reviews" },
  ];

  const [activeTab, setActiveTab] = useState("usage");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <section className="mt-8 max-lg:px-0">
      {/* Mobile Dropdown (hidden on md and above) */}
      <div ref={dropdownRef} className="md:hidden mb-6 w-full relative">
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="w-full rounded-custom bg-primary text-white font-medium px-4 py-2 text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/60"
        >
          <span>{tabs.find((t) => t.key === activeTab)?.label}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl shadow-md border border-primary/20 overflow-hidden z-10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-150 flex items-center justify-between ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "text-gray-800 hover:bg-primary/10"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="ml-2 text-xs bg-primary/20 text-white rounded px-2 py-0.5">Selected</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tabs (hidden on small screens) */}
      <div className="hidden md:flex max-w-3xl gap-3 mb-6">
        {tabs.map((tab) => (
          <PrimaryButton
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`min-h-10 text-sm ${
              activeTab !== tab.key ? "opacity-50 cursor-pointer" : ""
            }`}
          >
            {tab.label}
          </PrimaryButton>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl w-full min-h-full">
        {activeTab === "usage" && <ProductDetailTab1 />}
        {activeTab === "description" && <ProductDetailTab2 />}
        {activeTab === "additional" && <ProductDetailTab3 />}
        {activeTab === "reviews" && <ProductDetailTab4 />}
      </div>
    </section>
  );
}
