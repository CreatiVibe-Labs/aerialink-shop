"use client";
import Dropdown from "@/components/common/dropdown";
import SmallHeading from "@/components/common/small-heading";
import { useCategory } from "@/contexts/category-context";
import { useLanguage } from "@/contexts/language-context";
import React from "react";

const FilterBar: React.FC = () => {
  const { state, setCategory, setSort } = useCategory();
  const { categories, catLoading, selectedCategory, selectedSort } = state;
  const { language } = useLanguage();

  return (
    <>
      <div className="flex items-center justify-between gap-4 bg-primary max-xl:bg-transparent rounded-2xl px-4 py-2 max-xl:px-0">
        {/* Category Buttons */}
        <div className="xl:flex gap-6 text-white hidden w-full justify-evenly">
          {/* ALL Button */}
          <button
            onClick={() => {
              setCategory(null);
            }} // send null instead of "all"
            className={`px-4 cursor-pointer py-2 rounded-xl font-medium transition-colors ${
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
              className={`px-4 py-2 cursor-pointer rounded-xl font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/20 text-white/80"
              }`}
            >
              {language === "EN"
                ? cat.name_en
                : cat.name_jp}
            </button>
          ))}
        </div>

        {/* Mobile Heading */}
        <SmallHeading label="Our Product" className="xl:hidden" />

        {/* Sort Dropdown */}
        <Dropdown
          label={selectedSort ?? "Filters"}
          hideLabelOnMobile={false}
          DropDownclassName="right-0"
          className="bg-white/20! px-5 max-md:px-3 max-md:text-sm max-xl:bg-primary!"
          list={[
            { key: "latest", val: "Latest" },
            { key: "price_low", val: "Price: Low to High" },
            { key: "price_high", val: "Price: High to Low" },
            { key: "size_edoma", val: "Size: Edoma" },
            { key: "size_danchima", val: "Size: Danchima" },
          ]}
          onChange={(key) => setSort(key)}
        />
      </div>
    </>
  );
};

export default FilterBar;
