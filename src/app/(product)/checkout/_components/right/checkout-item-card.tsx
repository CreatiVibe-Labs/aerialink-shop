import Image from "next/image";
import React, { FC } from "react";
import { RxCross1 } from "react-icons/rx";

interface CheckoutItemCardProps {
  id: string | number;
  title: string;
  quantity: number | string;
  price: number | string;
  image: string;
  size?: string;
  roomType?: string;
  onRemove?: (id: string | number) => void;
}

const CheckoutItemCard: FC<CheckoutItemCardProps> = ({
  id,
  title,
  quantity,
  price,
  image,
  size,
  roomType,
  onRemove = () => {},
}) => {
  return (
    <div className="flex items-center justify-between border border-primary max-md:border-transparent max-md:p-0 rounded-xl p-2">
      <div className="flex items-center gap-3 max-md:hidden">
        <Image alt={title} src={image} width={500} height={500} className="w-14 h-14 object-cover rounded-md" />
        <div className="flex flex-col">
          <p className="text-light-gray text-sm font-medium">
            {title} x {quantity}
          </p>
          {(size || roomType) && (
            <p className="text-xs text-gray-500">
              {roomType && `${roomType}`}
              {roomType && size && ' • '}
              {size && `Size: ${size}`}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 md:hidden">
        <div className="relative size-14 p-0.5 border-2 border-primary rounded-xl flex-shrink-0">
          <img
            src={image}
            alt={title}
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
          <span className="text-sm font-medium">{title}</span>
          {(size || roomType) && (
            <span className="text-xs text-gray-500">
              {roomType && `${roomType}`}
              {roomType && size && ' • '}
              {size && `Size: ${size}`}
            </span>
          )}
          <span className="text-xs text-gray-600">¥{Number(price).toFixed(2)}</span>
        </div>
      </div>
      <p className=" text-light-gray ">¥{Number(price).toFixed(2)}</p>
    </div>
  );
};

export default CheckoutItemCard;
