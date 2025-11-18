"use client";
import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { useWishlist } from "@/contexts/wishlist-context";

const WishlistIcon = () => {
  const { wishlist } = useWishlist();
  const count = wishlist?.length ?? 0;

  return (
    <Link href={"/wishlist"} className="max-md:hidden">
      <div className="relative">
        <GoHeart size={30} />
        <div className="bg-primary center absolute rounded-full size-4.5 text-xs -top-1 -right-2 text-white">
          <span>{count}</span>
        </div>
      </div>
    </Link>
  );
};

export default WishlistIcon;
