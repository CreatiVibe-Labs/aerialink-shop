import React, { FC } from "react";
import { RxCross1 } from "react-icons/rx";

interface CheckoutItemCardProps {
  id: string | number;
  title: string;
  quantity: number | string;
  price: number | string;
  image: string;
  onRemove?: (id: string | number) => void;
}

const CheckoutItemCard: FC<CheckoutItemCardProps> = ({
  id,
  title,
  quantity,
  price,
  image,
  onRemove = () => {},
}) => {
  return (
    <div className="flex items-center justify-between border border-primary max-md:border-transparent max-md:p-0 rounded-xl p-2">
      <div className="flex items-center gap-3 max-md:hidden">
        <img src={image} alt={title} className="size-14" />
        <p className="text-light-gray text-sm">
          {title} x {quantity}
        </p>
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
          <span className="text-xs text-gray-600">${price}</span>
        </div>
      </div>
      <p className=" text-light-gray ">${price}</p>
    </div>
  );
};

export default CheckoutItemCard;
