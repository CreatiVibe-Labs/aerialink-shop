"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineClose } from "react-icons/md";

const OrderFailedPage = () => {
  const router = useRouter();

  const handleTryAgain = () => {
    router.push("/cart");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col pt-10 pb-20 items-center justify-center p-4 max-sm:p-2 relative ">
      <div
        className="w-full max-w-2xl bg-white relative rounded-lg"
        style={{
          boxShadow: "0px 11.55px 46.19px 0px #66666629",
        }}
      >
        <div className="flex justify-center absolute -top-10 max-sm:-top-5 left-1/2 transform -translate-x-1/2">
          <div className="bg-red-500 rounded-full p-2 text-7xl max-sm:text-5xl text-white">
            <MdOutlineClose />
          </div>
        </div>

        <div className="p-6 text-center mt-12 flex flex-col items-center text-min-gray">
          <h2 className="text-2xl font-semibold mb-1 text-red-600">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't process your payment. Please try again.
          </p>

          <hr className="border-[#EDEDED] w-1/2 mb-6" />

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 w-[80%] max-md:w-[90%] max-sm:w-full">
            <p className="text-sm text-gray-700 text-left">
              <strong className="text-red-600">⚠️ What happened?</strong>
              <br />
              Your payment could not be completed. This could be due to:
            </p>
            <ul className="text-sm text-gray-700 text-left mt-3 space-y-1 list-disc list-inside">
              <li>Insufficient funds</li>
              <li>Card declined by bank</li>
              <li>Network connection issue</li>
              <li>Payment session expired</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-[80%] max-md:w-[90%] max-sm:w-full">
            <button
              onClick={handleTryAgain}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-semibold transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleGoHome}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
            >
              Back to Home
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Need help? Contact our support team at support@aerialinkshop.jp
          </p>
        </div>
      </div>

      {/* Bottom wavy pattern */}
      <div
        className="w-full max-w-2xl relative"
        style={{
          padding: "0 0 17px 0",
          backgroundImage:
            "radial-gradient(circle 15px at 41% 100%, transparent 0%, transparent 99%, white 100%)",
          backgroundPosition: "0 bottom",
          backgroundSize: "40px",
          backgroundRepeat: "repeat-x",
        }}
      ></div>
    </div>
  );
};

export default OrderFailedPage;
