"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import Dropdown from "@/components/common/dropdown";
import { CartItem } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";

interface CartTableProps {
  cartItems: CartItem[];
  handleRemove: (id: number) => void;
  handleQuantityChange: (id: number, action: "inc" | "dec") => void;
  handleSizeChange: (id: number, val: string) => void;
}

const CartTable: React.FC<CartTableProps> = ({
  cartItems,
  handleRemove,
  handleQuantityChange,
  handleSizeChange,
}) => {
  const { language } = useLanguage();

  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="bg-primary text-white text-sm">
            <th className="py-4 text-left pl-6 rounded-l-lg font-medium">
              Product
            </th>
            <th className="py-4 text-left font-medium">Price</th>
            <th className="py-4 text-left font-medium">Quantity</th>
            <th className="py-4 text-left font-medium">Size</th>
            <th className="py-4 text-left rounded-r-lg font-medium">
              Subtotal
            </th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id} className="shadow-xs rounded-xl text-gray-700">
              {/* Product Column */}
              <td className="py-3 pl-6 flex items-center gap-3">
                <div className="relative w-16 h-16 p-0.5 border-2 border-primary rounded-xl">
                  <img
                    src={item.images[0].url}
                    alt={item.translations.en.name}
                    className="rounded-md w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute -top-1.5 -left-2 bg-red-600 cursor-pointer text-white rounded-full p-1 text-xs"
                  >
                    <RxCross1 strokeWidth={1.5} size={9} />
                  </button>
                </div>
                <span className="text-sm font-medium">
                  {language === "EN"
                    ? item?.translations.en.name
                    : item?.translations.jp.name}
                </span>
              </td>

              {/* Price Column */}
              <td className="py-3 text-sm">${item.price}</td>

              {/* Quantity Column */}
              <td className="py-3 text-sm">
                <div className="flex items-center gap-3 rounded-md px-3 py-1 w-fit">
                  <button
                    onClick={() => handleQuantityChange(item.id, "dec")}
                    className="text-gray-500 text-lg cursor-pointer"
                  >
                    –
                  </button>
                  <span className="text-sm w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "inc")}
                    className="text-gray-500 text-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </td>

              {/* Size Dropdown */}
              <td className="py-3 text-sm">
                <Dropdown
                  className="bg-transparent border border-light-gray text-min-gray! max-md:py-1.5 text-sm px-5 rounded-xl"
                  DropDownclassName={`bg-white text-min-gray! !z-[${
                    40 + index
                  }]`}
                  hideLabelOnMobile={false}
                  label="Size"
                  list={[
                    { key: "small", val: "Small" },
                    { key: "medium", val: "Medium" },
                    { key: "large", val: "Large" },
                  ]}
                  onChange={(val) => handleSizeChange(item.id, val)}
                />
              </td>

              {/* Subtotal */}
              <td className="py-3 text-sm">
                ${Number(item.price) * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
