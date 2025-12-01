"use client";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useProfile } from "@/contexts/profile-context";

const MobileBottomNav = () => {
  const { cartItems } = useCart();
  const { user } = useProfile();

  return (
    <div className="md:hidden  left-0 right-0 z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        {/* Home */}
        <Link href="/" className="flex flex-col items-center text-gray-700" aria-label="Home">
          <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_home)">
              <path d="M0.964844 13.4986L13.5006 0.962891L26.0363 13.4986" stroke="#666664" strokeWidth="1.75261" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.82031 16.3926V26.0354H22.1775V16.3926" stroke="#666664" strokeWidth="1.75261" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_home">
                <rect width="27" height="27" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>

        {/* Points */}
        <Link href="/points-management" className="flex flex-col items-center text-gray-700" aria-label="Points">
          <svg width="28.27" height="28.27" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_points)">
              <path d="M14.1328 9.08742V6.05859" stroke="#666664" strokeWidth="2.01922" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.1016 17.1628C11.1016 18.6772 12.4544 19.182 14.1304 19.182C15.8063 19.182 17.1592 19.182 17.1592 17.1628C17.1592 14.134 11.1016 14.134 11.1016 11.1052C11.1016 9.08594 12.4544 9.08594 14.1304 9.08594C15.8063 9.08594 17.1592 9.85324 17.1592 11.1052" stroke="#666664" strokeWidth="2.01922" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.1289 19.1816V22.2105" stroke="#666664" strokeWidth="2.01922" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.1327 27.2596C21.3814 27.2596 27.2576 21.3834 27.2576 14.1347C27.2576 6.88599 21.3814 1.00977 14.1327 1.00977C6.88403 1.00977 1.00781 6.88599 1.00781 14.1347C1.00781 21.3834 6.88403 27.2596 14.1327 27.2596Z" stroke="#666664" strokeWidth="2.01922" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_points">
                <rect width="28.269" height="28.269" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>

        {/* Cart */}
        <Link href="/cart" className="relative flex flex-col items-center text-gray-700" aria-label="Cart" onClick={(e)=>{e.preventDefault(); window.location.href='/cart';}}>
          <svg width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_cart)">
              <path d="M9.77359 27.7464C10.3734 27.7464 10.8597 27.2601 10.8597 26.6603C10.8597 26.0605 10.3734 25.5742 9.77359 25.5742C9.17376 25.5742 8.6875 26.0605 8.6875 26.6603C8.6875 27.2601 9.17376 27.7464 9.77359 27.7464Z" stroke="#666664" strokeWidth="1.62913" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21.7228 27.7464C22.3226 27.7464 22.8089 27.2601 22.8089 26.6603C22.8089 26.0605 22.3226 25.5742 21.7228 25.5742C21.123 25.5742 20.6367 26.0605 20.6367 26.6603C20.6367 27.2601 21.123 27.7464 21.7228 27.7464Z" stroke="#666664" strokeWidth="1.62913" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.08594 4.93945H5.43029L8.34101 19.4822C8.44033 19.9822 8.71235 20.4314 9.10947 20.7511C9.50658 21.0707 10.0035 21.2406 10.5132 21.2308H21.07C21.5797 21.2406 22.0766 21.0707 22.4737 20.7511C22.8708 20.4314 23.1428 19.9822 23.2422 19.4822L24.9799 10.3699H6.51638" stroke="#666664" strokeWidth="1.62913" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_cart">
                <rect width="26.0661" height="26.0661" fill="white" transform="translate(0 3.85156)" />
              </clipPath>
            </defs>
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-primary text-white text-[8px] leading-4 min-w-[15px] h-[15px] px-1 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* Profile */}
        <Link href={user ? "/account" : "/login"} className="flex flex-col items-center text-gray-700" aria-label="Profile">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_profile)">
              <path d="M26.5257 28.7494V25.7652C26.5257 24.1823 25.8969 22.6642 24.7776 21.545C23.6583 20.4257 22.1403 19.7969 20.5573 19.7969H8.62068C7.03778 19.7969 5.51971 20.4257 4.40043 21.545C3.28115 22.6642 2.65234 24.1823 2.65234 25.7652V28.7494" stroke="#666664" strokeWidth="2.68575" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.5894 13.8273C17.8856 13.8273 20.5578 11.1552 20.5578 7.85896C20.5578 4.56274 17.8856 1.89062 14.5894 1.89062C11.2932 1.89062 8.62109 4.56274 8.62109 7.85896C8.62109 11.1552 11.2932 13.8273 14.5894 13.8273Z" stroke="#666664" strokeWidth="2.68575" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_profile">
                <rect width="29.4373" height="29.4373" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;
