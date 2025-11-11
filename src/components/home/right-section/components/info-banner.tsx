"use client";
import Image from "next/image";

const InfoBanner = () => {
  return (
    <div className="rounded-2xl  border  border-gray-200 bg-[#EBECF0] p-10 max-2xl:p-3 shadow-sm overflow-hidden">
      <div className="grid grid-cols-2 gap-2 items-center rounded-xl bg-[url('/assets/home/texture.png')] bg-center bg-cover">
        {/* Left side image */}
        <div className="relative w-full h-full ">
          <Image
            src={"/assets/home/info-banner-image.png"}
            alt={"info banner"}
            fill
            className="object-cover rounded-l-2xl"
          />
        </div>

        {/* Right side text */}
        <div className="xl:p-20 lg:p-20 md:p-10 p-5 !pl-2 !pr-3 space-y-2 max-sm:space-y-1 text-light-gray">
          <h2 className="text-[4vmax] font-semibold max-md:text-[3vmax]">MDF</h2>
          <p className="text-xl text-gray-600 max-2xl:text-base max-md:text-sm max-sm:text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tincidunt euismod ante. Vivamus placerat at enim non condimentum.
            Donec sit amet mauris purus. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
