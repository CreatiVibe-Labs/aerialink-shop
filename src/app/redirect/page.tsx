"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main
      className="flex flex-col lg:mt-[10px] mt-[5px] lg:mb-[10px] mb-[5px] px-[18px] py-[21px] items-center w-full m-auto bg-[FFFFFF] opacity-500 
      max-w-7xl"
    >
      <div className="w-full lg:h-[450px] h-[220px]">
        <Image
          src="/assets/about/redirect-bg.png"
          alt="Product"
          width={603}
          height={450}
          className="rounded-[14px] w-full lg:h-[450px] h-[220px] border-2 border-[#666664]"
        />
      </div>

      <span className="lg:mt-8 mt-4 lg:text-[24px] text-[16px] lg:leading-[25.71px] leading-[20px] font-[400] text-[#666664] text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        tincidunt euismod ante. Vivamus placerat at enim non condimentum. Donec
        sit amet mauris purus. Lorem ipsum dolor sit amet, consectetur Lorem.
      </span>

      <button
        onClick={() => router.push("/")}
        className="lg:mt-8 mt-4 font-inter font-[800] lg:leading-[23.23px] leading-[18.08px] bg-primary text-white lg:text-[20px] text-[12.46px] 
          px-10 py-2 rounded-[14px] lg:w-[442px] w-[253] lg:h-[56px] h-[34px] cursor-pointer hover:bg-primary/80"
      >
        Go Back To Homepage ↗
      </button>
    </main>
  );
}
