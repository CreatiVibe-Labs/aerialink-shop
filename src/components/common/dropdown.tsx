"use client";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { createPortal } from "react-dom";

interface DropdownItem {
  key: string;
  val: string;
  onClick?: () => void;
  type?: "item" | "label" | "divider";
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

const Dropdown: FC<DropdownI> = ({
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
      if (item.type && item.type !== "item") {
        return; // non-interactive entries
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
      className={`absolute text-white bg-primary mt-1 rounded-2xl p-2 shadow-lg ${DropDownclassName}`}
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
              <li key={index} className="my-2 h-px bg-white/30" aria-hidden="true" />
            );
          }
          if (item.type === "label") {
            return (
              <li key={index} className="px-2 py-1 text-xs uppercase tracking-wide text-white/80 cursor-default select-none">
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
              className={`hover:bg-white/20 duration-150 text-sm transition-all rounded-lg px-2 py-1 whitespace-normal break-words flex items-center gap-2 ${
                item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              role="button"
              tabIndex={0}
            >
              {item.showCheckbox ? (
                <input
                  type="checkbox"
                  checked={!!item.checked}
                  readOnly
                  className="accent-white cursor-pointer"
                />
              ) : null}
              <span className="flex-1">{item.val}</span>
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
        className={`bg-primary right-0 rounded-2xl  w-full px-[15px] py-[9px] flex items-center justify-between space-x-3 cursor-pointer text-white select-none ${className}`}
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

export default Dropdown;