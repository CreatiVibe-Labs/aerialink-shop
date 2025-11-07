import GridSection from "@/components/home/grid-section/grid-section";
import HomeBottomChipsSection from "@/components/home/home-bottom-chips-card-section/home-bottom-chips-section";
import HomeLeftSection from "@/components/home/left-section/home-left-section";
import HomeRightSection from "@/components/home/right-section/home-right-section";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="grid grid-cols-5 max-xl:grid-cols-6 max-sm:flex max-sm:flex-col-reverse mb-10 max-2xl:px-5 gap-x-1 min-h-screen max-w-7xl w-full mx-auto max-md:px-5 max-sm:px-3 mt-5 ">
        {/* left */}
        <HomeLeftSection />
        {/* right */}
        <HomeRightSection />
      </div>
      {/* home bottom section */}
      <GridSection className="max-md:hidden " />
      {/*  bottom chips card */}
      <HomeBottomChipsSection />
    </>
  );
};

export default HomePage;
