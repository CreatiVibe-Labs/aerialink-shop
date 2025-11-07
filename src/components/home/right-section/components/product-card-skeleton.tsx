"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const ProductCardSkeleton: FC = () => {
  return (
    <div className="bg-white cover-shadow relative rounded-2xl grid grid-cols-1 p-3 max-sm:p-2 px-4">
      {/* wishlist icon */}
      <div className="absolute top-3 right-3 max-sm:top-1 max-sm:right-1">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* image placeholder */}
      <div className="w-full min-h-52 max-md:min-h-40 max-sm:min-h-32 relative">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>

      {/* text placeholders */}
      <div className="mt-3 flex flex-col space-y-2">
        <Skeleton className="h-5 w-3/4" /> {/* product name */}
        <Skeleton className="h-4 w-1/3" /> {/* price */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded-full" />
          ))}
          <Skeleton className="h-4 w-10 ml-1" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl mt-2" /> {/* button */}
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
