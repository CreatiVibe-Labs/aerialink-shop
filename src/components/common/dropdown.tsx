"use client";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { createPortal } from "react-dom";

interface DropdownItem {
  key: string;
  val: string;
  onClick?: () => void; 
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

  const handleItemClick = async (item: DropdownItem, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); 
    console.log(`Clicked on item: ${item.val}`); 
    try {
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
      setOpenDropdown(false); 
    }
  };

  const dropdownMenu = (
    <div
      className={`absolute min-w-fit text-white bg-primary mt-1 rounded-2xl p-2 shadow-lg ${DropDownclassName}`}
      style={{
        top: coords.top,
        left: coords.left,
        width: coords.width,
        position: "absolute",
        zIndex: 9999,
      }}
    >
      <ul>
        {list.map((item, index) => (
          <li
            key={index}
            onClick={(e) => {
              console.log(`Direct click on ${item.val}`); 
              handleItemClick(item, e);
            }}
            className="hover:bg-white/20 duration-150 text-sm cursor-pointer transition-all rounded-lg px-2 py-1 text-nowrap"
            role="button" 
            tabIndex={0} 
          >
            {item.val}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div ref={buttonRef} className={`relative z-[30] max-w-fit ${mainParentClass}`}>
      <div
        onClick={() => {
          console.log("Dropdown toggled");
          setOpenDropdown((prev) => !prev);
        }}
        className={`bg-primary rounded-2xl w-full p-2 flex items-center justify-center space-x-2 cursor-pointer text-white select-none ${className}`}
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