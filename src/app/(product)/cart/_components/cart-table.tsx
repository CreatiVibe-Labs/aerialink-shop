"use client";
import React, { useState, useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import Dropdown from "@/components/common/dropdown";
import { CartItem } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";

interface Size {
  id: number;
  size_name: string;
  size_value: string;
  size_value_jp?: string;
  price?: string;
}

interface EnrichedCartItem extends CartItem {
  productData?: any;
  images?: Array<{ url: string }>;
  title_en?: string;
  title_jp?: string;
  availableSizes?: Size[];
}

interface CartTableProps {
  cartItems: (CartItem | EnrichedCartItem)[];
  handleRemove: (index: number) => void;
  handleQuantityChange: (index: number, action: "inc" | "dec") => void;
  handleSizeChange: (index: number, val: string) => void;
  handleRoomTypeChange: (index: number, val: string) => void;
  updatePriceByIndex: (index: number, price: string) => void;
  updateQuantityByIndex: (index: number, qty: number) => void;
  loading?: boolean;
}

const CartTable: React.FC<CartTableProps> = ({
  cartItems,
  handleRemove,
  handleQuantityChange,
  handleSizeChange,
  handleRoomTypeChange,
  updatePriceByIndex,
  updateQuantityByIndex,
  loading = false,
}) => {
  const { language } = useLanguage();
  const [itemSizes, setItemSizes] = useState<{ [key: number]: Size[] }>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Handle dropdown state management
  const handleDropdownToggle = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Function to get price for specific room type and size
  const getPriceForVariant = (productData: any, roomType: string, size: string): string => {
    if (!productData?.variants) return "0";

    const variant = productData.variants.find((v: any) => {
      if ('attributes' in v && v.attributes) {
        const categoryAttr = v.attributes.find((attr: any) =>
          attr.attribute_name.toLowerCase().includes('category') ||
          attr.attribute_name.toLowerCase().includes('type')
        );
        const sizeAttr = v.attributes.find((attr: any) =>
          attr.attribute_name.toLowerCase().includes('size')
        );

        return categoryAttr?.attribute_value === roomType && sizeAttr?.attribute_value === size;
      } else if ('sizes' in v && v.sizes) {
        const categorySizes = v.sizes[roomType as keyof typeof v.sizes];
        return categorySizes?.some((s: Size) => s.size_value === size);
      }
      return false;
    });

    return variant?.price || "0";
  };

  // Enhanced room type change handler that also updates available sizes and price and merges if duplicate exists
  const handleRoomTypeChangeWithSizes = (index: number, roomType: string) => {
    const item = cartItems[index] as EnrichedCartItem;

    if (item?.productData) {
      const availableSizes = getSizesForRoomType(item.productData, roomType);

      // If current size is not available for new room type, reset to first available size
      if (availableSizes.length > 0) {
        const currentSize = item.size;
        const isSizeAvailable = availableSizes.some(size => size.size_value === currentSize);

        let finalSize = currentSize;
        if (!isSizeAvailable) {
          finalSize = availableSizes[0].size_value;
        }

        // Check if changing room type (and potentially size) will create a duplicate
        const existingItemIndex = cartItems.findIndex((cartItem, i) =>
          i !== index &&
          cartItem.id === item.id &&
          cartItem.room_type === roomType &&
          cartItem.size === finalSize
        );

        if (existingItemIndex !== -1) {
          // Merge with existing item
          const existingItem = cartItems[existingItemIndex];
          const newQuantity = existingItem.quantity + item.quantity;

          // Update existing item quantity
          updateQuantityByIndex(existingItemIndex, newQuantity);

          // Remove current item
          handleRemove(index);
        } else {
          // No duplicate, update normally
          handleRoomTypeChange(index, roomType);

          if (!isSizeAvailable) {
            handleSizeChange(index, finalSize);
          }

          // Update price based on new room type and size
          const newPrice = getPriceForVariant(item.productData, roomType, finalSize);
          if (newPrice !== "0") {
            updatePriceByIndex(index, newPrice);
          }
        }
      }
    }
  };

  // Enhanced size change handler that updates price and merges if duplicate exists
  const handleSizeChangeWithPrice = (index: number, size: string) => {
    const item = cartItems[index] as EnrichedCartItem;

    // Check if changing size will create a duplicate
    const existingItemIndex = cartItems.findIndex((cartItem, i) =>
      i !== index &&
      cartItem.id === item.id &&
      cartItem.room_type === item.room_type &&
      cartItem.size === size
    );

    if (existingItemIndex !== -1) {
      // Merge with existing item
      const existingItem = cartItems[existingItemIndex];
      const newQuantity = existingItem.quantity + item.quantity;

      // Update existing item quantity
      updateQuantityByIndex(existingItemIndex, newQuantity);

      // Remove current item
      handleRemove(index);
    } else {
      // No duplicate, just update size and price normally
      handleSizeChange(index, size);

      if (item?.productData && item.room_type) {
        const newPrice = getPriceForVariant(item.productData, item.room_type, size);
        if (newPrice !== "0") {
          updatePriceByIndex(index, newPrice);
        }
      }
    }
  };

  return (
    <div ref={tableRef} className="overflow-x-auto hidden md:block">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="bg-primary text-white text-sm">
            <th className="py-4 text-left pl-6 rounded-l-lg font-medium">
              Product
            </th>
            <th className="py-4 text-left font-medium">Price</th>
            <th className="py-4 text-left font-medium">Quantity</th>
            <th className="py-4 text-left font-medium">Room Type</th>
            <th className="py-4 text-left font-medium">Size</th>
            <th className="py-4 text-left rounded-r-lg font-medium">
              Subtotal
            </th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item, index) => {
            const enrichedItem = item as EnrichedCartItem;
            const hasEnrichedData = 'images' in item && 'title_en' in item;
            return (
              <tr key={item.id} className="shadow-xs rounded-xl text-gray-700">
                {/* Product Column */}
                <td className="py-3 pl-6 flex items-center gap-3">
                  <div className="relative w-16 h-16 p-0.5 border-2 border-primary rounded-xl">
                    <img
                      src={hasEnrichedData ? enrichedItem.images?.[0]?.url || "/fallback-image.png" : "/fallback-image.png"}
                      alt={hasEnrichedData ? (language === "EN" ? enrichedItem.title_en : enrichedItem.title_jp) : "Product"}
                      className="rounded-md w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemove(index)}
                      className="absolute -top-1.5 -left-2 bg-red-600 cursor-pointer text-white rounded-full p-1 text-xs"
                    >
                      <RxCross1 strokeWidth={1.5} size={9} />
                    </button>
                  </div>
                  <span className="text-sm font-medium">
                    {loading ? "Loading..." : hasEnrichedData
                      ? (language === "EN" ? enrichedItem.title_en || "Product Name" : enrichedItem.title_jp || "Product Name")
                      : "Product Name"}
                  </span>
                </td>

                {/* Price Column */}
                <td className="py-3 text-sm">¥{Number(item.price).toLocaleString()}</td>

                {/* Quantity Column */}
                <td className="py-3 text-sm">
                  <div className="flex items-center gap-3 rounded-md px-3 py-1 w-fit">
                    <button
                      onClick={() => handleQuantityChange(index, "dec")}
                      className="text-gray-500 text-lg cursor-pointer"
                    >
                      –
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => updateQuantityByIndex(index, parseInt(e.target.value, 10))}
                      className="text-sm w-12 text-center outline-0"
                    />
                    <button
                      onClick={() => handleQuantityChange(index, "inc")}
                      className="text-gray-500 text-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Room Type Dropdown */}
                <td className="py-3 text-sm">
                  <Dropdown
                    className="bg-transparent border border-light-gray text-min-gray! max-md:py-1.5 text-sm px-5 rounded-xl"
                    DropDownclassName={`bg-white text-min-gray! !z-[${50 + index}]`}
                    hideLabelOnMobile={false}
                    label={item.room_type || "Select Room"}
                    forceClose={openDropdown !== null && openDropdown !== `room-${index}`}
                    onOpen={() => handleDropdownToggle(`room-${index}`)}
                    list={(() => {
                      if (!hasEnrichedData || !enrichedItem.productData) {
                        return [
                          { key: "Edoma", val: "Edoma" },
                          { key: "Danchima", val: "Danchima" },
                        ];
                      }

                      const availableRoomTypes = getAvailableRoomTypes(enrichedItem.productData);
                      return availableRoomTypes.map(roomType => ({
                        key: roomType,
                        val: roomType
                      }));
                    })()}
                    onChange={(val) => {
                      handleRoomTypeChangeWithSizes(index, val);
                      closeAllDropdowns();
                    }}
                  />
                </td>

                {/* Size Dropdown */}
                <td className="py-3 text-sm">
                  <Dropdown
                    className="bg-transparent border border-light-gray text-min-gray! max-md:py-1.5 text-sm px-5 rounded-xl"
                    DropDownclassName={`bg-white text-min-gray! !z-[${40 + index}]`}
                    hideLabelOnMobile={false}
                    label={item.size || "Select Size"}
                    forceClose={openDropdown !== null && openDropdown !== `size-${index}`}
                    onOpen={() => handleDropdownToggle(`size-${index}`)}
                    list={(() => {
                      if (!hasEnrichedData || !enrichedItem.productData) {
                        return [
                          { key: "small", val: "Small" },
                          { key: "medium", val: "Medium" },
                          { key: "large", val: "Large" },
                        ];
                      }

                      const availableSizes = getSizesForRoomType(enrichedItem.productData, item.room_type);
                      return availableSizes.map((size: Size) => ({
                        key: size.size_value,
                        val: size.size_value // Use size_value directly (e.g., "175 * 260cm")
                      }));
                    })()}
                    onChange={(val) => {
                      handleSizeChangeWithPrice(index, val);
                      closeAllDropdowns();
                    }}
                  />
                </td>

                {/* Subtotal */}
                <td className="py-3 text-sm">
                  ¥{(Number(item.price) * item.quantity).toLocaleString()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
