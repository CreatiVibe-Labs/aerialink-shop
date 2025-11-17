"use client";
import Dropdown from "@/components/common/dropdown";
import SmallHeading from "@/components/common/small-heading";
import { useCategory } from "@/contexts/category-context";
import { useLanguage } from "@/contexts/language-context";
import React from "react";

const FilterBar: React.FC = () => {
  const { state, setCategory, setSort, setSizes } = useCategory();
  const { categories, catLoading, selectedCategory, selectedSort, selectedSizes } = state;
  const { language } = useLanguage();

  const getLabelForKey = (key: string) => {
    switch (key) {
      case "latest":
        return "Latest";
      case "price_low":
        return "Low to High";
      case "price_high":
        return "High to Low";
      case "size_edoma":
        return "Edoma";
      case "size_danchima":
        return "Danchima";
      default:
        return "Latest";
    }
  };
  const activeKey = selectedSort ?? "latest";
  const activeLabel = getLabelForKey(activeKey);
  const toggleSize = (size: string) => {
    const next = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSizes(next);
  };

  const summaryTop = [activeLabel, selectedSizes.length ? `Sizes: ${selectedSizes.join(", ")}` : ""]
    .filter(Boolean)
    .join("  •  ");

  return (
    <>
      <div className="flex items-center justify-between gap-4 bg-primary max-xl:bg-transparent rounded-2xl px-4 py-2 max-xl:px-0">
        {/* Category Buttons */}
        <div className="xl:flex gap-6 text-white text-[17px] hidden w-full justify-evenly">
          {/* ALL Button */}
          <button
            onClick={() => {
              setCategory(null);
            }}
            className={`px-4 w-full cursor-pointer py-2 rounded-xl font-medium transition-colors  ${
              selectedCategory === null
                ? "bg-white/20 text-white"
                : "hover:bg-white/20 text-white/80"
            }`}
          >
            All
          </button>

          {/* Dynamic Category Buttons */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 w-full py-2 cursor-pointer rounded-xl font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-white/20 text-white "
                  : "hover:bg-white/20 text-white/80"
              }`}
            >
              {language === "EN" ? cat.name_en : cat.name_jp}
            </button>
          ))}
        </div>

        {/* Mobile Heading */}
        <SmallHeading label="Our Product" className="xl:hidden" />

        {/* Sort Dropdown */}
        <Dropdown
          label={"Filters"}
          hideLabelOnMobile={false}
          DropDownclassName="right-0 !z-9"
          className="bg-white/20! z-99 px-5 max-md:px-3 max-md:text-sm max-xl:bg-primary!"
          labelClassName="text-[17px]"
          list={[
            { key: "summary", val: summaryTop, type: "label" },
            { key: "divider-1", val: "", type: "divider" },
            { key: "label-price", val: "Price:", type: "label" },
            { key: "price_low", val: "Low to High", showCheckbox: true, checked: activeKey === "price_low" },
            { key: "price_high", val: "High to Low", showCheckbox: true, checked: activeKey === "price_high" },
            { key: "divider-2", val: "", type: "divider" },
            { key: "label-size", val: "Size:", type: "label" },
            {
              key: "size_edoma",
              val: "Edoma",
              showCheckbox: true,
              checked: selectedSizes.includes("Edoma"),
              keepOpen: true,
              onClick: () => toggleSize("Edoma"),
            },
            {
              key: "size_danchima",
              val: "Danchima",
              showCheckbox: true,
              checked: selectedSizes.includes("Danchima"),
              keepOpen: true,
              onClick: () => toggleSize("Danchima"),
            },
          ]}
          onChange={(key) => {
            // price is single-select; update sort
            if (key === "price_low" || key === "price_high") {
              setSort(key);
            } else if (key === "latest") {
              setSort("latest");
            }
          }}
        />
      </div>
    </>
  );
};

export default FilterBar;
