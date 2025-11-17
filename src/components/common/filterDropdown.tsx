"use client";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { createPortal } from "react-dom";

interface DropdownItem {
  key: string;
  val: string;
  onClick?: () => void;
  type?: "item" | "label" | "divider" | "button";
  disabled?: boolean;
  checked?: boolean;
  showCheckbox?: boolean;
  keepOpen?: boolean; // keep menu open after click (for multi-select)
}

interface DropdownI {
  prefixIcon?: ReactElement;
  label: string;
  list: DropdownItem[];
  onChange?: (val: string) => void; 
  className?: string;
  mainParentClass?: string;
  DropDownclassName?: string;
  hideLabelOnMobile?: boolean;
  labelClassName?: string;
  forceClose?: boolean;
  onOpen?: () => void;
}

const FilterDropdown: FC<DropdownI> = ({
  prefixIcon,
  label,
  list = [],
  onChange,
  className = "",
  hideLabelOnMobile = true,
  DropDownclassName = "",
  mainParentClass = "",
  labelClassName = "",
  forceClose = false,
  onOpen,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [openDropdown]);

  // Force close effect
  useEffect(() => {
    if (forceClose && openDropdown) {
      setOpenDropdown(false);
    }
  }, [forceClose]);

  const handleItemClick = async (item: DropdownItem, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); 
    console.log(`Clicked on item: ${item.val}`); 
    try {
      // Skip non-interactive entries (label, divider) but allow button type
      if (item.type && (item.type === "label" || item.type === "divider")) {
        return;
      }
      if (item.disabled) {
        return;
      }
      if (item.onClick) {
        console.log(`Executing onClick for ${item.val}`);
        await item.onClick(); 
      } else if (onChange) {
        console.log(`Executing onChange for ${item.key}`);
        onChange(item.key);
      }
    } catch (error) {
      console.error("Error in handleItemClick:", error);
    } finally {
      console.log("Closing dropdown");
      if (!item.keepOpen) setOpenDropdown(false); 
    }
  };

  const dropdownMenu = (
    <div
      className={`text-white bg-primary mt-2 rounded-2xl p-4 shadow-2xl max-h-[70vh] overflow-y-auto border border-white/10 ${DropDownclassName}`}
      style={{
        top: coords.top,
        left: coords.left,
        width: coords.width,
        position: "absolute",
        zIndex: 9999,
      }}
    >
      <ul>
        {list.map((item, index) => {
          if (item.type === "divider") {
            return (
              <li key={index} className="my-3 mx-1 h-px bg-white/15" aria-hidden="true" />
            );
          }
          if (item.type === "button") {
            return (
              <li 
                key={index} 
                onClick={(e) => handleItemClick(item, e)}
                className="px-4 py-3 mb-3 bg-[#CCCCFF] hover:bg-[#CCCCFF]/50 text-white text-center font-bold rounded-xl cursor-pointer transition-all shadow-md"
              >
                {item.val}
              </li>
            );
          }
          if (item.type === "label") {
            const isActiveFilters = item.val.includes("•") || item.val.includes("No filters");
            return (
              <li key={index} className={`px-3 py-2.5 rounded-lg mb-1 ${
                isActiveFilters 
                  ? "bg-white/10 text-sm font-medium text-white" 
                  : "text-xs font-bold tracking-wider text-white/90"
              } cursor-default select-none`}>
                {item.val}
              </li>
            );
          }
          return (
            <li
              key={index}
              onClick={(e) => {
                console.log(`Direct click on ${item.val}`);
                handleItemClick(item, e);
              }}
              className={`duration-200 text-sm transition-all rounded-xl px-3 py-3 whitespace-normal break-words flex items-center gap-3 ${
                item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } ${
                item.checked ? "bg-white/20 hover:bg-white/25 shadow-sm mb-2" : "hover:bg-white/10 mb-2"
              }`}
              role="button"
              tabIndex={0}
            >
              {item.showCheckbox ? (
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                  item.checked 
                    ? "bg-white border-white shadow-sm" 
                    : "border-white/60 bg-white/5"
                }`}>
                  {item.checked && (
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ) : null}
              <span className={`flex-1 font-medium transition-colors ${
                item.checked ? "text-white" : "text-white/90"
              }`}>{item.val}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div ref={buttonRef} className={`relative z-[30] max-w-fit ${mainParentClass}`}>
      <div
        onClick={() => {
          console.log("Dropdown toggled");
          if (!openDropdown && onOpen) {
            onOpen(); // Call parent to close other dropdowns
          }
          setOpenDropdown((prev) => !prev);
        }}
        className={`bg-primary right-0 rounded-2xl min-w-[190px] w-full p-2 flex items-center justify-between space-x-2 cursor-pointer text-white select-none ${className}`}
      >
        {prefixIcon ?? ""}
        <span
          className={`${hideLabelOnMobile ? "" : ""} ${labelClassName} uppercase`}
        >
          {label}
        </span>
        <BiChevronDown size={20} />
      </div>

      {openDropdown && createPortal(dropdownMenu, document.body)}
    </div>
  );
};

export default FilterDropdown;