"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import Dropdown from "@/components/common/dropdown";

interface Size {
  id: number;
  size_name: string;
  size_value: string;
  size_value_jp?: string;
  price?: string;
}

interface MobileCartCardProps {
  id: number;
  image: string;
  name: string;
  price: number | string;
  quantity: number;
  size: string;
  roomType: string;
  index: number;
  productData?: any;
  onRemove: (index: number) => void;
  onQuantityChange: (index: number, action: "inc" | "dec") => void;
  onSizeChange: (index: number, size: string) => void;
  onRoomTypeChange: (index: number, roomType: string) => void;
  openDropdown?: string | null;
  onDropdownToggle?: (dropdownId: string) => void;
}

const MobileCartCard: React.FC<MobileCartCardProps> = ({
  id,
  image,
  name,
  price,
  quantity,
  size,
  roomType,
  index,
  productData,
  onRemove,
  onQuantityChange,
  onSizeChange,
  onRoomTypeChange,
  openDropdown,
  onDropdownToggle,
}) => {

  // Function to get available room types from product variants
  const getAvailableRoomTypes = (productData: any): string[] => {
    if (!productData?.variants) return ["Edoma", "Danchima"]; // fallback

    const roomTypes = new Set<string>();
    productData.variants.forEach((variant: any) => {
      if ('attributes' in variant && variant.attributes) {
        const categoryAttr = variant.attributes.find((attr: any) =>
          attr.attribute_name.toLowerCase().includes('category') ||
          attr.attribute_name.toLowerCase().includes('type')
        );
        if (categoryAttr?.attribute_value) {
          roomTypes.add(categoryAttr.attribute_value);
        }
      } else if ('sizes' in variant && variant.sizes) {
        Object.keys(variant.sizes).forEach(roomType => {
          if (variant.sizes[roomType]?.length > 0) {
            roomTypes.add(roomType);
          }
        });
      }
    });

    return Array.from(roomTypes).length > 0 ? Array.from(roomTypes) : ["Edoma", "Danchima"];
  };

  // Function to get sizes for a specific room type from product variants
  const getSizesForRoomType = (productData: any, roomType: string): Size[] => {
    if (!productData?.variants) return [];

    const sizes: Size[] = [];
    productData.variants.forEach((variant: any) => {
      if ('attributes' in variant && variant.attributes) {
        const categoryAttr = variant.attributes.find((attr: any) =>
          attr.attribute_name.toLowerCase().includes('category') ||
          attr.attribute_name.toLowerCase().includes('type')
        );

        if (categoryAttr?.attribute_value === roomType) {
          const sizeAttr = variant.attributes.find((attr: any) =>
            attr.attribute_name.toLowerCase().includes('size')
          );

          if (sizeAttr) {
            const sizeObj: Size = {
              id: variant.id,
              size_name: sizeAttr.attribute_value,
              size_value: sizeAttr.attribute_value,
              price: variant.price
            };

            if (!sizes.find(s => s.size_value === sizeObj.size_value)) {
              sizes.push(sizeObj);
            }
          }
        }
      } else if ('sizes' in variant && variant.sizes) {
        const categorySizes = variant.sizes[roomType as keyof typeof variant.sizes];
        if (categorySizes) {
          categorySizes.forEach((size: Size) => {
            if (!sizes.find(s => s.size_value === size.size_value)) {
              sizes.push(size);
            }
          });
        }
      }
    });

    return sizes;
  };

  const availableRoomTypes = getAvailableRoomTypes(productData);
  const availableSizes = getSizesForRoomType(productData, roomType);

  return (
    <div className="w-full rounded-xl border border-gray-200 p-4 flex flex-col gap-4 shadow-sm bg-white">
      {/* Row 1: Product Info */}
      <div className="flex items-start gap-4 relative">
        <div className="relative w-20 h-20 p-0.5 border-2 border-primary rounded-xl flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="rounded-md w-full h-full object-cover"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute -top-2 -left-2 bg-red-600 text-white rounded-full p-1.5 text-xs shadow-md z-10"
          >
            <RxCross1 strokeWidth={1.5} size={10} />
          </button>
        </div>
        <div className="flex flex-col gap-1 pt-1">
          <span className="text-base font-semibold text-gray-800 line-clamp-2">{name}</span>
          <span className="text-sm text-[#AFB1AE] font-medium">¥{Number(price).toLocaleString()}</span>
        </div>
      </div>

      {/* Row 2: Controls & Subtotal */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Room Type */}
          <Dropdown
            className="bg-transparent border border-light-gray text-[#AFB1AE]! text-xs px-3 py-2 rounded-lg w-full"
            DropDownclassName={`bg-white text-[#AFB1AE]! !z-[${50 + index}]`}
            hideLabelOnMobile={false}
            label={roomType || "Room Type"}
            list={availableRoomTypes.map(rt => ({ key: rt, val: rt }))}
            onChange={(val) => onRoomTypeChange(index, val)}
          />

          {/* Size */}
          <Dropdown
            className="bg-transparent border border-light-gray text-[#AFB1AE]! text-xs px-3 py-2 rounded-lg w-full"
            DropDownclassName={`bg-white text-[#AFB1AE]! !z-[${40 + index}]`}
            hideLabelOnMobile={false}
            label={size || "Size"}
            list={availableSizes.length > 0
              ? availableSizes.map(s => ({ key: s.size_value, val: s.size_value }))
              : [
                { key: "small", val: "Small" },
                { key: "medium", val: "Medium" },
                { key: "large", val: "Large" },
              ]
            }
            onChange={(val) => onSizeChange(index, val)}
          />
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          {/* Quantity */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-1">
            <button
              onClick={() => onQuantityChange(index, "dec")}
              className="text-[#AFB1AE] text-lg cursor-pointer hover:text-primary transition-colors"
            >
              –
            </button>
            <span className="text-sm w-4 text-center font-medium text-gray-700">{quantity}</span>
            <button
              onClick={() => onQuantityChange(index, "inc")}
              className="text-[#AFB1AE] text-lg cursor-pointer hover:text-primary transition-colors"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <span className="text-xs text-gray-400 block">Subtotal</span>
            <span className="text-primary font-bold text-base">¥{(Number(price) * quantity).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCartCard;
