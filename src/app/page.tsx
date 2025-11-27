import GridSection from "@/components/home/grid-section/grid-section";
import HomeBottomChipsSection from "@/components/home/home-bottom-chips-card-section/home-bottom-chips-section";
import HomeLeftSection from "@/components/home/left-section/home-left-section";
import HomeRightSection from "@/components/home/right-section/home-right-section";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col-reverse gap-5 max-sm:pt-10 items-stretch bg-[#fdfdfd]">
        {/* left */}
        <div className="xl:w-[20%] lg:w-[20%] md:w-[30%] flex">
          <HomeLeftSection />
        </div>

        {/* right */}
        <div className="xl:w-[80%] lg:w-[80%] md:w-[70%] flex">
          <div className="w-full flex flex-col">
            <HomeRightSection />
          </div>
        </div>
      </div>

      {/* home bottom section */}
      <GridSection className="max-md:hidden" />
      {/* bottom chips card */}
      <HomeBottomChipsSection />
    </>

  );
};

export default HomePage;
