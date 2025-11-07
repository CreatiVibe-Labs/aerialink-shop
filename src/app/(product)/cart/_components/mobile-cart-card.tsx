"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import Dropdown from "@/components/common/dropdown";

interface MobileCartCardProps {
  id: number;
  image: string;
  name: string;
  price: number | string;
  quantity: number;
  size: string;
  index: number;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, action: "inc" | "dec") => void;
  onSizeChange: (id: number, size: string) => void;
}

const MobileCartCard: React.FC<MobileCartCardProps> = ({
  id,
  image,
  name,
  price,
  quantity,
  size,
  index,
  onRemove,
  onQuantityChange,
  onSizeChange,
}) => {
  return (
    <div className="w-full rounded-xl border border-gray-200 p-3 flex flex-col gap-1 shadow-xs">
      {/* Product Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 p-0.5 border-2 border-primary rounded-xl flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="rounded-md w-full h-full object-cover"
          />
          <button
            onClick={() => onRemove(id)}
            className="absolute -top-1.5 -left-2 bg-red-600 text-white rounded-full p-1 text-xs"
          >
            <RxCross1 strokeWidth={1.5} size={9} />
          </button>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs text-gray-600">${price}</span>
        </div>
      </div>

      {/* Quantity & Size */}
      <div className="flex justify-between  items-end">
        {/* Subtotal */}
        <div className="text-right text-gray-700 font-medium text-sm">
          Subtotal: ${Number(price) * quantity}
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center gap-3 ">
            <button
              onClick={() => onQuantityChange(id, "dec")}
              className="text-min-gray text-lg cursor-pointer"
            >
              –
            </button>
            <span className="text-sm w-3 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(id, "inc")}
              className="text-min-gray text-lg cursor-pointer"
            >
              +
            </button>
          </div>

          <Dropdown
            className="bg-transparent border border-light-gray text-min-gray! text-sm px-3 py-1 rounded-xl"
            DropDownclassName={`bg-white text-min-gray! !z-[${40 + index}]`}
            hideLabelOnMobile={false}
            label="Size"
            list={[
              { key: "small", val: "Small" },
              { key: "medium", val: "Medium" },
              { key: "large", val: "Large" },
            ]}
            onChange={(val) => onSizeChange(id, val)}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileCartCard;
